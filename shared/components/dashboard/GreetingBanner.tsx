"use client";

import { useMemo } from "react";
import { Sun, Sunset, Moon } from "lucide-react";

interface GreetingBannerProps {
  name: string;
}

function getGreeting(hour: number): { text: string; Icon: React.ElementType } {
  if (hour >= 5 && hour < 12) return { text: "Good morning", Icon: Sun };
  if (hour >= 12 && hour < 17) return { text: "Good afternoon", Icon: Sun };
  if (hour >= 17 && hour < 21) return { text: "Good evening", Icon: Sunset };
  return { text: "Good night", Icon: Moon };
}

export function GreetingBanner({ name }: GreetingBannerProps) {
  const { text } = useMemo(() => getGreeting(new Date().getHours()), []);

  return (
    <div className="px-2 flex items-end justify-between gap-4">
      <p className="text-2xl md:text-4xl text-foreground font-heading tracking-[-0.01em]">
        {text}, <span className="capitalize">{name.split(" ")[0]}</span>
      </p>
      {/* <Breadcrumbs /> */}
    </div>
  );
}
