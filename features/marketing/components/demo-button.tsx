"use client";

import { useState } from "react";
import { Play, Clock4 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/shared/components/ui/dialog";

// ─── Config ──────────────────────────────────────────────────────────────────
// Set DEMO_VIDEO_ID to the YouTube video ID when the demo is ready.
// The button will enable itself automatically once this is set.
const DEMO_VIDEO_ID = ""; // e.g. "dQw4w9WgXcQ"
const IS_DEMO_AVAILABLE = Boolean(DEMO_VIDEO_ID);

// ─────────────────────────────────────────────────────────────────────────────
// Shared button classes
// ─────────────────────────────────────────────────────────────────────────────

const BUTTON_CLASS =
  "border-border-strong h-11 px-7 text-[14px] font-medium tracking-[-0.01em] transition-all duration-200 rounded-lg gap-2";

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function DemoButton() {
  const [open, setOpen] = useState(false);

  // ── Disabled state (no video yet) ────────────────────────────────────────
  if (!IS_DEMO_AVAILABLE) {
    return (
      <TooltipProvider delayDuration={120}>
        <Tooltip>
          {/*
           * Radix Tooltip does not fire on disabled <button> elements because
           * they swallow pointer events. The wrapper <span> acts as the trigger
           * so hover / focus still registers, while the inner button is
           * correctly disabled for assistive technology.
           */}
          <TooltipTrigger asChild>
            <span
              tabIndex={0}
              className="inline-flex cursor-not-allowed rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              aria-label="Watch 60-sec Demo — coming soon"
            >
              <Button
                variant="outline"
                size="lg"
                disabled
                className={`${BUTTON_CLASS} text-text-secondary/50 pointer-events-none`}
                style={{ fontFamily: "var(--font-space-grotesk)" }}
                tabIndex={-1}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Watch 60-sec Demo
              </Button>
            </span>
          </TooltipTrigger>

          <TooltipContent
            side="bottom"
            sideOffset={8}
            className="flex items-center gap-1.5 px-3 py-2 text-[11px] tracking-wide font-medium"
          >
            <Clock4 className="w-3 h-3 shrink-0" />
            Coming soon
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // ── Enabled state (video ready) ──────────────────────────────────────────
  return (
    <>
      <Button
        variant="outline"
        size="lg"
        onClick={() => setOpen(true)}
        className={`${BUTTON_CLASS} text-text-secondary hover:text-foreground hover:bg-accent`}
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        <Play className="w-3.5 h-3.5 fill-current" />
        Watch 60-sec Demo
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        {/* Hidden title for screen readers */}
        <DialogTitle className="sr-only">Propreso — 60-second Demo</DialogTitle>

        <DialogContent
          className="max-w-4xl w-full p-0 overflow-hidden rounded-2xl border-border bg-black gap-0"
          aria-describedby={undefined}
        >
          {/* 16:9 YouTube embed — autoplay starts when dialog opens */}
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            {open && (
              <iframe
                src={`https://www.youtube.com/embed/${DEMO_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="Propreso 60-second Demo"
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
