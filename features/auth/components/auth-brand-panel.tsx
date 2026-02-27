"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function AuthBrandPanel() {
  return (
    <div
      className="relative flex flex-col h-full overflow-hidden"
      style={{ backgroundColor: "#0F0A05" }}
    >
      {/* ── Background layers ─────────────────────────────────── */}

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.055] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(251,247,243,0.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "160px 160px",
        }}
      />

      {/* Primary orange bloom — center-upper */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "480px",
          height: "420px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(200,73,26,0.18) 0%, transparent 70%)",
          filter: "blur(72px)",
        }}
      />

      {/* Secondary amber accent — lower-right */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "15%",
          right: "-10%",
          width: "340px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(245,160,96,0.10) 0%, transparent 70%)",
          filter: "blur(56px)",
        }}
      />

      {/* Deep amber core — small bright center */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "200px",
          height: "160px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(224,96,48,0.14) 0%, transparent 70%)",
          filter: "blur(32px)",
        }}
      />

      {/* ── Top bar ───────────────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-between px-8 pt-8">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          {/* Orange icon box */}
          <div
            className="w-8 h-8 rounded-[7px] flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #C8491A 0%, #E06030 100%)",
              boxShadow:
                "0 0 16px rgba(200,73,26,0.5), 0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            <Image
              src="/assets/site-icon-white.svg"
              alt="Propreso"
              width={11}
              height={14}
              className="shrink-0"
            />
          </div>
          <span
            className="text-[15px] font-semibold tracking-[-0.02em]"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: "#FBF7F3",
            }}
          >
            Propreso
          </span>
        </div>

        {/* Back to website */}
        <Link
          href="/"
          className="flex items-center gap-1.5 text-[12.5px] transition-colors duration-150"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            color: "rgba(251,247,243,0.40)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "rgba(251,247,243,0.75)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(251,247,243,0.40)")
          }
        >
          <ArrowLeft size={13} />
          Back to website
        </Link>
      </div>

      {/* ── Center area — decorative marks ───────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8">
        {/* Abstract angular mark */}
        <div className="mb-10 opacity-15">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <path
              d="M8 56L32 8L56 56"
              stroke="rgba(200,73,26,0.9)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 40h32"
              stroke="rgba(200,73,26,0.6)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Floating stat cards */}
        <div className="w-full max-w-[280px] space-y-3">
          {/* Card 1 */}
          <div
            className="rounded-xl px-4 py-3 flex items-center gap-3 animate-fade-up"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(200,73,26,0.2)" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 10L5.5 6.5L8 9L12 4"
                  stroke="#E06030"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <div
                className="text-[11px] font-medium"
                style={{
                  color: "#FBF7F3",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                Win rate improved
              </div>
              <div
                className="text-[10px] mt-0.5"
                style={{
                  color: "rgba(251,247,243,0.38)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                Avg. +34% for active users
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="rounded-xl px-4 py-3 flex items-center gap-3 animate-fade-up delay-100"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(200,73,26,0.2)" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle
                  cx="7"
                  cy="7"
                  r="5"
                  stroke="#E06030"
                  strokeWidth="1.5"
                />
                <path
                  d="M7 4.5v2.75L8.5 9"
                  stroke="#E06030"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <div
                className="text-[11px] font-medium"
                style={{
                  color: "#FBF7F3",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                Proposals in seconds
              </div>
              <div
                className="text-[10px] mt-0.5"
                style={{
                  color: "rgba(251,247,243,0.38)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                Not minutes. Not hours.
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="rounded-xl px-4 py-3 flex items-center gap-3 animate-fade-up delay-200"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(200,73,26,0.2)" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 2L8.5 5.5H12L9.5 7.5L10.5 11L7 9L3.5 11L4.5 7.5L2 5.5H5.5L7 2Z"
                  stroke="#E06030"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <div
                className="text-[11px] font-medium"
                style={{
                  color: "#FBF7F3",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                10 free proposals
              </div>
              <div
                className="text-[10px] mt-0.5"
                style={{
                  color: "rgba(251,247,243,0.38)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                No credit card required
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom tagline ────────────────────────────────────── */}
      <div className="relative z-10 px-8 pb-10 text-center">
        <p
          className="text-[1.15rem] font-semibold leading-snug tracking-[-0.02em]"
          style={{ color: "#FBF7F3", fontFamily: "var(--font-space-grotesk)" }}
        >
          Craft Winning Proposals,
        </p>
        <p
          className="text-[1.15rem] italic leading-snug mt-0.5"
          style={{
            color: "#E06030",
            fontFamily: "var(--font-instrument-serif)",
          }}
        >
          in Minutes, Every Time.
        </p>

        {/* Decorative dots */}
        <div className="flex items-center justify-center gap-2 mt-5">
          <div
            className="w-5 h-1 rounded-full opacity-25"
            style={{ backgroundColor: "#FBF7F3" }}
          />
          <div
            className="w-5 h-1 rounded-full opacity-25"
            style={{ backgroundColor: "#FBF7F3" }}
          />
          <div
            className="w-8 h-1 rounded-full"
            style={{ backgroundColor: "#C8491A", opacity: 0.7 }}
          />
        </div>
      </div>
    </div>
  );
}
