import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import {
  ProposalsView,
  ProposalsViewSkeleton,
} from "@/features/proposals/components/ProposalsView";

export default function ProposalsPage() {
  return (
    <div className="p-2">
      {/* Page header */}

      {/* Metrics + list/table — Suspense required because ProposalsView uses useSearchParams */}
      <Suspense fallback={<ProposalsViewSkeleton />}>
        <ProposalsView />
      </Suspense>
    </div>
  );
}
