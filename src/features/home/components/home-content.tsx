"use client";

import { AirQualityCard } from "@/features/air-quality/components/air-quality-card";
import { LocationHero } from "@/features/location/components/location-hero";
import { useCurrentLocation } from "@/features/location/hooks/use-current-location";

import { CurrentWeatherCard } from "@/features/weather/components/current-weather-card";
import { DailyForecast } from "@/features/weather/components/daily-forecast";
import { HourlyForecast } from "@/features/weather/components/hourly-forecast";

import { Activity } from "lucide-react";

export function HomeContent() {
  const { location, isLoading, error } = useCurrentLocation();

  if (isLoading) {
    return (
      <div className="space-y-6 md:space-y-8 animate-in fade-in duration-1000">
        {/* Skeleton Location Hero */}
        <div className="flex flex-col py-10 md:py-16 border-b border-border/40 pb-12">
          <div className="flex items-center gap-2 mb-6 text-primary">
            <Activity className="h-4 w-4 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
              Acquiring Satellite Telemetry...
            </span>
          </div>
          <div className="h-16 md:h-24 w-3/4 max-w-2xl bg-primary/5 animate-pulse rounded-sm" />
          <div className="h-6 w-1/3 max-w-sm bg-primary/5 animate-pulse mt-4 rounded-sm" />
        </div>

        {/* Skeleton Current Weather */}
        <div className="py-6 sm:py-8 border-b border-border/40 pb-8">
          <div className="flex justify-between items-center mb-8">
            <div className="h-4 w-32 bg-primary/5 animate-pulse" />
            <div className="h-4 w-24 bg-primary/5 animate-pulse hidden sm:block" />
          </div>
          <div className="h-24 sm:h-32 w-48 sm:w-64 animate-pulse bg-primary/5 mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-border/40">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-10 w-full animate-pulse border-l-2 border-primary/20 pl-4 bg-primary/5"
              />
            ))}
          </div>
        </div>

        {/* Skeleton Hourly / Daily (Row of Cards) */}
        <div className="py-6 sm:py-8 pb-8 flex gap-6 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="min-w-24 md:min-w-28 h-40 animate-pulse bg-primary/5 rounded-2xl shrink-0"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error || !location) {
    return (
      <div className="py-12 border-b border-border/40">
        <p className="font-mono text-xs uppercase text-destructive tracking-widest font-bold">
          [ Error: Unable to establish coordinates ]
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <LocationHero location={location} />

      <CurrentWeatherCard
        latitude={Number(location.lat)}
        longitude={Number(location.lon)}
      />

      <AirQualityCard
        latitude={Number(location.lat)}
        longitude={Number(location.lon)}
      />

      <HourlyForecast
        latitude={Number(location.lat)}
        longitude={Number(location.lon)}
      />

      <DailyForecast
        latitude={Number(location.lat)}
        longitude={Number(location.lon)}
      />
    </div>
  );
}
