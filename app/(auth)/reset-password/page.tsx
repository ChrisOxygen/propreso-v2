"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useResetPassword } from "@/features/auth/hooks/use-reset-password";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

export default function ResetPasswordPage() {
  const { form, onSubmit, isPending, error } = useResetPassword();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="animate-fade-up">
      {/* Heading */}
      <h1 className="text-[2rem] font-bold tracking-[-0.035em] leading-[1.1] text-foreground">
        Set new password
      </h1>

      {/* Subtitle */}
      <p className="mt-2.5 text-[13.5px] text-muted-foreground">
        Choose a strong password for your account.
      </p>

      {/* Error banner */}
      {error && (
        <div className="mt-5 rounded-lg px-4 py-3 text-[13px] bg-error-subtle border border-destructive/20 text-destructive">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={onSubmit} className="mt-7 space-y-4">
        {/* New password */}
        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-[12px] font-medium text-text-secondary">
            New password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              autoComplete="new-password"
              {...register("password")}
              className="h-11 pr-10 text-[13.5px] bg-card border-[1.5px] border-border text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/12 rounded-[10px] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors duration-150"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-[11px] text-destructive">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm password */}
        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword" className="text-[12px] font-medium text-text-secondary">
            Confirm password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              {...register("confirmPassword")}
              className="h-11 pr-10 text-[13.5px] bg-card border-[1.5px] border-border text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/12 rounded-[10px] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors duration-150"
              tabIndex={-1}
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-[11px] text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full h-12 text-[15px] font-semibold tracking-[-0.01em] rounded-[10px] mt-1 bg-primary hover:bg-primary-hover active:bg-primary-active text-primary-foreground transition-colors duration-150 disabled:opacity-60 [font-family:var(--font-space-grotesk)]"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={14} className="animate-spin" />
              Updating…
            </span>
          ) : (
            "Update password"
          )}
        </button>
      </form>
    </div>
  );
}
