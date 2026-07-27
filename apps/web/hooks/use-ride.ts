"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export function useRide(id: string) {
  return useQuery({
    queryKey: ["ride", id],
    queryFn: () => api.get(`/rides/${id}`),
    enabled: !!id,
  });
}
