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
    <p
      className="text-[11px] font-semibold uppercase tracking-widest mb-2.5"
      style={{ color: "rgba(251,247,243,0.3)" }}
    >
      {children}
    </p>
  );
}

function fieldStyle(hasError = false): React.CSSProperties {
  return {
    background: "rgba(255,255,255,0.04)",
    border: hasError
      ? "1px solid rgba(200,73,26,0.5)"
      : "1px solid rgba(255,255,255,0.09)",
    color: "#FBF7F3",
    outline: "none",
  };
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 text-[11.5px]" style={{ color: "rgba(200,73,26,0.9)" }}>
      {msg}
    </p>
  );
}

// ── Option metadata ────────────────────────────────────────────────────────

const FORMULAS = [
  { value: "AIDA", label: "AIDA", desc: "Attention → Interest → Desire → Action" },
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
    []
  );

  const { messages, sendMessage, regenerate, setMessages, status } = useChat({
    transport,
  });

  const isStreaming = status === "streaming" || status === "submitted";
  const lastAssistantMsg = [...messages].reverse().find((m) => m.role === "assistant");
  const generatedContent = lastAssistantMsg ? extractText(lastAssistantMsg) : "";
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
        <AlertDialogContent
          style={{
            background: "#1A1410",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle style={{ color: "#FBF7F3" }}>
              Leave without saving?
            </AlertDialogTitle>
            <AlertDialogDescription style={{ color: "rgba(251,247,243,0.45)" }}>
              Your generated proposal hasn&apos;t been saved to history yet. If you leave
              now, it will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(251,247,243,0.7)",
              }}
            >
              Stay
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => router.push("/proposals")}
              style={{
                background: "linear-gradient(135deg, #C8491A 0%, #D45820 100%)",
                color: "#fff",
              }}
            >
              Leave anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── Page header ── */}
      <div className="mb-6">
        <button
          type="button"
          onClick={handleBackClick}
          className="inline-flex items-center gap-1.5 text-[12px] font-medium mb-4 transition-opacity duration-150 hover:opacity-70"
          style={{ color: "rgba(251,247,243,0.4)" }}
        >
          <ArrowLeft size={13} />
          Proposals
        </button>
        <h1
          className="text-[1.35rem] font-bold tracking-[-0.03em]"
          style={{
            color: "#FBF7F3",
            fontFamily: "var(--font-space-grotesk)",
          }}
        >
          New Proposal
        </h1>
        <p
          className="mt-0.5 text-[13px]"
          style={{
            color: "rgba(251,247,243,0.38)",
            fontFamily: "var(--font-inter)",
          }}
        >
          Configure your options and paste the job description to generate.
        </p>
      </div>

      {/* ── Layout ── */}
      <div className="flex flex-col lg:grid lg:grid-cols-[420px_1fr] gap-6 items-start">
        {/* ── LEFT: Config form ── */}
        <div
          className="w-full rounded-xl"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 p-5">
            {/* Profile */}
            <div>
              <SectionLabel>Profile</SectionLabel>
              {profilesPending ? (
                <div
                  className="h-10 rounded-lg animate-pulse"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                />
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

            <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

            {/* Job details */}
            <div className="flex flex-col gap-4">
              <SectionLabel>Job Details</SectionLabel>

              {/* Job title */}
              <div>
                <label
                  className="block text-[12px] font-medium mb-1.5"
                  style={{ color: "rgba(251,247,243,0.45)" }}
                >
                  Job Title <span style={{ color: "#C8491A" }}>*</span>
                </label>
                <input
                  {...register("jobTitle")}
                  placeholder="e.g. React Native Developer needed"
                  className="w-full h-9 px-3.5 rounded-lg text-[13px] transition-all duration-150"
                  style={fieldStyle(!!errors.jobTitle)}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(200,73,26,0.5)";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(200,73,26,0.08)";
                  }}
                  onBlur={(e) => {
                    if (!errors.jobTitle) {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                />
                <FieldError msg={errors.jobTitle?.message} />
              </div>

              {/* Job URL */}
              <div>
                <label
                  className="block text-[12px] font-medium mb-1.5"
                  style={{ color: "rgba(251,247,243,0.45)" }}
                >
                  <span className="inline-flex items-center gap-1">
                    <LinkIcon size={11} />
                    Job URL
                    <span className="text-[11px]" style={{ color: "rgba(251,247,243,0.25)" }}>
                      (optional)
                    </span>
                  </span>
                </label>
                <input
                  {...register("jobUrl")}
                  placeholder="https://www.upwork.com/jobs/..."
                  className="w-full h-9 px-3.5 rounded-lg text-[13px] transition-all duration-150"
                  style={fieldStyle(!!errors.jobUrl)}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(200,73,26,0.5)";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(200,73,26,0.08)";
                  }}
                  onBlur={(e) => {
                    if (!errors.jobUrl) {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                />
                <FieldError msg={errors.jobUrl?.message} />
              </div>

              {/* Job description */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    className="text-[12px] font-medium"
                    style={{ color: "rgba(251,247,243,0.45)" }}
                  >
                    Job Description <span style={{ color: "#C8491A" }}>*</span>
                  </label>
                  <span
                    className="text-[11px] tabular-nums"
                    style={{
                      color:
                        descLength > 7000
                          ? "rgba(200,73,26,0.8)"
                          : "rgba(251,247,243,0.25)",
                    }}
                  >
                    {descLength.toLocaleString()} / 8,000
                  </span>
                </div>
                <textarea
                  {...register("jobDescription")}
                  rows={8}
                  placeholder="Paste the full Upwork job description here…"
                  className="w-full px-3.5 py-2.5 rounded-lg text-[13px] leading-relaxed resize-none transition-all duration-150"
                  style={fieldStyle(!!errors.jobDescription)}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(200,73,26,0.5)";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(200,73,26,0.08)";
                  }}
                  onBlur={(e) => {
                    if (!errors.jobDescription) {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                />
                <FieldError msg={errors.jobDescription?.message} />
              </div>
            </div>

            <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

            {/* Generation options */}
            <div className="flex flex-col gap-4">
              <SectionLabel>Generation Options</SectionLabel>

              {/* Tone */}
              <div>
                <label
                  className="block text-[12px] font-medium mb-2"
                  style={{ color: "rgba(251,247,243,0.45)" }}
                >
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
                          className="h-8 px-3 rounded-lg text-[12px] font-medium transition-all duration-150"
                          style={{
                            background:
                              field.value === t.value
                                ? "rgba(200,73,26,0.15)"
                                : "rgba(255,255,255,0.03)",
                            border:
                              field.value === t.value
                                ? "1px solid rgba(200,73,26,0.35)"
                                : "1px solid rgba(255,255,255,0.07)",
                            color:
                              field.value === t.value
                                ? "#E06030"
                                : "rgba(251,247,243,0.5)",
                          }}
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
                <label
                  className="block text-[12px] font-medium mb-2"
                  style={{ color: "rgba(251,247,243,0.45)" }}
                >
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
                          className="flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-150"
                          style={{
                            background:
                              field.value === f.value
                                ? "rgba(200,73,26,0.1)"
                                : "rgba(255,255,255,0.02)",
                            border:
                              field.value === f.value
                                ? "1px solid rgba(200,73,26,0.3)"
                                : "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <span
                            className="text-[12.5px] font-semibold shrink-0"
                            style={{
                              color:
                                field.value === f.value
                                  ? "#E06030"
                                  : "rgba(251,247,243,0.65)",
                              fontFamily: "var(--font-space-grotesk)",
                            }}
                          >
                            {f.label}
                          </span>
                          <span
                            className="text-[11px] text-right ml-3"
                            style={{ color: "rgba(251,247,243,0.28)" }}
                          >
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
                <label
                  className="block text-[12px] font-medium mb-2"
                  style={{ color: "rgba(251,247,243,0.45)" }}
                >
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
                          className="flex flex-col items-center py-2 px-1 rounded-lg transition-all duration-150"
                          style={{
                            background:
                              field.value === l.value
                                ? "rgba(200,73,26,0.15)"
                                : "rgba(255,255,255,0.03)",
                            border:
                              field.value === l.value
                                ? "1px solid rgba(200,73,26,0.35)"
                                : "1px solid rgba(255,255,255,0.07)",
                          }}
                        >
                          <span
                            className="text-[12.5px] font-semibold"
                            style={{
                              color:
                                field.value === l.value
                                  ? "#E06030"
                                  : "rgba(251,247,243,0.6)",
                            }}
                          >
                            {l.label}
                          </span>
                          <span
                            className="text-[10px] mt-0.5"
                            style={{ color: "rgba(251,247,243,0.25)" }}
                          >
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
                    className="flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-150"
                    style={{
                      background: field.value
                        ? "rgba(200,73,26,0.08)"
                        : "rgba(255,255,255,0.02)",
                      border: field.value
                        ? "1px solid rgba(200,73,26,0.22)"
                        : "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    {/* Toggle */}
                    <div
                      className="relative shrink-0 mt-0.5 rounded-full transition-colors duration-200"
                      style={{
                        background: field.value ? "#C8491A" : "rgba(255,255,255,0.1)",
                        height: "18px",
                        width: "32px",
                      }}
                    >
                      <div
                        className="absolute top-[2px] rounded-full bg-white transition-transform duration-200"
                        style={{
                          width: "14px",
                          height: "14px",
                          transform: field.value ? "translateX(16px)" : "translateX(2px)",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                        }}
                      />
                    </div>
                    <div>
                      <p className="text-[12.5px] font-medium" style={{ color: "#FBF7F3" }}>
                        Upwork Opener
                      </p>
                      <p
                        className="text-[11.5px] mt-0.5 leading-relaxed"
                        style={{ color: "rgba(251,247,243,0.35)" }}
                      >
                        Prepend a one-line hook addressing the client&apos;s post directly.
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
              className="w-full h-11 rounded-xl text-[14px] font-semibold flex items-center justify-center gap-2 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
              style={{
                background: "linear-gradient(135deg, #C8491A 0%, #D45820 100%)",
                color: "#fff",
                boxShadow: isStreaming ? "none" : "0 0 24px rgba(200,73,26,0.35)",
                fontFamily: "var(--font-space-grotesk)",
              }}
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
        <div className="w-full lg:sticky lg:top-6">
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
