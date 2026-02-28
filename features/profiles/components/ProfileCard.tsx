"use client";

import { useState } from "react";
import { MoreHorizontal, Star, Pencil, Trash2, Zap } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import type { FreelancerProfileModel } from "@/shared/lib/generated/prisma/models";
import { useSetDefaultProfile } from "@/features/profiles/hooks/use-set-default-profile";
import { DeleteProfileDialog } from "@/features/profiles/components/DeleteProfileDialog";
import { EditProfileSheet } from "@/features/profiles/components/EditProfileSheet";

const MAX_VISIBLE_SKILLS = 5;

interface ProfileCardProps {
  profile: FreelancerProfileModel;
  totalProfiles: number;
}

export function ProfileCard({ profile, totalProfiles }: ProfileCardProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const setDefault = useSetDefaultProfile();

  const visibleSkills = profile.skills.slice(0, MAX_VISIBLE_SKILLS);
  const overflowCount = profile.skills.length - MAX_VISIBLE_SKILLS;

  return (
    <>
      <div
        className="group relative flex flex-col rounded-xl p-5 transition-all duration-200"
        style={{
          background: profile.isDefault
            ? "rgba(200,73,26,0.07)"
            : "rgba(255,255,255,0.03)",
          border: profile.isDefault
            ? "1px solid rgba(200,73,26,0.25)"
            : "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <h3
              className="text-[14px] font-semibold truncate"
              style={{
                color: "#FBF7F3",
                fontFamily: "var(--font-space-grotesk)",
              }}
            >
              {profile.name}
            </h3>
            {profile.isDefault && (
              <span
                className="inline-flex items-center gap-1 shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide"
                style={{
                  background: "rgba(200,73,26,0.18)",
                  color: "#E06030",
                  border: "1px solid rgba(200,73,26,0.3)",
                }}
              >
                <Zap size={9} strokeWidth={2.5} />
                DEFAULT
              </span>
            )}
          </div>

          {/* Actions menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                style={{ color: "rgba(251,247,243,0.5)" }}
              >
                <MoreHorizontal size={15} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-44"
              style={{
                background: "#1A1410",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <DropdownMenuItem
                className="text-[13px] gap-2 cursor-pointer"
                style={{ color: "rgba(251,247,243,0.8)" }}
                onClick={() => setEditOpen(true)}
              >
                <Pencil size={13} />
                Edit
              </DropdownMenuItem>

              {!profile.isDefault && (
                <DropdownMenuItem
                  className="text-[13px] gap-2 cursor-pointer"
                  style={{ color: "rgba(251,247,243,0.8)" }}
                  onClick={() => setDefault.mutate(profile.id)}
                  disabled={setDefault.isPending}
                >
                  <Star size={13} />
                  Set as Default
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator
                style={{ background: "rgba(255,255,255,0.07)" }}
              />

              <DropdownMenuItem
                className="text-[13px] gap-2 cursor-pointer"
                style={{ color: "#E57373" }}
                onClick={() => setDeleteOpen(true)}
                disabled={totalProfiles === 1}
              >
                <Trash2 size={13} />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Bio excerpt */}
        <p
          className="text-[12.5px] leading-[1.6] line-clamp-2 mb-4"
          style={{ color: "rgba(251,247,243,0.45)" }}
        >
          {profile.bio}
        </p>

        {/* Skills chips */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {visibleSkills.map((skill: string) => (
            <span
              key={skill}
              className="px-2 py-0.5 rounded text-[11px] font-medium"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "rgba(251,247,243,0.55)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {skill}
            </span>
          ))}
          {overflowCount > 0 && (
            <span
              className="px-2 py-0.5 rounded text-[11px] font-medium"
              style={{
                background: "rgba(200,73,26,0.1)",
                color: "rgba(200,73,26,0.8)",
                border: "1px solid rgba(200,73,26,0.15)",
              }}
            >
              +{overflowCount} more
            </span>
          )}
        </div>
      </div>

      <DeleteProfileDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        profileId={profile.id}
        profileName={profile.name}
      />

      <EditProfileSheet
        open={editOpen}
        onOpenChange={setEditOpen}
        profile={profile}
      />
    </>
  );
}
