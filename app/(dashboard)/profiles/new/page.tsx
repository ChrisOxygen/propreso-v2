"use client";

import { useRouter } from "next/navigation";
import { OnboardingProfileForm } from "@/features/profiles/components/onboarding-profile-form";

export default function NewProfilePage() {
  const router = useRouter();

  return (
    <div
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 py-16"
    >
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 60% 50%, rgba(200,73,26,0.05) 0%, transparent 70%)",
        }}
      />
      <div className="relative w-full max-w-md">
        <OnboardingProfileForm onSuccess={() => router.push("/profiles")} />
      </div>
    </div>
  );
}
