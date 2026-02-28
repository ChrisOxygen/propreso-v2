import { ProposalsViewSkeleton } from "@/features/proposals/components/ProposalsView";

// Shown immediately when navigating to /proposals before the page shell renders
export default function ProposalsLoading() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div
            className="h-7 rounded-lg w-28 animate-pulse"
            style={{ background: "rgba(255,255,255,0.07)" }}
          />
          <div
            className="h-3 rounded w-52 mt-2 animate-pulse"
            style={{ background: "rgba(255,255,255,0.04)" }}
          />
        </div>
        <div
          className="h-9 rounded-lg w-32 shrink-0 animate-pulse"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
      </div>

      <ProposalsViewSkeleton />
    </div>
  );
}
