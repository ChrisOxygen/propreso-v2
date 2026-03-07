"use client";

import { useState, useEffect } from "react";

const taglines = [
  {
    line1: "Craft Winning Proposals,",
    line2: "in Minutes, Every Time.",
  },
  {
    line1: "Stop Guessing,",
    line2: "Start Winning.",
  },
  {
    line1: "Your Edge on",
    line2: "Every Upwork Job.",
  },
];

export function AuthBrandTagline() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % taglines.length);
        setFading(false);
      }, 350);
    }, 3800);

    return () => clearInterval(interval);
  }, []);

  const { line1, line2 } = taglines[current];

  return (
    <div className="relative z-10 px-8 pb-10 mt-auto text-center">
      <div className={`transition-opacity duration-300 ${fading ? "opacity-0" : "opacity-100"}`}>
        <p className="text-[1.15rem] font-semibold leading-snug tracking-[-0.02em] text-[#FBF7F3] [font-family:var(--font-space-grotesk)]">
          {line1}
        </p>
        <p className="text-[1.15rem] italic leading-snug mt-0.5 text-[#E06030] [font-family:var(--font-instrument-serif)]">
          {line2}
        </p>
      </div>

      {/* Carousel indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-5">
        {taglines.map((_, i) => (
          <div
            key={i}
            className={`h-0.75 rounded-full transition-all duration-500 ${
              i === current
                ? "w-9 bg-[#C8491A] opacity-70"
                : "w-5 bg-white opacity-25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
