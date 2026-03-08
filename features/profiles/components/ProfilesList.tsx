"use client";

import Link from "next/link";
import { Plus, UserCircle2 } from "lucide-react";
import { useProfiles } from "@/features/profiles/hooks/use-profiles";
import { ProfileCard } from "@/features/profiles/components/ProfileCard";
import { FREE_PROFILE_LIMIT } from "@/features/billing/constants/plans";

export function ProfilesList() {
  const { data: profiles, isPending, isError } = useProfiles();

  if (isPending) {
    return (
      <div className="space-y-5">
        {/* Usage indicator skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-3 rounded w-32 animate-pulse bg-muted" />
          <div className="flex items-center gap-1.5">
            {[0, 1].map((i) => (
              <span
                key={i}
                className="w-5 h-1.5 rounded-full animate-pulse bg-muted"
              />
            ))}
          </div>
        </div>

        {/* Card skeletons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="rounded-xl p-5 animate-pulse bg-card border border-border"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="h-5 rounded w-32 bg-muted" />
                <div className="h-5 rounded-full w-16 bg-muted" />
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-3 rounded w-full bg-muted" />
                <div className="h-3 rounded w-3/4 bg-muted" />
              </div>
              <div className="flex gap-1.5">
                {[0, 1, 2].map((j) => (
                  <div key={j} className="h-5 rounded w-12 bg-muted" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl px-5 py-10 text-center bg-card border border-border">
        <p className="text-[13px] text-muted-foreground">
          Failed to load profiles. Please refresh.
        </p>
      </div>
    );
  }

  const atLimit = profiles.length >= FREE_PROFILE_LIMIT;

  return (
    <div className="space-y-5">
      {/* Usage indicator */}
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-muted-foreground">
          {profiles.length} of {FREE_PROFILE_LIMIT} profiles used
        </span>

        {/* Progress dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: FREE_PROFILE_LIMIT }).map((_, i) => (
            <span
              key={i}
              className={`w-5 h-1.5 rounded-full transition-colors duration-300 ${
                i < profiles.length ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Profile cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            totalProfiles={profiles.length}
          />
        ))}

        {/* Add profile slot */}
        {!atLimit ? (
          <Link
            href="/profiles/new"
            className="flex flex-col items-center justify-center rounded-xl p-5 transition-all duration-200 min-h-35 group bg-card border border-dashed border-border hover:border-border-strong hover:bg-accent"
          >
            <span className="w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-colors duration-200 bg-accent border border-border-strong group-hover:bg-primary/10 group-hover:border-primary/30">
              <Plus size={15} className="text-primary" />
            </span>
            <span className="text-[12.5px] font-medium text-muted-foreground">
              Add Profile
            </span>
          </Link>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl p-5 min-h-35 bg-card border border-dashed border-border">
            <UserCircle2 size={22} className="mb-2 text-border-strong" />
            <span className="text-[12px] font-medium mb-0.5 text-muted-foreground">
              Profile limit reached
            </span>
            <span className="text-[11px] text-muted-foreground/60">
              Upgrade to Pro for unlimited profiles
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
