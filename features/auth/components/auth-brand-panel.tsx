"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function AuthBrandPanel() {
  return (
    <div className="relative flex flex-col h-full overflow-hidden bg-[#160A04]">

      {/* ── Background layers ─────────────────────────────────── */}

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.055] pointer-events-none bg-[radial-gradient(circle,rgba(251,247,243,0.6)_1px,transparent_1px)] bg-size-[28px_28px]" />

      {/* Primary orange bloom */}
      <div className="absolute pointer-events-none top-[20%] left-1/2 -translate-x-1/2 w-120 h-105 rounded-full bg-[radial-gradient(ellipse,rgba(200,73,26,0.18)_0%,transparent_70%)] blur-[72px]" />

      {/* Secondary amber accent */}
      <div className="absolute pointer-events-none bottom-[15%] -right-[10%] w-85 h-75 rounded-full bg-[radial-gradient(ellipse,rgba(245,160,96,0.10)_0%,transparent_70%)] blur-[56px]" />

      {/* Deep amber core */}
      <div className="absolute pointer-events-none top-[30%] left-1/2 -translate-x-1/2 w-50 h-40 rounded-full bg-[radial-gradient(ellipse,rgba(224,96,48,0.14)_0%,transparent_70%)] blur-[32px]" />

      {/* ── Top bar ───────────────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-between px-8 pt-8">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[7px] flex items-center justify-center shrink-0 bg-linear-to-br from-[#C8491A] to-[#E06030] shadow-[0_0_16px_rgba(200,73,26,0.5),0_2px_4px_rgba(0,0,0,0.3)]">
            <Image
              src="/assets/site-icon-white.svg"
              alt="Propreso"
              width={11}
              height={14}
              className="shrink-0"
            />
          </div>
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#FBF7F3] [font-family:var(--font-space-grotesk)]">
            Propreso
          </span>
        </div>

        {/* Back to website */}
        <Link
          href="/"
          className="flex items-center gap-1.5 text-[12.5px] text-white/40 hover:text-white/75 transition-colors duration-150 [font-family:var(--font-space-grotesk)]"
        >
          <ArrowLeft size={13} />
          Back to website
        </Link>
      </div>

      {/* ── Center area — floating stat cards ─────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8">
        {/* Abstract angular mark */}
        <div className="mb-10 opacity-15">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <path d="M8 56L32 8L56 56" stroke="rgba(200,73,26,0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 40h32" stroke="rgba(200,73,26,0.6)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Stat cards */}
        <div className="w-full max-w-70 space-y-3">
          {/* Card 1 */}
          <div className="rounded-xl px-4 py-3 flex items-center gap-3 animate-fade-up bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)] backdrop-blur-md">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[rgba(200,73,26,0.2)]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 10L5.5 6.5L8 9L12 4" stroke="#E06030" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="text-[11px] font-medium text-[#FBF7F3] [font-family:var(--font-space-grotesk)]">Win rate improved</div>
              <div className="text-[10px] mt-0.5 text-white/38">Avg. +34% for active users</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl px-4 py-3 flex items-center gap-3 animate-fade-up delay-100 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)] backdrop-blur-md">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[rgba(200,73,26,0.2)]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5" stroke="#E06030" strokeWidth="1.5" />
                <path d="M7 4.5v2.75L8.5 9" stroke="#E06030" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="text-[11px] font-medium text-[#FBF7F3] [font-family:var(--font-space-grotesk)]">Proposals in seconds</div>
              <div className="text-[10px] mt-0.5 text-white/38">Not minutes. Not hours.</div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl px-4 py-3 flex items-center gap-3 animate-fade-up delay-200 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)] backdrop-blur-md">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[rgba(200,73,26,0.2)]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2L8.5 5.5H12L9.5 7.5L10.5 11L7 9L3.5 11L4.5 7.5L2 5.5H5.5L7 2Z" stroke="#E06030" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="text-[11px] font-medium text-[#FBF7F3] [font-family:var(--font-space-grotesk)]">10 free proposals</div>
              <div className="text-[10px] mt-0.5 text-white/38">No credit card required</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom tagline ────────────────────────────────────── */}
      <div className="relative z-10 px-8 pb-10 text-center">
        <p className="text-[1.15rem] font-semibold leading-snug tracking-[-0.02em] text-[#FBF7F3] [font-family:var(--font-space-grotesk)]">
          Craft Winning Proposals,
        </p>
        <p className="text-[1.15rem] italic leading-snug mt-0.5 text-[#E06030] [font-family:var(--font-instrument-serif)]">
          in Minutes, Every Time.
        </p>

        {/* Carousel indicators */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          <div className="w-5 h-0.75 rounded-full bg-white opacity-25" />
          <div className="w-5 h-0.75 rounded-full bg-white opacity-25" />
          <div className="w-9 h-0.75 rounded-full bg-[#C8491A] opacity-70" />
        </div>
      </div>
    </div>
  );
}
