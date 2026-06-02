"use client";

import { format } from "date-fns";
import { Activity } from "lucide-react";

import { WEATHER_CODES } from "../constants/weather-codes";
import { useCurrentWeather } from "../hooks/use-current-weather";

import { HourlyForecastCard } from "./hourly-forecast-card";

type Props = {
  latitude: number;
  longitude: number;
};

export function HourlyForecast({ latitude, longitude }: Props) {
  const { data, isLoading } = useCurrentWeather(latitude, longitude);

  if (isLoading) {
    return (
      <section className="py-6 sm:py-8 border-b border-border/40 pb-8">
        <div className="h-4 w-32 animate-pulse bg-muted mb-6" />
        <div className="flex gap-4 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="min-w-20 h-24 animate-pulse border-l border-muted pl-3"
            />
          ))}
        </div>
      </section>
    );
  }

  if (!data) {
    return null;
  }

  const forecasts = data.hourly.time.slice(0, 12).map((time, index) => ({
    time,
    temperature: data.hourly.temperature_2m[index],
    weatherCode: data.hourly.weather_code[index],
  }));

  return (
    <section className="py-6 sm:py-8 border-b border-border/40 pb-8 flex flex-col">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2 text-foreground font-bold tracking-[0.2em] text-[10px] uppercase">
          <Activity className="h-3.5 w-3.5 text-primary" />
          <span>+12 HOUR PROJECTION</span>
        </div>
      </div>

      <div className="mt-4 flex gap-6 overflow-x-auto pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden -mx-4 px-4 md:mx-0 md:px-0">
        {forecasts.map((forecast) => (
          <HourlyForecastCard
            key={forecast.time}
            time={format(new Date(forecast.time), "ha")}
            temperature={forecast.temperature}
            weather={WEATHER_CODES[forecast.weatherCode] ?? "Unknown"}
            weatherCode={forecast.weatherCode}
          />
        ))}
      </div>
    </section>
  );
}
