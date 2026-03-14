import { prisma } from "@/shared/lib/prisma";
import type { Tone } from "@/shared/lib/generated/prisma/enums";
import { NotFoundError } from "@/shared/lib/api-error";

export interface SaveProposalInput {
  profileId: string;
  rawPost: string;
  tone: Tone;
  generatedContent: string;
  signals?: Record<string, unknown> | null; // NOTE: requires schema migration
  wordCount?: number | null;                 // NOTE: requires schema migration
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
      jobDescription: input.rawPost,
      tone: input.tone,
      generatedContent: input.generatedContent,
      // signals: input.signals ?? undefined,   // NOTE: requires schema migration
      // wordCount: input.wordCount ?? undefined, // NOTE: requires schema migration
    },
    select: { id: true },
  });
}
