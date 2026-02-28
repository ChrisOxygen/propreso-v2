import { redirect } from "next/navigation";
import { createClient } from "@/shared/lib/supabase/server";
import { prisma } from "@/shared/lib/prisma";
import { DashboardSidebar } from "@/shared/components/dashboard/DashboardSidebar";
import { MobileHeader } from "@/shared/components/dashboard/MobileHeader";

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

  return (
    <div className="min-h-screen flex" style={{ background: "#0E0E0F" }}>
      {/* Desktop sidebar — fixed, 220px */}
      <DashboardSidebar />

      {/* Mobile header (top bar + bottom nav) */}
      <MobileHeader />

      {/* Main content area */}
      <main className="flex-1 min-w-0 md:pl-[220px]">
        {/* Offset for mobile top header + bottom nav */}
        <div className="pt-[54px] pb-[56px] md:pt-0 md:pb-0 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
