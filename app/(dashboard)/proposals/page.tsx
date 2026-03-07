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
    <div className="p-2">
      {/* Page header */}
      <div className="flex items-start flex-col sm:flex-row justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[1.35rem] font-bold tracking-[-0.03em] text-foreground font-heading">
            Proposals
          </h1>
          <p className="mt-0.5 text-[13px] text-muted-foreground">
            Track outcomes for every proposal you&apos;ve sent.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {process.env.NODE_ENV !== "production" && <SeedButton />}
          <Link
            href="/generate"
            className="flex items-center gap-1.5 h-9 px-4 rounded-lg text-[13px] font-semibold transition-colors duration-150 bg-primary text-primary-foreground hover:bg-primary-hover"
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
