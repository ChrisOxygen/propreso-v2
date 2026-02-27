import { redirect } from "next/navigation";
import { createClient } from "@/shared/lib/supabase/server";
import { prisma } from "@/shared/lib/prisma";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const profileCount = await prisma.freelancerProfile.count({
    where: { userId: user.id },
  });

  if (profileCount === 0) {
    redirect("/onboarding");
  }

  return <>{children}</>;
}
