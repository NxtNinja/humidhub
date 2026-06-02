"use client";

import { Droplets, Wind, Thermometer, Sun, Moon } from "lucide-react";

import { WEATHER_CODES } from "../constants/weather-codes";
import { useCurrentWeather } from "../hooks/use-current-weather";
import { WeatherStatCard } from "./weather-stat-card";

type CurrentWeatherCardProps = {
  latitude: number;
  longitude: number;
};

export function CurrentWeatherCard({
  latitude,
  longitude,
}: CurrentWeatherCardProps) {
  const { data, isLoading, error } = useCurrentWeather(latitude, longitude);

  if (isLoading) {
    return (
      <section className="py-6 sm:py-8 border-b border-border/40 pb-8">
        <div className="flex justify-between items-center mb-8">
          <div className="h-4 w-32 bg-primary/5 animate-pulse" />
          <div className="h-4 w-24 bg-primary/5 animate-pulse hidden sm:block" />
        </div>
        <div className="h-24 sm:h-32 w-48 sm:w-64 animate-pulse bg-primary/5 mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-6 pt-6 border-t border-border/40">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 w-full animate-pulse border-l-2 border-primary/20 pl-4 bg-primary/5" />
          ))}
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="py-6 sm:py-8 border-b border-border/40 pb-8">
        <p className="font-mono text-xs uppercase text-destructive tracking-widest">
          [ Error: Weather telemetry offline ]
        </p>
      </section>
    );
  }

  const { current, current_units } = data;
  const weatherDescription =
    WEATHER_CODES[current.weather_code] ?? "UNKNOWN ATMOSPHERE";

  return (
    <section className="py-6 sm:py-8 flex flex-col border-b border-border/40 pb-8">
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2 text-foreground font-bold tracking-[0.2em] text-[10px] uppercase">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </div>
          <span>LIVE TELEMETRY</span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
          <span className="hidden sm:inline">TZ: {data.timezone}</span>
          <span>ELEV: {data.elevation}m</span>
        </div>
      </div>

      {/* Standard Temperature & Icon Block */}
      <div className="py-4 flex flex-col">
        <div className="flex items-center gap-3 mb-2">
          {current.is_day === 1 ? (
            <Sun
              className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500"
              strokeWidth={2}
            />
          ) : (
            <Moon
              className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400"
              strokeWidth={2}
            />
          )}
          <p className="font-mono text-xs sm:text-sm text-foreground font-semibold uppercase tracking-widest border-l-2 border-primary pl-3">
            {weatherDescription}
          </p>
        </div>

        <div className="flex items-start mt-2">
          <h2 className="font-heading text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter text-foreground uppercase leading-none">
            {Math.round(current.temperature_2m)}
          </h2>
          <span className="text-2xl sm:text-3xl font-black text-muted-foreground/60 mt-1 sm:mt-2 ml-1">
            {current_units.temperature_2m}
          </span>
        </div>
      </div>

      {/* Technical Data Grid */}
      <div className="mt-6 pt-6 border-t border-border/40 grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-6">
        <WeatherStatCard
          icon={<Thermometer className="h-3 w-3" />}
          label="Apparent Temp"
          value={`${Math.round(current.apparent_temperature)}${current_units.apparent_temperature}`}
        />

        <WeatherStatCard
          icon={<Droplets className="h-3 w-3" />}
          label="Humidity"
          value={`${current.relative_humidity_2m}${current_units.relative_humidity_2m}`}
        />

        <WeatherStatCard
          icon={<Wind className="h-3 w-3" />}
          label="Wind Velocity"
          value={`${current.wind_speed_10m} ${current_units.wind_speed_10m}`}
        />
      </div>
      <div className="mt-6 pt-6 border-t border-border/40 grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-6">
        <WeatherStatCard
          icon={<Thermometer className="h-3 w-3" />}
          label="Surface Pressure"
          value={`${current.surface_pressure} ${current_units.surface_pressure}`}
        />

        <WeatherStatCard
          icon={<Droplets className="h-3 w-3" />}
          label="Visibility"
          value={`${current.visibility}${current_units.visibility}`}
        />

        <WeatherStatCard
          icon={<Wind className="h-3 w-3" />}
          label="Cloud Cover"
          value={`${current.cloud_cover}${current_units.cloud_cover}`}
        />

        <WeatherStatCard
          icon={<Wind className="h-3 w-3" />}
          label="Precipitation"
          value={`${current.precipitation}${current_units.precipitation}`}
        />
      </div>
    </section>
  );
}
