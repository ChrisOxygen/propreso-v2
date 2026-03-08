"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  Plus,
  Trash2,
  Briefcase,
  Sparkles,
  BookOpen,
  FolderOpen,
} from "lucide-react";
import Image from "next/image";
import {
  ZCreateProfileSchema,
  type ZCreateProfile,
} from "@/features/profiles/schemas/profile-schemas";
import { useCreateProfile } from "@/features/profiles/hooks/use-create-profile";
import { useRoleSkills } from "@/features/profiles/hooks/use-role-skills";
import {
  STEPS,
  POPULAR_ROLES,
  SKELETON_WIDTHS,
  MAX_SKILLS,
} from "@/features/profiles/constants/form";

// ── Shared style helpers ───────────────────────────────────────────────────

const inputBase =
  "w-full px-3.5 rounded-lg text-[13px] outline-none transition-all duration-200";

function fieldBorder(hasError: boolean) {
  return hasError
    ? "1px solid rgba(200,73,26,0.5)"
    : "1px solid rgba(255,255,255,0.1)";
}

// ── Component ─────────────────────────────────────────────────────────────

interface OnboardingProfileFormProps {
  onSuccess?: () => void;
}

export function OnboardingProfileForm({ onSuccess }: OnboardingProfileFormProps = {}) {
  const [step, setStep] = useState(1);
  const [presetRole, setPresetRole] = useState<string | null>(null);
  const [customRole, setCustomRole] = useState("");
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const mutation = useCreateProfile(onSuccess ? { onSuccess } : undefined);
  const skillsQuery = useRoleSkills(activeRole);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<ZCreateProfile>({
    resolver: zodResolver(ZCreateProfileSchema),
    defaultValues: { portfolioItems: [], skills: [] },
  });

  const { fields: portfolioFields, append, remove } = useFieldArray({
    control,
    name: "portfolioItems",
  });

  const bioValue = watch("bio") ?? "";

  // The effective role is the preset or whatever the user typed
  const effectiveRole = presetRole ?? (customRole.trim() || null);

  // ── Handlers ──

  const handlePresetSelect = (label: string) => {
    setPresetRole(label);
    setCustomRole("");
  };

  const handleCustomRoleChange = (value: string) => {
    setCustomRole(value);
    if (value.trim()) setPresetRole(null);
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) => {
      if (prev.includes(skill)) {
        const next = prev.filter((s) => s !== skill);
        setValue("skills", next);
        return next;
      }
      if (prev.length >= MAX_SKILLS) return prev;
      const next = [...prev, skill];
      setValue("skills", next);
      return next;
    });
  };

  const goNext = async () => {
    if (step === 1) {
      if (!effectiveRole) return;
      setValue("name", effectiveRole);
      // Trigger skills fetch before moving — data may be ready by Step 2
      setActiveRole(effectiveRole);
      setSelectedSkills([]);
      setValue("skills", []);
      const valid = await trigger(["name"]);
      if (valid) setStep(2);
      return;
    }
    if (step === 2) {
      setValue("skills", selectedSkills);
      const valid = await trigger(["skills"]);
      if (valid) setStep(3);
      return;
    }
    if (step === 3) {
      const valid = await trigger(["bio"]);
      if (valid) setStep(4);
    }
  };

  const goBack = () => setStep((s) => s - 1);

  const onSubmit = handleSubmit((data) => mutation.mutate(data));

  const handleSkip = () => {
    // Clear any partially-filled portfolio items so validation passes
    setValue("portfolioItems", []);
    handleSubmit((data) => mutation.mutate({ ...data, portfolioItems: [] }))();
  };

  // ── Focus/blur style helpers ──

  const focusInput = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "rgba(200,73,26,0.5)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(200,73,26,0.1)";
  };

  const blurInput = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    hasError: boolean
  ) => {
    if (!hasError) {
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
      e.currentTarget.style.boxShadow = "none";
    }
  };

  // ── Shared button styles ──

  const primaryBtn = {
    background: "linear-gradient(135deg, #C8491A 0%, #D45820 100%)",
    color: "#fff",
    boxShadow: "0 0 28px rgba(200,73,26,0.35), 0 2px 8px rgba(0,0,0,0.25)",
    fontFamily: "var(--font-space-grotesk)",
  };

  const ghostBtn = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "rgba(251,247,243,0.5)",
    fontFamily: "var(--font-space-grotesk)",
  };

  const disabledPrimaryBtn = {
    background: "rgba(255,255,255,0.06)",
    color: "rgba(251,247,243,0.3)",
    fontFamily: "var(--font-space-grotesk)",
  };

  // ── Render ──

  return (
    <div className="animate-fade-up">
      {/* Brand */}
      <div className="flex items-center gap-2.5 mb-8">
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

      {/* Step progress */}
      <div className="flex items-center mb-9">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300"
                style={{
                  background:
                    step > s.id
                      ? "rgba(200,73,26,0.22)"
                      : step === s.id
                        ? "linear-gradient(135deg, #C8491A, #E06030)"
                        : "rgba(255,255,255,0.06)",
                  border:
                    step > s.id
                      ? "1px solid rgba(200,73,26,0.3)"
                      : "none",
                  color:
                    step >= s.id ? "#FBF7F3" : "rgba(251,247,243,0.2)",
                  boxShadow:
                    step === s.id ? "0 0 14px rgba(200,73,26,0.5)" : "none",
                }}
              >
                {step > s.id ? "✓" : s.id}
              </div>
              <span
                className="text-[10px] font-medium hidden sm:block"
                style={{
                  color:
                    step >= s.id
                      ? "rgba(251,247,243,0.45)"
                      : "rgba(251,247,243,0.18)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="flex-1 mx-3 h-px transition-all duration-500"
                style={{
                  background:
                    step > s.id
                      ? "rgba(200,73,26,0.35)"
                      : "rgba(255,255,255,0.07)",
                }}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit}>
        {/* ── STEP 1: Role selection ── */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Briefcase size={12} style={{ color: "#C8491A" }} />
                <span
                  className="text-[10.5px] font-semibold uppercase tracking-widest"
                  style={{
                    color: "rgba(200,73,26,0.75)",
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                >
                  Step 1 of 4
                </span>
              </div>
              <h1
                className="text-[1.75rem] font-bold tracking-[-0.035em] leading-[1.15]"
                style={{
                  color: "#FBF7F3",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                What kind of freelancer are you?
              </h1>
              <p
                className="mt-1.5 text-[13px] leading-relaxed"
                style={{
                  color: "rgba(251,247,243,0.38)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                Pick a role or type your own below.
              </p>
            </div>

            {/* Role grid */}
            <div className="grid grid-cols-3 gap-1.5">
              {POPULAR_ROLES.map(({ label, Icon }) => {
                const isSelected = presetRole === label;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => handlePresetSelect(label)}
                    className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg transition-all duration-150 text-center"
                    style={{
                      background: isSelected
                        ? "rgba(200,73,26,0.13)"
                        : "rgba(255,255,255,0.03)",
                      border: isSelected
                        ? "1px solid rgba(200,73,26,0.4)"
                        : "1px solid rgba(255,255,255,0.06)",
                      boxShadow: isSelected
                        ? "0 0 12px rgba(200,73,26,0.1)"
                        : "none",
                    }}
                  >
                    <Icon
                      size={15}
                      style={{
                        color: isSelected
                          ? "#E06030"
                          : "rgba(251,247,243,0.35)",
                      }}
                    />
                    <span
                      className="text-[10px] font-medium leading-tight"
                      style={{
                        color: isSelected
                          ? "#FBF7F3"
                          : "rgba(251,247,243,0.45)",
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom role */}
            <div className="space-y-1.5">
              <label
                className="text-[12px] font-medium"
                style={{
                  color: "rgba(251,247,243,0.38)",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                Or type your own role
              </label>
              <input
                type="text"
                value={customRole}
                onChange={(e) => handleCustomRoleChange(e.target.value)}
                placeholder="e.g. Shopify Expert, WordPress Developer…"
                className={`${inputBase} h-10`}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: fieldBorder(false),
                  color: "#FBF7F3",
                  fontFamily: "var(--font-inter)",
                }}
                onFocus={focusInput}
                onBlur={(e) => blurInput(e, false)}
              />
              {effectiveRole && (
                <p
                  className="text-[11px]"
                  style={{
                    color: "rgba(200,73,26,0.65)",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  Selected: {effectiveRole}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={goNext}
              disabled={!effectiveRole}
              className="w-full h-11 flex items-center justify-center gap-2 rounded-lg text-[14px] font-semibold tracking-[-0.01em] transition-all duration-200"
              style={effectiveRole ? primaryBtn : disabledPrimaryBtn}
            >
              Continue
              <ArrowRight size={15} />
            </button>
          </div>
        )}

        {/* ── STEP 2: Skills ── */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Sparkles size={12} style={{ color: "#C8491A" }} />
                <span
                  className="text-[10.5px] font-semibold uppercase tracking-widest"
                  style={{
                    color: "rgba(200,73,26,0.75)",
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                >
                  Step 2 of 4
                </span>
              </div>
              <h1
                className="text-[1.75rem] font-bold tracking-[-0.035em] leading-[1.15]"
                style={{
                  color: "#FBF7F3",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                Pick your top skills
              </h1>
              <p
                className="mt-1.5 text-[13px] leading-relaxed"
                style={{
                  color: "rgba(251,247,243,0.38)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                Select up to{" "}
                <span style={{ color: "rgba(251,247,243,0.6)" }}>10 skills</span>{" "}
                for{" "}
                <span style={{ color: "rgba(251,247,243,0.65)" }}>
                  {activeRole}
                </span>
                . These power every proposal.
              </p>
            </div>

            {/* Counter */}
            <div className="flex items-center justify-between">
              <span
                className="text-[11.5px]"
                style={{
                  color:
                    selectedSkills.length === MAX_SKILLS
                      ? "#F5A070"
                      : "transparent",
                  fontFamily: "var(--font-inter)",
                }}
              >
                Limit reached — deselect to swap
              </span>
              <span
                className="text-[12px] font-semibold tabular-nums"
                style={{
                  color:
                    selectedSkills.length === MAX_SKILLS
                      ? "#F5A070"
                      : selectedSkills.length > 0
                        ? "#E06030"
                        : "rgba(251,247,243,0.25)",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                {selectedSkills.length}/{MAX_SKILLS}
              </span>
            </div>

            {/* Badges */}
            <div className="min-h-32.5">
              {skillsQuery.isPending && (
                <div className="flex flex-wrap gap-2">
                  {SKELETON_WIDTHS.map((w, i) => (
                    <div
                      key={i}
                      className="h-8 rounded-full animate-pulse"
                      style={{
                        width: `${w}px`,
                        background: "rgba(255,255,255,0.07)",
                        animationDelay: `${i * 40}ms`,
                      }}
                    />
                  ))}
                </div>
              )}

              {skillsQuery.isError && (
                <div
                  className="rounded-lg px-4 py-3 text-[13px]"
                  style={{
                    background: "rgba(200,73,26,0.1)",
                    border: "1px solid rgba(200,73,26,0.22)",
                    color: "#F5A070",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  Could not load skills. Go back and try again.
                </div>
              )}

              {skillsQuery.data && (
                <div className="flex flex-wrap gap-2">
                  {skillsQuery.data.map((skill) => {
                    const isSelected = selectedSkills.includes(skill);
                    const isDisabled =
                      !isSelected && selectedSkills.length >= MAX_SKILLS;
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleSkillToggle(skill)}
                        disabled={isDisabled}
                        className="h-8 px-3.5 rounded-full text-[12px] font-medium transition-all duration-150"
                        style={{
                          background: isSelected
                            ? "rgba(200,73,26,0.18)"
                            : "rgba(255,255,255,0.04)",
                          border: isSelected
                            ? "1px solid rgba(200,73,26,0.45)"
                            : "1px solid rgba(255,255,255,0.09)",
                          color: isSelected
                            ? "#F0956A"
                            : isDisabled
                              ? "rgba(251,247,243,0.18)"
                              : "rgba(251,247,243,0.55)",
                          cursor: isDisabled ? "not-allowed" : "pointer",
                          opacity: isDisabled ? 0.4 : 1,
                          fontFamily: "var(--font-inter)",
                          boxShadow: isSelected
                            ? "0 0 8px rgba(200,73,26,0.15)"
                            : "none",
                        }}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {errors.skills && (
              <p
                className="text-[11px]"
                style={{ color: "#F5A070", fontFamily: "var(--font-inter)" }}
              >
                {errors.skills.message}
              </p>
            )}

            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={goBack}
                className="h-11 w-11 flex items-center justify-center rounded-lg transition-all duration-150 shrink-0"
                style={ghostBtn}
              >
                <ArrowLeft size={15} />
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={selectedSkills.length === 0}
                className="flex-1 h-11 flex items-center justify-center gap-2 rounded-lg text-[14px] font-semibold tracking-[-0.01em] transition-all duration-200"
                style={
                  selectedSkills.length > 0 ? primaryBtn : disabledPrimaryBtn
                }
              >
                Continue
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Bio ── */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <BookOpen size={12} style={{ color: "#C8491A" }} />
                <span
                  className="text-[10.5px] font-semibold uppercase tracking-widest"
                  style={{
                    color: "rgba(200,73,26,0.75)",
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                >
                  Step 3 of 4
                </span>
              </div>
              <h1
                className="text-[1.75rem] font-bold tracking-[-0.035em] leading-[1.15]"
                style={{
                  color: "#FBF7F3",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                Tell us about yourself
              </h1>
              <p
                className="mt-1.5 text-[13px] leading-relaxed"
                style={{
                  color: "rgba(251,247,243,0.38)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                This is the foundation of every proposal — the AI will draw
                from it every time.
              </p>
            </div>

            {/* Bio textarea */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  className="text-[12px] font-medium"
                  style={{
                    color: "rgba(251,247,243,0.5)",
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                >
                  About you
                </label>
                <span
                  className="text-[11px]"
                  style={{
                    color:
                      bioValue.length > 500
                        ? "#F5A070"
                        : "rgba(251,247,243,0.22)",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {bioValue.length} / 600
                </span>
              </div>
              <textarea
                {...register("bio")}
                rows={5}
                placeholder="e.g. I'm a full-stack developer with 5 years of experience building SaaS products. Led frontend at a Series A startup, delivered 30+ Upwork projects with a 98% JSS…"
                className={`${inputBase} py-3 resize-none`}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: fieldBorder(!!errors.bio),
                  color: "#FBF7F3",
                  fontFamily: "var(--font-inter)",
                  lineHeight: "1.65",
                }}
                onFocus={focusInput}
                onBlur={(e) => blurInput(e, !!errors.bio)}
              />
              {errors.bio && (
                <p
                  className="text-[11px]"
                  style={{ color: "#F5A070", fontFamily: "var(--font-inter)" }}
                >
                  {errors.bio.message}
                </p>
              )}
            </div>

            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={goBack}
                className="h-11 w-11 flex items-center justify-center rounded-lg transition-all duration-150 shrink-0"
                style={ghostBtn}
              >
                <ArrowLeft size={15} />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="flex-1 h-11 flex items-center justify-center gap-2 rounded-lg text-[14px] font-semibold tracking-[-0.01em] transition-all duration-200"
                style={primaryBtn}
              >
                Continue
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 4: Portfolio (optional) ── */}
        {step === 4 && (
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <FolderOpen size={12} style={{ color: "#C8491A" }} />
                <span
                  className="text-[10.5px] font-semibold uppercase tracking-widest"
                  style={{
                    color: "rgba(200,73,26,0.75)",
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                >
                  Step 4 of 4 · Optional
                </span>
              </div>
              <h1
                className="text-[1.75rem] font-bold tracking-[-0.035em] leading-[1.15]"
                style={{
                  color: "#FBF7F3",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                Add your portfolio
              </h1>
              <p
                className="mt-1.5 text-[13px] leading-relaxed"
                style={{
                  color: "rgba(251,247,243,0.38)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                Up to 5 projects. The AI references these when relevant to a
                job.
              </p>
            </div>

            {/* Portfolio items */}
            <div className="space-y-3">
              {portfolioFields.map((field, index) => (
                <div
                  key={field.id}
                  className="rounded-xl p-4 space-y-3"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[11px] font-semibold"
                      style={{
                        color: "rgba(251,247,243,0.3)",
                        fontFamily: "var(--font-space-grotesk)",
                      }}
                    >
                      Project {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="w-6 h-6 rounded flex items-center justify-center transition-colors duration-150"
                      style={{ color: "rgba(251,247,243,0.28)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#F5A070")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "rgba(251,247,243,0.28)")
                      }
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  <input
                    {...register(`portfolioItems.${index}.url`)}
                    placeholder="https://yourproject.com"
                    className={`${inputBase} h-9`}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: fieldBorder(
                        !!errors.portfolioItems?.[index]?.url
                      ),
                      color: "#FBF7F3",
                      fontFamily: "var(--font-inter)",
                    }}
                    onFocus={focusInput}
                    onBlur={(e) =>
                      blurInput(e, !!errors.portfolioItems?.[index]?.url)
                    }
                  />
                  {errors.portfolioItems?.[index]?.url && (
                    <p
                      className="text-[11px]"
                      style={{
                        color: "#F5A070",
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      {errors.portfolioItems[index]?.url?.message}
                    </p>
                  )}

                  <input
                    {...register(`portfolioItems.${index}.description`)}
                    placeholder="Short description — what did you build?"
                    className={`${inputBase} h-9`}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: fieldBorder(false),
                      color: "#FBF7F3",
                      fontFamily: "var(--font-inter)",
                    }}
                    onFocus={focusInput}
                    onBlur={(e) => blurInput(e, false)}
                  />
                </div>
              ))}

              {portfolioFields.length < 5 && (
                <button
                  type="button"
                  onClick={() => append({ url: "", description: "" })}
                  className="w-full h-10 flex items-center justify-center gap-2 rounded-lg text-[13px] font-medium transition-all duration-150"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px dashed rgba(255,255,255,0.1)",
                    color: "rgba(251,247,243,0.4)",
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(200,73,26,0.28)";
                    e.currentTarget.style.color = "rgba(200,73,26,0.75)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.1)";
                    e.currentTarget.style.color = "rgba(251,247,243,0.4)";
                  }}
                >
                  <Plus size={14} />
                  Add project
                </button>
              )}
            </div>

            {mutation.error && (
              <div
                className="rounded-lg px-4 py-3 text-[13px]"
                style={{
                  background: "rgba(200,73,26,0.1)",
                  border: "1px solid rgba(200,73,26,0.22)",
                  color: "#F5A070",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {mutation.error.message === "profile_limit_reached"
                  ? "You've reached the free plan limit of 2 profiles."
                  : "Something went wrong. Please try again."}
              </div>
            )}

            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={goBack}
                disabled={mutation.isPending}
                className="h-11 w-11 flex items-center justify-center rounded-lg transition-all duration-150 shrink-0"
                style={ghostBtn}
              >
                <ArrowLeft size={15} />
              </button>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="flex-1 h-11 flex items-center justify-center gap-2 rounded-lg text-[14px] font-semibold tracking-[-0.01em] transition-all duration-200"
                style={
                  mutation.isPending
                    ? {
                        background: "rgba(200,73,26,0.5)",
                        color: "rgba(255,255,255,0.7)",
                        fontFamily: "var(--font-space-grotesk)",
                      }
                    : primaryBtn
                }
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Creating profile…
                  </>
                ) : (
                  <>
                    Save profile
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </div>

            {/* Skip link */}
            <div className="flex justify-center pt-1">
              <button
                type="button"
                onClick={handleSkip}
                disabled={mutation.isPending}
                className="text-[12.5px] transition-colors duration-150"
                style={{
                  color: "rgba(251,247,243,0.28)",
                  fontFamily: "var(--font-inter)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(251,247,243,0.55)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(251,247,243,0.28)")
                }
              >
                Skip portfolio for now
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
