"use client";

import { LocationHero } from "@/features/location/components/location-hero";
import { useCurrentLocation } from "@/features/location/hooks/use-current-location";

import { CurrentWeatherCard } from "@/features/weather/components/current-weather-card";
import { DailyForecast } from "@/features/weather/components/daily-forecast";
import { HourlyForecast } from "@/features/weather/components/hourly-forecast";

export function HomeContent() {
  const { location, isLoading, error } = useCurrentLocation();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-72 rounded-3xl border" />
        <div className="h-96 rounded-3xl border" />
      </div>
    );
  }

  if (error || !location) {
    return (
      <div className="rounded-3xl border p-8">
        Unable to determine location.
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
