"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Sparkles, Briefcase } from "lucide-react";
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
      selectedPortfolioItem: null,
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

  // Derive portfolio items from the selected profile
  const selectedProfile = profiles.find((p) => p.id === formValues.profileId);
  const portfolioItems = (() => {
    try {
      const items = selectedProfile?.portfolioItems as
        | Array<{ url: string; description: string }>
        | undefined;
      return Array.isArray(items) ? items : [];
    } catch {
      return [];
    }
  })();

  // Keep a ref with the latest extra body so the transport stays stable
  const extraBodyRef = useRef<Record<string, unknown>>({});
  extraBodyRef.current = {
    profileId: formValues.profileId,
    tone: formValues.tone,
    rawPost: formValues.rawPost,
    selectedPortfolioItem: formValues.selectedPortfolioItem ?? null,
  };

  const transport = useMemo(
    () =>
      new TextStreamChatTransport({
        api: "/api/v1/generations",
        body: () => extraBodyRef.current,
      }),
    [],
  );

  const { messages, sendMessage, regenerate, setMessages, status } = useChat({
    transport,
  });

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
    setMessages([]);
    sendMessage({ text: data.rawPost });
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

  const rawPost = watch("rawPost");
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

            {/* Portfolio item selector — only shown when profile has items */}
            {portfolioItems.length > 0 && (
              <>
                <div className="h-px bg-border" />
                <div>
                  <SectionLabel>Highlight a Portfolio Item</SectionLabel>
                  <Controller
                    name="selectedPortfolioItem"
                    control={control}
                    render={({ field }) => (
                      <div className="flex flex-col gap-2">
                        {portfolioItems.map((item, i) => {
                          const isSelected =
                            field.value?.url === item.url &&
                            field.value?.description === item.description;
                          let hostname = item.url;
                          try {
                            hostname = new URL(item.url).hostname;
                          } catch { /* use raw url */ }

                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() =>
                                field.onChange(isSelected ? null : item)
                              }
                              className={`flex items-start gap-2.5 p-3 rounded-lg text-left transition-all duration-150 border ${
                                isSelected
                                  ? "bg-accent border-primary/20"
                                  : "bg-background border-border hover:bg-accent/50"
                              }`}
                            >
                              <Briefcase
                                size={13}
                                className={`shrink-0 mt-0.5 ${isSelected ? "text-primary" : "text-muted-foreground"}`}
                              />
                              <div className="min-w-0">
                                <p className="text-[12px] font-medium text-foreground leading-snug line-clamp-2">
                                  {item.description.length > 60
                                    ? item.description.slice(0, 60) + "…"
                                    : item.description}
                                </p>
                                <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                                  {hostname}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  />
                </div>
              </>
            )}

            <div className="h-px bg-border" />

            {/* Job Post */}
            <div className="flex flex-col gap-2">
              <SectionLabel>Job Post</SectionLabel>
              <div>
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
                  rows={8}
                  placeholder="Paste the full job post here…"
                  className={`${fieldClass(!!errors.rawPost)} py-2.5 leading-relaxed resize-none`}
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
        <div className="w-full lg:sticky">
          <GenerateOutput
            content={generatedContent}
            isAnalyzing={isAnalyzing}
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
