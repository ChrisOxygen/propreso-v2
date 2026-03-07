"use client";

import { ChevronDown, Zap, UserCircle2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { FreelancerProfileModel } from "@/shared/lib/generated/prisma/models";

interface ProfileSelectProps {
  profiles: FreelancerProfileModel[];
  value: string;
  onChange: (id: string) => void;
  error?: string;
}

export function ProfileSelect({
  profiles,
  value,
  onChange,
  error,
}: ProfileSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = profiles.find((p) => p.id === value);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between gap-2 h-10 px-3.5 rounded-lg text-[13px] transition-all duration-150 bg-background border outline-none ${
          error
            ? "border-destructive"
            : open
            ? "border-primary ring-2 ring-primary/10"
            : "border-border hover:border-border-strong"
        } ${selected ? "text-foreground" : "text-muted-foreground"}`}
      >
        <span className="flex items-center gap-2 min-w-0">
          <UserCircle2 size={14} className="text-muted-foreground shrink-0" />
          <span className="truncate">
            {selected ? selected.name : "Select a profile…"}
          </span>
          {selected?.isDefault && (
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold shrink-0 bg-accent border border-primary/20 text-primary">
              <Zap size={8} strokeWidth={2.5} />
              DEFAULT
            </span>
          )}
        </span>
        <ChevronDown
          size={14}
          className={`text-muted-foreground shrink-0 transition-transform duration-150 ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1.5 rounded-lg overflow-hidden z-20 bg-card border border-border shadow-lg">
          {profiles.length === 0 ? (
            <div className="px-4 py-3 text-[12.5px] text-muted-foreground">
              No profiles yet. Create one first.
            </div>
          ) : (
            profiles.map((profile) => (
              <button
                type="button"
                key={profile.id}
                onClick={() => {
                  onChange(profile.id);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-left transition-colors duration-100 hover:bg-accent ${
                  profile.id === value ? "bg-accent/60" : ""
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium truncate text-foreground">
                      {profile.name}
                    </span>
                    {profile.isDefault && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold shrink-0 bg-accent border border-primary/20 text-primary">
                        <Zap size={8} strokeWidth={2.5} />
                        DEFAULT
                      </span>
                    )}
                  </div>
                  <p className="text-[11.5px] truncate mt-0.5 text-muted-foreground">
                    {profile.skills.slice(0, 3).join(", ")}
                    {profile.skills.length > 3 &&
                      ` +${profile.skills.length - 3} more`}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      )}

      {error && (
        <p className="mt-1.5 text-[11.5px] text-destructive">{error}</p>
      )}
    </div>
  );
}
