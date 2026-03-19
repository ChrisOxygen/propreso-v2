"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePostHog } from "posthog-js/react";

export function useDeleteProfile() {
  const queryClient = useQueryClient();
  const posthog = usePostHog();

  return useMutation({
    mutationFn: async (profileId: string) => {
      const res = await fetch(`/api/v1/profiles/${profileId}`, {
        method: "DELETE",
      });
      if (!res.ok && res.status !== 204) {
        const err = await res.json();
        throw new Error(err.error?.message ?? "Failed to delete profile");
      }
    },
    onSuccess: (_, profileId) => {
      posthog.capture("profile_deleted", { profile_id: profileId });
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
}
