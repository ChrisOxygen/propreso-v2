import { prisma } from "@/shared/lib/prisma";

const proposalSelect = {
  id: true,
  userId: true,
  profileId: true,
  jobTitle: true,
  jobUrl: true,
  tone: true,
  formula: true,
  proposalLength: true,
  upworkOpener: true,
  status: true,
  createdAt: true,
  profile: {
    select: {
      name: true,
    },
  },
} as const;

export type ProposalListItem = Awaited<
  ReturnType<typeof _getProposals>
>[number];

export async function _getProposals(userId: string) {
  return prisma.proposal.findMany({
    where: { userId },
    select: proposalSelect,
    orderBy: { createdAt: "desc" },
  });
}
