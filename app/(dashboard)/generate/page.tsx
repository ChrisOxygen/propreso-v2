import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GenerateView } from "@/features/proposals/components/GenerateView";

export default function GeneratePage() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/proposals"
          className="inline-flex items-center gap-1.5 text-[12px] font-medium mb-4 transition-opacity duration-150 hover:opacity-70"
          style={{ color: "rgba(251,247,243,0.4)" }}
        >
          <ArrowLeft size={13} />
          Proposals
        </Link>
        <h1
          className="text-[1.35rem] font-bold tracking-[-0.03em]"
          style={{
            color: "#FBF7F3",
            fontFamily: "var(--font-space-grotesk)",
          }}
        >
          New Proposal
        </h1>
        <p
          className="mt-0.5 text-[13px]"
          style={{
            color: "rgba(251,247,243,0.38)",
            fontFamily: "var(--font-inter)",
          }}
        >
          Configure your options and paste the job description to generate.
        </p>
      </div>

      <GenerateView />
    </div>
  );
}
