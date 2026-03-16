"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal, useScrollReveal } from "@/shared/components/scroll-reveal";
import {
  Brain,
  Sliders,
  UserCircle,
  Globe,
  TrendingUp,
  Layers,
  RefreshCw,
  Play,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";

// ─────────────────────────────────────────────────────────────────────────────
// Config — replace with your actual YouTube video ID
// ─────────────────────────────────────────────────────────────────────────────

const YOUTUBE_VIDEO_ID = "REPLACE_WITH_YOUR_VIDEO_ID";

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Brain,
    tag: "AI Analysis",
    tagColor: "text-primary bg-primary/10 border-primary/20",
    title: "AI that actually reads the job post",
    description:
      "Before writing a single word, Propreso analyzes the job description to extract the client's core pain point, fear, communication style, and which of your skills to surface. The result? A proposal that feels like it was written by someone who really read the post.",
  },
  {
    icon: Sliders,
    tag: "Tones & Formulas",
    tagColor: "text-indigo-600 bg-indigo-50 border-indigo-200",
    title: "Multiple tones, multiple formulas",
    description:
      "Every client is different. Choose from Professional, Conversational, Confident, or Friendly tones. Apply battle-tested formulas — AIDA, PAS, BAB, STAR, or Direct. Mix and match until you find what converts for your niche.",
  },
  {
    icon: UserCircle,
    tag: "Personalization",
    tagColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    title: "Personalized to your profile, not a template",
    description:
      "Generic AI tools write generic proposals. Propreso pulls from your niche, skills, actual bio, and portfolio to produce proposals that sound like you — because they're built around you.",
  },
  {
    icon: Globe,
    tag: "Chrome Extension",
    tagColor: "text-sky-600 bg-sky-50 border-sky-200",
    title: "Chrome extension — generate inside Upwork",
    description:
      "No tab-switching. No copy-pasting job descriptions. Open any Upwork job page, click the Propreso extension, and generate directly inside the browser. The proposal appears where you need it.",
  },
  {
    icon: TrendingUp,
    tag: "Analytics",
    tagColor: "text-amber-700 bg-amber-50 border-amber-200",
    title: "Track what wins",
    description:
      "Mark proposals as Won, Replied, or No Response. Over time, you'll see your win rate, spot patterns, and know exactly which formula works best in your niche.",
  },
  {
    icon: Layers,
    tag: "Multi-Profile",
    tagColor: "text-violet-600 bg-violet-50 border-violet-200",
    title: "Unlimited profiles for every niche",
    description:
      "You're a full-stack dev AND a technical writer? Build a profile for each niche. Propreso keeps them separate so every proposal is tailored to the right audience.",
  },
  {
    icon: RefreshCw,
    tag: "Yearly Plans",
    tagColor: "text-teal-600 bg-teal-50 border-teal-200",
    title: "Rollover tokens on yearly plans",
    description:
      "Unused proposals carry forward every month, no cap. Switch to yearly and your token balance only ever grows.",
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// YouTube embed with thumbnail + play overlay
// ─────────────────────────────────────────────────────────────────────────────

function YouTubeEmbed({ videoId }: { videoId: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 ">
      {isPlaying ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title="Propreso demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <button
          onClick={() => setIsPlaying(true)}
          className="group absolute inset-0 w-full h-full cursor-pointer"
          aria-label="Play Propreso demo video"
        >
          {/* Thumbnail — local asset */}
          <Image
            src="/assets/dev-infront-of-pc.webp"
            alt="Propreso demo video thumbnail"
            fill
            className="object-cover"
            priority
          />

          {/* Dark scrim */}
          <div className="absolute inset-0 bg-foreground/35 group-hover:bg-foreground/45 transition-colors duration-300" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Pulse ring */}
              <div className="absolute inset-0 rounded-full bg-white/20 scale-110 group-hover:scale-125 transition-transform duration-300" />
              {/* Button */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center shadow-[0_8px_40px_rgba(0,0,0,0.35)] group-hover:scale-105 transition-transform duration-300">
                <Play
                  className="w-6 h-6 md:w-7 md:h-7 text-primary translate-x-0.5"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </div>
            </div>
          </div>

          {/* Bottom label */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <span
              className="text-[11px] text-white/70 tracking-[0.08em] uppercase"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              See Propreso in action — 60 seconds
            </span>
          </div>
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Feature card
// ─────────────────────────────────────────────────────────────────────────────

function FeatureCard({
  icon: Icon,
  tag,
  tagColor,
  title,
  description,
  delay,
}: (typeof FEATURES)[number] & { delay?: number }) {
  const { ref, revealProps } = useScrollReveal(delay);
  return (
    <div
      ref={ref}
      {...revealProps}
      className="group bg-card rounded-2xl p-6 border border-border hover:border-border-strong hover:shadow-[0_4px_24px_rgba(26,20,18,0.07)] transition-all duration-200 flex flex-col"
    >
      {/* Tag */}
      <span
        className={`self-start inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10.5px] font-medium border mb-4 ${tagColor}`}
        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
      >
        <Icon size={10} />
        {tag}
      </span>

      {/* Title */}
      <p
        className="text-[15px] font-semibold text-foreground leading-snug tracking-[-0.015em] mb-3"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {title}
      </p>

      {/* Description */}
      <p
        className="text-[13px] text-text-secondary leading-[1.8] mt-auto"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {description}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA card — spans 2 columns
// ─────────────────────────────────────────────────────────────────────────────

function CTACard({ delay }: { delay?: number }) {
  const { ref, revealProps } = useScrollReveal(delay);
  return (
    <div
      ref={ref}
      {...revealProps}
      className="relative bg-primary rounded-2xl p-8 md:p-10 overflow-hidden h-full flex flex-col justify-between min-h-[220px]"
    >
      {/* Dot texture */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Ambient glow blobs */}
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/5 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-8">
        {/* Copy */}
        <div className="w-full text-center">
          <h3
            className="text-[1.35rem] md:text-[1.55rem] font-extrabold text-white tracking-[-0.03em] leading-[1.15] mb-3"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Ready to send proposals that actually win?
          </h3>

          <p
            className="text-[13.5px] text-white/72 leading-[1.75]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Join freelancers who&apos;ve stopped guessing and started landing
            clients. Start with 10 free proposals — no card needed.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 shrink-0">
          <Button
            asChild
            className="bg-white text-primary hover:bg-background border-0 h-11 px-7 text-[14px] font-semibold tracking-[-0.01em] shadow-none transition-all duration-200 rounded-lg gap-2 whitespace-nowrap"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <Link href="/sign-up">
              Start for free
              <ArrowRight size={14} />
            </Link>
          </Button>

          <p
            className="text-[11px] text-white/50 text-center tracking-[0.05em]"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            No credit card required
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────────────────

export function FeaturesSection() {
  return (
    <section id="features">
      {/* ── Primary zone: heading ────────────────────────── */}
      <div className="relative bg-primary pt-20 md:pt-28 w-full h-[460px] sm:h-[520px] md:h-[560px] lg:h-[640px]">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Centre radial gradient — warm light bloom */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(255,220,180,0.18) 0%, rgba(255,160,80,0.10) 40%, transparent 75%)",
            }}
          />

          {/* Scattered boxes — top-left cluster */}
          <div className="absolute top-8 left-[5%] w-9 h-9 rounded-[5px] border-2 border-white/30" />
          <div className="absolute top-5 left-[11%] w-5 h-5 rounded-[3px] bg-white/15 border border-white/25" />
          <div className="absolute top-16 left-[3%] w-6 h-6 rounded-[4px] border border-white/20" />
          <div className="absolute top-28 left-[7%] w-3.5 h-3.5 rounded-[2px] bg-white/20" />
          <div className="absolute top-40 left-[12%] w-7 h-7 rounded-[4px] border border-white/15" />
          <div className="absolute top-52 left-[4%] w-4 h-4 rounded-[3px] bg-white/12 border border-white/18" />

          {/* Scattered boxes — top-right cluster */}
          <div className="absolute top-6 right-[6%] w-8 h-8 rounded-[4px] border-2 border-white/28" />
          <div className="absolute top-14 right-[3%] w-11 h-11 rounded-[6px] border border-white/18" />
          <div className="absolute top-3 right-[14%] w-4 h-4 rounded-[3px] bg-white/18 border border-white/25" />
          <div className="absolute top-24 right-[9%] w-6 h-6 rounded-[3px] border border-white/22" />
          <div className="absolute top-36 right-[16%] w-3 h-3 rounded-[2px] bg-white/20" />
          <div className="absolute top-48 right-[5%] w-5 h-5 rounded-[4px] border border-white/15" />

          {/* Bottom-left boxes */}
          <div className="absolute bottom-16 left-[6%] w-7 h-7 rounded-[4px] border border-white/20" />
          <div className="absolute bottom-8 left-[14%] w-4 h-4 rounded-[3px] bg-white/15" />
          <div className="absolute bottom-24 left-[2%] w-5 h-5 rounded-[3px] border border-white/18" />

          {/* Bottom-right boxes */}
          <div className="absolute bottom-12 right-[12%] w-5 h-5 rounded-[3px] bg-white/15" />
          <div className="absolute bottom-6 right-[7%] w-3 h-3 rounded-[2px] border border-white/22" />
          <div className="absolute bottom-20 right-[3%] w-8 h-8 rounded-[5px] border border-white/18" />

          {/* Mid-left boxes */}
          <div className="absolute top-1/2 left-[1%] w-6 h-6 rounded-[4px] border border-white/20" />
          <div className="absolute top-[60%] left-[8%] w-3.5 h-3.5 rounded-[2px] bg-white/15" />

          {/* Mid-right boxes */}
          <div className="absolute top-[55%] right-[2%] w-5 h-5 rounded-[3px] border border-white/18" />
          <div className="absolute top-[40%] right-[18%] w-3 h-3 rounded-[2px] bg-white/18" />

          {/* Rings — large corner anchors */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full border-2 border-white/15" />
          <div className="absolute -top-12 -left-12 w-44 h-44 rounded-full border border-white/12" />
          <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full border border-white/10" />

          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border-2 border-white/12" />
          <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full border border-white/10" />

          <div className="absolute top-1/2 -right-28 w-88 h-88 rounded-full border border-white/12" />
          <div className="absolute top-[45%] -right-14 w-52 h-52 rounded-full border border-white/15" />

          <div className="absolute -bottom-20 left-1/4 w-64 h-64 rounded-full border border-white/10" />
          <div className="absolute -bottom-8 left-[40%] w-36 h-36 rounded-full border border-white/12" />

          {/* Centre-area medium ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/8" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-white/10" />
        </div>

        <div className="relative mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-5xl px-6">
          {/* Side-by-side header */}
          <ScrollReveal className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-20">
            {/* Left: eyebrow + title */}
            <div>
              {/* <p
                className="text-[11px] tracking-[0.14em] uppercase text-white/55 mb-5"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                Features
              </p> */}
              <h2
                className="text-[clamp(1.85rem,4vw,3rem)] font-extrabold text-white tracking-[-0.035em] leading-[1.08]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Everything that makes Propreso{" "}
                <span
                  className="italic font-normal text-background/90"
                  style={{ fontFamily: "var(--font-instrument-serif)" }}
                >
                  different.
                </span>
              </h2>
            </div>

            {/* Right: description */}
            <div>
              <p
                className="text-[15px] text-white/70 leading-[1.85]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Most AI proposal tools give you a decent first draft. Propreso
                goes further — it reads the job post the way you do, writes in
                your voice, and learns what actually converts in your niche.
                Here&apos;s what&apos;s under the hood.
              </p>
            </div>
          </ScrollReveal>
        </div>
        {/* ── Video — bleeds between primary and accent zones ── */}
        <div className="relative z-10 mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-5xl px-6 mt-14 md:mt-20">
          <YouTubeEmbed videoId={YOUTUBE_VIDEO_ID} />
        </div>
      </div>

      {/* ── Accent zone: features grid ───────────────────── */}
      <div className="bg-accent pt-20 sm:pt-[220px] md:pt-[230px] lg:pt-[270px] pb-16 md:pb-20">
        <div className="mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-5xl px-6">
          {/* Mini label */}
          <p
            className="text-[11px] tracking-[0.14em] uppercase text-muted-foreground/40 mb-10"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            7 features — built for Upwork freelancers
          </p>

          {/* 3-col grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
            {FEATURES.map((feature, i) => (
              <FeatureCard key={feature.title} {...feature} delay={i * 60} />
            ))}

            {/* CTA — fills the 2 remaining columns on the last row */}
            <div className="md:col-span-1 lg:col-span-2">
              <CTACard delay={FEATURES.length * 60} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
