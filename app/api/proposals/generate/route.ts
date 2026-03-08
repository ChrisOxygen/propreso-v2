import { createClient } from "@/shared/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { openrouter } from "@/shared/lib/openrouter";
import { prisma } from "@/shared/lib/prisma";
import { buildSystemPrompt } from "@/shared/lib/prompt-builder";
import type {
  Tone,
  ProposalFormula,
  ProposalLength,
} from "@/shared/lib/generated/prisma/enums";

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
  }: {
    messages: UIMessage[];
    profileId: string;
    tone: Tone;
    formula: ProposalFormula;
    proposalLength: ProposalLength;
    upworkOpener: boolean;
    jobTitle: string;
  } = body;

  // Atomic check-and-decrement: only succeeds if tokenBalance > 0
  const deducted = await prisma.user.updateMany({
    where: { id: user.id, tokenBalance: { gt: 0 } },
    data: { tokenBalance: { decrement: 1 } },
  });

  if (deducted.count === 0) {
    // Distinguish between user-not-found and out-of-tokens
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
    // Refund the token — profile not found means we shouldn't charge
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

  const systemPrompt = buildSystemPrompt({
    profile: {
      name: profile.name,
      bio: profile.bio,
      skills: profile.skills,
      portfolioItems,
    },
    tone,
    formula,
    proposalLength,
    upworkOpener,
    jobTitle,
  });

  // Convert v6 UIMessage[] → CoreMessage[] for streamText
  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: openrouter("openai/gpt-4o-mini"),
    system: systemPrompt,
    messages: modelMessages,
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

  // TextStreamChatTransport on the client expects a plain text stream
  return result.toTextStreamResponse();
}
