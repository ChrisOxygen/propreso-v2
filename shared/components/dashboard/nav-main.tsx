"use client";

import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
}

export function NavMain({ items }: { items: NavItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(({ href, label, icon: Icon, isActive }) => (
            <SidebarMenuItem key={href}>
              <SidebarMenuButton
                asChild
                tooltip={label}
                isActive={isActive}
                className="text-[rgba(251,247,243,0.48)] hover:bg-white/5 hover:text-[rgba(251,247,243,0.8)] data-[active=true]:bg-[rgba(200,73,26,0.13)] data-[active=true]:text-[#E85A2C]"
              >
                <Link href={href}>
                  <Icon size={15} strokeWidth={isActive ? 2.1 : 1.6} />
                  <span
                    className="text-[13px] font-medium"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {label}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
