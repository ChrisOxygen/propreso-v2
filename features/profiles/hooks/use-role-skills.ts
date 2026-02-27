"use client";

import { useQuery } from "@tanstack/react-query";

async function fetchRoleSkills(role: string): Promise<string[]> {
  const res = await fetch(
    `/api/profiles/skills?role=${encodeURIComponent(role)}`
  );
  if (!res.ok) throw new Error("Failed to fetch skills");
  const data = await res.json();
  return data.skills as string[];
}

export function useRoleSkills(role: string | null) {
  return useQuery({
    queryKey: ["skills", role],
    queryFn: () => fetchRoleSkills(role!),
    enabled: !!role,
    staleTime: Infinity, // skills for a given role never change
    gcTime: 1000 * 60 * 60, // keep in cache for 1 hour
    retry: 1,
  });
}
