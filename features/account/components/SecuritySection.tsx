"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Check, LogOut } from "lucide-react";
import { createClient } from "@/shared/lib/supabase/client";
import {
  ZChangePasswordSchema,
  type ZChangePassword,
} from "@/features/account/schemas/account-schema";
import { SectionCard, SectionHeader, fieldClass, FieldError } from "./shared";

export function SecuritySection() {
  const router = useRouter();
  const [pwSaved, setPwSaved] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ZChangePassword>({
    resolver: zodResolver(ZChangePasswordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  async function onChangePassword(data: ZChangePassword) {
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: data.newPassword });
    if (error) {
      toast.error(error.message ?? "Failed to change password.");
      return;
    }
    reset();
    setPwSaved(true);
    setTimeout(() => setPwSaved(false), 2500);
    toast.success("Password updated.");
  }

  async function handleSignOutAll() {
    setSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut({ scope: "global" });
    router.push("/sign-in");
  }

  return (
    <SectionCard>
      <SectionHeader
        title="Security"
        description="Manage your password and active sessions."
      />
      <div className="p-5 flex flex-col gap-6">
        {/* Change password */}
        <form onSubmit={handleSubmit(onChangePassword)} className="flex flex-col gap-4">
          <p className="text-[12px] font-semibold uppercase tracking-widest text-muted-foreground">
            Change password
          </p>

          <div>
            <label className="block text-[12px] font-medium mb-1.5 text-muted-foreground">
              New password
            </label>
            <input
              {...register("newPassword")}
              type="password"
              placeholder="Min. 8 characters"
              className={`${fieldClass(!!errors.newPassword)} h-9`}
            />
            <FieldError msg={errors.newPassword?.message} />
          </div>

          <div>
            <label className="block text-[12px] font-medium mb-1.5 text-muted-foreground">
              Confirm new password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Repeat your new password"
              className={`${fieldClass(!!errors.confirmPassword)} h-9`}
            />
            <FieldError msg={errors.confirmPassword?.message} />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center gap-1.5 h-8 px-4 rounded-lg text-[12.5px] font-semibold font-heading transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed ${
                pwSaved
                  ? "bg-green-50 border border-green-200 text-green-700"
                  : "bg-primary text-primary-foreground hover:bg-primary-hover"
              }`}
            >
              {isSubmitting ? (
                <Loader2 size={12} className="animate-spin" />
              ) : pwSaved ? (
                <Check size={12} />
              ) : null}
              {isSubmitting ? "Updating…" : pwSaved ? "Updated" : "Update password"}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Sign out all sessions */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[13px] font-medium text-foreground">Sign out everywhere</p>
            <p className="text-[12px] mt-0.5 text-muted-foreground">
              Ends all active sessions across every device.
            </p>
          </div>
          <button
            type="button"
            onClick={handleSignOutAll}
            disabled={signingOut}
            className="shrink-0 inline-flex items-center gap-1.5 h-8 px-3.5 rounded-lg text-[12px] font-medium transition-all duration-150 disabled:opacity-40 bg-muted border border-border text-text-secondary hover:bg-muted/80"
          >
            {signingOut ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <LogOut size={12} />
            )}
            {signingOut ? "Signing out…" : "Sign out all"}
          </button>
        </div>
      </div>
    </SectionCard>
  );
}
