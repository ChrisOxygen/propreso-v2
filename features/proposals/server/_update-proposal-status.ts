import { prisma } from "@/shared/lib/prisma";
import type { ZUpdateProposalStatus } from "@/features/proposals/schemas/proposal-schemas";
import { NotFoundError } from "@/shared/lib/api-error";

export async function _updateProposalStatus(
  userId: string,
  proposalId: string,
  data: ZUpdateProposalStatus
) {
  const proposal = await prisma.proposal.findFirst({
    where: { id: proposalId, userId },
    select: { id: true },
  });

  if (!proposal) {
    throw new NotFoundError();
  }

  return prisma.proposal.update({
    where: { id: proposalId },
    data: { status: data.status },
    select: { id: true, status: true },
  });
}
