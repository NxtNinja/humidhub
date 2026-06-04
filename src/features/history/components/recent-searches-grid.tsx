"use client";

import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { Copy } from "lucide-react";

import { historyAtom } from "../store/history-store";
import { HistoryWeatherCard } from "./history-weather-card";

export function RecentSearchesGrid() {
  const [isMounted, setIsMounted] = useState(false);
  const history = useAtomValue(historyAtom);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 sm:p-8 animate-pulse h-48"></div>
    );
  }

  // Get only the 4 most recent UNIQUE searches to display in the grid
  const recentItems = [];
  const seenIds = new Set();
  
  for (const item of history) {
    if (!seenIds.has(item.id)) {
      seenIds.add(item.id);
      recentItems.push(item);
      if (recentItems.length === 4) break;
    }
  }

  return (
    <div className="rounded-xl border border-border/50 bg-card/30 p-6 sm:p-8 flex flex-col h-full transition-colors duration-300 hover:bg-card/50">
      <div className="relative z-10 w-full">
        <h2 className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-foreground mb-6">
          RECENT SEARCHES
        </h2>
        
        <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
          {recentItems.map((item) => (
            <HistoryWeatherCard
              key={`${item.id}_${item.timestamp}`}
              name={item.location.properties.name}
              latitude={item.location.geometry.coordinates[1]}
              longitude={item.location.geometry.coordinates[0]}
              timestamp={item.timestamp}
            />
          ))}
          {recentItems.length === 0 && (
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground col-span-2">
              NO RECENT SEARCHES
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
