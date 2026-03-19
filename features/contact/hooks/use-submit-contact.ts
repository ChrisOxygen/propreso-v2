"use client";

import { useMutation } from "@tanstack/react-query";
import type { ZContact } from "@/features/contact/schemas/contact-schema";

async function submitContact(data: ZContact): Promise<void> {
  const res = await fetch("/api/v1/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const { error } = await res.json().catch(() => ({ error: {} }));
    throw new Error(error?.message ?? "Failed to send message");
  }
}

export function useSubmitContact(options?: { onSuccess?: () => void }) {
  return useMutation({
    mutationFn: submitContact,
    onSuccess: options?.onSuccess,
  });
}
