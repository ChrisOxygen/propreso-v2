"use client";

import { useState } from "react";
import { Database } from "lucide-react";

export function SeedButton() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSeed = async () => {
    setState("loading");
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error ?? "Something went wrong.");
        setState("error");
      } else {
        setMessage(`${data.created} proposals seeded.`);
        setState("done");
      }
    } catch {
      setMessage("Request failed.");
      setState("error");
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleSeed}
        disabled={state === "loading"}
        className="flex items-center gap-2 px-4 h-9 rounded-lg text-[13px] font-medium transition-all duration-150"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: state === "loading" ? "rgba(251,247,243,0.35)" : "rgba(251,247,243,0.6)",
          cursor: state === "loading" ? "not-allowed" : "pointer",
          fontFamily: "var(--font-inter)",
        }}
      >
        <Database size={13} />
        {state === "loading" ? "Seeding…" : "Seed Database"}
      </button>
      {message && (
        <span
          className="text-[12px]"
          style={{
            color: state === "error" ? "#F5A070" : "rgba(251,247,243,0.4)",
            fontFamily: "var(--font-inter)",
          }}
        >
          {message}
        </span>
      )}
    </div>
  );
}
