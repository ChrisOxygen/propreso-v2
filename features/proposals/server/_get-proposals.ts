import { prisma } from "@/shared/lib/prisma";
import { ProposalStatus } from "@/shared/lib/generated/prisma/enums";
import { PAGE_LIMIT } from "@/features/proposals/constants/pagination";

const proposalSelect = {
  id: true,
  userId: true,
  profileId: true,
  jobDescription: true, // stores the raw post; jobTitle removed — requires schema migration
  tone: true,
  status: true,
  createdAt: true,
  profile: {
    select: {
      name: true,
    },
  },
} as const;

// The list item shape — derived from the select above
export type ProposalListItem = Awaited<
  ReturnType<typeof _getProposals>
>["proposals"][number];

export interface GetProposalsParams {
  page?: number;
  limit?: number;
  /** "ALL" or a ProposalStatus value or "PENDING" (maps to null in DB) */
  status?: string | null;
  search?: string | null;
}


export async function _getProposals(
  userId: string,
  params: GetProposalsParams = {}
) {
  const { page = 1, limit = PAGE_LIMIT, status, search } = params;
  const skip = (page - 1) * limit;

  // Build the filter clause
  const statusFilter =
    !status || status === "ALL"
      ? {}
      : status === "PENDING"
      ? { status: null }
      : { status: status as ProposalStatus };

  const searchFilter = search?.trim()
    ? { jobDescription: { contains: search.trim(), mode: "insensitive" as const } }
    : {};

  const where = { userId, ...statusFilter, ...searchFilter };

  const [proposals, total, wonCount, repliedCount, allTotal] =
    await Promise.all([
      prisma.proposal.findMany({
        where,
        select: proposalSelect,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.proposal.count({ where }),
      prisma.proposal.count({ where: { userId, status: "WON" } }),
      prisma.proposal.count({ where: { userId, status: "REPLIED" } }),
      prisma.proposal.count({ where: { userId } }),
    ]);

  return {
    proposals,
    pagination: {
      total,
      page,
      totalPages: Math.max(1, Math.ceil(total / limit)),
      limit,
    },
    // Global (unfiltered) counts — always reflects all user proposals
    stats: {
      total: allTotal,
      won: wonCount,
      replied: repliedCount,
    },
  };
}
