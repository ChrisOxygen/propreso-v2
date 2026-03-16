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
 * Hook version of scroll-reveal — returns a ref and the animation classes
 * to apply directly to any element, avoiding an extra wrapper div.
 * Useful when the element is a direct grid/flex child and a wrapper would
 * break equal-height layout.
 */
/**
 * Hook version — attaches a data-reveal attribute directly to any element so
 * the animation is driven by CSS (not className toggling). This preserves the
 * element's className exactly, which matters when the element is a direct grid
 * child and className changes could affect layout / equal-height behaviour.
 */
export function useScrollReveal(delay?: number) {
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

  return {
    ref,
    revealProps: {
      "data-reveal": visible ? "visible" : "hidden",
      style: delay ? { transitionDelay: `${delay}ms` } : undefined,
    } as { "data-reveal": string; style?: React.CSSProperties },
  };
}

/**
 * Fades + slides children into view when they enter the viewport.
 * Disconnects the observer after first trigger so it only animates once.
 * Reduced-motion users see the content immediately (via globals.css override).
 */
export function ScrollReveal({ children, className, delay }: ScrollRevealProps) {
  const { ref, revealProps } = useScrollReveal(delay);

  return (
    <div
      ref={ref}
      {...revealProps}
      className={cn(className)}
    >
      {children}
    </div>
  );
}
