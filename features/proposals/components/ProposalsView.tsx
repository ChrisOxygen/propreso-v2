"use client";

import { FileText } from "lucide-react";
import { useProposals } from "@/features/proposals/hooks/use-proposals";
import { ProposalCard } from "./ProposalCard";
import { ProposalMetrics } from "./ProposalMetrics";
import { ProposalsTable } from "./ProposalsTable";

function SkeletonMetricCard() {
  return (
    <div
      className="rounded-xl p-4 flex items-start gap-3 animate-pulse"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        className="w-8 h-8 rounded-lg shrink-0"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />
      <div className="flex-1 space-y-2">
        <div
          className="h-6 rounded w-12"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />
        <div
          className="h-3 rounded w-20"
          style={{ background: "rgba(255,255,255,0.04)" }}
        />
      </div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <tr
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      className="animate-pulse"
    >
      {[65, 20, 8, 7].map((w, i) => (
        <td key={i} className="px-4 py-3.5">
          <div
            className="h-3.5 rounded"
            style={{
              background: "rgba(255,255,255,0.06)",
              width: `${w}%`,
            }}
          />
        </td>
      ))}
    </tr>
  );
}

function SkeletonCard() {
  return (
    <div
      className="rounded-xl p-4 animate-pulse"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        className="h-4 rounded w-3/4"
        style={{ background: "rgba(255,255,255,0.07)" }}
      />
      <div
        className="h-3 rounded w-2/5 mt-2"
        style={{ background: "rgba(255,255,255,0.05)" }}
      />
      <div className="flex gap-1.5 mt-3">
        <div
          className="h-5 rounded w-10"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />
        <div
          className="h-5 rounded w-14"
          style={{ background: "rgba(255,255,255,0.04)" }}
        />
      </div>
      <div
        className="flex gap-1.5 mt-3 pt-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex-1 h-7 rounded-md"
            style={{ background: "rgba(255,255,255,0.04)" }}
          />
        ))}
      </div>
    </div>
  );
}

export function ProposalsView() {
  const { data: proposals, isPending, isError } = useProposals();

  /* ── Loading ── */
  if (isPending) {
    return (
      <div className="space-y-4">
        {/* Metric skeleton */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {[1, 2, 3].map((i) => (
            <SkeletonMetricCard key={i} />
          ))}
        </div>

        {/* Table skeleton (md+) */}
        <div
          className="hidden md:block rounded-xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <table className="w-full border-collapse">
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
                      className="text-[11px] font-semibold uppercase tracking-wider"
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
              {[1, 2, 3, 4].map((i) => (
                <SkeletonRow key={i} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Card skeleton (mobile) */}
        <div className="md:hidden space-y-3">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
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

  /* ── Empty ── */
  if (!proposals || proposals.length === 0) {
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
            style={{
              color: "rgba(251,247,243,0.55)",
              fontFamily: "var(--font-space-grotesk)",
            }}
          >
            No proposals yet
          </p>
          <p
            className="mt-1 text-[12.5px]"
            style={{
              color: "rgba(251,247,243,0.28)",
              fontFamily: "var(--font-inter)",
            }}
          >
            Generate your first proposal and it will appear here.
          </p>
        </div>
      </div>
    );
  }

  /* ── Data ── */
  return (
    <div className="space-y-4">
      {/* Metric cards — always shown */}
      <ProposalMetrics proposals={proposals} />

      {/* Desktop table */}
      <div className="hidden md:block">
        <ProposalsTable proposals={proposals} />
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {proposals.map((proposal) => (
          <ProposalCard key={proposal.id} proposal={proposal} />
        ))}
      </div>
    </div>
  );
}
