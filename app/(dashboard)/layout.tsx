import { redirect } from "next/navigation";
import { createClient } from "@/shared/lib/supabase/server";
import { prisma } from "@/shared/lib/prisma";
import { DashboardShell } from "@/shared/components/dashboard/DashboardShell";

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

  const displayName =
    user.user_metadata?.full_name ??
    user.user_metadata?.name ??
    user.email?.split("@")[0] ??
    "User";

  return (
    <div className="dark" style={{ background: "#0E0E0F" }}>
      <DashboardShell user={{ name: displayName, email: user.email ?? "" }}>
        {children}
      </DashboardShell>
    </div>
  );
}
