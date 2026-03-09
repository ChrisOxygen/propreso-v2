"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { NAV_LINKS } from "@/features/marketing/constants/navigation";

export function HeroNav() {
  return (
    <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4">
      <nav
        className={cn(
          "flex items-center",
          "bg-white/90 backdrop-blur-xl",
          "border border-border",
          "rounded-xl",
          "px-2 py-1.5",
          "shadow-[0_4px_24px_rgba(26,20,18,0.08),0_1px_4px_rgba(26,20,18,0.04)]",
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group pr-3 ">
          <div className="relative w-7 h-7 rounded-[8px] bg-primary flex items-center justify-center transition-all duration-300 shadow-[0_0_12px_rgba(200,84,56,0.3)] group-hover:shadow-[0_0_20px_rgba(200,84,56,0.5)]">
            <Image
              src="/assets/site-icon-white.svg"
              alt="Propreso"
              width={10}
              height={13}
              className="shrink-0"
            />
          </div>
          <span
            className="font-semibold text-[15px] text-foreground tracking-[-0.3px]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Propreso
          </span>
        </Link>

        {/* Divider */}
        <div className="hidden md:block w-px h-4 bg-border mx-1 shrink-0" />

        {/* Center nav links */}
        <div className="hidden md:flex items-center">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-[13px] text-muted-foreground hover:text-foreground",
                "hover:bg-accent rounded-lg",
                "px-3.5 py-1.5 transition-colors duration-150",
                "inline-flex items-center select-none whitespace-nowrap",
              )}
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-4 bg-border mx-1 shrink-0" />

        {/* Right-side CTA buttons */}
        <div className="flex items-center gap-1 pl-1">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground hover:bg-accent text-[13px] h-8 px-3.5 rounded-lg font-medium"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <Link href="/sign-in">Log In</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-primary hover:bg-primary-hover active:bg-primary-active text-white border-0 text-[13px] h-8 px-4 font-medium rounded-lg transition-all duration-200"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
