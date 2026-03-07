"use client";

import Link from "next/link";
import { type LucideIcon } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
}

interface NavMainProps {
  items: NavItem[];
  onClose?: () => void;
}

export function NavMain({ items, onClose }: NavMainProps) {
  return (
    <nav className="space-y-2">
      {items.map(({ href, label, icon: Icon, isActive }) => (
        <Link
          key={href}
          href={href}
          onClick={onClose}
          className={[
            "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all",
            isActive
              ? "bg-primary text-white"
              : "text-text-secondary hover:bg-accent hover:text-foreground",
          ].join(" ")}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <Icon size={15} strokeWidth={isActive ? 2.1 : 1.7} />
          {label}
        </Link>
      ))}
    </nav>
  );
}
