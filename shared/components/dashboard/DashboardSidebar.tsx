"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, FileText, UserRound } from "lucide-react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const NAV_ITEMS = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/proposals", icon: FileText, label: "Proposals" },
  { href: "/profiles", icon: UserRound, label: "Profiles" },
] as const;

export interface DashboardSidebarProps {
  user: {
    name: string;
    email: string;
  };
  onClose?: () => void;
}

export function DashboardSidebar({ user, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const navItems = NAV_ITEMS.map((item) => ({
    ...item,
    isActive: isActive(item.href),
  }));

  return (
    <div className="flex flex-col h-full py-4 px-3">

      {/* Brand */}
      <Link
        href="/dashboard"
        onClick={onClose}
        className="flex items-center gap-2.5 px-2 py-2 mb-5 rounded-xl hover:bg-accent transition-colors"
      >
        <div className="flex aspect-square size-8 items-center justify-center rounded-xl bg-primary shrink-0">
          <Image
            src="/assets/site-icon-white.svg"
            alt="Propreso"
            width={11}
            height={14}
          />
        </div>
        <div className="grid flex-1 text-left leading-tight">
          <span
            className="truncate text-[15px] font-semibold tracking-[-0.025em] text-foreground"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Propreso
          </span>
          <span className="truncate text-[11px] text-muted-foreground">
            AI Proposal Generator
          </span>
        </div>
      </Link>

      {/* Nav items */}
      <div className="flex-1">
        <NavMain items={navItems} onClose={onClose} />
      </div>

      {/* User */}
      <NavUser user={user} />

    </div>
  );
}
