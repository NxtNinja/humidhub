"use client";

import { format } from "date-fns";
import { Calendar } from "lucide-react";

import { WEATHER_CODES } from "../constants/weather-codes";
import { useCurrentWeather } from "../hooks/use-current-weather";

import { DailyForecastRow } from "./daily-forecast-row";

type DailyForecastProps = {
  latitude: number;
  longitude: number;
};

export function DailyForecast({ latitude, longitude }: DailyForecastProps) {
  const { data, isLoading } = useCurrentWeather(latitude, longitude);

  if (isLoading) {
    return (
      <section className="py-6 sm:py-8 pb-8 flex flex-col">
        <div className="flex items-center justify-between pb-4">
          <div className="h-4 w-32 bg-primary/5 animate-pulse" />
        </div>
        <div className="mt-4 flex gap-6 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="min-w-24 md:min-w-28 h-40 animate-pulse bg-primary/5 rounded-2xl shrink-0"
            />
          ))}
        </div>
      </section>
    );
  }

  if (!data || !data.daily) {
    return null;
  }

  const forecast = data.daily.time.map((time, index) => ({
    day: format(new Date(time), "EEE"),
    weather: WEATHER_CODES[data.daily.weather_code[index]] ?? "Unknown",
    weatherCode: data.daily.weather_code[index],
    maxTemp: data.daily.temperature_2m_max[index],
    minTemp: data.daily.temperature_2m_min[index],
  }));

  return (
    <section className="py-6 sm:py-8 pb-8 flex flex-col">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2 text-foreground font-bold tracking-[0.2em] text-[10px] uppercase">
          <Calendar className="h-3.5 w-3.5 text-primary" />
          <span>+7 DAY PROJECTION</span>
        </div>
      </div>

      <div className="mt-4 flex gap-6 overflow-x-auto pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden -mx-4 px-4 md:mx-0 md:px-0">
        {forecast.map((day) => (
          <DailyForecastRow
            key={day.day}
            day={day.day}
            weather={day.weather}
            weatherCode={day.weatherCode}
            maxTemp={day.maxTemp}
            minTemp={day.minTemp}
          />
        ))}
      </div>
    </section>
  );
}
