"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import type { ZCreateProfile } from "@/features/profiles/schemas/profile-schemas";

interface ProfileApiError extends Error {
  code?: string;
}

export function useCreateProfile(options?: { onSuccess?: () => void }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const posthog = usePostHog();

  return useMutation({
    mutationFn: async (data: ZCreateProfile) => {
      const res = await fetch("/api/v1/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        const error: ProfileApiError = new Error(err.error?.message ?? "Failed to create profile");
        error.code = err.error?.code as string | undefined;
        throw error;
      }

      return res.json();
    },
    onSuccess: (profile: { id: string; name: string }) => {
      posthog.capture("profile_created", {
        profile_id: profile.id,
        name: profile.name,
      });
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      if (options?.onSuccess) {
        options.onSuccess();
      } else {
        router.push("/dashboard");
      }
    },
    onError: (err: ProfileApiError) => {
      if (err.code === "profile_limit_reached") {
        posthog.capture("profile_limit_hit");
      }
    },
  });
}
