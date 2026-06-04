"use client";

import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import { historyAtom } from "../store/history-store";
import { useRouter } from "next/navigation";
import { SearchLocation } from "@/features/map-search/types/search-location.types";

export function HistoryAnalytics() {
  const [isMounted, setIsMounted] = useState(false);
  const history = useAtomValue(historyAtom);

  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return (
      <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 sm:p-8 animate-pulse h-48"></div>
    );
  }

  const stats = history.reduce(
    (acc, item) => {
      const name = item.location.properties.name;
      if (!acc[name]) {
        acc[name] = { count: 0, location: item.location };
      }
      acc[name].count += 1;
      return acc;
    },
    {} as Record<string, { count: number; location: SearchLocation }>,
  );

  // Sort by frequency descending
  const sortedStats = Object.entries(stats).sort(
    (a, b) => b[1].count - a[1].count,
  );
  const topStats = sortedStats.slice(0, 4);
  const maxCount = topStats[0]?.[1].count || 1;

  const handleRevisit = (location: SearchLocation) => {
    router.push(
      `/map?lat=${location.geometry.coordinates[1]}&lon=${location.geometry.coordinates[0]}&name=${encodeURIComponent(location.properties.name)}`,
    );
  };

  return (
    <div className="rounded-xl border border-border/50 bg-card/30 p-6 sm:p-8 flex flex-col transition-colors duration-300 hover:bg-card/50">
      <div className="flex flex-col gap-6 w-full">
        <h2 className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-foreground">
          MOST VISITED
        </h2>

        <div className="flex flex-col gap-4 mt-2">
          {topStats.length === 0 && (
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              NO DATA AVAILABLE YET
            </p>
          )}
          {topStats.map(([name, stat], index) => (
            <button
              key={name}
              onClick={() => handleRevisit(stat.location)}
              className="flex flex-col gap-2 w-full group text-left hover:opacity-80 transition-opacity"
            >
              <div className="flex justify-between items-end text-sm font-mono w-full">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">#{index + 1}</span>
                  <span className="font-semibold text-foreground truncate max-w-37.5 uppercase group-hover:text-primary transition-colors">
                    {name}
                  </span>
                </div>
                <span className="text-muted-foreground text-xs uppercase">
                  {stat.count} visit{stat.count !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="h-1 w-full bg-muted overflow-hidden rounded-none">
                <div
                  className="h-full bg-primary/80 transition-all duration-1000 ease-out"
                  style={{ width: `${(stat.count / maxCount) * 100}%` }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
