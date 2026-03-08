import { createClient } from "@/shared/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";
import { streamText, generateText, type UIMessage } from "ai";
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
import type {
  Tone,
  ProposalFormula,
  ProposalLength,
} from "@/shared/lib/generated/prisma/enums";
import {
  ANALYZER_MODEL,
  GENERATOR_MODEL,
} from "@/features/proposals/constants/generation";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    messages,
    profileId,
    tone,
    formula,
    proposalLength,
    upworkOpener,
    jobTitle,
    jobDescription,
  }: {
    messages: UIMessage[];
    profileId: string;
    tone: Tone;
    formula: ProposalFormula;
    proposalLength: ProposalLength;
    upworkOpener: boolean;
    jobTitle: string;
    jobDescription: string;
  } = body;

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
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "token_limit_reached" }, { status: 403 });
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
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const portfolioItems = (() => {
    try {
      const items = profile.portfolioItems as Array<{
        url: string;
        description: string;
      }>;
      return Array.isArray(items) ? items : [];
    } catch {
      return [];
    }
  })();

  // ── Step 1: Analyze the job post (Haiku — cheap extraction task) ──────────
  const analysis = await generateText({
    model: openrouter(ANALYZER_MODEL),
    system: ANALYZER_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: buildAnalyzerUserMessage(jobTitle, jobDescription, {
          name: profile.name,
          skills: profile.skills,
          bio: profile.bio,
        }),
      },
    ],
    maxOutputTokens: 500, // compact JSON output — hard cap prevents verbose responses
  });

  // ── Step 2: Generate the proposal (Sonnet — streaming) ───────────────────
  const systemPrompt = buildGeneratorSystemPrompt(
    {
      name: profile.name,
      bio: profile.bio,
      skills: profile.skills,
      portfolioItems,
    },
    tone,
    formula,
    proposalLength,
    upworkOpener
  );

  // The intelligence report from Step 1 captures everything the generator needs.
  // We do NOT re-send the raw job post — it was already distilled into the report.
  void messages; // acknowledged — not used in single-turn generation
  const userMessage = buildGeneratorUserMessage(jobTitle, analysis.text);

  const result = streamText({
    model: openrouter(GENERATOR_MODEL),
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
    onFinish: async () => {
      try {
        await prisma.generationEvent.create({
          data: { userId: user.id, status: "COMPLETED", jobTitle },
        });
      } catch (err) {
        console.error("Failed to record generation event:", err);
      }
    },
  });

  return result.toTextStreamResponse();
}
