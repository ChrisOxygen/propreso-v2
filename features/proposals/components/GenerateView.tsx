"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Sparkles, Link as LinkIcon, ArrowLeft } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import {
  ZGenerateProposalSchema,
  type ZGenerateProposal,
} from "@/features/proposals/schemas/generate-schema";
import { useProfiles } from "@/features/profiles/hooks/use-profiles";
import { useSaveProposal } from "@/features/proposals/hooks/use-save-proposal";
import { extractText } from "@/features/proposals/hooks/use-generate-proposal";
import { ProfileSelect } from "@/features/proposals/components/ProfileSelect";
import { GenerateOutput } from "@/features/proposals/components/GenerateOutput";

// ── Helpers ────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2.5">
      {children}
    </p>
  );
}

function fieldClass(hasError = false) {
  return [
    "w-full px-3.5 rounded-lg text-[13px] text-foreground bg-background",
    "border outline-none transition-colors duration-150",
    "placeholder:text-muted-foreground",
    "focus:border-primary focus:ring-2 focus:ring-primary/10",
    hasError ? "border-destructive" : "border-border",
  ].join(" ");
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-[11.5px] text-destructive">{msg}</p>;
}

// ── Option metadata ────────────────────────────────────────────────────────

const FORMULAS = [
  {
    value: "AIDA",
    label: "AIDA",
    desc: "Attention → Interest → Desire → Action",
  },
  { value: "PAS", label: "PAS", desc: "Problem → Agitate → Solution" },
  { value: "BAB", label: "BAB", desc: "Before → After → Bridge" },
  { value: "STAR", label: "STAR", desc: "Situation → Task → Action → Result" },
  { value: "DIRECT", label: "Direct", desc: "No-fluff, straight to the point" },
] as const;

const TONES = [
  { value: "PROFESSIONAL", label: "Professional" },
  { value: "CONVERSATIONAL", label: "Conversational" },
  { value: "CONFIDENT", label: "Confident" },
  { value: "FRIENDLY", label: "Friendly" },
] as const;

const LENGTHS = [
  { value: "SHORT", label: "Short", sub: "~150–220 words" },
  { value: "MEDIUM", label: "Medium", sub: "~250–350 words" },
  { value: "LONG", label: "Long", sub: "~380–500 words" },
] as const;

// ── Component ──────────────────────────────────────────────────────────────

export function GenerateView() {
  const router = useRouter();
  const { data: profiles = [], isPending: profilesPending } = useProfiles();
  const saveProposal = useSaveProposal();
  const [defaultSet, setDefaultSet] = useState(false);

  // ── Unsaved-changes state ──────────────────────────────────────────────
  const [isSaved, setIsSaved] = useState(false);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<ZGenerateProposal>({
    resolver: zodResolver(ZGenerateProposalSchema),
    defaultValues: {
      profileId: "",
      jobTitle: "",
      jobUrl: "",
      jobDescription: "",
      tone: "PROFESSIONAL",
      formula: "AIDA",
      proposalLength: "MEDIUM",
      upworkOpener: false,
    },
  });

  // Auto-select default profile once loaded
  useEffect(() => {
    if (!defaultSet && profiles.length > 0) {
      const def = profiles.find((p) => p.isDefault) ?? profiles[0];
      if (def) {
        setValue("profileId", def.id);
        setDefaultSet(true);
      }
    }
  }, [profiles, defaultSet, setValue]);

  const formValues = watch();

  // Keep a ref with the latest extra body so the transport stays stable
  const extraBodyRef = useRef<Record<string, unknown>>({});
  // Run on every render (no deps) so ref is always current before sendMessage
  extraBodyRef.current = {
    profileId: formValues.profileId,
    tone: formValues.tone,
    formula: formValues.formula,
    proposalLength: formValues.proposalLength,
    upworkOpener: formValues.upworkOpener,
    jobTitle: formValues.jobTitle,
  };

  const transport = useMemo(
    () =>
      new TextStreamChatTransport({
        api: "/api/proposals/generate",
        body: () => extraBodyRef.current,
      }),
    [],
  );

  const { messages, sendMessage, regenerate, setMessages, status } = useChat({
    transport,
  });

  const isStreaming = status === "streaming" || status === "submitted";
  const lastAssistantMsg = [...messages]
    .reverse()
    .find((m) => m.role === "assistant");
  const generatedContent = lastAssistantMsg
    ? extractText(lastAssistantMsg)
    : "";
  const hasGenerated = messages.some((m) => m.role === "assistant");

  // A proposal is "dirty" when it exists, hasn't been saved, and isn't mid-stream
  const isDirty = hasGenerated && !isSaved && !isStreaming;

  // ── Browser close / refresh guard ─────────────────────────────────────
  useEffect(() => {
    if (!isDirty) return;
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  // ── Handlers ──────────────────────────────────────────────────────────

  function onSubmit(data: ZGenerateProposal) {
    setIsSaved(false);
    setMessages([]);
    sendMessage({
      text: `Job Title: ${data.jobTitle}\n\nJob Description:\n${data.jobDescription}`,
    });
  }

  function handleRegenerate() {
    setIsSaved(false);
    regenerate();
  }

  async function handleSave() {
    if (!generatedContent) return;
    const data = getValues();
    try {
      const result = await saveProposal.mutateAsync({
        ...data,
        generatedContent,
      });
      setIsSaved(true);
      toast.success("Proposal saved!", {
        description: "View it in your history.",
        action: {
          label: "View",
          onClick: () => router.push(`/proposals/${result.id}`),
        },
      });
    } catch (err) {
      const msg = (err as Error).message;
      if (msg === "proposal_limit_reached") {
        toast.error("Monthly limit reached", {
          description: "Upgrade to Pro for unlimited proposals.",
        });
      } else {
        toast.error("Failed to save proposal. Please try again.");
      }
    }
  }

  function handleBackClick() {
    if (isDirty) {
      setShowLeaveDialog(true);
    } else {
      router.push("/proposals");
    }
  }

  const jobDescription = watch("jobDescription");
  const descLength = jobDescription?.length ?? 0;

  return (
    <>
      {/* ── Leave confirmation dialog ── */}
      <AlertDialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave without saving?</AlertDialogTitle>
            <AlertDialogDescription>
              Your generated proposal hasn&apos;t been saved to history yet. If
              you leave now, it will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Stay</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => router.push("/proposals")}
              className="bg-primary text-primary-foreground hover:bg-primary-hover"
            >
              Leave anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── Layout ── */}
      <div className="flex flex-col lg:grid lg:grid-cols-[420px_1fr] gap-6 items-start">
        {/* ── LEFT: Config form ── */}
        <div className="w-full rounded-xl bg-card border border-border">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 p-5"
          >
            {/* Profile */}
            <div>
              <SectionLabel>Profile</SectionLabel>
              {profilesPending ? (
                <div className="h-10 rounded-lg animate-pulse bg-accent" />
              ) : (
                <Controller
                  name="profileId"
                  control={control}
                  render={({ field }) => (
                    <ProfileSelect
                      profiles={profiles}
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.profileId?.message}
                    />
                  )}
                />
              )}
            </div>

            <div className="h-px bg-border" />

            {/* Job details */}
            <div className="flex flex-col gap-4">
              <SectionLabel>Job Details</SectionLabel>

              {/* Job title */}
              <div>
                <label className="block text-[12px] font-medium mb-1.5 text-muted-foreground">
                  Job Title <span className="text-destructive">*</span>
                </label>
                <input
                  {...register("jobTitle")}
                  placeholder="e.g. React Native Developer needed"
                  className={`${fieldClass(!!errors.jobTitle)} h-9`}
                />
                <FieldError msg={errors.jobTitle?.message} />
              </div>

              {/* Job URL */}
              <div>
                <label className="block text-[12px] font-medium mb-1.5 text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <LinkIcon size={11} />
                    Job URL
                    <span className="text-[11px] text-muted-foreground/50">
                      (optional)
                    </span>
                  </span>
                </label>
                <input
                  {...register("jobUrl")}
                  placeholder="https://www.upwork.com/jobs/..."
                  className={`${fieldClass(!!errors.jobUrl)} h-9`}
                />
                <FieldError msg={errors.jobUrl?.message} />
              </div>

              {/* Job description */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[12px] font-medium text-muted-foreground">
                    Job Description <span className="text-destructive">*</span>
                  </label>
                  <span
                    className={`text-[11px] tabular-nums transition-colors duration-200 ${
                      descLength > 7000
                        ? "text-destructive"
                        : "text-muted-foreground/50"
                    }`}
                  >
                    {descLength.toLocaleString()} / 8,000
                  </span>
                </div>
                <textarea
                  {...register("jobDescription")}
                  rows={8}
                  placeholder="Paste the full Upwork job description here…"
                  className={`${fieldClass(!!errors.jobDescription)} py-2.5 leading-relaxed resize-none`}
                />
                <FieldError msg={errors.jobDescription?.message} />
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Generation options */}
            <div className="flex flex-col gap-4">
              <SectionLabel>Generation Options</SectionLabel>

              {/* Tone */}
              <div>
                <label className="block text-[12px] font-medium mb-2 text-muted-foreground">
                  Tone
                </label>
                <Controller
                  name="tone"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-2 gap-1.5">
                      {TONES.map((t) => (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => field.onChange(t.value)}
                          className={`h-8 px-3 rounded-lg text-[12px] font-medium transition-all duration-150 border ${
                            field.value === t.value
                              ? "bg-accent border-primary/30 text-primary"
                              : "bg-background border-border text-muted-foreground hover:bg-accent/50"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  )}
                />
              </div>

              {/* Formula */}
              <div>
                <label className="block text-[12px] font-medium mb-2 text-muted-foreground">
                  Formula
                </label>
                <Controller
                  name="formula"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-col gap-1.5">
                      {FORMULAS.map((f) => (
                        <button
                          key={f.value}
                          type="button"
                          onClick={() => field.onChange(f.value)}
                          className={`flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-150 border ${
                            field.value === f.value
                              ? "bg-accent border-primary/30"
                              : "bg-background border-border hover:bg-accent/50"
                          }`}
                        >
                          <span
                            className={`text-[12.5px] font-semibold shrink-0 font-heading ${
                              field.value === f.value
                                ? "text-primary"
                                : "text-text-secondary"
                            }`}
                          >
                            {f.label}
                          </span>
                          <span className="text-[11px] text-right ml-3 text-muted-foreground">
                            {f.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                />
              </div>

              {/* Length */}
              <div>
                <label className="block text-[12px] font-medium mb-2 text-muted-foreground">
                  Length
                </label>
                <Controller
                  name="proposalLength"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-3 gap-1.5">
                      {LENGTHS.map((l) => (
                        <button
                          key={l.value}
                          type="button"
                          onClick={() => field.onChange(l.value)}
                          className={`flex flex-col items-center py-2 px-1 rounded-lg transition-all duration-150 border ${
                            field.value === l.value
                              ? "bg-accent border-primary/30"
                              : "bg-background border-border hover:bg-accent/50"
                          }`}
                        >
                          <span
                            className={`text-[12.5px] font-semibold ${
                              field.value === l.value
                                ? "text-primary"
                                : "text-text-secondary"
                            }`}
                          >
                            {l.label}
                          </span>
                          <span className="text-[10px] mt-0.5 text-muted-foreground">
                            {l.sub}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                />
              </div>

              {/* Upwork opener toggle */}
              <Controller
                name="upworkOpener"
                control={control}
                render={({ field }) => (
                  <button
                    type="button"
                    onClick={() => field.onChange(!field.value)}
                    className={`flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-150 border ${
                      field.value
                        ? "bg-accent border-primary/20"
                        : "bg-background border-border hover:bg-accent/50"
                    }`}
                  >
                    {/* Toggle track */}
                    <div
                      className={`relative shrink-0 mt-0.5 rounded-full transition-colors duration-200 ${
                        field.value ? "bg-primary" : "bg-border-strong"
                      }`}
                      style={{ height: "18px", width: "32px" }}
                    >
                      <div
                        className="absolute top-0.5 rounded-full bg-white transition-transform duration-200 shadow-sm"
                        style={{
                          width: "14px",
                          height: "14px",
                          transform: field.value
                            ? "translateX(16px)"
                            : "translateX(2px)",
                        }}
                      />
                    </div>
                    <div>
                      <p className="text-[12.5px] font-medium text-foreground">
                        Upwork Opener
                      </p>
                      <p className="text-[11.5px] mt-0.5 leading-relaxed text-muted-foreground">
                        Prepend a one-line hook addressing the client&apos;s
                        post directly.
                      </p>
                    </div>
                  </button>
                )}
              />
            </div>

            {/* Generate CTA */}
            <button
              type="submit"
              disabled={isStreaming}
              className="w-full h-11 rounded-xl text-[14px] font-semibold font-heading flex items-center justify-center gap-2 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed mt-1 bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active shadow-[0_2px_12px_rgba(200,84,56,0.25)] disabled:shadow-none"
            >
              {isStreaming ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Generating…
                </>
              ) : (
                <>
                  <Sparkles size={15} />
                  {hasGenerated ? "Regenerate" : "Generate Proposal"}
                </>
              )}
            </button>
          </form>
        </div>

        {/* ── RIGHT: Output panel ── */}
        <div className="w-full lg:sticky">
          <GenerateOutput
            content={generatedContent}
            isStreaming={isStreaming}
            isSaving={saveProposal.isPending}
            isDirty={isDirty}
            hasGenerated={hasGenerated}
            onSave={handleSave}
            onRegenerate={handleRegenerate}
          />
        </div>
      </div>
    </>
  );
}
