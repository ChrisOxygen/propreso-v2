"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/shared/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Stagger delay in ms — used to offset sibling groups.
   * Written as an inline style since the value is always a runtime prop,
   * not a design token.
   */
  delay?: number;
}

/**
 * Fades + slides children into view when they enter the viewport.
 * Disconnects the observer after first trigger so it only animates once.
 * Reduced-motion users see the content immediately (via globals.css override).
 */
export function ScrollReveal({ children, className, delay }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal
      className={cn(
        "transition-[opacity,transform] duration-[400ms] ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
        className,
      )}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
