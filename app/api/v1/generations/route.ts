import { createClient } from "@/shared/lib/supabase/server";
import { type NextRequest } from "next/server";
import { streamText, generateText } from "ai";
import { openrouter } from "@/shared/lib/openrouter";
import { prisma } from "@/shared/lib/prisma";
import {
  ANALYZER_SYSTEM_PROMPT,
  buildAnalyzerUserMessage,
} from "@/shared/constants/analyzer-prompts";
import {
  buildGeneratorSystemPrompt,
  buildGeneratorUserMessage,
} from "@/shared/constants/generator-prompts";
import {
  ANALYZER_MODEL,
  GENERATOR_MODEL,
} from "@/features/proposals/constants/generation";
import { apiError, apiValidationError } from "@/shared/lib/api-error";
import { ZGenerateProposalSchema } from "@/features/proposals/schemas/generate-schema";
import { generationRatelimit } from "@/shared/lib/rate-limit";
import { captureServerEvent } from "@/shared/lib/posthog-server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return apiError("unauthorized", "Unauthorized", 401);
  }

  // Per-user rate limit: 5 requests/min. Prevents burst abuse.
  if (generationRatelimit) {
    const { success } = await generationRatelimit.limit(user.id);
    if (!success) {
      return apiError("rate_limited", "Too many requests. Please wait a moment.", 429);
    }
  }

  const bodyJson = await request.json().catch(() => null);
  const parsed = ZGenerateProposalSchema.safeParse(bodyJson);
  if (!parsed.success) {
    return apiValidationError(parsed.error);
  }
  const { profileId, tone, rawPost } = parsed.data;

  // Atomic check-and-decrement: only succeeds if tokenBalance > 0
  const deducted = await prisma.user.updateMany({
    where: { id: user.id, tokenBalance: { gt: 0 } },
    data: { tokenBalance: { decrement: 1 } },
  });

  if (deducted.count === 0) {
    const exists = await prisma.user.findUnique({
      where: { id: user.id },
      select: { id: true },
    });
    if (!exists) {
      return apiError("not_found", "User not found", 404);
    }
    void captureServerEvent(user.id, "token_limit_hit");
    return apiError("token_limit_reached", "Token limit reached", 403);
  }

  // Verify profile ownership and fetch context
  const profile = await prisma.freelancerProfile.findFirst({
    where: { id: profileId, userId: user.id },
  });
  if (!profile) {
    await prisma.user.update({
      where: { id: user.id },
      data: { tokenBalance: { increment: 1 } },
    });
    return apiError("not_found", "Profile not found", 404);
  }

  const portfolioItems = (() => {
    try {
      const items = profile.portfolioItems as Array<{
        title?: string;
        url: string;
        description: string;
      }>;
      return Array.isArray(items) ? items : [];
    } catch {
      return [];
    }
  })();

  // ── Step 1: Combined classify + analyze (non-streaming, cheap model) ────────
  let analysisText: string;
  try {
    const analysis = await generateText({
      model: openrouter(ANALYZER_MODEL),
      system: ANALYZER_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: buildAnalyzerUserMessage(rawPost, {
            name: profile.name,
            skills: profile.skills,
            bio: profile.bio,
          }),
        },
      ],
      maxOutputTokens: 1200,
    });
    analysisText = analysis.text;
  } catch (err) {
    console.error("[generations] generateText (analyzer) failed:", err);
    // Refund the token since generation didn't happen
    await prisma.user.update({
      where: { id: user.id },
      data: { tokenBalance: { increment: 1 } },
    });
    return apiError("analysis_failed", "Failed to analyze job post", 500);
  }

  // Parse the analysis response — strip markdown fences if the model wrapped them
  let signals: {
    is_suspicious_post?: boolean;
    is_unclassifiable?: boolean;
    confidence?: number;
    post_type?: string;
    derived_title?: string;
  };
  try {
    // Extract the JSON object robustly — handles markdown fences and trailing prose
    const jsonStart = analysisText.indexOf("{");
    const jsonEnd = analysisText.lastIndexOf("}");
    if (jsonStart === -1 || jsonEnd === -1 || jsonEnd < jsonStart) {
      throw new Error("No JSON object found in analyzer output");
    }
    signals = JSON.parse(analysisText.slice(jsonStart, jsonEnd + 1)) as typeof signals;
  } catch {
    console.error("[generations] JSON.parse failed on analyzer output:", analysisText);
    await prisma.user.update({
      where: { id: user.id },
      data: { tokenBalance: { increment: 1 } },
    });
    return apiError("analysis_failed", "Failed to parse analysis response", 500);
  }

  if (signals.is_suspicious_post === true) {
    await prisma.user.update({
      where: { id: user.id },
      data: { tokenBalance: { increment: 1 } },
    });
    return apiError(
      "suspicious_post",
      "This post may be a scam or spam. Generation blocked.",
      422
    );
  }

  if (
    signals.is_unclassifiable === true ||
    (signals.confidence !== undefined && signals.confidence < 0.7)
  ) {
    await prisma.user.update({
      where: { id: user.id },
      data: { tokenBalance: { increment: 1 } },
    });
    return Response.json({
      requiresConfirmation: true,
      detectedType: signals.post_type,
      confidence: signals.confidence,
    });
  }

  // ── Step 2: Streaming proposal generation ────────────────────────────────────
  const profileData = {
    name: profile.name,
    bio: profile.bio,
    skills: profile.skills,
    portfolioItems,
  };

  const result = streamText({
    model: openrouter(GENERATOR_MODEL),
    system: buildGeneratorSystemPrompt(profileData, tone),
    messages: [{ role: "user", content: buildGeneratorUserMessage(analysisText) }],
    onFinish: async () => {
      try {
        let derivedTitle = rawPost.slice(0, 80);
        try {
          const parsed = JSON.parse(analysisText) as { derived_title?: string };
          if (parsed.derived_title) derivedTitle = parsed.derived_title;
        } catch { /* ignore */ }
        await prisma.generationEvent.create({
          data: { userId: user.id, status: "COMPLETED", jobTitle: derivedTitle },
        });
        void captureServerEvent(user.id, "proposal_generated", {
          profile_id: profileId,
          tone,
          job_title: derivedTitle,
        });
      } catch (err) {
        console.error("Failed to record generation event:", err);
      }
    },
  });

  return result.toTextStreamResponse();
}
