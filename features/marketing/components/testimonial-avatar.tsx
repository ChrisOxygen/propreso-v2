"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { cn } from "@/shared/lib/utils";

function getInitials(fullName: string) {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");
}

interface TestimonialAvatarProps {
  fullName: string;
  className?: string;
}

export function TestimonialAvatar({
  fullName,
  className,
}: TestimonialAvatarProps) {
  const slug = fullName.replace(/\s+/g, "");

  return (
    <Avatar className={cn("size-9 shrink-0", className)}>
      <AvatarImage src={`/assets/${slug}.jpg`} alt={fullName} />
      <AvatarFallback className="text-[11px] font-semibold bg-accent text-primary border border-primary/20">
        {getInitials(fullName)}
      </AvatarFallback>
    </Avatar>
  );
}
