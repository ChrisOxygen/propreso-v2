"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Check, BookmarkPlus, Loader2, Sparkles } from "lucide-react";

const UPWORK_CHAR_LIMIT = 5000;

interface GenerateOutputProps {
  content: string;
  isStreaming: boolean;
  isSaving: boolean;
  onSave: () => void;
  onRegenerate: () => void;
  hasGenerated: boolean;
}

function charCountColor(count: number) {
  if (count >= UPWORK_CHAR_LIMIT) return "rgba(239,68,68,0.9)";
  if (count >= 4500) return "rgba(234,179,8,0.9)";
  return "rgba(251,247,243,0.3)";
}

export function GenerateOutput({
  content,
  isStreaming,
  isSaving,
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
  }

  // Empty state
  if (!hasGenerated) {
    return (
      <div
        className="flex flex-col items-center justify-center h-full min-h-[340px] rounded-xl"
        style={{
          background: "rgba(255,255,255,0.015)",
          border: "1px dashed rgba(255,255,255,0.1)",
        }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
          style={{ background: "rgba(200,73,26,0.1)" }}
        >
          <Sparkles size={18} style={{ color: "#C8491A" }} />
        </div>
        <p
          className="text-[13px] font-medium mb-1"
          style={{ color: "rgba(251,247,243,0.5)" }}
        >
          Your proposal will appear here
        </p>
        <p
          className="text-[12px] text-center max-w-[240px]"
          style={{ color: "rgba(251,247,243,0.25)" }}
        >
          Fill in the job details and click Generate to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Output box */}
      <div
        className="relative flex-1 rounded-xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.08)",
          minHeight: "340px",
        }}
      >
        <div className="h-full overflow-y-auto p-5">
          <p
            className="text-[13.5px] leading-[1.8] whitespace-pre-wrap"
            style={{
              color: "#FBF7F3",
              fontFamily: "var(--font-inter)",
            }}
          >
            {content}
            {isStreaming && (
              <span
                className="inline-block w-[2px] h-[14px] ml-0.5 align-middle animate-pulse"
                style={{ background: "#C8491A" }}
              />
            )}
          </p>
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Footer: counts + actions */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Counts */}
        <div className="flex items-center gap-3">
          <span
            className="text-[11.5px] tabular-nums transition-colors duration-200"
            style={{ color: charCountColor(charCount) }}
          >
            {charCount.toLocaleString()} / {UPWORK_CHAR_LIMIT.toLocaleString()} chars
          </span>
          <span
            className="text-[11.5px]"
            style={{ color: "rgba(255,255,255,0.12)" }}
          >
            ·
          </span>
          <span
            className="text-[11.5px]"
            style={{ color: "rgba(251,247,243,0.28)" }}
          >
            {wordCount} words
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRegenerate}
            disabled={isStreaming || isSaving}
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] font-medium transition-all duration-150 disabled:opacity-40"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
              color: "rgba(251,247,243,0.65)",
            }}
          >
            <Sparkles size={12} />
            Regenerate
          </button>

          <button
            type="button"
            onClick={handleCopy}
            disabled={!content || isStreaming}
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] font-medium transition-all duration-150 disabled:opacity-40"
            style={{
              background: copied
                ? "rgba(34,197,94,0.12)"
                : "rgba(255,255,255,0.05)",
              border: copied
                ? "1px solid rgba(34,197,94,0.25)"
                : "1px solid rgba(255,255,255,0.09)",
              color: copied ? "rgba(34,197,94,0.9)" : "rgba(251,247,243,0.65)",
            }}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied!" : "Copy"}
          </button>

          <button
            type="button"
            onClick={onSave}
            disabled={isStreaming || isSaving || !content}
            className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-lg text-[12px] font-semibold transition-all duration-150 disabled:opacity-40"
            style={{
              background: "linear-gradient(135deg, #C8491A 0%, #D45820 100%)",
              color: "#fff",
              boxShadow: isStreaming || isSaving ? "none" : "0 0 16px rgba(200,73,26,0.25)",
              fontFamily: "var(--font-space-grotesk)",
            }}
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
