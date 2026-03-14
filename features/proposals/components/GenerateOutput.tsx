"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Copy,
  Check,
  BookmarkPlus,
  Loader2,
  Sparkles,
  AlertTriangle,
  ScanText,
  Bold,
  Italic,
  List,
  ListOrdered,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { UPWORK_CHAR_LIMIT } from "@/features/proposals/constants/generation";
import { ScrollArea } from "@/shared/components/ui/scroll-area";

interface GenerateOutputProps {
  content: string;
  isAnalyzing: boolean;
  isStreaming: boolean;
  isSaving: boolean;
  isDirty: boolean;
  onSave: () => void;
  onRegenerate: () => void;
  hasGenerated: boolean;
  onContentChange?: (value: string) => void;
}

function charCountClass(count: number) {
  if (count >= UPWORK_CHAR_LIMIT) return "text-destructive";
  if (count >= 4500) return "text-amber-500";
  return "text-muted-foreground/60";
}

type FormatType = "bold" | "italic" | "ul" | "ol";

const TOOLBAR_ITEMS: Array<{
  type: FormatType;
  icon: React.ElementType;
  label: string;
}> = [
  { type: "bold", icon: Bold, label: "Bold" },
  { type: "italic", icon: Italic, label: "Italic" },
  { type: "ul", icon: List, label: "Bullet list" },
  { type: "ol", icon: ListOrdered, label: "Numbered list" },
];

const mdComponents: React.ComponentProps<typeof ReactMarkdown>["components"] =
  {
    p: ({ children }) => (
      <p className="mb-3 last:mb-0 text-[13.5px] leading-[1.8] text-foreground">
        {children}
      </p>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    ul: ({ children }) => (
      <ul className="list-disc pl-5 mb-3 space-y-0.5 text-[13.5px] leading-[1.8] text-foreground">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-5 mb-3 space-y-0.5 text-[13.5px] leading-[1.8] text-foreground">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-[13.5px] leading-[1.8] text-foreground">{children}</li>
    ),
  };

export function GenerateOutput({
  content,
  isAnalyzing,
  isStreaming,
  isSaving,
  isDirty,
  onSave,
  onRegenerate,
  hasGenerated,
  onContentChange,
}: GenerateOutputProps) {
  const [copied, setCopied] = useState(false);
  const [localValue, setLocalValue] = useState("");
  const [editorTab, setEditorTab] = useState<"write" | "preview">("write");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef(content);
  contentRef.current = content;

  const isEditing = hasGenerated && !isStreaming;

  // When streaming ends, initialize the editor with the final streamed content
  useEffect(() => {
    if (!isStreaming && contentRef.current) {
      setLocalValue(contentRef.current);
    }
  }, [isStreaming]);

  // Reset editor when a new generation starts
  useEffect(() => {
    if (!hasGenerated) {
      setLocalValue("");
      setEditorTab("write");
    }
  }, [hasGenerated]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const val = e.target.value;
    setLocalValue(val);
    onContentChange?.(val);
  }

  function applyFormat(format: FormatType) {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = localValue.slice(start, end);

    let newValue = localValue;
    let newStart = start;
    let newEnd = end;

    if (format === "bold") {
      const inner = selected || "bold text";
      newValue =
        localValue.slice(0, start) + `**${inner}**` + localValue.slice(end);
      newStart = start + 2;
      newEnd = newStart + inner.length;
    } else if (format === "italic") {
      const inner = selected || "italic text";
      newValue =
        localValue.slice(0, start) + `*${inner}*` + localValue.slice(end);
      newStart = start + 1;
      newEnd = newStart + inner.length;
    } else if (format === "ul") {
      if (selected) {
        const formatted = selected
          .split("\n")
          .map((l) => `- ${l}`)
          .join("\n");
        newValue =
          localValue.slice(0, start) + formatted + localValue.slice(end);
        newStart = start;
        newEnd = start + formatted.length;
      } else {
        const lineStart = localValue.lastIndexOf("\n", start - 1) + 1;
        const prefix = "- ";
        newValue =
          localValue.slice(0, lineStart) +
          prefix +
          localValue.slice(lineStart);
        newStart = newEnd = start + prefix.length;
      }
    } else if (format === "ol") {
      if (selected) {
        const formatted = selected
          .split("\n")
          .map((l, i) => `${i + 1}. ${l}`)
          .join("\n");
        newValue =
          localValue.slice(0, start) + formatted + localValue.slice(end);
        newStart = start;
        newEnd = start + formatted.length;
      } else {
        const lineStart = localValue.lastIndexOf("\n", start - 1) + 1;
        const prefix = "1. ";
        newValue =
          localValue.slice(0, lineStart) +
          prefix +
          localValue.slice(lineStart);
        newStart = newEnd = start + prefix.length;
      }
    }

    setLocalValue(newValue);
    onContentChange?.(newValue);

    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.selectionStart = newStart;
        textareaRef.current.selectionEnd = newEnd;
        textareaRef.current.focus();
      }
    });
  }

  const displayValue = isEditing ? localValue : content;
  const charCount = displayValue.length;
  const wordCount = displayValue.trim()
    ? displayValue.trim().split(/\s+/).length
    : 0;

  async function handleCopy() {
    if (!displayValue) return;
    await navigator.clipboard.writeText(displayValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    if (isDirty) {
      toast("Proposal copied!", {
        description: "Save it to your history so you can find it later.",
        action: { label: "Save now", onClick: onSave },
      });
    }
  }

  // ── Analyzing state ──────────────────────────────────────────────────────
  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-85 rounded-xl bg-accent/40 border border-dashed border-border-strong">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-accent border border-primary/20">
          <ScanText size={18} className="text-primary animate-pulse" />
        </div>
        <p className="text-[13px] font-medium mb-1 text-text-secondary">
          Analyzing job post…
        </p>
        <p className="text-[12px] text-center max-w-60 text-muted-foreground">
          Reading the post and building a strategy before writing.
        </p>
      </div>
    );
  }

  // ── Empty state ──────────────────────────────────────────────────────────
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
      {/* ── Output box ── */}
      <div className="relative flex-1 rounded-xl overflow-hidden bg-card border border-border min-h-85">
        {isEditing ? (
          <>
            {/* Toolbar: Write/Preview tabs + formatting buttons */}
            <div className="flex items-center justify-between px-2.5 py-2 border-b border-border bg-background/60">
              {/* Write / Preview tabs */}
              <div className="flex items-center gap-0.5">
                {(["write", "preview"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setEditorTab(tab)}
                    className={`h-7 px-3 rounded-md text-[12px] font-medium transition-colors duration-100 capitalize ${
                      editorTab === tab
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Formatting buttons — only visible in Write tab */}
              {editorTab === "write" && (
                <div className="flex items-center gap-0.5">
                  {TOOLBAR_ITEMS.map(({ type, icon: Icon, label }) => (
                    <button
                      key={type}
                      type="button"
                      title={label}
                      onClick={() => applyFormat(type)}
                      className="inline-flex items-center justify-center w-7 h-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-100"
                    >
                      <Icon size={14} />
                    </button>
                  ))}
                  <div className="w-px h-3.5 bg-border mx-1.5" />
                  <span className="text-[10.5px] text-muted-foreground/50 select-none pr-1">
                    Markdown
                  </span>
                </div>
              )}
            </div>

            {editorTab === "write" ? (
              /* Write tab: auto-resizing textarea via mirror-div pattern */
              <ScrollArea className="h-[340px]">
                <div className="relative min-h-[340px]">
                  {/* Invisible mirror — sizes the scroll container to content */}
                  <div
                    aria-hidden
                    className="invisible whitespace-pre-wrap break-words px-5 py-4 text-[13.5px] leading-[1.8] min-h-[340px] pointer-events-none"
                  >
                    {localValue + "\n"}
                  </div>
                  {/* Textarea overlays the mirror exactly */}
                  <textarea
                    ref={textareaRef}
                    value={localValue}
                    onChange={handleChange}
                    spellCheck
                    placeholder="Your proposal will appear here…"
                    className="absolute inset-0 w-full h-full px-5 py-4 text-[13.5px] leading-[1.8] text-foreground bg-card resize-none overflow-hidden outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </ScrollArea>
            ) : (
              /* Preview tab: rendered markdown */
              <ScrollArea className="h-[340px]">
                <div className="px-5 py-4">
                  <ReactMarkdown components={mdComponents}>
                    {localValue}
                  </ReactMarkdown>
                </div>
              </ScrollArea>
            )}
          </>
        ) : (
          /* Streaming — plain text with animated cursor */
          <ScrollArea className="h-full min-h-85">
            <div className="p-5">
              <p className="text-[13.5px] leading-[1.8] whitespace-pre-wrap text-foreground">
                {content}
                <span className="inline-block w-0.5 h-3.5 ml-0.5 align-middle animate-pulse bg-primary" />
              </p>
            </div>
          </ScrollArea>
        )}
      </div>

      {/* ── Unsaved banner ── */}
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
            {isSaving ? (
              <Loader2 size={11} className="animate-spin" />
            ) : (
              <BookmarkPlus size={11} />
            )}
            Save now
          </button>
        </div>
      )}

      {/* ── Footer: counts + actions ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <span
            className={`text-[11.5px] tabular-nums transition-colors duration-200 ${charCountClass(charCount)}`}
          >
            {charCount.toLocaleString()} / {UPWORK_CHAR_LIMIT.toLocaleString()}{" "}
            chars
          </span>
          <span className="text-[11.5px] text-border-strong">·</span>
          <span className="text-[11.5px] text-muted-foreground/60">
            {wordCount} words
          </span>
        </div>

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
            disabled={!displayValue || isStreaming}
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
            disabled={isStreaming || isSaving || !displayValue}
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
