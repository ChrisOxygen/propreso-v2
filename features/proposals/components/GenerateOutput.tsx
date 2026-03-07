"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Copy, Check, BookmarkPlus, Loader2, Sparkles, AlertTriangle } from "lucide-react";

const UPWORK_CHAR_LIMIT = 5000;

interface GenerateOutputProps {
  content: string;
  isStreaming: boolean;
  isSaving: boolean;
  isDirty: boolean;
  onSave: () => void;
  onRegenerate: () => void;
  hasGenerated: boolean;
}

function charCountClass(count: number) {
  if (count >= UPWORK_CHAR_LIMIT) return "text-destructive";
  if (count >= 4500) return "text-amber-500";
  return "text-muted-foreground/60";
}

export function GenerateOutput({
  content,
  isStreaming,
  isSaving,
  isDirty,
  onSave,
  onRegenerate,
  hasGenerated,
}: GenerateOutputProps) {
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const charCount = content.length;
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  // Auto-scroll to bottom while streaming
  useEffect(() => {
    if (isStreaming) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [content, isStreaming]);

  async function handleCopy() {
    if (!content) return;
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    if (isDirty) {
      toast("Proposal copied!", {
        description: "Save it to your history so you can find it later.",
        action: {
          label: "Save now",
          onClick: onSave,
        },
      });
    }
  }

  // Empty state
  if (!hasGenerated) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-85 rounded-xl bg-accent/40 border border-dashed border-border-strong">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-accent border border-primary/20">
          <Sparkles size={18} className="text-primary" />
        </div>
        <p className="text-[13px] font-medium mb-1 text-text-secondary">
          Your proposal will appear here
        </p>
        <p className="text-[12px] text-center max-w-60 text-muted-foreground">
          Fill in the job details and click Generate to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Output box */}
      <div className="relative flex-1 rounded-xl overflow-hidden bg-card border border-border min-h-85">
        <div className="h-full overflow-y-auto p-5">
          <p className="text-[13.5px] leading-[1.8] whitespace-pre-wrap text-foreground">
            {content}
            {isStreaming && (
              <span className="inline-block w-0.5 h-3.5 ml-0.5 align-middle animate-pulse bg-primary" />
            )}
          </p>
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Unsaved banner */}
      {isDirty && (
        <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg bg-accent border border-primary/20">
          <div className="flex items-center gap-2">
            <AlertTriangle size={13} className="text-primary/70 shrink-0" />
            <p className="text-[12px] text-text-secondary">
              Unsaved — navigate away and this proposal will be lost.
            </p>
          </div>
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="shrink-0 inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md text-[11.5px] font-semibold font-heading transition-all duration-150 disabled:opacity-50 bg-primary/10 border border-primary/25 text-primary hover:bg-primary/15"
          >
            {isSaving ? <Loader2 size={11} className="animate-spin" /> : <BookmarkPlus size={11} />}
            Save now
          </button>
        </div>
      )}

      {/* Footer: counts + actions */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Counts */}
        <div className="flex items-center gap-3">
          <span className={`text-[11.5px] tabular-nums transition-colors duration-200 ${charCountClass(charCount)}`}>
            {charCount.toLocaleString()} / {UPWORK_CHAR_LIMIT.toLocaleString()} chars
          </span>
          <span className="text-[11.5px] text-border-strong">·</span>
          <span className="text-[11.5px] text-muted-foreground/60">
            {wordCount} words
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRegenerate}
            disabled={isStreaming || isSaving}
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] font-medium transition-all duration-150 disabled:opacity-40 bg-background border border-border text-text-secondary hover:bg-accent"
          >
            <Sparkles size={12} />
            Regenerate
          </button>

          <button
            type="button"
            onClick={handleCopy}
            disabled={!content || isStreaming}
            className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] font-medium transition-all duration-150 disabled:opacity-40 border ${
              copied
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-background border-border text-text-secondary hover:bg-accent"
            }`}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied!" : "Copy"}
          </button>

          <button
            type="button"
            onClick={onSave}
            disabled={isStreaming || isSaving || !content}
            className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-lg text-[12px] font-semibold font-heading transition-all duration-150 disabled:opacity-40 bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active shadow-[0_2px_8px_rgba(200,84,56,0.2)] disabled:shadow-none"
          >
            {isSaving ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <BookmarkPlus size={12} />
            )}
            {isSaving ? "Saving…" : "Save to History"}
          </button>
        </div>
      </div>
    </div>
  );
}
