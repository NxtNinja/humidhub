"use client";

import { useQuery } from "@tanstack/react-query";

import { getRecentEarthquakes } from "../api/earthquake.api";
import { earthquakeKeys } from "../queries/earthquake.query-keys";

export function useRecentEarthquakes() {
  return useQuery({
    queryKey: earthquakeKeys.recent(),

    queryFn: getRecentEarthquakes,
  });
}
