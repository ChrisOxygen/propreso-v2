"use client";

import { useSearchParams } from "next/navigation";
import { FileText } from "lucide-react";
import { useProposals } from "@/features/proposals/hooks/use-proposals";
import { ProposalCard } from "./ProposalCard";
import { ProposalMetrics } from "./ProposalMetrics";
import { ProposalsFilters } from "./ProposalsFilters";
import { ProposalsTable } from "./ProposalsTable";
import { ProposalsPagination } from "./ProposalsPagination";

// ── Skeleton pieces used for both Suspense fallback and initial load ──

function TableSkeleton() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[680px]" style={{ tableLayout: "fixed" }}>
          <colgroup>
            {["40%", "17%", "10%", "9%", "13%", "11%"].map((w) => (
              <col key={w} style={{ width: w }} />
            ))}
          </colgroup>
          <thead>
            <tr
              style={{
                background: "rgba(255,255,255,0.025)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {["Job Title", "Profile", "Formula", "Length", "Status", "Date"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left">
                  <span
                    className="text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap"
                    style={{
                      color: "rgba(251,247,243,0.28)",
                      fontFamily: "var(--font-space-grotesk)",
                    }}
                  >
                    {h}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <tr
                key={i}
                className="animate-pulse"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                <td className="px-4 py-3.5">
                  <div className="h-3.5 rounded w-[70%]" style={{ background: "rgba(255,255,255,0.07)" }} />
                </td>
                <td className="px-4 py-3.5">
                  <div className="h-3.5 rounded w-[60%]" style={{ background: "rgba(255,255,255,0.05)" }} />
                </td>
                <td className="px-4 py-3.5">
                  <div className="h-5 rounded w-10" style={{ background: "rgba(255,255,255,0.05)" }} />
                </td>
                <td className="px-4 py-3.5">
                  <div className="h-3.5 rounded w-10" style={{ background: "rgba(255,255,255,0.05)" }} />
                </td>
                <td className="px-4 py-3.5">
                  <div className="h-5 rounded-full w-16" style={{ background: "rgba(255,255,255,0.05)" }} />
                </td>
                <td className="px-4 py-3.5">
                  <div className="h-3.5 rounded w-14" style={{ background: "rgba(255,255,255,0.04)" }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div
      className="rounded-xl p-4 animate-pulse"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="h-4 rounded w-3/4" style={{ background: "rgba(255,255,255,0.07)" }} />
      <div className="h-3 rounded w-2/5 mt-2" style={{ background: "rgba(255,255,255,0.05)" }} />
      <div className="flex gap-1.5 mt-3">
        <div className="h-5 rounded w-10" style={{ background: "rgba(255,255,255,0.05)" }} />
        <div className="h-5 rounded w-14" style={{ background: "rgba(255,255,255,0.04)" }} />
      </div>
      <div
        className="flex gap-1.5 mt-3 pt-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex-1 h-7 rounded-md" style={{ background: "rgba(255,255,255,0.04)" }} />
        ))}
      </div>
    </div>
  );
}

// Exported so proposals/page.tsx can use it as a Suspense fallback
export function ProposalsViewSkeleton() {
  return (
    <div className="space-y-4">
      <ProposalMetrics isLoading />
      {/* Filter bar skeleton */}
      <div className="flex flex-col sm:flex-row gap-2.5 sm:items-center sm:justify-between">
        <div className="h-9 rounded-lg w-full sm:w-65 animate-pulse" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }} />
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-7 rounded-full w-16 animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />
          ))}
        </div>
      </div>
      <div className="hidden md:block"><TableSkeleton /></div>
      <div className="md:hidden space-y-3">
        {[1, 2, 3].map((i) => <CardSkeleton key={i} />)}
      </div>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

export function ProposalsView() {
  const searchParams = useSearchParams();

  const status = searchParams.get("status") ?? "ALL";
  const search = searchParams.get("q") ?? "";
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));

  const params = { status, search, page };
  const { data, isPending, isFetching, isError } = useProposals(params);

  /* ── Initial load (no data yet, not a page/filter transition) ── */
  if (isPending) {
    return <ProposalsViewSkeleton />;
  }

  /* ── Error ── */
  if (isError) {
    return (
      <div
        className="rounded-xl px-4 py-4 text-[13px]"
        style={{
          background: "rgba(200,73,26,0.08)",
          border: "1px solid rgba(200,73,26,0.2)",
          color: "#F5A070",
          fontFamily: "var(--font-inter)",
        }}
      >
        Failed to load proposals. Please refresh the page.
      </div>
    );
  }

  const proposals = data?.proposals ?? [];
  const pagination = data?.pagination;
  const stats = data?.stats;

  /* ── No proposals at all (unfiltered) ── */
  const isFiltered = status !== "ALL" || search.trim() !== "";
  if (!isFiltered && proposals.length === 0 && !isFetching) {
    return (
      <div
        className="rounded-xl px-6 py-16 flex flex-col items-center gap-3 text-center"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px dashed rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <FileText size={18} style={{ color: "rgba(251,247,243,0.22)" }} />
        </div>
        <div>
          <p
            className="text-[14px] font-semibold"
            style={{ color: "rgba(251,247,243,0.55)", fontFamily: "var(--font-space-grotesk)" }}
          >
            No proposals yet
          </p>
          <p
            className="mt-1 text-[12.5px]"
            style={{ color: "rgba(251,247,243,0.28)", fontFamily: "var(--font-inter)" }}
          >
            Generate your first proposal and it will appear here.
          </p>
        </div>
      </div>
    );
  }

  /* ── Data (with possible active filter) ── */
  return (
    <div className="space-y-4">
      {/* Metric cards — always show global (unfiltered) stats */}
      <ProposalMetrics stats={stats} />

      {/* Filter toolbar */}
      <ProposalsFilters />

      {/* Desktop table */}
      <div className="hidden md:block">
        {proposals.length === 0 ? (
          <div
            className="rounded-xl px-6 py-12 flex flex-col items-center gap-2 text-center"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px dashed rgba(255,255,255,0.08)",
            }}
          >
            <p
              className="text-[13px] font-medium"
              style={{ color: "rgba(251,247,243,0.4)", fontFamily: "var(--font-space-grotesk)" }}
            >
              No proposals match your filter.
            </p>
          </div>
        ) : (
          <ProposalsTable proposals={proposals} isFetching={isFetching} />
        )}
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {proposals.length === 0 ? (
          <p
            className="text-center text-[13px] py-8"
            style={{ color: "rgba(251,247,243,0.35)", fontFamily: "var(--font-inter)" }}
          >
            No proposals match your filter.
          </p>
        ) : (
          proposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <ProposalsPagination pagination={pagination} />
      )}
    </div>
  );
}
