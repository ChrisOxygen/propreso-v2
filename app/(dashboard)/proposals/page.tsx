import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import {
  ProposalsView,
  ProposalsViewSkeleton,
} from "@/features/proposals/components/ProposalsView";
import { SeedButton } from "@/features/proposals/components/SeedButton";

export default function ProposalsPage() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1
            className="text-[1.35rem] font-bold tracking-[-0.03em]"
            style={{ color: "#FBF7F3", fontFamily: "var(--font-space-grotesk)" }}
          >
            Proposals
          </h1>
          <p
            className="mt-0.5 text-[13px]"
            style={{
              color: "rgba(251,247,243,0.38)",
              fontFamily: "var(--font-inter)",
            }}
          >
            Track outcomes for every proposal you&apos;ve sent.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {process.env.NODE_ENV !== "production" && <SeedButton />}
          <Link
            href="/generate"
            className="flex items-center gap-1.5 h-9 px-4 rounded-lg text-[13px] font-semibold transition-colors duration-150 hover:opacity-90"
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

      {/* Metrics + list/table — Suspense required because ProposalsView uses useSearchParams */}
      <Suspense fallback={<ProposalsViewSkeleton />}>
        <ProposalsView />
      </Suspense>
    </div>
  );
}
