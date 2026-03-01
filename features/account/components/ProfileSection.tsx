"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Check } from "lucide-react";
import { format } from "date-fns";
import {
  ZUpdateDisplayNameSchema,
  type ZUpdateDisplayName,
} from "@/features/account/schemas/account-schema";
import { useUpdateDisplayName } from "@/features/account/hooks/use-update-display-name";
import { SectionCard, SectionHeader, inputStyle, FieldError } from "./shared";

interface ProfileSectionProps {
  email: string;
  fullName: string | null;
  createdAt: string;
}

export function ProfileSection({ email, fullName, createdAt }: ProfileSectionProps) {
  const updateName = useUpdateDisplayName();
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ZUpdateDisplayName>({
    resolver: zodResolver(ZUpdateDisplayNameSchema),
    defaultValues: { fullName: fullName ?? "" },
  });

  async function onSubmit(data: ZUpdateDisplayName) {
    try {
      await updateName.mutateAsync(data.fullName);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      toast.success("Name updated.");
    } catch {
      toast.error("Failed to update name. Please try again.");
    }
  }

  return (
    <SectionCard>
      <SectionHeader
        title="Profile"
        description="Your display name shown across the app."
      />
      <form onSubmit={handleSubmit(onSubmit)} className="p-5 flex flex-col gap-4">
        {/* Display name */}
        <div>
          <label
            className="block text-[12px] font-medium mb-1.5"
            style={{ color: "rgba(251,247,243,0.45)" }}
          >
            Display name
          </label>
          <input
            {...register("fullName")}
            placeholder="Your name"
            className="w-full h-9 px-3.5 rounded-lg text-[13px] transition-all duration-150"
            style={inputStyle(!!errors.fullName)}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(200,73,26,0.5)";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(200,73,26,0.08)";
            }}
            onBlur={(e) => {
              if (!errors.fullName) {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                e.currentTarget.style.boxShadow = "none";
              }
            }}
          />
          <FieldError msg={errors.fullName?.message} />
        </div>

        {/* Email (read-only) */}
        <div>
          <label
            className="block text-[12px] font-medium mb-1.5"
            style={{ color: "rgba(251,247,243,0.45)" }}
          >
            Email
          </label>
          <div
            className="w-full h-9 px-3.5 rounded-lg text-[13px] flex items-center"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(251,247,243,0.4)",
            }}
          >
            {email}
          </div>
          <p className="mt-1 text-[11px]" style={{ color: "rgba(251,247,243,0.25)" }}>
            Email is managed by your auth provider and cannot be changed here.
          </p>
        </div>

        {/* Member since */}
        <div
          className="flex items-center justify-between py-3 px-3.5 rounded-lg"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span className="text-[12px]" style={{ color: "rgba(251,247,243,0.35)" }}>
            Member since
          </span>
          <span className="text-[12px] font-medium" style={{ color: "rgba(251,247,243,0.55)" }}>
            {format(new Date(createdAt), "MMMM d, yyyy")}
          </span>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!isDirty || updateName.isPending}
            className="inline-flex items-center gap-1.5 h-8 px-4 rounded-lg text-[12.5px] font-semibold transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: saved
                ? "rgba(34,197,94,0.12)"
                : "linear-gradient(135deg, #C8491A 0%, #D45820 100%)",
              border: saved ? "1px solid rgba(34,197,94,0.25)" : "none",
              color: saved ? "rgba(34,197,94,0.9)" : "#fff",
              boxShadow: updateName.isPending || saved ? "none" : "0 0 12px rgba(200,73,26,0.25)",
              fontFamily: "var(--font-space-grotesk)",
            }}
          >
            {updateName.isPending ? (
              <Loader2 size={12} className="animate-spin" />
            ) : saved ? (
              <Check size={12} />
            ) : null}
            {updateName.isPending ? "Saving…" : saved ? "Saved" : "Save changes"}
          </button>
        </div>
      </form>
    </SectionCard>
  );
}
