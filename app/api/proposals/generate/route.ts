import { createClient } from "@/shared/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { openrouter } from "@/shared/lib/openrouter";
import { prisma } from "@/shared/lib/prisma";
import { buildSystemPrompt } from "@/shared/lib/prompt-builder";
import { startOfMonth } from "date-fns";
import type {
  Tone,
  ProposalFormula,
  ProposalLength,
} from "@/shared/lib/generated/prisma/enums";

const FREE_PROPOSAL_LIMIT = 10;

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

  // Check monthly proposal limit for FREE users
  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!dbUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (dbUser.plan === "FREE") {
    console.log(`User ${user.id} is on FREE plan. Checking proposal limit...`);
    const monthlyCount = await prisma.proposal.count({
      where: {
        userId: user.id,
        createdAt: { gte: startOfMonth(new Date()) },
      },
    });

    console.log(
      `User ${user.id} has generated ${monthlyCount} proposals this month.`,
    );

    if (monthlyCount >= FREE_PROPOSAL_LIMIT) {
      return NextResponse.json(
        { error: "proposal_limit_reached" },
        { status: 403 },
      );
    }
  }

  console.log("Generating proposal with params:", {
    profileId,
    tone,
    formula,
    proposalLength,
    upworkOpener,
    jobTitle,
  });

  // Verify profile ownership and fetch context
  const profile = await prisma.freelancerProfile.findFirst({
    where: { id: profileId, userId: user.id },
  });
  if (!profile) {
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
  });

  // TextStreamChatTransport on the client expects a plain text stream
  return result.toTextStreamResponse();
}
