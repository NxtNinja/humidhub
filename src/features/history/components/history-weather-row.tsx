"use client";

import { useCurrentWeather } from "@/features/weather/hooks/use-current-weather";
import { useAirQuality } from "@/features/air-quality/hooks/use-air-quality";
import { format } from "date-fns";

type Props = {
  name: string;
  latitude: number;
  longitude: number;
  timestamp: number;
};

import { useRouter } from "next/navigation";

export function HistoryWeatherRow({ name, latitude, longitude, timestamp }: Props) {
  const router = useRouter();
  const { data: weather } = useCurrentWeather(latitude, longitude);
  const { data: aqi } = useAirQuality(latitude, longitude);

  const timeString = format(new Date(timestamp), "h:mm a");

  const handleRevisit = () => {
    router.push(`/map?lat=${latitude}&lon=${longitude}&name=${encodeURIComponent(name)}`);
  };

  return (
    <button 
      onClick={handleRevisit}
      className="flex flex-col gap-1 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground text-left w-full hover:bg-card/50 p-2 -mx-2 rounded-lg transition-colors group"
    >
      <div className="text-foreground font-semibold truncate max-w-[200px] sm:max-w-xs group-hover:text-primary transition-colors">{name}</div>
      <div>{weather ? `${Math.round(weather.current.temperature_2m)}°C` : "---°C"}</div>
      <div>{aqi ? `AQI ${Math.round(aqi.current.european_aqi)}` : "AQI ---"}</div>
      <div className="text-[10px]">{timeString}</div>
    </button>
  );
}
