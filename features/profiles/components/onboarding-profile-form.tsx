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
import { cn } from "@/shared/lib/utils";
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

// ── Shared input className ─────────────────────────────────────────────────

function inputCn(hasError: boolean) {
  return cn(
    "w-full px-3.5 rounded-lg text-[13px] outline-none transition-all duration-200",
    "bg-card border text-foreground placeholder:text-muted-foreground/50",
    hasError
      ? "border-destructive/50 ring-2 ring-destructive/10"
      : "border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/10",
  );
}

// ── Component ──────────────────────────────────────────────────────────────

interface OnboardingProfileFormProps {
  onSuccess?: () => void;
}

export function OnboardingProfileForm({
  onSuccess,
}: OnboardingProfileFormProps = {}) {
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

  const [expandedPortfolioIndex, setExpandedPortfolioIndex] = useState<number | null>(null);

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
    setValue("portfolioItems", []);
    handleSubmit((data) => mutation.mutate({ ...data, portfolioItems: [] }))();
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
            boxShadow: "0 0 18px rgba(200,73,26,0.3)",
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
          className="text-[15px] font-semibold tracking-[-0.02em] text-foreground"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
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
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300",
                  step > s.id
                    ? "bg-accent border border-primary/30 text-primary"
                    : step === s.id
                      ? "text-white"
                      : "bg-muted/60 text-muted-foreground/40",
                )}
                style={
                  step === s.id
                    ? {
                        background: "linear-gradient(135deg, #C8491A, #E06030)",
                        boxShadow: "0 0 14px rgba(200,73,26,0.4)",
                      }
                    : undefined
                }
              >
                {step > s.id ? "✓" : s.id}
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium hidden sm:block",
                  step >= s.id ? "text-muted-foreground" : "text-muted-foreground/30",
                )}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "flex-1 mx-3 h-px transition-all duration-500",
                  step > s.id ? "bg-primary/25" : "bg-border",
                )}
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
                <Briefcase size={12} className="text-primary" />
                <span
                  className="text-[10.5px] font-semibold uppercase tracking-widest text-primary/70"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Step 1 of 4
                </span>
              </div>
              <h1
                className="text-[1.75rem] font-bold tracking-[-0.035em] leading-[1.15] text-foreground"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                What kind of freelancer are you?
              </h1>
              <p
                className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground"
                style={{ fontFamily: "var(--font-inter)" }}
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
                    className={cn(
                      "flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg transition-all duration-150 text-center border",
                      isSelected
                        ? "bg-accent border-primary/40 shadow-[0_0_12px_rgba(200,84,56,0.08)]"
                        : "bg-card border-border hover:bg-accent/50 hover:border-border-strong",
                    )}
                  >
                    <Icon
                      size={15}
                      className={
                        isSelected ? "text-primary" : "text-muted-foreground"
                      }
                    />
                    <span
                      className={cn(
                        "text-[10px] font-medium leading-tight",
                        isSelected ? "text-foreground" : "text-muted-foreground",
                      )}
                      style={{ fontFamily: "var(--font-inter)" }}
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
                className="text-[12px] font-medium text-muted-foreground"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Or type your own role
              </label>
              <input
                type="text"
                value={customRole}
                onChange={(e) => handleCustomRoleChange(e.target.value)}
                placeholder="e.g. Shopify Expert, WordPress Developer…"
                className={cn(inputCn(false), "h-10")}
                style={{ fontFamily: "var(--font-inter)" }}
              />
              {effectiveRole && (
                <p
                  className="text-[11px] text-primary/70"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Selected: {effectiveRole}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={goNext}
              disabled={!effectiveRole}
              className={cn(
                "w-full h-11 flex items-center justify-center gap-2 rounded-lg text-[14px] font-semibold tracking-[-0.01em] transition-all duration-200",
                effectiveRole
                  ? "bg-primary hover:bg-primary-hover active:bg-primary-active text-white shadow-[0_4px_20px_rgba(200,84,56,0.25)] hover:shadow-[0_6px_28px_rgba(200,84,56,0.4)]"
                  : "bg-muted text-muted-foreground cursor-not-allowed",
              )}
              style={{ fontFamily: "var(--font-space-grotesk)" }}
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
                <Sparkles size={12} className="text-primary" />
                <span
                  className="text-[10.5px] font-semibold uppercase tracking-widest text-primary/70"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Step 2 of 4
                </span>
              </div>
              <h1
                className="text-[1.75rem] font-bold tracking-[-0.035em] leading-[1.15] text-foreground"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Pick your top skills
              </h1>
              <p
                className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Select up to{" "}
                <span className="text-text-secondary">10 skills</span> for{" "}
                <span className="text-foreground font-medium">{activeRole}</span>
                . These power every proposal.
              </p>
            </div>

            {/* Counter */}
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  "text-[11.5px] transition-opacity",
                  selectedSkills.length === MAX_SKILLS
                    ? "text-primary opacity-100"
                    : "opacity-0 pointer-events-none",
                )}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Limit reached — deselect to swap
              </span>
              <span
                className={cn(
                  "text-[12px] font-semibold tabular-nums",
                  selectedSkills.length === MAX_SKILLS
                    ? "text-primary"
                    : selectedSkills.length > 0
                      ? "text-primary/70"
                      : "text-muted-foreground/40",
                )}
                style={{ fontFamily: "var(--font-space-grotesk)" }}
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
                      className="h-8 rounded-full bg-muted animate-pulse"
                      style={{
                        width: `${w}px`,
                        animationDelay: `${i * 40}ms`,
                      }}
                    />
                  ))}
                </div>
              )}

              {skillsQuery.isError && (
                <div
                  className="rounded-lg px-4 py-3 text-[13px] bg-error-subtle border border-destructive/25 text-destructive"
                  style={{ fontFamily: "var(--font-inter)" }}
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
                        className={cn(
                          "h-8 px-3.5 rounded-full text-[12px] font-medium transition-all duration-150 border",
                          isSelected
                            ? "bg-accent border-primary/45 text-primary shadow-[0_0_8px_rgba(200,84,56,0.1)]"
                            : isDisabled
                              ? "bg-card border-border text-muted-foreground/30 opacity-40 cursor-not-allowed"
                              : "bg-card border-border text-text-secondary hover:border-border-strong hover:bg-accent/50",
                        )}
                        style={{ fontFamily: "var(--font-inter)" }}
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
                className="text-[11px] text-destructive"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {errors.skills.message}
              </p>
            )}

            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={goBack}
                className="h-11 w-11 flex items-center justify-center rounded-lg transition-all duration-150 shrink-0 bg-muted/50 border border-border text-text-secondary hover:bg-muted hover:text-foreground"
              >
                <ArrowLeft size={15} />
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={selectedSkills.length === 0}
                className={cn(
                  "flex-1 h-11 flex items-center justify-center gap-2 rounded-lg text-[14px] font-semibold tracking-[-0.01em] transition-all duration-200",
                  selectedSkills.length > 0
                    ? "bg-primary hover:bg-primary-hover active:bg-primary-active text-white shadow-[0_4px_20px_rgba(200,84,56,0.25)] hover:shadow-[0_6px_28px_rgba(200,84,56,0.4)]"
                    : "bg-muted text-muted-foreground cursor-not-allowed",
                )}
                style={{ fontFamily: "var(--font-space-grotesk)" }}
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
                <BookOpen size={12} className="text-primary" />
                <span
                  className="text-[10.5px] font-semibold uppercase tracking-widest text-primary/70"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Step 3 of 4
                </span>
              </div>
              <h1
                className="text-[1.75rem] font-bold tracking-[-0.035em] leading-[1.15] text-foreground"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Tell us about yourself
              </h1>
              <p
                className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                This is the foundation of every proposal — the AI will draw
                from it every time.
              </p>
            </div>

            {/* Bio textarea */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  className="text-[12px] font-medium text-muted-foreground"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  About you
                </label>
                <span
                  className={cn(
                    "text-[11px]",
                    bioValue.length > 500
                      ? "text-primary"
                      : "text-muted-foreground/40",
                  )}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {bioValue.length} / 600
                </span>
              </div>
              <textarea
                {...register("bio")}
                rows={5}
                placeholder="e.g. I'm a full-stack developer with 5 years of experience building SaaS products. Led frontend at a Series A startup, delivered 30+ Upwork projects with a 98% JSS…"
                className={cn(inputCn(!!errors.bio), "py-3 resize-none")}
                style={{
                  fontFamily: "var(--font-inter)",
                  lineHeight: "1.65",
                }}
              />
              {errors.bio && (
                <p
                  className="text-[11px] text-destructive"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {errors.bio.message}
                </p>
              )}
            </div>

            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={goBack}
                className="h-11 w-11 flex items-center justify-center rounded-lg transition-all duration-150 shrink-0 bg-muted/50 border border-border text-text-secondary hover:bg-muted hover:text-foreground"
              >
                <ArrowLeft size={15} />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="flex-1 h-11 flex items-center justify-center gap-2 rounded-lg text-[14px] font-semibold tracking-[-0.01em] transition-all duration-200 bg-primary hover:bg-primary-hover active:bg-primary-active text-white shadow-[0_4px_20px_rgba(200,84,56,0.25)] hover:shadow-[0_6px_28px_rgba(200,84,56,0.4)]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
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
                <FolderOpen size={12} className="text-primary" />
                <span
                  className="text-[10.5px] font-semibold uppercase tracking-widest text-primary/70"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Step 4 of 4 · Optional
                </span>
              </div>
              <h1
                className="text-[1.75rem] font-bold tracking-[-0.035em] leading-[1.15] text-foreground"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Showcase your work
              </h1>
              <p
                className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Add up to 5 projects. The AI references these as proof points
                in proposals.
              </p>
            </div>

            {/* Portfolio items */}
            <div className="space-y-2.5">
              {portfolioFields.map((field, index) => {
                const isExpanded = expandedPortfolioIndex === index;
                const titleVal = watch(`portfolioItems.${index}.title`) ?? "";
                const urlVal = watch(`portfolioItems.${index}.url`) ?? "";
                const hasErrors =
                  !!errors.portfolioItems?.[index]?.title ||
                  !!errors.portfolioItems?.[index]?.url ||
                  !!errors.portfolioItems?.[index]?.description;

                return (
                  <div
                    key={field.id}
                    className={cn(
                      "rounded-xl border transition-all duration-200",
                      isExpanded
                        ? "bg-card border-border-strong shadow-sm"
                        : hasErrors
                          ? "bg-card border-destructive/30"
                          : "bg-card border-border",
                    )}
                  >
                    {/* Card header — always visible */}
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedPortfolioIndex(isExpanded ? null : index)
                      }
                      className="w-full flex items-center gap-3 px-4 py-3 text-left"
                    >
                      <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center shrink-0">
                        <span
                          className="text-[10px] font-bold text-primary"
                          style={{ fontFamily: "var(--font-space-grotesk)" }}
                        >
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        {titleVal ? (
                          <p
                            className="text-[13px] font-medium text-foreground truncate"
                            style={{ fontFamily: "var(--font-inter)" }}
                          >
                            {titleVal}
                          </p>
                        ) : (
                          <p
                            className="text-[13px] text-muted-foreground/50"
                            style={{ fontFamily: "var(--font-inter)" }}
                          >
                            Untitled project
                          </p>
                        )}
                        {urlVal && !isExpanded && (
                          <p
                            className="text-[11px] text-muted-foreground truncate mt-0.5"
                            style={{ fontFamily: "var(--font-inter)" }}
                          >
                            {urlVal.replace(/^https?:\/\//, "")}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {hasErrors && (
                          <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            remove(index);
                            if (expandedPortfolioIndex === index)
                              setExpandedPortfolioIndex(null);
                          }}
                          className="w-6 h-6 rounded flex items-center justify-center transition-colors duration-150 text-muted-foreground/30 hover:text-destructive"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </button>

                    {/* Expanded fields */}
                    {isExpanded && (
                      <div className="px-4 pb-4 space-y-2.5 border-t border-border pt-3">
                        {/* Title */}
                        <div className="space-y-1">
                          <label
                            className="text-[11px] font-medium text-muted-foreground"
                            style={{ fontFamily: "var(--font-space-grotesk)" }}
                          >
                            Project title
                          </label>
                          <input
                            {...register(`portfolioItems.${index}.title`)}
                            placeholder="e.g. E-commerce checkout redesign"
                            className={cn(
                              inputCn(!!errors.portfolioItems?.[index]?.title),
                              "h-9",
                            )}
                            style={{ fontFamily: "var(--font-inter)" }}
                          />
                          {errors.portfolioItems?.[index]?.title && (
                            <p
                              className="text-[11px] text-destructive"
                              style={{ fontFamily: "var(--font-inter)" }}
                            >
                              {errors.portfolioItems[index]?.title?.message}
                            </p>
                          )}
                        </div>

                        {/* URL */}
                        <div className="space-y-1">
                          <label
                            className="text-[11px] font-medium text-muted-foreground"
                            style={{ fontFamily: "var(--font-space-grotesk)" }}
                          >
                            Project URL
                          </label>
                          <input
                            {...register(`portfolioItems.${index}.url`)}
                            placeholder="https://yourproject.com"
                            className={cn(
                              inputCn(!!errors.portfolioItems?.[index]?.url),
                              "h-9",
                            )}
                            style={{ fontFamily: "var(--font-inter)" }}
                          />
                          {errors.portfolioItems?.[index]?.url && (
                            <p
                              className="text-[11px] text-destructive"
                              style={{ fontFamily: "var(--font-inter)" }}
                            >
                              {errors.portfolioItems[index]?.url?.message}
                            </p>
                          )}
                        </div>

                        {/* Description */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label
                              className="text-[11px] font-medium text-muted-foreground"
                              style={{
                                fontFamily: "var(--font-space-grotesk)",
                              }}
                            >
                              Short description{" "}
                              <span className="text-muted-foreground/40 font-normal">
                                · optional
                              </span>
                            </label>
                            <span
                              className="text-[10px] text-muted-foreground/40"
                              style={{ fontFamily: "var(--font-inter)" }}
                            >
                              {(
                                watch(
                                  `portfolioItems.${index}.description`,
                                ) ?? ""
                              ).length}
                              /200
                            </span>
                          </div>
                          <input
                            {...register(`portfolioItems.${index}.description`)}
                            placeholder="What did you build? What was the result?"
                            className={cn(
                              inputCn(
                                !!errors.portfolioItems?.[index]?.description,
                              ),
                              "h-9",
                            )}
                            style={{ fontFamily: "var(--font-inter)" }}
                          />
                          {errors.portfolioItems?.[index]?.description && (
                            <p
                              className="text-[11px] text-destructive"
                              style={{ fontFamily: "var(--font-inter)" }}
                            >
                              {
                                errors.portfolioItems[index]?.description
                                  ?.message
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {portfolioFields.length < 5 && (
                <button
                  type="button"
                  onClick={() => {
                    const newIndex = portfolioFields.length;
                    append({ title: "", url: "", description: "" });
                    setExpandedPortfolioIndex(newIndex);
                  }}
                  className="w-full h-10 flex items-center justify-center gap-2 rounded-xl text-[13px] font-medium transition-all duration-150 bg-card border border-dashed border-border text-muted-foreground hover:border-primary/30 hover:text-primary hover:bg-accent/40"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  <Plus size={14} />
                  Add a project
                </button>
              )}
            </div>

            {mutation.error && (
              <div
                className="rounded-lg px-4 py-3 text-[13px] bg-error-subtle border border-destructive/25 text-destructive"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {(mutation.error as { code?: string })?.code ===
                "profile_limit_reached"
                  ? "You've reached the free plan limit of 2 profiles."
                  : "Something went wrong. Please try again."}
              </div>
            )}

            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={goBack}
                disabled={mutation.isPending}
                className="h-11 w-11 flex items-center justify-center rounded-lg transition-all duration-150 shrink-0 bg-muted/50 border border-border text-text-secondary hover:bg-muted hover:text-foreground disabled:opacity-50"
              >
                <ArrowLeft size={15} />
              </button>
              <button
                type="submit"
                disabled={mutation.isPending}
                className={cn(
                  "flex-1 h-11 flex items-center justify-center gap-2 rounded-lg text-[14px] font-semibold tracking-[-0.01em] transition-all duration-200",
                  mutation.isPending
                    ? "bg-primary/50 text-white/70 cursor-not-allowed"
                    : "bg-primary hover:bg-primary-hover active:bg-primary-active text-white shadow-[0_4px_20px_rgba(200,84,56,0.25)] hover:shadow-[0_6px_28px_rgba(200,84,56,0.4)]",
                )}
                style={{ fontFamily: "var(--font-space-grotesk)" }}
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
                className="text-[12.5px] text-muted-foreground/50 hover:text-text-secondary transition-colors duration-150 disabled:opacity-50"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Skip — add later
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
