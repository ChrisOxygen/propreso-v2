import { prisma } from "@/shared/lib/prisma";
import { startOfMonth } from "date-fns";
import type {
  Tone,
  ProposalFormula,
  ProposalLength,
} from "@/shared/lib/generated/prisma/enums";

const FREE_PROPOSAL_LIMIT = 10;

export interface SaveProposalInput {
  profileId: string;
  jobTitle: string;
  jobUrl?: string;
  jobDescription: string;
  tone: Tone;
  formula: ProposalFormula;
  proposalLength: ProposalLength;
  upworkOpener: boolean;
  generatedContent: string;
}

export async function _saveProposal(
  userId: string,
  input: SaveProposalInput
) {
  // Verify profile ownership
  const profile = await prisma.freelancerProfile.findFirst({
    where: { id: input.profileId, userId },
  });
  if (!profile) {
    throw Object.assign(new Error("Profile not found"), { status: 404 });
  }

  // Check user plan + monthly proposal count
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw Object.assign(new Error("User not found"), { status: 404 });
  }

  if (user.plan === "FREE") {
    const monthlyCount = await prisma.proposal.count({
      where: {
        userId,
        createdAt: { gte: startOfMonth(new Date()) },
      },
    });

    if (monthlyCount >= FREE_PROPOSAL_LIMIT) {
      throw Object.assign(new Error("proposal_limit_reached"), { status: 403 });
    }
  }

  return prisma.proposal.create({
    data: {
      userId,
      profileId: input.profileId,
      jobTitle: input.jobTitle,
      jobUrl: input.jobUrl || null,
      jobDescription: input.jobDescription,
      tone: input.tone,
      formula: input.formula,
      proposalLength: input.proposalLength,
      upworkOpener: input.upworkOpener,
      generatedContent: input.generatedContent,
    },
    select: { id: true },
  });
}
