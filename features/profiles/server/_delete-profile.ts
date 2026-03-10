import { prisma } from "@/shared/lib/prisma";
import { NotFoundError } from "@/shared/lib/api-error";

export async function _deleteProfile(profileId: string, userId: string) {
  const profile = await prisma.freelancerProfile.findFirst({
    where: { id: profileId, userId },
  });

  if (!profile) {
    throw new NotFoundError();
  }

  await prisma.freelancerProfile.delete({ where: { id: profileId } });

  // If we deleted the default, promote the oldest remaining profile
  if (profile.isDefault) {
    const next = await prisma.freelancerProfile.findFirst({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });
    if (next) {
      await prisma.freelancerProfile.update({
        where: { id: next.id },
        data: { isDefault: true },
      });
    }
  }
}
