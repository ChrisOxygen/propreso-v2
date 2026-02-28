"use client";

import Link from "next/link";
import { Plus, UserCircle2 } from "lucide-react";
import { useProfiles } from "@/features/profiles/hooks/use-profiles";
import { ProfileCard } from "@/features/profiles/components/ProfileCard";

const FREE_PROFILE_LIMIT = 2;

export function ProfilesList() {
  const { data: profiles, isPending, isError } = useProfiles();

  if (isPending) {
    return (
      <div className="space-y-5">
        {/* Usage indicator skeleton */}
        <div className="flex items-center justify-between">
          <div
            className="h-3 rounded w-32 animate-pulse"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
          <div className="flex items-center gap-1.5">
            {[0, 1].map((i) => (
              <span
                key={i}
                className="w-5 h-1.5 rounded-full animate-pulse"
                style={{ background: "rgba(255,255,255,0.1)" }}
              />
            ))}
          </div>
        </div>

        {/* Card skeletons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="rounded-xl p-5 animate-pulse"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div
                  className="h-5 rounded w-32"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                />
                <div
                  className="h-5 rounded-full w-16"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                />
              </div>
              <div className="space-y-2 mb-4">
                <div
                  className="h-3 rounded w-full"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                />
                <div
                  className="h-3 rounded w-3/4"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                />
              </div>
              <div className="flex gap-1.5">
                {[0, 1, 2].map((j) => (
                  <div
                    key={j}
                    className="h-5 rounded w-12"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  />
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
      <div
        className="rounded-xl px-5 py-10 text-center"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <p className="text-[13px]" style={{ color: "rgba(251,247,243,0.4)" }}>
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
        <span
          className="text-[12px]"
          style={{ color: "rgba(251,247,243,0.35)" }}
        >
          {profiles.length} of {FREE_PROFILE_LIMIT} profiles used
        </span>

        {/* Progress dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: FREE_PROFILE_LIMIT }).map((_, i) => (
            <span
              key={i}
              className="w-5 h-1.5 rounded-full transition-colors duration-300"
              style={{
                background:
                  i < profiles.length
                    ? "#C8491A"
                    : "rgba(255,255,255,0.1)",
              }}
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
            className="flex flex-col items-center justify-center rounded-xl p-5 transition-all duration-200 min-h-[140px] group"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px dashed rgba(255,255,255,0.1)",
            }}
          >
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-colors duration-200 group-hover:opacity-80"
              style={{
                background: "rgba(200,73,26,0.12)",
                border: "1px solid rgba(200,73,26,0.2)",
              }}
            >
              <Plus size={15} style={{ color: "#C8491A" }} />
            </span>
            <span
              className="text-[12.5px] font-medium"
              style={{ color: "rgba(251,247,243,0.35)" }}
            >
              Add Profile
            </span>
          </Link>
        ) : (
          <div
            className="flex flex-col items-center justify-center rounded-xl p-5 min-h-[140px]"
            style={{
              background: "rgba(255,255,255,0.015)",
              border: "1px dashed rgba(255,255,255,0.06)",
            }}
          >
            <UserCircle2
              size={22}
              className="mb-2"
              style={{ color: "rgba(251,247,243,0.15)" }}
            />
            <span
              className="text-[12px] font-medium mb-0.5"
              style={{ color: "rgba(251,247,243,0.25)" }}
            >
              Profile limit reached
            </span>
            <span
              className="text-[11px]"
              style={{ color: "rgba(251,247,243,0.18)" }}
            >
              Upgrade to Pro for unlimited profiles
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
