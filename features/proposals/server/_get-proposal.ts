import { prisma } from "@/shared/lib/prisma";

export type ProposalDetail = NonNullable<Awaited<ReturnType<typeof _getProposal>>>;

export async function _getProposal(userId: string, proposalId: string) {
  return prisma.proposal.findFirst({
    where: { id: proposalId, userId },
    include: {
      profile: {
        select: { name: true },
      },
    },
  });
}
