import { prisma } from "@/shared/lib/prisma";
import type {
  Tone,
  ProposalFormula,
  ProposalLength,
} from "@/shared/lib/generated/prisma/enums";

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
