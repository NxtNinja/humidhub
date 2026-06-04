"use client";

import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { format, isToday, isYesterday } from "date-fns";
import { Copy } from "lucide-react";

import { historyAtom, HistoryItem } from "../store/history-store";
import { HistoryWeatherRow } from "./history-weather-row";

export function HistoryTimeline() {
  const [isMounted, setIsMounted] = useState(false);
  const history = useAtomValue(historyAtom);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 sm:p-8 animate-pulse h-96"></div>
    );
  }

  // Group by day
  const grouped = history.reduce((acc, item) => {
    const date = new Date(item.timestamp);
    let key = format(date, "MMM d, yyyy");
    if (isToday(date)) key = "TODAY";
    else if (isYesterday(date)) key = "YESTERDAY";

    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, HistoryItem[]>);

  return (
    <div className="rounded-xl border border-border/50 bg-card/30 p-6 sm:p-8 flex flex-col transition-colors duration-300 hover:bg-card/50">
      <h2 className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-foreground mb-6 shrink-0">
        TIMELINE
      </h2>

      <div className="relative z-10 flex flex-col gap-6 w-full max-h-[300px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {Object.entries(grouped).map(([day, items]) => (
          <div key={day} className="flex flex-col mb-4 last:mb-0">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                {day}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {items.map((item) => (
                <HistoryWeatherRow
                  key={`${item.id}_${item.timestamp}`}
                  name={item.location.properties.name}
                  latitude={item.location.geometry.coordinates[1]}
                  longitude={item.location.geometry.coordinates[0]}
                  timestamp={item.timestamp}
                />
              ))}
            </div>
          </div>
        ))}
        {history.length === 0 && (
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            NO HISTORY AVAILABLE
          </p>
        )}
      </div>
    </div>
  );
}
