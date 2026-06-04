"use client";

import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { Globe2, MapPin } from "lucide-react";

import { historyAtom } from "../store/history-store";

export function HistoryHero() {
  const [isMounted, setIsMounted] = useState(false);
  const history = useAtomValue(historyAtom);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 sm:p-8 animate-pulse h-32" />
        <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 sm:p-8 animate-pulse h-32" />
      </div>
    );
  }

  const uniqueLocationsCount = new Set(history.map((h) => h.id)).size;
  const lastVisit =
    history.length > 0 ? history[0].location.properties.name : "None";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {/* Stat Card 1 */}
      <div className="rounded-xl border border-border/50 bg-card/30 p-6 sm:p-8 transition-colors duration-300 hover:bg-card/50">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              Total Explored
            </h2>
            <Globe2 className="h-4 w-4 text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-mono font-bold text-foreground">
              {uniqueLocationsCount}
            </span>
            <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">locations</span>
          </div>
        </div>
      </div>

      {/* Stat Card 2 */}
      <div className="rounded-xl border border-border/50 bg-card/30 p-6 sm:p-8 transition-colors duration-300 hover:bg-card/50">
        <div className="flex flex-col gap-4 h-full justify-between">
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              Last Visit
            </h2>
            <MapPin className="h-4 w-4 text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-foreground truncate uppercase">
              {lastVisit}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
