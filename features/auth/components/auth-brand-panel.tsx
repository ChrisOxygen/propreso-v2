"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AuthBrandTagline } from "./auth-brand-tagline";

export function AuthBrandPanel() {
  return (
    <div className="relative w-full flex flex-col h-full overflow-hidden bg-[#160A04]">
      {/* ── Background layers ─────────────────────────────────── */}

      {/* Background image */}
      <Image
        src="/assets/auth-layout-image.png"
        alt=""
        fill
        className="object-cover object-center"
        priority
        aria-hidden
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-1 bg-linear-to-b from-[rgba(22,10,4,0.65)] via-[rgba(22,10,4,0.55)] to-[rgba(22,10,4,0.98)]" />

      {/* Dot grid */}
      <div className="absolute inset-0 z-2 opacity-[0.04] pointer-events-none bg-[radial-gradient(circle,rgba(251,247,243,0.6)_1px,transparent_1px)] bg-size-[28px_28px]" />

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
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#FBF7F3] font-heading">
            Propreso
          </span>
        </div>

        {/* Back to website */}
        <Link
          href="/"
          className="flex items-center gap-1.5 text-[12.5px] text-white/40 hover:text-white/75 transition-colors duration-150 font-heading border border-white/20 hover:border-white/40 rounded-full px-3 py-1"
        >
          <ArrowLeft size={13} />
          Back to website
        </Link>
      </div>

      {/* ── Bottom tagline ────────────────────────────────────── */}
      <AuthBrandTagline />
    </div>
  );
}
