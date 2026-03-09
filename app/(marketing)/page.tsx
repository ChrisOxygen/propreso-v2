import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { HeroNav } from "@/features/marketing/components/hero-nav";
import { cn } from "@/shared/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Stats
// ─────────────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "60s", label: "To write a full proposal" },
  { value: "3x", label: "More bids sent per day" },
  { value: "10", label: "Free proposals on sign-up" },
  { value: "100%", label: "Tailored to your niche" },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroNav />

      <main>
        {/* ═══════════════════════════════════════════════════
            HERO SECTION
        ═══════════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col items-center overflow-hidden pt-24">
          {/* ── Background layers ─────────────────────────── */}

          {/* Subtle warm radial bloom from top-center */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 55% at 50% -5%, rgba(200,84,56,0.18) 0%, rgba(200,84,56,0.08) 50%, transparent 100%)",
            }}
          />

          {/* Very faint dot grid */}
          <div
            className="absolute inset-0 opacity-[0.12] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(26,20,18,0.6) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* ── Hero copy ─────────────────────────────────── */}
          <div className="relative z-10 mx-auto w-full max-w-4xl px-6 flex flex-col items-center text-center pt-20 md:pt-28 gap-5 md:gap-6">
            {/* Eyebrow */}
            <Badge
              variant="outline"
              className="border-primary/20 bg-accent text-primary px-4 py-1.5 text-[11px] tracking-widest uppercase rounded-full"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              Built for Freelancers
            </Badge>

            {/* Headline */}
            <div className="flex flex-col items-center gap-0.5">
              <h1
                className="text-[clamp(2.6rem,6.5vw,5rem)] font-extrabold text-foreground tracking-[-0.04em] leading-[1.05]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Stop Losing Bids.
              </h1>
              <h2
                className="text-[clamp(2.4rem,6.2vw,4.75rem)] tracking-[-0.02em] leading-[1.1] italic"
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  background:
                    "linear-gradient(135deg, #C85438 0%, #D96B32 40%, #F0A558 80%, #F5BA72 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Start Winning Clients.
              </h2>
            </div>

            {/* Subheading */}
            <p
              className="max-w-xl text-[15px] md:text-[16px] text-muted-foreground leading-[1.8]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Propreso writes proposals in your voice, using your niche, your
              skills, and proven copywriting formulas, in under 60 seconds.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-1">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary-hover active:bg-primary-active text-white border-0 h-11 px-7 text-[14.5px] font-semibold tracking-[-0.01em] shadow-[0_4px_20px_rgba(200,84,56,0.3)] hover:shadow-[0_6px_28px_rgba(200,84,56,0.45)] transition-all duration-200 rounded-lg"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                <Link href="/sign-up">Get Started Free &nbsp;→</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border-strong text-text-secondary hover:text-foreground hover:bg-accent h-11 px-7 text-[14px] font-medium tracking-[-0.01em] transition-all duration-200 rounded-lg"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                <Link href="/demo">Watch 60-sec Demo</Link>
              </Button>
            </div>

            {/* Social proof micro-text */}
            <p
              className="text-[11px] tracking-[0.06em] text-center flex flex-col sm:flex-row justify-center text-muted-foreground/60"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              No credit card required{" "}
              <span className="hidden sm:inline">&nbsp;·&nbsp; </span>
              <span className="break-keep">10 free proposals included</span>
            </p>
          </div>

          {/* ── Browser mockup ────────────────────────────── */}
          <div className="relative z-10 mt-16 md:mt-20 w-full max-w-250 mx-auto px-4 md:px-8 pb-0">
            {/* Glow halo behind mockup */}
            <div
              className="absolute pointer-events-none"
              style={{
                inset: "0 6% -20px",
                background:
                  "radial-gradient(ellipse, rgba(200,84,56,0.1) 0%, transparent 70%)",
                filter: "blur(56px)",
                zIndex: -1,
              }}
            />

            <div className="relative">
              {/* Browser chrome frame */}
              <div className="rounded-2xl overflow-hidden border-t border-x border-border">
                {/* Chrome top bar */}
                <div className="flex items-center gap-3 px-4 py-2.5 bg-[#F5F0ED] border-b border-border">
                  {/* Traffic lights */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>

                  {/* Divider */}
                  <div className="w-px h-4 bg-border-strong/50 shrink-0" />

                  {/* Active tab */}
                  <div
                    className="flex items-center gap-1.5 bg-background rounded-t-md px-3 py-1 text-[11px] text-muted-foreground shrink-0"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="opacity-50"
                    >
                      <rect
                        x="1"
                        y="1"
                        width="10"
                        height="10"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M1 4h10"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                    </svg>
                    Propreso
                  </div>

                  {/* Address bar */}
                  <div className="flex-1 flex items-center gap-1.5 bg-white border border-border rounded-md px-3 py-1 max-w-64">
                    <svg
                      width="9"
                      height="11"
                      viewBox="0 0 9 11"
                      fill="none"
                      className="shrink-0 opacity-30"
                    >
                      <rect
                        x="0.5"
                        y="4.5"
                        width="8"
                        height="6"
                        rx="1.5"
                        fill="currentColor"
                        className="text-foreground"
                      />
                      <path
                        d="M2.5 4.5V3A2 2 0 0 1 6.5 3v1.5"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        className="text-foreground"
                      />
                    </svg>
                    <span
                      className="text-[10px] text-muted-foreground/60 select-none truncate"
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    >
                      app.propreso.ai/dashboard
                    </span>
                  </div>
                </div>

                {/* Dashboard screenshot */}
                <div className="relative">
                  <Image
                    src="/assets/propreso-dashboard-faded-down.png"
                    alt="Propreso dashboard — write and send proposals in seconds"
                    width={1280}
                    height={600}
                    className="w-full hidden sm:block"
                    priority
                  />
                  <Image
                    src="/assets/dashboard-mobile.png"
                    alt="Propreso dashboard — write and send proposals in seconds"
                    width={390}
                    height={600}
                    className="w-full block sm:hidden"
                    priority
                  />
                </div>
              </div>
            </div>
            <div
              className="absolute bottom-0 -left-3 w-300 -right-3 h-[70%] pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, #FDF8F6 0%, #FDF8F6 50%, rgba(253,248,246,0.4) 90%, transparent 100%)",
              }}
            />
          </div>

          {/* ── Stats section ─────────────────────────────── */}
          <div className="relative z-10 w-full -mt-30 sm:-mt-60 max-w-3xl mx-auto px-6 pt-10 pb-24">
            {/* Section label */}
            <p
              className="text-center text-[11px] text-muted-foreground/50 tracking-widest uppercase mb-8"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              Built to get you hired, faster
            </p>

            {/* Stats row — 2-col grid on mobile (cross dividers), row on desktop */}
            <div className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-center">
              {STATS.map(({ value, label }, i) => (
                <div
                  key={value}
                  className={cn(
                    "flex flex-col items-center gap-1 px-8 py-6 sm:py-0 border-border",
                    // Mobile: cross pattern
                    i === 0 && "border-r border-b",
                    i === 1 && "border-b",
                    i === 2 && "border-r",
                    // Desktop: vertical dividers between items
                    i < STATS.length - 1 && "sm:border-r sm:border-b-0",
                    i === STATS.length - 1 && "sm:border-0",
                  )}
                >
                  <span
                    className="text-[2.25rem] font-extrabold text-foreground tracking-[-0.04em] leading-none"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {value}
                  </span>
                  <span
                    className="text-[12px] text-muted-foreground text-center leading-snug max-w-28"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
