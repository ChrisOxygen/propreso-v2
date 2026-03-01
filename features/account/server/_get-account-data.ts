import { prisma } from "@/shared/lib/prisma";
import { startOfMonth } from "date-fns";

export async function _getAccountData(userId: string) {
  const [user, proposalCount, profileCount] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.proposal.count({
      where: {
        userId,
        createdAt: { gte: startOfMonth(new Date()) },
      },
    }),
    prisma.freelancerProfile.count({ where: { userId } }),
  ]);

  return { user, proposalCount, profileCount };
}
