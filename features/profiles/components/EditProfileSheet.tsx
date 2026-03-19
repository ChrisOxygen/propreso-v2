"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/ui/sheet";
import { X, Plus, Trash2, Loader2 } from "lucide-react";
import {
  ZCreateProfileSchema,
  type ZCreateProfile,
  type ZPortfolioItem,
} from "@/features/profiles/schemas/profile-schemas";
import { useUpdateProfile } from "@/features/profiles/hooks/use-update-profile";
import type { FreelancerProfileModel } from "@/shared/lib/generated/prisma/models";

// ── Helpers ────────────────────────────────────────────────────────────────

function fieldClass(hasError: boolean) {
  return [
    "w-full px-3.5 rounded-lg text-[13px] text-foreground bg-background",
    "border outline-none transition-colors duration-150",
    "placeholder:text-muted-foreground",
    "focus:border-primary focus:ring-2 focus:ring-primary/10",
    hasError ? "border-destructive" : "border-border",
  ].join(" ");
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest mb-2 text-muted-foreground">
      {children}
    </p>
  );
}

// ── Component ──────────────────────────────────────────────────────────────

interface EditProfileSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: FreelancerProfileModel;
}

export function EditProfileSheet({
  open,
  onOpenChange,
  profile,
}: EditProfileSheetProps) {
  const updateProfile = useUpdateProfile();
  const [skillInput, setSkillInput] = useState("");
  const skillInputRef = useRef<HTMLInputElement>(null);

  // Parse portfolioItems from JSON (Prisma stores as JsonValue)
  // Back-compat: existing items may lack `title` — default to empty string
  const initialPortfolio = (() => {
    try {
      const items = profile.portfolioItems as Array<Partial<ZPortfolioItem>>;
      if (!Array.isArray(items)) return [];
      return items.map((item) => ({
        title: item.title ?? "",
        url: item.url ?? "",
        description: item.description ?? "",
      }));
    } catch {
      return [];
    }
  })();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<ZCreateProfile>({
    resolver: zodResolver(ZCreateProfileSchema),
    defaultValues: {
      name: profile.name,
      bio: profile.bio,
      skills: profile.skills,
      portfolioItems: initialPortfolio,
    },
  });

  const { fields: portfolioFields, append, remove } = useFieldArray({
    control,
    name: "portfolioItems",
  });

  const skills = watch("skills") ?? [];
  const bio = watch("bio") ?? "";

  // Reset form when profile changes (e.g. switching which card is edited)
  useEffect(() => {
    if (open) {
      reset({
        name: profile.name,
        bio: profile.bio,
        skills: profile.skills,
        portfolioItems: initialPortfolio,
      });
      setSkillInput("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, profile.id]);

  function addSkill() {
    const trimmed = skillInput.trim();
    if (!trimmed || skills.includes(trimmed) || skills.length >= 10) return;
    setValue("skills", [...skills, trimmed], { shouldValidate: true });
    setSkillInput("");
    skillInputRef.current?.focus();
  }

  function removeSkill(skill: string) {
    setValue(
      "skills",
      skills.filter((s) => s !== skill),
      { shouldValidate: true }
    );
  }

  function onSubmit(data: ZCreateProfile) {
    updateProfile.mutate(
      { profileId: profile.id, data },
      { onSuccess: () => onOpenChange(false) }
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col gap-0 overflow-y-auto p-0 bg-card border-border">
        {/* Header */}
        <SheetHeader className="px-6 pt-6 pb-4 shrink-0">
          <SheetTitle className="text-[15px] font-semibold font-heading text-foreground">
            Edit Profile
          </SheetTitle>
          <p className="text-[12px] mt-0.5 text-muted-foreground">
            Changes apply to future proposals.
          </p>
        </SheetHeader>

        <div className="shrink-0 h-px mx-6 bg-border" />

        {/* Form body */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-1 px-6 py-5 gap-6"
        >
          {/* Role name */}
          <div>
            <SectionLabel>Role Name</SectionLabel>
            <input
              {...register("name")}
              className={`${fieldClass(!!errors.name)} h-9`}
              placeholder="e.g. Full Stack Developer"
            />
            {errors.name && (
              <p className="mt-1.5 text-[11.5px] text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Skills */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <SectionLabel>Skills</SectionLabel>
              <span className="text-[11px] text-muted-foreground">
                {skills.length}/10
              </span>
            </div>

            {/* Existing skill chips */}
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {skills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11.5px] font-medium transition-colors duration-150 group/chip bg-accent text-primary border border-primary/20 hover:bg-primary/10"
                  >
                    {skill}
                    <X
                      size={9}
                      className="opacity-60 group-hover/chip:opacity-100"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Add custom skill */}
            <div className="flex gap-2">
              <input
                ref={skillInputRef}
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                disabled={skills.length >= 10}
                placeholder={
                  skills.length >= 10 ? "Max 10 skills" : "Add a skill…"
                }
                className={`${fieldClass(!!errors.skills)} h-8 flex-1 text-[12.5px] disabled:opacity-40`}
              />
              <button
                type="button"
                onClick={addSkill}
                disabled={!skillInput.trim() || skills.length >= 10}
                className="h-8 w-8 rounded-lg flex items-center justify-center transition-colors duration-150 disabled:opacity-30 bg-accent border border-primary/20 text-primary hover:bg-primary/10"
              >
                <Plus size={14} />
              </button>
            </div>

            {errors.skills && (
              <p className="mt-1.5 text-[11.5px] text-destructive">
                {errors.skills.message}
              </p>
            )}
          </div>

          {/* Bio */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <SectionLabel>Bio</SectionLabel>
              <span
                className={`text-[11px] ${
                  bio.length > 500 ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {bio.length}/600
              </span>
            </div>
            <textarea
              {...register("bio")}
              rows={5}
              placeholder="Describe your expertise, approach, and what makes you stand out on Upwork…"
              className={`${fieldClass(!!errors.bio)} py-2.5 leading-relaxed resize-none`}
            />
            {errors.bio && (
              <p className="mt-1.5 text-[11.5px] text-destructive">
                {errors.bio.message}
              </p>
            )}
          </div>

          {/* Portfolio Items */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <SectionLabel>Portfolio Projects</SectionLabel>
              {portfolioFields.length > 0 && portfolioFields.length < 5 && (
                <button
                  type="button"
                  onClick={() =>
                    append({ title: "", url: "", description: "" })
                  }
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary-hover transition-colors duration-150"
                >
                  <Plus size={11} />
                  Add project
                </button>
              )}
            </div>

            {portfolioFields.length === 0 && (
              <button
                type="button"
                onClick={() => append({ title: "", url: "", description: "" })}
                className="w-full h-9 rounded-lg text-[12.5px] transition-colors duration-150 bg-background border border-dashed border-border text-muted-foreground hover:border-primary/25 hover:text-primary hover:bg-accent/40"
              >
                + Add a project
              </button>
            )}

            <div className="space-y-2.5">
              {portfolioFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-3 rounded-lg bg-background border border-border space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-muted-foreground/50 uppercase tracking-wide">
                      Project {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="h-5 w-5 flex items-center justify-center rounded transition-colors duration-150 text-muted-foreground/30 hover:text-destructive"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>

                  {/* Title */}
                  <input
                    {...register(`portfolioItems.${index}.title`)}
                    placeholder="Project title"
                    className={`${fieldClass(!!errors.portfolioItems?.[index]?.title)} h-8 text-[12.5px]`}
                  />
                  {errors.portfolioItems?.[index]?.title && (
                    <p className="text-[11px] text-destructive">
                      {errors.portfolioItems[index].title?.message}
                    </p>
                  )}

                  {/* URL */}
                  <input
                    {...register(`portfolioItems.${index}.url`)}
                    placeholder="https://your-project.com"
                    className={`${fieldClass(!!errors.portfolioItems?.[index]?.url)} h-8 text-[12.5px]`}
                  />
                  {errors.portfolioItems?.[index]?.url && (
                    <p className="text-[11px] text-destructive">
                      {errors.portfolioItems[index].url?.message}
                    </p>
                  )}

                  {/* Description */}
                  <input
                    {...register(`portfolioItems.${index}.description`)}
                    placeholder="Short description — optional"
                    className={`${fieldClass(!!errors.portfolioItems?.[index]?.description)} h-8 text-[12.5px]`}
                  />
                  {errors.portfolioItems?.[index]?.description && (
                    <p className="text-[11px] text-destructive">
                      {errors.portfolioItems[index].description?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-auto pt-2 flex gap-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-10 rounded-lg text-[13px] font-medium transition-colors duration-150 bg-muted border border-border text-text-secondary hover:bg-muted/80"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateProfile.isPending}
              className="flex-1 h-10 rounded-lg text-[13px] font-semibold font-heading transition-opacity duration-150 disabled:opacity-60 flex items-center justify-center gap-1.5 bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active"
            >
              {updateProfile.isPending && (
                <Loader2 size={13} className="animate-spin" />
              )}
              Save Changes
            </button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
