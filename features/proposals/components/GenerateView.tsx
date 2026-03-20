"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
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
import { TONES } from "@/features/proposals/constants/generation";

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

// ── Component ──────────────────────────────────────────────────────────────

export function GenerateView() {
  const router = useRouter();
  const { data: profiles = [], isPending: profilesPending } = useProfiles();
  const saveProposal = useSaveProposal();
  const [defaultSet, setDefaultSet] = useState(false);

  // ── Unsaved-changes state ──────────────────────────────────────────────
  const [isSaved, setIsSaved] = useState(false);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [editedContent, setEditedContent] = useState<string | null>(null);

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
      rawPost: "",
      tone: "PROFESSIONAL",
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

  const [watchedProfileId, watchedTone, rawPost] = watch(["profileId", "tone", "rawPost"]);

  // Keep a ref with the latest extra body so the transport stays stable
  const extraBodyRef = useRef<Record<string, unknown>>({});
  extraBodyRef.current = {
    profileId: watchedProfileId,
    tone: watchedTone,
    rawPost,
  };

  const transport = useMemo(
    () =>
      new TextStreamChatTransport({
        api: "/api/v1/generations",
        body: () => extraBodyRef.current,
      }),
    [],
  );

  const { messages, sendMessage, regenerate, setMessages, status, error } =
    useChat({ transport });

  // Surface generation errors as toasts
  useEffect(() => {
    if (!error) return;
    const msg = error.message ?? "";
    if (msg.includes("token_limit_reached")) {
      toast.error("Out of tokens", {
        description: "You've used all your generation tokens. Upgrade to Pro for more.",
      });
    } else if (msg.includes("suspicious_post")) {
      toast.error("Post flagged", {
        description: "This job post looks suspicious. Try a different one.",
      });
    } else if (msg.includes("analysis_failed")) {
      toast.error("Analysis failed", {
        description: "Couldn't analyze the job post. Please try again.",
      });
    } else {
      toast.error("Generation failed", {
        description: "Something went wrong. Please try again.",
      });
    }
  }, [error]);

  const isAnalyzing = status === "submitted";
  const isGenerating = status === "streaming";
  const isStreaming = isAnalyzing || isGenerating;
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
    setEditedContent(null);
    setMessages([]);
    sendMessage({ text: data.rawPost });
  }

  function handleRegenerate() {
    setIsSaved(false);
    regenerate();
  }

  async function handleSave() {
    const finalContent = editedContent ?? generatedContent;
    if (!finalContent) return;
    const data = getValues();
    try {
      const result = await saveProposal.mutateAsync({
        ...data,
        generatedContent: finalContent,
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

  const rawPostLength = rawPost?.length ?? 0;

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
      <div className="flex flex-col lg:grid lg:grid-cols-[420px_1fr] gap-6 lg:h-full">
        {/* ── LEFT: Config form ── */}
        <div className="w-full rounded-xl bg-card border border-border lg:overflow-y-auto lg:flex lg:flex-col">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 p-5 lg:flex-1"
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

            {/* Job Post */}
            <div className="flex flex-col gap-2 flex-1 min-h-0">
              <SectionLabel>Job Post</SectionLabel>
              <div className="flex flex-col flex-1 min-h-0">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[12px] font-medium text-muted-foreground">
                    Paste job post <span className="text-destructive">*</span>
                  </label>
                  <span
                    className={`text-[11px] tabular-nums transition-colors duration-200 ${
                      rawPostLength > 7000
                        ? "text-destructive"
                        : "text-muted-foreground/50"
                    }`}
                  >
                    {rawPostLength.toLocaleString()} / 8,000
                  </span>
                </div>
                <textarea
                  {...register("rawPost")}
                  placeholder="Paste the full job post here…"
                  className={`${fieldClass(!!errors.rawPost)} py-2.5 leading-relaxed resize-none flex-1 min-h-[8rem] scrollbar-brand`}
                />
                <FieldError msg={errors.rawPost?.message} />
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Generation Options */}
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
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="h-9 w-full text-[13px] bg-background border-border focus:border-primary focus:ring-2 focus:ring-primary/10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TONES.map((t) => (
                          <SelectItem
                            key={t.value}
                            value={t.value}
                            className="text-[13px]"
                          >
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* Generate CTA */}
            <button
              type="submit"
              disabled={isStreaming}
              className="w-full h-11 rounded-xl text-[14px] font-semibold font-heading flex items-center justify-center gap-2 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed mt-1 bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active shadow-[0_2px_12px_rgba(200,84,56,0.25)] disabled:shadow-none"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Analyzing…
                </>
              ) : isGenerating ? (
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
        <div className="w-full min-h-0 h-full">
          <GenerateOutput
            content={generatedContent}
            isAnalyzing={isAnalyzing}
            isStreaming={isStreaming}
            isSaving={saveProposal.isPending}
            isDirty={isDirty}
            hasGenerated={hasGenerated}
            onSave={handleSave}
            onRegenerate={handleRegenerate}
            onContentChange={setEditedContent}
          />
        </div>
      </div>
    </>
  );
}
