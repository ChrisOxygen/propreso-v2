"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useSignUp } from "@/features/auth/hooks/use-sign-up";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Checkbox } from "@/shared/components/ui/checkbox";

export default function SignUpPage() {
  const { form, onSubmit, isPending, error, signUpWithGoogle } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const termsValue = watch("terms");

  return (
    <div className="animate-fade-up">
      {/* Heading */}
      <h1 className="text-[2rem] font-bold tracking-[-0.035em] leading-[1.1] text-[#1A1412]">
        Create your account
      </h1>

      {/* Subtitle */}
      <p className="mt-2.5 text-[13.5px] text-[#9C8E8A]">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-[#C85438] underline underline-offset-2 hover:text-[#AE4529] transition-colors duration-150"
        >
          Log in
        </Link>
      </p>

      {/* Error banner */}
      {error && (
        <div className="mt-5 rounded-lg px-4 py-3 text-[13px] bg-[#FDECEE] border border-[#C93A4B]/20 text-[#C93A4B]">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={onSubmit} className="mt-7 space-y-4">
        {/* Name row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="firstName" className="text-[12px] font-medium text-[#5A4E4A]">
              First name
            </Label>
            <Input
              id="firstName"
              placeholder="Alex"
              autoComplete="given-name"
              {...register("firstName")}
              className="h-11 text-[13.5px] bg-white border-[1.5px] border-[#EDE7E4] text-[#1A1412] placeholder:text-[#9C8E8A] focus-visible:border-[#C85438] focus-visible:ring-[#C85438]/12 rounded-[10px] transition-colors"
            />
            {errors.firstName && (
              <p className="text-[11px] text-[#C93A4B]">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="lastName" className="text-[12px] font-medium text-[#5A4E4A]">
              Last name
            </Label>
            <Input
              id="lastName"
              placeholder="Rivera"
              autoComplete="family-name"
              {...register("lastName")}
              className="h-11 text-[13.5px] bg-white border-[1.5px] border-[#EDE7E4] text-[#1A1412] placeholder:text-[#9C8E8A] focus-visible:border-[#C85438] focus-visible:ring-[#C85438]/12 rounded-[10px] transition-colors"
            />
            {errors.lastName && (
              <p className="text-[11px] text-[#C93A4B]">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-[12px] font-medium text-[#5A4E4A]">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register("email")}
            className="h-11 text-[13.5px] bg-white border-[1.5px] border-[#EDE7E4] text-[#1A1412] placeholder:text-[#9C8E8A] focus-visible:border-[#C85438] focus-visible:ring-[#C85438]/12 rounded-[10px] transition-colors"
          />
          {errors.email && (
            <p className="text-[11px] text-[#C93A4B]">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-[12px] font-medium text-[#5A4E4A]">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              {...register("password")}
              className="h-11 pr-10 text-[13.5px] bg-white border-[1.5px] border-[#EDE7E4] text-[#1A1412] placeholder:text-[#9C8E8A] focus-visible:border-[#C85438] focus-visible:ring-[#C85438]/12 rounded-[10px] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9C8E8A] hover:text-[#C85438] transition-colors duration-150"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-[11px] text-[#C93A4B]">{errors.password.message}</p>
          )}
        </div>

        {/* Terms checkbox */}
        <div className="flex items-start gap-2.5 pt-0.5">
          <Checkbox
            id="terms"
            checked={termsValue === true}
            onCheckedChange={(checked) => {
              setValue(
                "terms",
                checked === true ? true : (undefined as unknown as true),
                { shouldValidate: true },
              );
            }}
            className="mt-px border-[#EDE7E4] data-[state=checked]:bg-[#C85438] data-[state=checked]:border-[#C85438]"
          />
          <Label htmlFor="terms" className="text-[12.5px] leading-normal cursor-pointer text-[#9C8E8A]">
            I agree to the{" "}
            <Link href="#" className="text-[#C85438] underline underline-offset-2 hover:text-[#AE4529] transition-colors duration-150">
              Terms & Conditions
            </Link>
          </Label>
        </div>
        {errors.terms && (
          <p className="text-[11px] -mt-2 text-[#C93A4B]">{errors.terms.message}</p>
        )}

        {/* Submit CTA */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full h-12 text-[15px] font-semibold tracking-[-0.01em] rounded-[10px] mt-1 bg-[#C85438] hover:bg-[#AE4529] active:bg-[#964020] text-white transition-colors duration-150 disabled:opacity-60 [font-family:var(--font-space-grotesk)]"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={14} className="animate-spin" />
              Creating account…
            </span>
          ) : (
            "Create account"
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 py-1">
          <div className="flex-1 h-px bg-[#EDE7E4]" />
          <span className="text-[11.5px] shrink-0 text-[#9C8E8A]">Or continue with</span>
          <div className="flex-1 h-px bg-[#EDE7E4]" />
        </div>

        {/* Google OAuth */}
        <button
          type="button"
          onClick={signUpWithGoogle}
          className="w-full h-11 flex items-center justify-center gap-2.5 rounded-[10px] text-[13.5px] font-medium bg-white border-[1.5px] border-[#EDE7E4] text-[#1A1412] hover:bg-[#FDF8F6] hover:border-[#C9BCB8] transition-all duration-150 [font-family:var(--font-space-grotesk)]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M15.68 8.18c0-.57-.05-1.11-.14-1.64H8v3.1h4.3a3.67 3.67 0 0 1-1.6 2.41v2h2.6c1.52-1.4 2.38-3.46 2.38-5.87Z" fill="#4285F4" />
            <path d="M8 16c2.16 0 3.97-.71 5.3-1.95l-2.6-2c-.72.48-1.63.77-2.7.77-2.08 0-3.84-1.4-4.47-3.29H.85v2.07A8 8 0 0 0 8 16Z" fill="#34A853" />
            <path d="M3.53 9.53A4.8 4.8 0 0 1 3.28 8c0-.53.09-1.04.25-1.53V4.4H.85A8 8 0 0 0 0 8c0 1.29.31 2.51.85 3.6l2.68-2.07Z" fill="#FBBC05" />
            <path d="M8 3.18c1.17 0 2.22.4 3.05 1.2l2.28-2.28A8 8 0 0 0 8 0 8 8 0 0 0 .85 4.4L3.53 6.47C4.16 4.58 5.92 3.18 8 3.18Z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>
      </form>
    </div>
  );
}
