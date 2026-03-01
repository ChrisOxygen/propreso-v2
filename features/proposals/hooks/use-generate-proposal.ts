"use client";

import type { UIMessage } from "ai";

/**
 * Extract plain text from a UIMessage (v6: content lives in parts[].text).
 */
export function extractText(msg: UIMessage): string {
  return msg.parts
    .filter((p) => p.type === "text")
    .map((p) => ("text" in p ? (p.text as string) : ""))
    .join("");
}
