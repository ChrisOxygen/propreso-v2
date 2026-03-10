"use client";

import { useMutation } from "@tanstack/react-query";

async function deleteAccount(): Promise<void> {
  const res = await fetch("/api/v1/account", { method: "DELETE" });
  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error?.message ?? "Failed to delete account");
  }
}

export function useDeleteAccount() {
  return useMutation({
    mutationFn: deleteAccount,
  });
}
