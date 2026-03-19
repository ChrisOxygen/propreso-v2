import Link from "next/link";
import {
  FileText,
  Trophy,
  TrendingUp,
  Users,
  Zap,
  UserCog,
  FolderOpen,
} from "lucide-react";
import { createClient } from "@/shared/lib/supabase/server";
import { prisma } from "@/shared/lib/prisma";
import { DashboardRecentProposals } from "@/features/proposals/components/DashboardRecentProposals";

async function getDashboardData(userId: string) {
  const [totalProposals, wonProposals, repliedProposals, profileCount, defaultProfile] =
    await Promise.all([
      prisma.proposal.count({ where: { userId } }),
      prisma.proposal.count({ where: { userId, status: "WON" } }),
      prisma.proposal.count({ where: { userId, status: "REPLIED" } }),
      prisma.freelancerProfile.count({ where: { userId } }),
      prisma.freelancerProfile.findFirst({
        where: { userId, isDefault: true },
        select: { portfolioItems: true },
      }),
    ]);

  const hasPortfolio =
    defaultProfile &&
    Array.isArray(defaultProfile.portfolioItems) &&
    (defaultProfile.portfolioItems as unknown[]).length > 0;

  return {
    totalProposals,
    wonProposals,
    repliedProposals,
    profileCount,
    showPortfolioNudge: profileCount > 0 && !hasPortfolio,
  };
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { totalProposals, wonProposals, repliedProposals, profileCount, showPortfolioNudge } =
    await getDashboardData(user.id);

  const responseRate =
    totalProposals > 0
      ? Math.round(((wonProposals + repliedProposals) / totalProposals) * 100)
      : 0;

  return (
    <div className="px-2 space-y-5">
      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Total Proposals */}
        <div className="rounded-xl p-4 bg-card border border-border flex flex-col gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <FileText size={15} className="text-primary" />
          </div>
          <div>
            <p className="text-[26px] font-bold tracking-tight leading-none text-foreground font-heading">
              {totalProposals}
            </p>
            <p className="text-[12px] mt-1.5 text-muted-foreground">
              Total Proposals
            </p>
          </div>
        </div>

        {/* Won */}
        <div className="rounded-xl p-4 bg-card border border-border flex flex-col gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
            <Trophy size={15} className="text-emerald-600" />
          </div>
          <div>
            <p className="text-[26px] font-bold tracking-tight leading-none text-emerald-600 font-heading">
              {wonProposals}
            </p>
            <p className="text-[12px] mt-1.5 text-muted-foreground">Won</p>
          </div>
        </div>

        {/* Response Rate */}
        <div className="rounded-xl p-4 bg-card border border-border flex flex-col gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <TrendingUp size={15} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-[26px] font-bold tracking-tight leading-none text-foreground font-heading">
              {responseRate}%
            </p>
            <p className="text-[12px] mt-1.5 text-muted-foreground">
              Response Rate
            </p>
          </div>
          <div className="h-1 rounded-full bg-border overflow-hidden">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${responseRate}%` }}
            />
          </div>
        </div>

        {/* Profiles */}
        <div className="rounded-xl p-4 bg-card border border-border flex flex-col gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Users size={15} className="text-primary" />
          </div>
          <div>
            <p className="text-[26px] font-bold tracking-tight leading-none text-foreground font-heading">
              {profileCount}
            </p>
            <p className="text-[12px] mt-1.5 text-muted-foreground">Profiles</p>
          </div>
        </div>
      </div>

      {/* Portfolio completeness nudge */}
      {showPortfolioNudge && (
        <Link
          href="/profiles"
          className="flex items-center gap-3 rounded-xl px-4 py-3 bg-accent border border-primary/20 hover:border-primary/40 hover:bg-accent transition-colors duration-150 group"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <FolderOpen size={15} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-foreground font-heading leading-tight">
              Add work samples to your profile
            </p>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              Projects give the AI concrete proof points — proposals get
              stronger.
            </p>
          </div>
          <span className="text-[12px] text-primary font-medium shrink-0 group-hover:underline">
            Add now →
          </span>
        </Link>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link
          href="/generate"
          className="rounded-xl p-4 bg-primary flex items-center gap-3 transition-colors hover:bg-primary-hover"
        >
          <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
            <Zap size={16} className="text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-white font-heading">
              Generate a Proposal
            </p>
            <p className="text-[12px] text-white/65 mt-0.5">
              Draft a new AI-powered proposal
            </p>
          </div>
        </Link>

        <Link
          href="/profiles"
          className="rounded-xl p-4 bg-card border border-border flex items-center gap-3 transition-colors hover:bg-accent"
        >
          <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0">
            <UserCog size={16} className="text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-foreground font-heading">
              Manage Profiles
            </p>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              Edit your freelancer profiles
            </p>
          </div>
        </Link>
      </div>

      {/* Recent proposals */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[13px] font-semibold text-text-secondary font-heading">
            Recent Proposals
          </h2>
          <Link
            href="/proposals"
            className="text-[12px] text-muted-foreground hover:text-text-secondary transition-colors"
          >
            View all →
          </Link>
        </div>
        <DashboardRecentProposals userId={user.id} />
      </div>
    </div>
  );
}
