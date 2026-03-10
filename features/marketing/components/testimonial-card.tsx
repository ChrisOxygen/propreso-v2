import { FaQuoteLeft } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import type { IconType } from "react-icons";
import { cn } from "@/shared/lib/utils";
import type { Testimonial } from "../constants/testimonials";
import { TestimonialAvatar } from "./testimonial-avatar";

// ─── Company icon map ──────────────────────────────────────────────────────
const COMPANY_ICONS: Record<string, IconType> = {
  "Freelance via Upwork": SiUpwork,
};

// ─── Component ────────────────────────────────────────────────────────────

interface TestimonialCardProps {
  testimonial: Testimonial;
  showTitle?: boolean;
  variant?: "light" | "dark";
  className?: string;
}

export function TestimonialCard({
  testimonial,
  showTitle = false,
  variant = "light",
  className,
}: TestimonialCardProps) {
  const isDark = variant === "dark";
  const CompanyIcon = COMPANY_ICONS[testimonial.userDetails.company] ?? null;

  return (
    <div
      className={cn(
        "relative rounded-2xl p-6 md:p-7 flex flex-col",
        isDark
          ? "bg-foreground"
          : "bg-card border border-border hover:border-border-strong hover:shadow-[0_4px_24px_rgba(26,20,18,0.07)] transition-all duration-200",
        className
      )}
    >
      {/* Title — p1 / p2 only */}
      {showTitle && (
        <h3
          className={cn(
            "text-[1.2rem] md:text-[1.45rem] font-extrabold tracking-[-0.03em] leading-[1.15] mb-5",
            isDark ? "text-white" : "text-foreground"
          )}
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {testimonial.title}
        </h3>
      )}

      {/* Quote icon */}
      <FaQuoteLeft
        className={cn(
          "text-[18px] mb-4 shrink-0",
          isDark ? "text-white/20" : "text-primary/30"
        )}
      />

      {/* Summary */}
      <p
        className={cn(
          "text-[13.5px] leading-[1.85] flex-1",
          isDark ? "text-white/72" : "text-text-secondary"
        )}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {testimonial.summary}
      </p>

      {/* User row + company logo */}
      <div className="flex items-end justify-between mt-auto pt-5 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <TestimonialAvatar fullName={testimonial.userDetails.fullName} />
          <div className="min-w-0">
            <p
              className={cn(
                "text-[13px] font-semibold leading-tight truncate",
                isDark ? "text-white" : "text-foreground"
              )}
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {testimonial.userDetails.fullName}
            </p>
            <p
              className={cn(
                "text-[11.5px] leading-tight mt-0.5 truncate",
                isDark ? "text-white/48" : "text-muted-foreground"
              )}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {testimonial.userDetails.position}
            </p>
          </div>
        </div>

        {CompanyIcon && (
          <CompanyIcon
            className={cn(
              "text-[22px] shrink-0",
              isDark ? "text-white/30" : "text-foreground/25"
            )}
          />
        )}
      </div>
    </div>
  );
}
