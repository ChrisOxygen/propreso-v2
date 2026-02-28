import { prisma } from "@/shared/lib/prisma";

export async function _getProfilesByUserId(userId: string) {
  return prisma.freelancerProfile.findMany({
    where: { userId },
    orderBy: [{ isDefault: "desc" }, { createdAt: "asc" }],
  });
}
