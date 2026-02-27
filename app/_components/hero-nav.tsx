"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/shared/components/ui/navigation-menu";
import { cn } from "@/shared/lib/utils";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
];

export function HeroNav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Glass background */}
      <div className="absolute inset-0 bg-[#0F0A05]/75 backdrop-blur-xl border-b border-white/[0.055]" />

      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 md:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="relative w-8 h-8 rounded-[10px] bg-[#C8491A] flex items-center justify-center transition-all duration-300 shadow-[0_0_18px_rgba(200,73,26,0.38)] group-hover:shadow-[0_0_28px_rgba(200,73,26,0.58)]">
            <Image
              src="/assets/site-icon-white.svg"
              alt="Propreso"
              width={11}
              height={14}
              className="shrink-0"
            />
          </div>
          <span
            className="font-semibold text-[17px] text-[#FBF7F3] tracking-[-0.3px]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Propreso
          </span>
        </Link>

        {/* Center nav links — plain Links to avoid NavigationMenuLink's
            hardcoded hover:text-accent-foreground (dark espresso) */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <NavigationMenuItem key={href}>
                <Link
                  href={href}
                  className={cn(
                    "text-[13.5px] text-[#FBF7F3]/50 hover:text-[#FBF7F3]",
                    "hover:bg-white/5 rounded-md",
                    "px-4 py-2 transition-colors duration-150",
                    "inline-flex items-center select-none"
                  )}
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {label}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right-side CTA buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-[#FBF7F3]/55 hover:text-[#FBF7F3] hover:bg-white/5 text-[13px] h-9 px-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Sign In
          </Button>
          <Button
            size="sm"
            className={cn(
              "bg-[#C8491A] hover:bg-[#E06030] active:bg-[#9E3610] text-white border-0",
              "text-[13px] h-9 px-4 font-medium",
              "shadow-[0_0_18px_rgba(200,73,26,0.32)] hover:shadow-[0_0_28px_rgba(200,73,26,0.5)]",
              "transition-all duration-200"
            )}
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  );
}
