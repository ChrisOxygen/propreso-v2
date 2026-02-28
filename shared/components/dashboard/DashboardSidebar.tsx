"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { LayoutDashboard, FileText, UserRound, Settings } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/proposals", icon: FileText, label: "Proposals" },
  { href: "/profiles", icon: UserRound, label: "Profiles" },
] as const;

const BOTTOM_ITEMS = [
  { href: "/account", icon: Settings, label: "Account" },
] as const;

function NavItem({
  href,
  icon: Icon,
  label,
  active,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 h-9 px-3 rounded-lg text-[13px] font-medium transition-colors duration-150",
        active
          ? "bg-[rgba(200,73,26,0.13)] text-[#E85A2C]"
          : "text-[rgba(251,247,243,0.48)] hover:bg-[rgba(255,255,255,0.05)] hover:text-[rgba(251,247,243,0.8)]"
      )}
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <Icon size={15} strokeWidth={active ? 2.1 : 1.6} />
      {label}
    </Link>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <aside
      className="fixed top-0 left-0 h-full w-[220px] hidden md:flex flex-col z-40"
      style={{
        background: "#111116",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Brand */}
      <div
        className="flex items-center gap-2.5 px-5 h-[60px] shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div
          className="w-7 h-7 rounded-[7px] flex items-center justify-center shrink-0"
          style={{ background: "#C8491A" }}
        >
          <Image
            src="/assets/site-icon-white.svg"
            alt="Propreso"
            width={11}
            height={14}
          />
        </div>
        <span
          className="text-[15px] font-semibold tracking-[-0.025em]"
          style={{ color: "#FBF7F3", fontFamily: "var(--font-space-grotesk)" }}
        >
          Propreso
        </span>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ href, icon, label }) => (
          <NavItem
            key={href}
            href={href}
            icon={icon}
            label={label}
            active={isActive(href)}
          />
        ))}
      </nav>

      {/* Bottom nav */}
      <div
        className="px-3 py-4 shrink-0 flex flex-col gap-0.5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        {BOTTOM_ITEMS.map(({ href, icon, label }) => (
          <NavItem
            key={href}
            href={href}
            icon={icon}
            label={label}
            active={isActive(href)}
          />
        ))}
      </div>
    </aside>
  );
}
