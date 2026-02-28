"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const STATUS_OPTIONS = [
  { value: "ALL", label: "All" },
  { value: "PENDING", label: "Pending" },
  { value: "REPLIED", label: "Replied" },
  { value: "WON", label: "Won" },
  { value: "NO_RESPONSE", label: "No Response" },
] as const;

export function ProposalsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status") ?? "ALL";
  const currentSearch = searchParams.get("q") ?? "";

  // Local input state — debounced before hitting the URL
  const [inputValue, setInputValue] = useState(currentSearch);

  // Sync input if URL param changes externally (e.g. browser back)
  useEffect(() => {
    setInputValue(currentSearch);
  }, [currentSearch]);

  // Debounce search input → update URL after 350 ms
  useEffect(() => {
    const trimmed = inputValue.trim();
    if (trimmed === currentSearch) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (trimmed) {
        params.set("q", trimmed);
      } else {
        params.delete("q");
      }
      params.delete("page"); // reset to first page
      router.push(`${pathname}?${params.toString()}`);
    }, 350);

    return () => clearTimeout(timer);
  }, [inputValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const setStatus = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "ALL") {
      params.delete("status");
    } else {
      params.set("status", value);
    }
    params.delete("page"); // reset to first page
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearSearch = () => {
    setInputValue("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2.5 sm:items-center sm:justify-between">
      {/* Search input */}
      <div className="relative w-full sm:w-[260px]">
        <Search
          size={13}
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "rgba(251,247,243,0.3)" }}
        />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search proposals…"
          className="w-full h-9 pl-8 pr-8 rounded-lg text-[13px] outline-none transition-colors duration-150"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#FBF7F3",
            fontFamily: "var(--font-inter)",
          }}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor = "rgba(200,73,26,0.5)")
          }
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")
          }
        />
        {inputValue && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 transition-colors duration-100"
            style={{ color: "rgba(251,247,243,0.3)" }}
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Status pills */}
      <div className="flex items-center gap-1 flex-wrap">
        {STATUS_OPTIONS.map(({ value, label }) => {
          const active = currentStatus === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setStatus(value)}
              className={cn(
                "h-7 px-3 rounded-full text-[12px] font-medium transition-colors duration-150 whitespace-nowrap",
                active
                  ? "bg-[rgba(200,73,26,0.15)] text-[#E85A2C] border border-[rgba(200,73,26,0.35)]"
                  : "text-[rgba(251,247,243,0.45)] border border-[rgba(255,255,255,0.07)] hover:bg-[rgba(255,255,255,0.05)] hover:text-[rgba(251,247,243,0.7)]"
              )}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
