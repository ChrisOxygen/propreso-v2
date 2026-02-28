"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { LayoutDashboard, FileText, UserRound } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/proposals", icon: FileText, label: "Proposals" },
  { href: "/profiles", icon: UserRound, label: "Profiles" },
] as const;

const PAGE_LABELS: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/proposals": "Proposals",
  "/profiles": "Profiles",
  "/account": "Account",
};

export function MobileHeader() {
  const pathname = usePathname();

  const pageLabel =
    Object.entries(PAGE_LABELS).find(([key]) => pathname.startsWith(key))?.[1] ??
    "Propreso";

  return (
    <>
      {/* Mobile top header */}
      <header
        className="fixed top-0 left-0 right-0 h-[54px] flex items-center px-4 z-40 md:hidden"
        style={{
          background: "#111116",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
            style={{ background: "#C8491A" }}
          >
            <Image
              src="/assets/site-icon-white.svg"
              alt="Propreso"
              width={10}
              height={12}
            />
          </div>
          <span
            className="text-[14px] font-semibold tracking-[-0.02em]"
            style={{ color: "#FBF7F3", fontFamily: "var(--font-space-grotesk)" }}
          >
            {pageLabel}
          </span>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 flex items-center z-40 md:hidden"
        style={{
          background: "#111116",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-1 h-[56px] text-[11px] font-medium transition-colors duration-150",
                active
                  ? "text-[#E85A2C]"
                  : "text-[rgba(251,247,243,0.38)]"
              )}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <Icon size={18} strokeWidth={active ? 2.1 : 1.6} />
              {label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
