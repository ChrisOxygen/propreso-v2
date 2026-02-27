import { prisma } from "@/shared/lib/prisma";
import type { ZCreateProfile } from "@/features/profiles/schemas/profile-schemas";

const FREE_PROFILE_LIMIT = 2;

export async function _createProfile(userId: string, data: ZCreateProfile) {
  const count = await prisma.freelancerProfile.count({ where: { userId } });

  if (count >= FREE_PROFILE_LIMIT) {
    throw new Error("profile_limit_reached");
  }

  return prisma.freelancerProfile.create({
    data: {
      userId,
      name: data.name,
      skillsSummary: data.skillsSummary,
      experienceSummary: data.experienceSummary,
      tone: data.tone,
      portfolioLinks: data.portfolioLinks ?? [],
      isDefault: count === 0, // first profile is always the default
    },
  });
}
