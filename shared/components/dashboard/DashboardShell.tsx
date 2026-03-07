"use client";

import { useState } from "react";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { DashboardSidebar } from "./DashboardSidebar";
import { ShellHeader } from "./ShellHeader";
import { GreetingBanner } from "./GreetingBanner";

interface DashboardShellProps {
  children: React.ReactNode;
  user: {
    name: string;
    email: string;
  };
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

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 rounded-xl gap-4">
        <ShellHeader onMenuClick={() => setSidebarOpen(true)} />
        <GreetingBanner name={user.name} />
        <ScrollArea className="flex-1 min-h-0 rounded-xl">{children}</ScrollArea>
      </div>
    </div>
  );
}
