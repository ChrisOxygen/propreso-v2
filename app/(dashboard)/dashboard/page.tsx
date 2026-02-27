import { SeedButton } from "@/features/proposals/components/SeedButton";

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1
        className="text-[1.5rem] font-bold tracking-[-0.03em] mb-6"
        style={{ color: "#FBF7F3", fontFamily: "var(--font-space-grotesk)" }}
      >
        Dashboard
      </h1>
      {process.env.NODE_ENV !== "production" && <SeedButton />}
    </div>
  );
}
