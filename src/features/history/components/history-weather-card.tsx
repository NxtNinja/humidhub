"use client";

import { useCurrentWeather } from "@/features/weather/hooks/use-current-weather";
import { useAirQuality } from "@/features/air-quality/hooks/use-air-quality";
import { formatDistanceToNow } from "date-fns";
import Link from "next/navigation";
import { useRouter } from "next/navigation";

type Props = {
  name: string;
  latitude: number;
  longitude: number;
  timestamp: number;
};

export function HistoryWeatherCard({ name, latitude, longitude, timestamp }: Props) {
  const router = useRouter();
  const { data: weather } = useCurrentWeather(latitude, longitude);
  const { data: aqi } = useAirQuality(latitude, longitude);

  const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });

  const handleRevisit = () => {
    router.push(`/map?lat=${latitude}&lon=${longitude}&name=${encodeURIComponent(name)}`);
  };

  return (
    <button
      onClick={handleRevisit}
      className="text-left w-full rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm p-4 hover:bg-card/50 hover:border-primary/50 transition-all flex flex-col font-mono text-xs uppercase tracking-widest text-muted-foreground relative"
    >
      <div className="flex flex-col w-full mb-4 gap-1">
        <div className="text-foreground font-semibold truncate w-full">{name}</div>
        <div className="text-[9px] opacity-70">{timeAgo}</div>
      </div>
      
      <div className="flex flex-row items-center gap-x-4 gap-y-2 flex-wrap w-full text-[10px] sm:text-xs">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="opacity-50">TEMP</span>
          <span className="text-foreground">{weather ? `${Math.round(weather.current.temperature_2m)}°C` : "--°C"}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="opacity-50">AQI</span>
          <span className="text-foreground">{aqi ? Math.round(aqi.current.european_aqi) : "--"}</span>
        </div>
      </div>
    </button>
  );
}
