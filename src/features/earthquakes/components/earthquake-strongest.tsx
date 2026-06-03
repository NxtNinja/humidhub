"use client";

import { formatDistanceToNow } from "date-fns";
import { MapPin, AlertTriangle } from "lucide-react";
import { EarthquakeResponse } from "../types/earthquake.types";

type EarthquakeFeature = EarthquakeResponse["features"][number];

type Props = {
  earthquakes: EarthquakeFeature[];
};

export function EarthquakeStrongest({ earthquakes }: Props) {
  // Sort by magnitude descending and take top 4
  const strongest = [...earthquakes]
    .sort((a, b) => (b.properties.mag ?? 0) - (a.properties.mag ?? 0))
    .slice(0, 4);

  if (strongest.length === 0) return null;

  return (
    <div className="mt-12 flex flex-col gap-6 w-full pb-8">
      <div className="flex items-center justify-between pb-3 border-b border-border/40">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
          <span className="font-mono text-[10px] text-foreground font-bold tracking-[0.2em] uppercase">
            HIGHEST MAGNITUDE EVENTS
          </span>
        </div>
        <p className="font-mono text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
          TOP 4 SEISMIC SHIFTS
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {strongest.map((quake, index) => {
          const mag = quake.properties.mag ?? 0;
          let severityColor = "text-primary border-primary";
          let severityBg = "bg-primary";

          if (mag >= 5.0) {
            severityColor = "text-destructive border-destructive";
            severityBg = "bg-destructive";
          } else if (mag >= 3.0) {
            severityColor = "text-orange-500 border-orange-500";
            severityBg = "bg-orange-500";
          }

          return (
            <div
              key={quake.id}
              className="group relative flex flex-col gap-3 p-5 rounded-xl border border-border/50 bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Glowing Top Indicator */}
              <div
                className={`absolute top-0 left-0 w-full h-0.75 opacity-80 ${severityBg}`}
              />

              <div className="flex items-start justify-between w-full">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[8px] text-muted-foreground uppercase tracking-widest font-semibold">
                    Magnitude
                  </span>
                  <div
                    className={`font-heading text-4xl font-black leading-none tracking-tighter ${severityColor.split(" ")[0]}`}
                  >
                    {mag.toFixed(1)}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-sm font-black bg-muted/50 text-muted-foreground`}
                  >
                    #{index + 1}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border/40 pt-3 mt-1">
                <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest font-semibold">
                  SIG: {quake.properties.sig}
                </span>
                <div className="font-mono text-[10px] text-foreground uppercase tracking-wider text-right font-medium">
                  {formatDistanceToNow(new Date(quake.properties.time)).replace(
                    "about ",
                    "",
                  )}{" "}
                  ago
                </div>
              </div>

              <div className="mt-1 flex items-start gap-2 bg-muted/10 p-2.5 rounded-md border border-border/30">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground mt-0.5" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-foreground leading-snug line-clamp-2 opacity-90">
                  {quake.properties.place}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
