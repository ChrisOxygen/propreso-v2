"use client";

import type { AccountData } from "@/features/account/types";
import { ProfileSection } from "./ProfileSection";
import { UsageSection } from "./UsageSection";
import { SecuritySection } from "./SecuritySection";
import { DangerZoneSection } from "./DangerZoneSection";

export function AccountView({ user, proposalCount, profileCount }: AccountData) {
  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      <ProfileSection
        email={user.email}
        fullName={user.fullName}
        createdAt={user.createdAt}
      />
      <UsageSection
        plan={user.plan}
        proposalCount={proposalCount}
        profileCount={profileCount}
      />
      <SecuritySection />
      <DangerZoneSection />
    </div>
  );
}
