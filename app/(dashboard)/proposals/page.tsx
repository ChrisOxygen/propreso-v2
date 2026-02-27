import { ProposalsList } from "@/features/proposals/components/ProposalsList";

export default function ProposalsPage() {
  return (
    <div className="min-h-screen" style={{ background: "#0E0E0F" }}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1
            className="text-[1.5rem] font-bold tracking-[-0.03em]"
            style={{
              color: "#FBF7F3",
              fontFamily: "var(--font-space-grotesk)",
            }}
          >
            Proposals
          </h1>
          <p
            className="mt-1 text-[13px]"
            style={{
              color: "rgba(251,247,243,0.38)",
              fontFamily: "var(--font-inter)",
            }}
          >
            Track outcomes for every proposal you&apos;ve sent.
          </p>
        </div>
        <ProposalsList />
      </div>
    </div>
  );
}
