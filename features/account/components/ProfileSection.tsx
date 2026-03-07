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
import { SectionCard, SectionHeader, fieldClass, FieldError } from "./shared";

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
          <label className="block text-[12px] font-medium mb-1.5 text-muted-foreground">
            Display name
          </label>
          <input
            {...register("fullName")}
            placeholder="Your name"
            className={`${fieldClass(!!errors.fullName)} h-9`}
          />
          <FieldError msg={errors.fullName?.message} />
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="block text-[12px] font-medium mb-1.5 text-muted-foreground">
            Email
          </label>
          <div className="w-full h-9 px-3.5 rounded-lg text-[13px] flex items-center bg-muted border border-border text-muted-foreground">
            {email}
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground/60">
            Email is managed by your auth provider and cannot be changed here.
          </p>
        </div>

        {/* Member since */}
        <div className="flex items-center justify-between py-3 px-3.5 rounded-lg bg-muted border border-border">
          <span className="text-[12px] text-muted-foreground">Member since</span>
          <span className="text-[12px] font-medium text-text-secondary">
            {format(new Date(createdAt), "MMMM d, yyyy")}
          </span>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!isDirty || updateName.isPending}
            className={`inline-flex items-center gap-1.5 h-8 px-4 rounded-lg text-[12.5px] font-semibold font-heading transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed ${
              saved
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-primary text-primary-foreground hover:bg-primary-hover"
            }`}
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
