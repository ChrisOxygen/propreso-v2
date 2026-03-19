"use client";

import { useMutation } from "@tanstack/react-query";
import { usePostHog } from "posthog-js/react";

async function createCheckout(priceId: string): Promise<{ url: string }> {
  const res = await fetch("/api/v1/billing/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId }),
  });
  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error?.message ?? "Failed to create checkout session");
  }
  return res.json();
}

export function useCreateCheckout() {
  const posthog = usePostHog();

  return useMutation({
    mutationFn: createCheckout,
    onSuccess: ({ url }, priceId) => {
      posthog.capture("checkout_started", { price_id: priceId });
      if (url) window.location.href = url;
    },
  });
}
