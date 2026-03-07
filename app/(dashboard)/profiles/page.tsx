import { ProfilesList } from "@/features/profiles/components/ProfilesList";

export const metadata = { title: "Profiles — Propreso" };

export default function ProfilesPage() {
  return (
    <div className="px-2">
      <ProfilesList />
    </div>
  );
}
