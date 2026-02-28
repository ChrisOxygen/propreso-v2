"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FreelancerProfileModel } from "@/shared/lib/generated/prisma/models";

export function useSetDefaultProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileId: string) => {
      const res = await fetch(`/api/profiles/${profileId}/default`, {
        method: "PATCH",
      });
      if (!res.ok && res.status !== 204) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to set default profile");
      }
    },
    onMutate: async (profileId) => {
      await queryClient.cancelQueries({ queryKey: ["profiles"] });
      const previous = queryClient.getQueryData<FreelancerProfileModel[]>(["profiles"]);

      queryClient.setQueryData<FreelancerProfileModel[]>(["profiles"], (old) =>
        old?.map((p) => ({ ...p, isDefault: p.id === profileId })) ?? []
      );

      return { previous };
    },
    onError: (_err, _profileId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["profiles"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
}
