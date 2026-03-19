import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative overflow-hidden">

      {/* Subtle radial glow behind the number */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative flex flex-col items-center text-center max-w-md w-full">

        {/* Flame icon */}
        <div className="mb-8 flex items-center justify-center w-10 h-10 rounded-xl bg-accent border border-primary/20">
          <Image
            src="/assets/propreso-icon-accent-primary.svg"
            alt="Propreso"
            width={18}
            height={22}
          />
        </div>

        {/* 404 — hero number */}
        <p
          className="text-[clamp(7rem,22vw,11rem)] leading-none font-[family-name:var(--font-instrument-serif)] italic text-primary select-none"
          aria-hidden="true"
        >
          404
        </p>

        {/* Headline */}
        <h1 className="mt-4 text-[1.375rem] font-semibold font-heading tracking-tight text-foreground leading-snug">
          This page ghosted you.
        </h1>

        {/* Body */}
        <p className="mt-3 text-[14px] text-muted-foreground leading-relaxed">
          It doesn&apos;t exist — or maybe it moved on to a better opportunity.
          Either way, it&apos;s not returning your messages.
        </p>

        {/* Divider */}
        <div className="mt-8 w-12 h-px bg-border-strong" />

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center h-10 px-5 rounded-xl text-[13.5px] font-semibold font-heading bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active transition-colors duration-150 shadow-[0_2px_12px_rgba(200,84,56,0.22)]"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center h-10 px-5 rounded-xl text-[13.5px] font-semibold font-heading bg-card border border-border text-text-secondary hover:text-foreground hover:border-border-strong transition-colors duration-150"
          >
            Go Home
          </Link>
        </div>

      </div>
    </div>
  );
}
