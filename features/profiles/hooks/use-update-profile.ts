"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ZUpdateProfile } from "@/features/profiles/schemas/profile-schemas";
import type { FreelancerProfileModel } from "@/shared/lib/generated/prisma/models";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      profileId,
      data,
    }: {
      profileId: string;
      data: ZUpdateProfile;
    }): Promise<FreelancerProfileModel> => {
      const res = await fetch(`/api/profiles/${profileId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to update profile");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
}
