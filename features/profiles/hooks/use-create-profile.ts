"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { ZCreateProfile } from "@/features/profiles/schemas/profile-schemas";

export function useCreateProfile(options?: { onSuccess?: () => void }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ZCreateProfile) => {
      const res = await fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to create profile");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      if (options?.onSuccess) {
        options.onSuccess();
      } else {
        router.push("/dashboard");
      }
    },
  });
}
