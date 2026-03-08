import { ProfilesList } from "@/features/profiles/components/ProfilesList";
import { createClient } from "@/shared/lib/supabase/server";
import { prisma } from "@/shared/lib/prisma";

export const metadata = { title: "Profiles — Propreso" };

export default async function ProfilesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isPro = false;
  if (user) {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { plan: true },
    });
    isPro = dbUser?.plan === "PRO";
  }

  return (
    <div className="px-2">
      <ProfilesList isPro={isPro} />
    </div>
  );
}
