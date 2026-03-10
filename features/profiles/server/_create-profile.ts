import { prisma } from "@/shared/lib/prisma";
import type { ZCreateProfile } from "@/features/profiles/schemas/profile-schemas";
import {
  FREE_PROFILE_LIMIT,
  PRO_PROFILE_LIMIT,
} from "@/features/billing/constants/plans";
import { AppError } from "@/shared/lib/api-error";

export async function _createProfile(userId: string, data: ZCreateProfile) {
  const [count, user] = await Promise.all([
    prisma.freelancerProfile.count({ where: { userId } }),
    prisma.user.findUnique({ where: { id: userId }, select: { plan: true } }),
  ]);

  const limit =
    user?.plan === "PRO" ? PRO_PROFILE_LIMIT : FREE_PROFILE_LIMIT;

  if (count >= limit) {
    throw new AppError("profile_limit_reached", "Profile limit reached");
  }

  return prisma.freelancerProfile.create({
    data: {
      userId,
      name: data.name,
      skills: data.skills,
      bio: data.bio,
      portfolioItems: data.portfolioItems ?? [],
      isDefault: count === 0,
    },
  });
}
