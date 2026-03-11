"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { NAV_LINKS } from "@/features/marketing/constants/navigation";

export function HeroNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <style>{`
        @keyframes mobileMenuIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes mobileItemIn {
          from { opacity: 0; transform: translateX(-16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .mobile-menu-overlay { animation: mobileMenuIn 0.28s cubic-bezier(0.22,1,0.36,1) both; }
        .mobile-nav-item     { animation: mobileItemIn 0.32s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4">
        <nav
          className={cn(
            "flex items-center",
            "bg-white/90 backdrop-blur-xl",
            "border border-border",
            "rounded-xl",
            "px-2 py-1.5",
            "flex-1 sm:flex-initial",
            "shadow-[0_4px_24px_rgba(26,20,18,0.08),0_1px_4px_rgba(26,20,18,0.04)]",
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 group pr-3 mr-auto"
          >
            <div className="relative w-7 h-7 rounded-lg bg-primary flex items-center justify-center transition-all duration-300 shadow-[0_0_12px_rgba(200,84,56,0.3)] group-hover:shadow-[0_0_20px_rgba(200,84,56,0.5)]">
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

          {/* Divider — desktop only */}
          <div className="hidden md:block w-px h-4 bg-border mx-1 shrink-0" />

          {/* Center nav links — desktop only */}
          <div className="hidden md:flex items-center">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = href.startsWith("/#")
                ? pathname === "/"
                : pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "text-[13px] rounded-lg px-3.5 py-1.5 transition-colors duration-150",
                    "inline-flex items-center select-none whitespace-nowrap",
                    isActive
                      ? "bg-accent text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent",
                  )}
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Divider — desktop only */}
          <div className="hidden md:block w-px h-4 bg-border mx-1 shrink-0" />

          {/* Right-side CTA buttons — desktop only */}
          <div className="hidden md:flex items-center gap-1 pl-1">
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

          {/* Mobile menu toggle — visible below md */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className={cn(
              "md:hidden flex items-center justify-center",
              "w-8 h-8 rounded-lg transition-colors duration-150",
              menuOpen
                ? "bg-primary text-white"
                : "text-foreground hover:bg-accent",
            )}
          >
            {menuOpen ? <X size={17} strokeWidth={2.5} /> : <Menu size={17} strokeWidth={2.5} />}
          </button>
        </nav>
      </header>

      {/* ── Mobile full-screen overlay ─────────────────────────────────────── */}
      {menuOpen && (
        <div
          className="mobile-menu-overlay fixed inset-0 z-40 md:hidden flex flex-col bg-background"
          aria-modal="true"
          role="dialog"
        >
          {/* Top spacer so content clears the nav pill */}
          <div className="h-24 shrink-0" />

          {/* Nav items — editorial, large, separated by rules */}
          <nav className="flex-1 flex flex-col justify-center px-6">
            {NAV_LINKS.map(({ href, label }, i) => {
              const isActive = href.startsWith("/#")
                ? pathname === "/"
                : pathname === href;
              return (
                <div
                  key={href}
                  className="mobile-nav-item"
                  style={{ animationDelay: `${i * 55}ms` }}
                >
                  {i === 0 && <div className="h-px bg-border" />}
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "group flex items-center justify-between",
                      "py-5 w-full",
                      "text-[2.1rem] font-bold tracking-tight leading-none",
                      "transition-colors duration-150",
                      isActive
                        ? "text-primary"
                        : "text-foreground hover:text-primary",
                    )}
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    <span>{label}</span>
                    <span
                      className={cn(
                        "text-xl transition-transform duration-200 group-hover:translate-x-1",
                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary",
                      )}
                    >
                      →
                    </span>
                  </Link>
                  <div className="h-px bg-border" />
                </div>
              );
            })}
          </nav>

          {/* Bottom CTA buttons */}
          <div
            className="mobile-nav-item px-6 pb-10 flex flex-col gap-3"
            style={{ animationDelay: `${NAV_LINKS.length * 55 + 30}ms` }}
          >
            <Button
              asChild
              size="lg"
              className="w-full h-12 bg-primary hover:bg-primary-hover active:bg-primary-active text-white border-0 text-[15px] font-semibold rounded-xl transition-all duration-200"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <Link href="/sign-up" onClick={() => setMenuOpen(false)}>
                Get Started Free
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full h-12 text-[15px] font-medium rounded-xl border-border-strong hover:bg-accent transition-colors duration-150"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <Link href="/sign-in" onClick={() => setMenuOpen(false)}>
                Log In
              </Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
