"use client";

import { useRouter } from "next/navigation";
import { OnboardingProfileForm } from "@/features/profiles/components/onboarding-profile-form";

export default function NewProfilePage() {
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 py-16">
      <div className="relative w-full max-w-md">
        <OnboardingProfileForm onSuccess={() => router.push("/profiles")} />
      </div>
    </div>
  );
}
