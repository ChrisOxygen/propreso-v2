"use client";

import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar";
import { Separator } from "@/shared/components/ui/separator";
import { DashboardSidebar } from "./DashboardSidebar";

const PAGE_LABELS: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/proposals": "Proposals",
  "/profiles": "Profiles",
  "/account": "Account",
};

interface DashboardShellProps {
  children: React.ReactNode;
  user: {
    name: string;
    email: string;
  };
}

function ShellHeader() {
  const pathname = usePathname();
  const pageLabel =
    Object.entries(PAGE_LABELS).find(([key]) => pathname.startsWith(key))?.[1] ??
    "Propreso";

  return (
    <header
      className="flex h-12 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-10"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <SidebarTrigger className="-ml-1 text-[rgba(251,247,243,0.5)] hover:text-[rgba(251,247,243,0.9)] hover:bg-white/5" />
      <Separator
        orientation="vertical"
        className="mr-1 h-4 bg-white/10"
      />
      <span
        className="text-[13px] font-medium text-[rgba(251,247,243,0.6)]"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {pageLabel}
      </span>
    </header>
  );
}

export function DashboardShell({ children, user }: DashboardShellProps) {
  return (
    <SidebarProvider>
      <DashboardSidebar user={user} />
      <SidebarInset className="min-w-0 overflow-x-hidden">
        <ShellHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
