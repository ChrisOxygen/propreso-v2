"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteProfile() {
  const queryClient = useQueryClient();

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
}
