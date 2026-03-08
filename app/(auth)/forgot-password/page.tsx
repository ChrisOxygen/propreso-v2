"use client";

import Link from "next/link";
import { Loader2, MailCheck } from "lucide-react";
import { useForgotPassword } from "@/features/auth/hooks/use-forgot-password";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

export default function ForgotPasswordPage() {
  const { form, onSubmit, isPending, error, sent } = useForgotPassword();

  const {
    register,
    formState: { errors },
  } = form;

  if (sent) {
    return (
      <div className="animate-fade-up">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent mb-5">
          <MailCheck size={22} className="text-primary" />
        </div>
        <h1 className="text-[2rem] font-bold tracking-[-0.035em] leading-[1.1] text-foreground">
          Check your email
        </h1>
        <p className="mt-3 text-[13.5px] text-muted-foreground leading-relaxed">
          We sent a password reset link to{" "}
          <span className="font-medium text-foreground">
            {form.getValues("email")}
          </span>
          . The link expires in 1 hour.
        </p>
        <p className="mt-5 text-[13px] text-muted-foreground">
          Didn&apos;t receive it?{" "}
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="text-primary underline underline-offset-2 hover:text-primary-hover transition-colors duration-150"
          >
            Try again
          </button>
        </p>
        <div className="mt-6">
          <Link
            href="/sign-in"
            className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            ← Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      {/* Heading */}
      <h1 className="text-[2rem] font-bold tracking-[-0.035em] leading-[1.1] text-foreground">
        Forgot password?
      </h1>

      {/* Subtitle */}
      <p className="mt-2.5 text-[13.5px] text-muted-foreground leading-relaxed">
        Enter your email and we&apos;ll send you a link to reset your password.
      </p>

      {/* Error banner */}
      {error && (
        <div className="mt-5 rounded-lg px-4 py-3 text-[13px] bg-error-subtle border border-destructive/20 text-destructive">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={onSubmit} className="mt-7 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-[12px] font-medium text-text-secondary">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register("email")}
            className="h-11 text-[13.5px] bg-card border-[1.5px] border-border text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/12 rounded-[10px] transition-colors"
          />
          {errors.email && (
            <p className="text-[11px] text-destructive">{errors.email.message}</p>
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
              Sending…
            </span>
          ) : (
            "Send reset link"
          )}
        </button>
      </form>

      <div className="mt-6">
        <Link
          href="/sign-in"
          className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-150"
        >
          ← Back to sign in
        </Link>
      </div>
    </div>
  );
}
