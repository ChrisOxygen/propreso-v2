"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, FileText, UserRound } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/shared/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const NAV_ITEMS = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/proposals", icon: FileText, label: "Proposals" },
  { href: "/profiles", icon: UserRound, label: "Profiles" },
] as const;

interface DashboardSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: {
    name: string;
    email: string;
  };
}

export function DashboardSidebar({ user, ...props }: DashboardSidebarProps) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const navItems = NAV_ITEMS.map((item) => ({
    ...item,
    isActive: isActive(item.href),
  }));

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Brand */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="hover:bg-white/5 active:bg-white/5"
            >
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-xl bg-[#C8491A] shrink-0">
                  <Image
                    src="/assets/site-icon-white.svg"
                    alt="Propreso"
                    width={11}
                    height={14}
                  />
                </div>
                <div className="grid flex-1 text-left leading-tight">
                  <span
                    className="truncate text-[15px] font-semibold tracking-[-0.025em] text-[#FBF7F3]"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    Propreso
                  </span>
                  <span
                    className="truncate text-[11px] text-[rgba(251,247,243,0.35)]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    AI Proposal Generator
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main nav */}
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      {/* User footer */}
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
