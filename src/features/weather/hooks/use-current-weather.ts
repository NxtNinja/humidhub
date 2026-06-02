"use client";

import { useQuery } from "@tanstack/react-query";

import { getCurrentWeather } from "../api/weather.api";
import { weatherKeys } from "../queries/weather.query-keys";

export function useCurrentWeather(latitude?: number, longitude?: number) {
  return useQuery({
    queryKey:
      latitude && longitude
        ? weatherKeys.current(latitude, longitude)
        : ["weather"],

    queryFn: () => getCurrentWeather(latitude!, longitude!),

    enabled: latitude !== undefined && longitude !== undefined,
  });
}
