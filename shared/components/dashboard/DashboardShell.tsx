"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Bell } from "lucide-react";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { DashboardSidebar } from "./DashboardSidebar";

const PAGE_LABELS: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/proposals": "Proposals",
  "/profiles": "Profiles",
  "/account": "Account",
  "/billing": "Billing",
};

interface DashboardShellProps {
  children: React.ReactNode;
  user: {
    name: string;
    email: string;
  };
}

function ShellHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const pageLabel =
    Object.entries(PAGE_LABELS).find(([key]) =>
      pathname.startsWith(key),
    )?.[1] ?? "Propreso";

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 px-5 bg-card rounded-xl border border-border">
      <button
        className="lg:hidden p-1.5 rounded-lg hover:bg-accent text-muted-foreground transition-colors"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>
      <h1
        className="text-[15px] font-semibold text-foreground tracking-[-0.01em]"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {pageLabel}
      </h1>
      <div className="ml-auto flex items-center gap-1">
        <button
          className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-text-secondary transition-colors"
          aria-label="Notifications"
        >
          <Bell size={16} />
        </button>
      </div>
    </header>
  );
}

export function DashboardShell({ children, user }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background p-2 gap-2">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-foreground/20 backdrop-blur-[2px] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — fully rounded, its own card */}
      <aside
        className={[
          "fixed lg:relative z-30 lg:z-auto inset-y-0 left-0",
          "w-56 shrink-0 flex flex-col bg-card rounded-xl border border-border",
          "transition-transform duration-200 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        <DashboardSidebar user={user} onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Main content — accent bg shows as gap between header and page content */}
      <div className="flex-1 flex flex-col min-w-0  rounded-xl gap-2">
        <ShellHeader onMenuClick={() => setSidebarOpen(true)} />
        <ScrollArea className="flex-1 bg-accent rounded-xl">
          {children}
        </ScrollArea>
      </div>
    </div>
  );
}
