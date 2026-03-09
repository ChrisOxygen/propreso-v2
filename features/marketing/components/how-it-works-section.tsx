import Image from "next/image";
import { UserCircle, ClipboardList, Zap } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    number: "01",
    icon: UserCircle,
    title: "Set up your freelancer profile once.",
    description:
      "Add your niche, skills, bio, and portfolio links. Propreso uses this to personalize every proposal it writes — so it sounds like you wrote it yourself, not a robot.",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Paste the job description. Pick your formula.",
    description:
      "Drop in the Upwork job post. Choose a tone (Professional, Conversational, Confident, or Friendly) and a copywriting formula (AIDA, PAS, BAB, STAR, or Direct). Or let Propreso pick the best fit.",
  },
  {
    number: "03",
    icon: Zap,
    title: "Hit Generate. Copy. Send.",
    description:
      "Your proposal appears in seconds, fully streamed in real-time. Review it, tweak it if you want (free — no token used), and paste it straight into Upwork. Better yet, use the Chrome extension to generate right inside the job page.",
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function DecorativeBoxes() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Top-left cluster */}
      <div className="absolute top-10 left-[6%] w-7 h-7 rounded-[4px] bg-primary/10 border border-primary/15" />
      <div className="absolute top-6 left-[10%] w-4 h-4 rounded-[3px] bg-primary/20 border border-primary/25" />

      {/* Top-right cluster */}
      <div className="absolute top-8 right-[7%] w-5 h-5 rounded-[3px] bg-primary/15 border border-primary/20" />
      <div className="absolute top-14 right-[4%] w-8 h-8 rounded-[4px] bg-primary/8 border border-primary/12" />
      <div className="absolute top-3 right-[13%] w-3 h-3 rounded-[2px] bg-primary/25" />

      {/* Mid-left */}
      <div className="absolute top-28 left-[2%] w-5 h-5 rounded-[3px] bg-primary/10 border border-primary/15" />

      {/* Mid-right */}
      <div className="absolute top-24 right-[2%] w-4 h-4 rounded-[2px] bg-primary/18 border border-primary/20" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function HowItWorksSection() {
  return (
    <section className="relative bg-white/90  border-t border-border py-24 md:py-32 overflow-hidden">
      {/* Very faint warm dot texture */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(200,84,56,0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto sm:max-w-lg lg:max-w-5xl px-6">
        {/* ── Section header ──────────────────────────────── */}
        <div className="relative mb-16 md:mb-20 text-center">
          <DecorativeBoxes />

          {/* Eyebrow */}
          <p
            className="text-[11px] tracking-[0.14em] uppercase text-muted-foreground/40 mb-5"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            How It Works — 3 Steps
          </p>

          {/* Title */}
          <h2
            className="text-[clamp(1.85rem,4vw,3rem)] font-extrabold text-foreground tracking-[-0.035em] leading-[1.08] mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            A winning proposal in{" "}
            <span
              className="italic font-normal text-primary"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              under 60 seconds.
            </span>
          </h2>

          {/* Subtitle */}
          <p
            className="text-[15px] text-text-secondary leading-[1.75] max-w-md mx-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Here&rsquo;s exactly what happens when you use Propreso:
          </p>
        </div>

        {/* ── Two-column body ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-start">
          {/* ── Left: image stack ───────────────────────── */}
          <div className="relative lg:sticky lg:top-32">
            {/* Outer glow */}
            <div
              className="absolute -inset-4 rounded-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 60%, rgba(200,84,56,0.12) 0%, transparent 70%)",
              }}
            />

            {/* Freelancer image — main card */}
            <div className="relative rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(26,20,18,0.12)] border border-border-strong/30">
              <Image
                src="/assets/image-of-african-american-freelancer.png"
                alt="Freelancer using Propreso"
                width={600}
                height={680}
                className="w-full object-cover"
              />

              {/* Subtle gradient overlay at bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(26,20,18,0.35) 0%, transparent 100%)",
                }}
              />

              {/* Tag in bottom-left of image */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span
                  className="text-[11px] text-white/90 tracking-[0.06em]"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  Proposal sent in 42s
                </span>
              </div>
            </div>

            {/* Onboarding card overlay — floating bottom-right */}
            <div className="absolute -bottom-16 -right-8 md:-right-16 w-[50%] rounded-xl overflow-hidden shadow-[0_12px_48px_rgba(26,20,18,0.18)] border border-border-strong/20">
              <Image
                src="/assets/onboarding-card.png"
                alt="Propreso onboarding step"
                width={360}
                height={220}
                className="w-full object-cover"
              />
            </div>

            {/* Spacer so overflowing card isn't clipped */}
            <div className="h-20 lg:h-20" />
          </div>

          {/* ── Right: steps ────────────────────────────── */}
          <div className="pt-2 lg:pt-0">
            <div className="space-y-3">
              {STEPS.map(({ number, icon: Icon, title, description }) => (
                <div
                  key={number}
                  className="group flex gap-5 py-6 px-5  border-l-4 border-border hover:border-primary/25 hover:bg-white/60 transition-all duration-200"
                >
                  {/* Icon badge */}
                  <div className="shrink-0 mt-0.5">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 group-hover:border-primary/30 transition-colors duration-200">
                      <Icon
                        size={16}
                        className="text-primary"
                        strokeWidth={1.75}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="min-w-0">
                    {/* Step number */}
                    <span
                      className="text-[10px] tabular-nums tracking-[0.1em] text-muted-foreground/35 group-hover:text-muted-foreground/55 transition-colors block mb-1.5"
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    >
                      {number}
                    </span>

                    {/* Title */}
                    <p
                      className="text-[15px] font-semibold text-foreground leading-snug tracking-[-0.015em] mb-2.5"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {title}
                    </p>

                    {/* Description */}
                    <p
                      className="text-[13.5px] text-text-secondary leading-[1.8]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
