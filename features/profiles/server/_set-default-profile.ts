import { prisma } from "@/shared/lib/prisma";
import { NotFoundError } from "@/shared/lib/api-error";

export async function _setDefaultProfile(profileId: string, userId: string) {
  const profile = await prisma.freelancerProfile.findFirst({
    where: { id: profileId, userId },
  });

  if (!profile) {
    throw new NotFoundError();
  }

  await prisma.$transaction([
    prisma.freelancerProfile.updateMany({
      where: { userId },
      data: { isDefault: false },
    }),
    prisma.freelancerProfile.update({
      where: { id: profileId },
      data: { isDefault: true },
    }),
  ]);
}
