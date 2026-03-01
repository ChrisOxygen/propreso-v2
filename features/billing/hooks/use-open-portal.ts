"use client";

import { useMutation } from "@tanstack/react-query";

async function openPortal(): Promise<{ url: string }> {
  const res = await fetch("/api/billing/portal", { method: "POST" });
  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error ?? "Failed to open billing portal");
  }
  return res.json();
}

export function useOpenPortal() {
  return useMutation({
    mutationFn: openPortal,
    onSuccess: ({ url }) => {
      if (url) window.location.href = url;
    },
  });
}
