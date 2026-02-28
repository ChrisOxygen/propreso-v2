import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/shared/lib/supabase/server";
import { prisma } from "@/shared/lib/prisma";
import { SeedButton } from "@/features/proposals/components/SeedButton";
import { DashboardRecentProposals } from "@/features/proposals/components/DashboardRecentProposals";

async function getDashboardData(userId: string) {
  const [totalProposals, wonProposals, repliedProposals, profileCount] =
    await Promise.all([
      prisma.proposal.count({ where: { userId } }),
      prisma.proposal.count({ where: { userId, status: "WON" } }),
      prisma.proposal.count({ where: { userId, status: "REPLIED" } }),
      prisma.freelancerProfile.count({ where: { userId } }),
    ]);

  return { totalProposals, wonProposals, repliedProposals, profileCount };
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { totalProposals, wonProposals, repliedProposals, profileCount } =
    await getDashboardData(user.id);

  const responseRate =
    totalProposals > 0
      ? Math.round(((wonProposals + repliedProposals) / totalProposals) * 100)
      : 0;

  const stats = [
    {
      label: "Total Proposals",
      value: totalProposals,
      color: "#FBF7F3",
    },
    {
      label: "Won",
      value: wonProposals,
      color: "#34D399",
    },
    {
      label: "Response Rate",
      value: `${responseRate}%`,
      color: "#FBF7F3",
    },
    {
      label: "Profiles",
      value: profileCount,
      color: "#FBF7F3",
    },
  ];

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1
            className="text-[1.35rem] font-bold tracking-[-0.03em]"
            style={{ color: "#FBF7F3", fontFamily: "var(--font-space-grotesk)" }}
          >
            Dashboard
          </h1>
          <p
            className="mt-0.5 text-[13px]"
            style={{
              color: "rgba(251,247,243,0.38)",
              fontFamily: "var(--font-inter)",
            }}
          >
            Welcome back. Here&apos;s your overview.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {process.env.NODE_ENV !== "production" && <SeedButton />}
          <Link
            href="/generate"
            className="flex items-center gap-1.5 h-9 px-4 rounded-lg text-[13px] font-semibold transition-opacity duration-150 hover:opacity-90"
            style={{
              background: "#C8491A",
              color: "#fff",
              fontFamily: "var(--font-inter)",
            }}
          >
            <Plus size={14} strokeWidth={2.5} />
            New Proposal
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {stats.map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-xl p-4"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <p
              className="text-[24px] font-bold tracking-tight leading-none"
              style={{ color, fontFamily: "var(--font-space-grotesk)" }}
            >
              {value}
            </p>
            <p
              className="text-[12px] mt-2"
              style={{
                color: "rgba(251,247,243,0.35)",
                fontFamily: "var(--font-inter)",
              }}
            >
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Recent proposals */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2
            className="text-[13px] font-semibold"
            style={{
              color: "rgba(251,247,243,0.6)",
              fontFamily: "var(--font-space-grotesk)",
            }}
          >
            Recent Proposals
          </h2>
          <Link
            href="/proposals"
            className="text-[12px] transition-colors duration-150"
            style={{
              color: "rgba(251,247,243,0.3)",
              fontFamily: "var(--font-inter)",
            }}
          >
            View all →
          </Link>
        </div>
        <DashboardRecentProposals userId={user.id} />
      </div>
    </div>
  );
}
