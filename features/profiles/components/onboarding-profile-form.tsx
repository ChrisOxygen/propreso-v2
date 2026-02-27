"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Briefcase, Sparkles, BookOpen } from "lucide-react";
import Image from "next/image";
import {
  ZCreateProfileSchema,
  type ZCreateProfile,
} from "@/features/profiles/schemas/profile-schemas";
import { useCreateProfile } from "@/features/profiles/hooks/use-create-profile";

const STEPS = [
  { id: 1, label: "Identity" },
  { id: 2, label: "Skills" },
  { id: 3, label: "Experience" },
];

const TONES = [
  {
    value: "PROFESSIONAL" as const,
    label: "Professional",
    description: "Formal & polished",
  },
  {
    value: "CONVERSATIONAL" as const,
    label: "Conversational",
    description: "Friendly & approachable",
  },
  {
    value: "CONFIDENT" as const,
    label: "Confident",
    description: "Bold & direct",
  },
  {
    value: "FRIENDLY" as const,
    label: "Friendly",
    description: "Warm & personable",
  },
];

export function OnboardingProfileForm() {
  const [step, setStep] = useState(1);
  const mutation = useCreateProfile();

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ZCreateProfile>({
    resolver: zodResolver(ZCreateProfileSchema),
    defaultValues: {
      tone: "PROFESSIONAL",
      portfolioLinks: [],
    },
  });

  const toneValue = watch("tone");
  const skillsValue = watch("skillsSummary") ?? "";
  const experienceValue = watch("experienceSummary") ?? "";

  const goNext = async () => {
    const fieldsPerStep: Record<number, (keyof ZCreateProfile)[]> = {
      1: ["name", "tone"],
      2: ["skillsSummary"],
    };
    const valid = await trigger(fieldsPerStep[step]);
    if (valid) setStep((s) => s + 1);
  };

  const onSubmit = handleSubmit((data) => mutation.mutate(data));

  return (
    <div className="animate-fade-up">
      {/* Brand mark */}
      <div className="flex items-center gap-2.5 mb-10">
        <div
          className="w-8 h-8 rounded-[7px] flex items-center justify-center shrink-0"
          style={{
            background: "linear-gradient(135deg, #C8491A 0%, #E06030 100%)",
            boxShadow: "0 0 18px rgba(200,73,26,0.4)",
          }}
        >
          <Image
            src="/assets/site-icon-white.svg"
            alt="Propreso"
            width={11}
            height={14}
          />
        </div>
        <span
          className="text-[15px] font-semibold tracking-[-0.02em]"
          style={{ color: "#FBF7F3", fontFamily: "var(--font-space-grotesk)" }}
        >
          Propreso
        </span>
      </div>

      {/* Step indicators */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s) => (
          <div key={s.id} className="flex items-center gap-2">
            <div
              className="flex items-center gap-1.5 transition-all duration-300"
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold transition-all duration-300"
                style={{
                  background:
                    step === s.id
                      ? "linear-gradient(135deg, #C8491A, #E06030)"
                      : step > s.id
                        ? "rgba(200,73,26,0.3)"
                        : "rgba(255,255,255,0.06)",
                  color:
                    step >= s.id
                      ? "#FBF7F3"
                      : "rgba(251,247,243,0.3)",
                  boxShadow:
                    step === s.id ? "0 0 10px rgba(200,73,26,0.5)" : "none",
                }}
              >
                {step > s.id ? "✓" : s.id}
              </div>
              <span
                className="text-[11px] font-medium hidden sm:block"
                style={{
                  color:
                    step === s.id
                      ? "rgba(251,247,243,0.7)"
                      : "rgba(251,247,243,0.25)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {s.label}
              </span>
            </div>
            {s.id < STEPS.length && (
              <div
                className="w-8 h-px transition-all duration-500"
                style={{
                  background:
                    step > s.id
                      ? "rgba(200,73,26,0.4)"
                      : "rgba(255,255,255,0.08)",
                }}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit}>
        {/* ── Step 1: Identity ── */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Briefcase size={13} style={{ color: "#C8491A" }} />
                <span
                  className="text-[11px] font-semibold uppercase tracking-widest"
                  style={{
                    color: "rgba(200,73,26,0.8)",
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                >
                  Step 1 of 3
                </span>
              </div>
              <h1
                className="text-[1.85rem] font-bold tracking-[-0.035em] leading-[1.15]"
                style={{
                  color: "#FBF7F3",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                What kind of freelancer are you?
              </h1>
              <p
                className="mt-2 text-[13.5px] leading-relaxed"
                style={{
                  color: "rgba(251,247,243,0.4)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                This becomes the name of your profile — be specific.
              </p>
            </div>

            {/* Profile name */}
            <div className="space-y-1.5">
              <label
                className="text-[12px] font-medium"
                style={{
                  color: "rgba(251,247,243,0.55)",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                Profile name
              </label>
              <input
                {...register("name")}
                placeholder="e.g. Full-Stack Developer, Shopify Expert…"
                className="w-full h-11 px-3.5 rounded-lg text-[13.5px] outline-none transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: errors.name
                    ? "1px solid rgba(200,73,26,0.5)"
                    : "1px solid rgba(255,255,255,0.1)",
                  color: "#FBF7F3",
                  fontFamily: "var(--font-inter)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(200,73,26,0.5)";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(200,73,26,0.1)";
                }}
                onBlur={(e) => {
                  if (!errors.name) {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              />
              {errors.name && (
                <p
                  className="text-[11px]"
                  style={{ color: "#F5A070", fontFamily: "var(--font-inter)" }}
                >
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Tone selector */}
            <div className="space-y-2">
              <label
                className="text-[12px] font-medium"
                style={{
                  color: "rgba(251,247,243,0.55)",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                Default proposal tone
              </label>
              <div className="grid grid-cols-2 gap-2">
                {TONES.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setValue("tone", t.value)}
                    className="p-3 rounded-lg text-left transition-all duration-150"
                    style={{
                      background:
                        toneValue === t.value
                          ? "rgba(200,73,26,0.12)"
                          : "rgba(255,255,255,0.03)",
                      border:
                        toneValue === t.value
                          ? "1px solid rgba(200,73,26,0.4)"
                          : "1px solid rgba(255,255,255,0.07)",
                      boxShadow:
                        toneValue === t.value
                          ? "0 0 12px rgba(200,73,26,0.1)"
                          : "none",
                    }}
                  >
                    <p
                      className="text-[12.5px] font-semibold"
                      style={{
                        color:
                          toneValue === t.value
                            ? "#E08060"
                            : "rgba(251,247,243,0.7)",
                        fontFamily: "var(--font-space-grotesk)",
                      }}
                    >
                      {t.label}
                    </p>
                    <p
                      className="text-[11px] mt-0.5"
                      style={{
                        color: "rgba(251,247,243,0.35)",
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      {t.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={goNext}
              className="w-full h-11 flex items-center justify-center gap-2 rounded-lg text-[14px] font-semibold tracking-[-0.01em] transition-all duration-200 mt-2"
              style={{
                background: "linear-gradient(135deg, #C8491A 0%, #D45820 100%)",
                color: "#fff",
                boxShadow: "0 0 28px rgba(200,73,26,0.35), 0 2px 8px rgba(0,0,0,0.25)",
                fontFamily: "var(--font-space-grotesk)",
              }}
            >
              Continue
              <ArrowRight size={15} />
            </button>
          </div>
        )}

        {/* ── Step 2: Skills ── */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={13} style={{ color: "#C8491A" }} />
                <span
                  className="text-[11px] font-semibold uppercase tracking-widest"
                  style={{
                    color: "rgba(200,73,26,0.8)",
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                >
                  Step 2 of 3
                </span>
              </div>
              <h1
                className="text-[1.85rem] font-bold tracking-[-0.035em] leading-[1.15]"
                style={{
                  color: "#FBF7F3",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                What are your core skills?
              </h1>
              <p
                className="mt-2 text-[13.5px] leading-relaxed"
                style={{
                  color: "rgba(251,247,243,0.4)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                This is fed directly into every proposal we generate — be
                specific and honest.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  className="text-[12px] font-medium"
                  style={{
                    color: "rgba(251,247,243,0.55)",
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                >
                  Skills summary
                </label>
                <span
                  className="text-[11px]"
                  style={{
                    color:
                      skillsValue.length > 900
                        ? "#F5A070"
                        : "rgba(251,247,243,0.25)",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {skillsValue.length} / 1000
                </span>
              </div>
              <textarea
                {...register("skillsSummary")}
                rows={6}
                placeholder="e.g. 5 years of React, Next.js, TypeScript, Node.js. Strong in REST API design and PostgreSQL. Experience with AWS and Vercel deployments…"
                className="w-full px-3.5 py-3 rounded-lg text-[13.5px] outline-none transition-all duration-200 resize-none"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: errors.skillsSummary
                    ? "1px solid rgba(200,73,26,0.5)"
                    : "1px solid rgba(255,255,255,0.1)",
                  color: "#FBF7F3",
                  fontFamily: "var(--font-inter)",
                  lineHeight: "1.6",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(200,73,26,0.5)";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(200,73,26,0.1)";
                }}
                onBlur={(e) => {
                  if (!errors.skillsSummary) {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              />
              {errors.skillsSummary && (
                <p
                  className="text-[11px]"
                  style={{ color: "#F5A070", fontFamily: "var(--font-inter)" }}
                >
                  {errors.skillsSummary.message}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="h-11 px-5 rounded-lg text-[13.5px] font-medium transition-all duration-150"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(251,247,243,0.5)",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                Back
              </button>
              <button
                type="button"
                onClick={goNext}
                className="flex-1 h-11 flex items-center justify-center gap-2 rounded-lg text-[14px] font-semibold tracking-[-0.01em] transition-all duration-200"
                style={{
                  background:
                    "linear-gradient(135deg, #C8491A 0%, #D45820 100%)",
                  color: "#fff",
                  boxShadow:
                    "0 0 28px rgba(200,73,26,0.35), 0 2px 8px rgba(0,0,0,0.25)",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                Continue
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Experience ── */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BookOpen size={13} style={{ color: "#C8491A" }} />
                <span
                  className="text-[11px] font-semibold uppercase tracking-widest"
                  style={{
                    color: "rgba(200,73,26,0.8)",
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                >
                  Step 3 of 3
                </span>
              </div>
              <h1
                className="text-[1.85rem] font-bold tracking-[-0.035em] leading-[1.15]"
                style={{
                  color: "#FBF7F3",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                Tell us about your experience
              </h1>
              <p
                className="mt-2 text-[13.5px] leading-relaxed"
                style={{
                  color: "rgba(251,247,243,0.4)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                Highlight your background, notable projects, and what makes you
                the right hire.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  className="text-[12px] font-medium"
                  style={{
                    color: "rgba(251,247,243,0.55)",
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                >
                  Experience summary
                </label>
                <span
                  className="text-[11px]"
                  style={{
                    color:
                      experienceValue.length > 900
                        ? "#F5A070"
                        : "rgba(251,247,243,0.25)",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {experienceValue.length} / 1000
                </span>
              </div>
              <textarea
                {...register("experienceSummary")}
                rows={6}
                placeholder="e.g. 6 years building SaaS products. Led frontend at a Series A startup (2020–2023). Delivered 20+ Upwork projects with a 98% JSS. Specialise in performance-critical React apps…"
                className="w-full px-3.5 py-3 rounded-lg text-[13.5px] outline-none transition-all duration-200 resize-none"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: errors.experienceSummary
                    ? "1px solid rgba(200,73,26,0.5)"
                    : "1px solid rgba(255,255,255,0.1)",
                  color: "#FBF7F3",
                  fontFamily: "var(--font-inter)",
                  lineHeight: "1.6",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(200,73,26,0.5)";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(200,73,26,0.1)";
                }}
                onBlur={(e) => {
                  if (!errors.experienceSummary) {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              />
              {errors.experienceSummary && (
                <p
                  className="text-[11px]"
                  style={{ color: "#F5A070", fontFamily: "var(--font-inter)" }}
                >
                  {errors.experienceSummary.message}
                </p>
              )}
            </div>

            {mutation.error && (
              <div
                className="rounded-lg px-4 py-3 text-[13px]"
                style={{
                  background: "rgba(200,73,26,0.12)",
                  border: "1px solid rgba(200,73,26,0.25)",
                  color: "#F5A070",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {mutation.error.message === "profile_limit_reached"
                  ? "You've reached the free plan limit of 2 profiles."
                  : "Something went wrong. Please try again."}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="h-11 px-5 rounded-lg text-[13.5px] font-medium transition-all duration-150"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(251,247,243,0.5)",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="flex-1 h-11 flex items-center justify-center gap-2 rounded-lg text-[14px] font-semibold tracking-[-0.01em] transition-all duration-200"
                style={{
                  background: mutation.isPending
                    ? "rgba(200,73,26,0.6)"
                    : "linear-gradient(135deg, #C8491A 0%, #D45820 100%)",
                  color: "#fff",
                  boxShadow: mutation.isPending
                    ? "none"
                    : "0 0 28px rgba(200,73,26,0.35), 0 2px 8px rgba(0,0,0,0.25)",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Creating profile…
                  </>
                ) : (
                  <>
                    Finish setup
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
