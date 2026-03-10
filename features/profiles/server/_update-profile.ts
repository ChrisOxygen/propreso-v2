import { prisma } from "@/shared/lib/prisma";
import type { ZUpdateProfile } from "@/features/profiles/schemas/profile-schemas";
import { NotFoundError } from "@/shared/lib/api-error";

export async function _updateProfile(
  profileId: string,
  userId: string,
  data: ZUpdateProfile
) {
  const profile = await prisma.freelancerProfile.findFirst({
    where: { id: profileId, userId },
  });

  if (!profile) {
    throw new NotFoundError();
  }

  return prisma.freelancerProfile.update({
    where: { id: profileId },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.skills !== undefined && { skills: data.skills }),
      ...(data.bio !== undefined && { bio: data.bio }),
      ...(data.portfolioItems !== undefined && {
        portfolioItems: data.portfolioItems,
      }),
    },
  });
}
