"use client";

import { useState, useEffect, useCallback } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { cn } from "@/shared/lib/utils";
import type { Testimonial } from "../constants/testimonials";
import { TestimonialAvatar } from "./testimonial-avatar";

// direction="vertical"   → slides left-to-right  (translateX)
// direction="horizontal" → slides bottom-to-top   (translateY)

interface TestimonialsSliderProps {
  testimonials: Testimonial[];
  direction: "horizontal" | "vertical";
  startingBackground: "light" | "dark";
  showIndicators?: boolean;
  className?: string;
}

export function TestimonialsSlider({
  testimonials,
  direction,
  startingBackground,
  showIndicators = false,
  className,
}: TestimonialsSliderProps) {
  const [current, setCurrent] = useState(0);
  const isDark = startingBackground === "dark";
  const isXAxis = direction === "vertical"; // vertical prop = left-to-right = X axis

  const advance = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const id = setInterval(advance, 6000);
    return () => clearInterval(id);
  }, [advance]);

  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden min-h-[200px] h-full",
        isDark ? "bg-foreground" : "bg-card border border-border",
        className,
      )}
    >
      {/* Dot indicators — optional, subtle, top center */}
      {showIndicators && (
        <div className="absolute top-3 left-0 right-0 flex justify-center gap-1.5 z-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "rounded-full transition-all duration-300 h-1",
                i === current ? "w-5" : "w-1",
                isDark
                  ? i === current
                    ? "bg-white/50"
                    : "bg-white/20"
                  : i === current
                    ? "bg-foreground/35"
                    : "bg-foreground/12",
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Slides — absolutely stacked, animated */}
      {testimonials.map((t, i) => {
        const offset = i - current;
        const transform = isXAxis
          ? `translateX(${offset * 100}%)`
          : `translateY(${offset * 100}%)`;

        return (
          <div
            key={i}
            className="absolute inset-0 p-5 flex flex-col transition-transform duration-700 ease-in-out"
            style={{ transform }}
            aria-hidden={i !== current}
          >
            {/* Quote icon */}
            <FaQuoteLeft
              className="text-[15px] shrink-0 text-primary"
            />

            {/* Summary */}
            <p
              className={cn(
                "text-[12.5px] leading-[1.85] line-clamp-4 mt-3",
                isDark ? "text-white/68" : "text-text-secondary",
              )}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t.summary}
            </p>

            {/* User */}
            <div className="flex items-center gap-2.5 mt-auto pt-4 shrink-0">
              <TestimonialAvatar
                fullName={t.userDetails.fullName}
                className="size-7"
              />
              <div className="min-w-0">
                <p
                  className={cn(
                    "text-[11.5px] font-semibold leading-tight truncate",
                    isDark ? "text-white" : "text-foreground",
                  )}
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {t.userDetails.fullName}
                </p>
                <p
                  className={cn(
                    "text-[10.5px] leading-tight mt-0.5 truncate",
                    isDark ? "text-white/45" : "text-muted-foreground",
                  )}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {t.userDetails.position}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
