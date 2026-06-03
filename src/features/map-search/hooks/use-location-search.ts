"use client";

import { useQuery } from "@tanstack/react-query";

import { searchLocations } from "../api/search-location.api";

export function useLocationSearch(query: string) {
  return useQuery({
    queryKey: ["location-search", query],

    queryFn: () => searchLocations(query),

    enabled: query.length >= 3,
  });
}
