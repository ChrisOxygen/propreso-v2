"use client";

import { useMutation } from "@tanstack/react-query";

async function updateDisplayName(fullName: string): Promise<void> {
  const res = await fetch("/api/v1/account", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName }),
  });
  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error?.message ?? "Failed to update name");
  }
}

export function useUpdateDisplayName() {
  return useMutation({
    mutationFn: updateDisplayName,
  });
}
