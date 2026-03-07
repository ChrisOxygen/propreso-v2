"use client";

import { FileText, Trophy, MessageCircle } from "lucide-react";
import type { ProposalsStats } from "@/features/proposals/types";

interface ProposalMetricsProps {
  stats?: ProposalsStats;
  isLoading?: boolean;
}

function SkeletonCard() {
  return (
    <div className="rounded-xl p-4 flex items-start gap-3 bg-card border border-border animate-pulse">
      <div className="w-8 h-8 rounded-lg shrink-0 mt-0.5 bg-muted" />
      <div className="flex-1 space-y-2">
        <div className="h-7 rounded w-12 bg-muted" />
        <div className="h-3 rounded w-20 bg-muted" />
      </div>
    </div>
  );
}

export function ProposalMetrics({ stats, isLoading = false }: ProposalMetricsProps) {
  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  const responseRate =
    stats.total > 0
      ? Math.round(((stats.won + stats.replied) / stats.total) * 100)
      : 0;

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {/* Total Proposals */}
      <div className="rounded-xl p-4 flex items-start gap-3 bg-card border border-border">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 bg-muted">
          <FileText size={15} className="text-muted-foreground" />
        </div>
        <div className="min-w-0">
          <p className="text-[22px] sm:text-[26px] font-bold tracking-tight leading-none text-foreground font-heading">
            {stats.total}
          </p>
          <p className="text-[11px] sm:text-[12px] mt-1.5 leading-tight text-muted-foreground">
            Total Proposals
          </p>
        </div>
      </div>

      {/* Won */}
      <div className="rounded-xl p-4 flex items-start gap-3 bg-card border border-border">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 bg-emerald-50">
          <Trophy size={15} className="text-emerald-600" />
        </div>
        <div className="min-w-0">
          <p className="text-[22px] sm:text-[26px] font-bold tracking-tight leading-none text-emerald-600 font-heading">
            {stats.won}
          </p>
          <p className="text-[11px] sm:text-[12px] mt-1.5 leading-tight text-muted-foreground">
            Won
          </p>
        </div>
      </div>

      {/* Response Rate */}
      <div className="rounded-xl p-4 flex items-start gap-3 bg-card border border-border">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 bg-blue-50">
          <MessageCircle size={15} className="text-blue-500" />
        </div>
        <div className="min-w-0">
          <p className="text-[22px] sm:text-[26px] font-bold tracking-tight leading-none text-foreground font-heading">
            {responseRate}%
          </p>
          <p className="text-[11px] sm:text-[12px] mt-1.5 leading-tight text-muted-foreground">
            Response Rate
          </p>
        </div>
      </div>
    </div>
  );
}
