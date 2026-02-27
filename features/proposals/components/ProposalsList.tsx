"use client";

import { FileText } from "lucide-react";
import { useProposals } from "@/features/proposals/hooks/use-proposals";
import { ProposalCard } from "./ProposalCard";

function ProposalCardSkeleton() {
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

export function ProposalsList() {
  const { data: proposals, isPending, isError } = useProposals();

  if (isPending) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <ProposalCardSkeleton key={i} />
        ))}
      </div>
    );
  }

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

  if (!proposals || proposals.length === 0) {
    return (
      <div
        className="rounded-xl px-6 py-12 flex flex-col items-center gap-3 text-center"
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

  return (
    <div className="space-y-3">
      {proposals.map((proposal) => (
        <ProposalCard key={proposal.id} proposal={proposal} />
      ))}
    </div>
  );
}
