"use client";

import { useQuery } from "@tanstack/react-query";
import type { FreelancerProfileModel } from "@/shared/lib/generated/prisma/models";

async function fetchProfiles(): Promise<FreelancerProfileModel[]> {
  const res = await fetch("/api/v1/profiles");
  if (!res.ok) throw new Error("Failed to fetch profiles");
  return res.json();
}

export function useProfiles() {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: fetchProfiles,
    staleTime: 1000 * 60 * 2, // 2 min
  });
}
