import { prisma } from "@/shared/lib/prisma";
import type {
  Tone,
  ProposalFormula,
  ProposalLength,
} from "@/shared/lib/generated/prisma/enums";
import { NotFoundError } from "@/shared/lib/api-error";

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
    throw new NotFoundError("Profile not found");
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
