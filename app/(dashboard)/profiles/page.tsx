import { ProfilesList } from "@/features/profiles/components/ProfilesList";

export const metadata = { title: "Profiles — Propreso" };

export default function ProfilesPage() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-6">
        <h1
          className="text-[1.35rem] font-bold tracking-[-0.03em]"
          style={{
            color: "#FBF7F3",
            fontFamily: "var(--font-space-grotesk)",
          }}
        >
          Profiles
        </h1>
        <p
          className="mt-0.5 text-[13px]"
          style={{
            color: "rgba(251,247,243,0.38)",
            fontFamily: "var(--font-inter)",
          }}
        >
          Each profile tailors your proposals to a specific niche or role.
        </p>
      </div>

      <ProfilesList />
    </div>
  );
}
