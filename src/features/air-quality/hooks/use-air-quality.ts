"use client";

import { useQuery } from "@tanstack/react-query";

import { getAirQuality } from "../api/air-quality.api";
import { airQualityKeys } from "../queries/air-quality.query-keys";

export function useAirQuality(latitude: number, longitude: number) {
  return useQuery({
    queryKey: airQualityKeys.current(latitude, longitude),

    queryFn: () => getAirQuality(latitude, longitude),
  });
}
