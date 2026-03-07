"use client";

import Link from "next/link";
import { Menu, Bell, Search, Plus } from "lucide-react";

interface ShellHeaderProps {
  onMenuClick: () => void;
}

export function ShellHeader({ onMenuClick }: ShellHeaderProps) {
  return (
    <header className="flex mt-1 px-2 shrink-0 items-center gap-3   rounded-xl">
      {/* Mobile menu toggle */}
      <button
        className="lg:hidden p-1.5 rounded-lg hover:bg-accent text-muted-foreground transition-colors shrink-0"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      {/* Search bar */}
      <div className="relative flex-1 max-w-xs">
        <Search
          size={13}
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground"
        />
        <input
          type="text"
          placeholder="Search…"
          disabled
          className="w-full h-10 pl-8 pr-3 rounded-lg text-[13px] bg-accent border border-border text-foreground placeholder:text-muted-foreground outline-none cursor-default"
        />
      </div>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-2 shrink-0">
        <button
          className="p-2 rounded-lg border border-border hover:bg-accent text-muted-foreground hover:text-text-secondary transition-colors"
          aria-label="Notifications"
        >
          <Bell size={16} />
        </button>

        <Link
          href="/generate"
          className="flex items-center gap-1.5 h-9 px-4 rounded-lg text-[13px] font-semibold transition-colors duration-150 bg-primary text-primary-foreground hover:bg-primary-hover"
        >
          <Plus size={14} strokeWidth={2.5} />
          New Proposal
        </Link>
      </div>
    </header>
  );
}
