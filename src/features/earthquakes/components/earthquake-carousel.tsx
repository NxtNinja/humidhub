"use client";

import { useMap } from "react-map-gl/maplibre";
import { formatDistanceToNow } from "date-fns";
import { MapPin, Activity } from "lucide-react";
import { EarthquakeResponse } from "../types/earthquake.types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type EarthquakeFeature = EarthquakeResponse["features"][number];

type Props = {
  earthquakes: EarthquakeFeature[];
  selected: EarthquakeFeature | null;
  onSelect: (quake: EarthquakeFeature) => void;
};

export function EarthquakeCarousel({ earthquakes, selected, onSelect }: Props) {
  const { "main-map": map } = useMap();

  const handleSelect = (quake: EarthquakeFeature) => {
    onSelect(quake);
    if (map) {
      const [lng, lat] = quake.geometry.coordinates;
      map.flyTo({ center: [lng, lat], zoom: 7, duration: 1500 });
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full relative py-2">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Activity className="h-3.5 w-3.5" />
          <span className="font-mono text-[10px] uppercase tracking-widest font-bold">
            Latest Seismic Events
          </span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60 hidden sm:block">
          Scroll horizontally to view all events
        </span>
      </div>

      {/* Scroll Area with gradient mask for smooth edge fading */}
      <div className="relative w-full mask-[linear-gradient(to_right,transparent,black_1%,black_99%,transparent)]">
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div className="flex w-max space-x-3 px-1 pt-2 pb-2">
            {earthquakes.map((quake, index) => {
              const isSelected = selected?.id === quake.id;
              const mag = quake.properties.mag ?? 0;

              let severityText = "text-primary";
              let severityBg = "bg-primary";
              let bgGlow = "";

              if (mag >= 5.0) {
                severityText = "text-destructive";
                severityBg = "bg-destructive";
                bgGlow = isSelected ? "bg-destructive/10" : "hover:bg-destructive/5";
              } else if (mag >= 3.0) {
                severityText = "text-orange-500";
                severityBg = "bg-orange-500";
                bgGlow = isSelected ? "bg-orange-500/10" : "hover:bg-orange-500/5";
              } else {
                bgGlow = isSelected ? "bg-primary/10" : "hover:bg-primary/5";
              }

              return (
                <button
                  key={quake.id}
                  onClick={() => handleSelect(quake)}
                  className={`group w-[240px] sm:w-[280px] shrink-0 text-left p-4 rounded-lg border border-border/40 bg-transparent transition-colors duration-200 flex flex-col gap-3 relative overflow-hidden ${bgGlow} ${
                    isSelected ? "ring-1 ring-foreground/30 bg-muted/10" : ""
                  }`}
                >
                  {/* Glowing Top Indicator */}
                  <div className={`absolute top-0 left-0 w-full h-[2px] opacity-60 ${severityBg} ${isSelected ? "opacity-100" : "group-hover:opacity-100 transition-opacity"}`} />

                  {/* Meta Top row */}
                  <div className="flex items-start justify-between w-full">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[8px] text-muted-foreground uppercase tracking-widest font-semibold">
                        Magnitude
                      </span>
                      <div
                        className={`font-heading text-3xl font-black leading-none tracking-tighter ${severityText}`}
                      >
                        {mag.toFixed(1)}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <div className="flex items-center gap-1">
                        {quake.properties.tsunami === 1 && (
                          <span className="font-mono text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded-sm font-bold bg-destructive/20 text-destructive animate-pulse">
                            TSUNAMI
                          </span>
                        )}
                        <span
                          className={`font-mono text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded-sm font-bold ${index === 0 ? "bg-primary/20 text-primary" : "bg-muted/50 text-muted-foreground"}`}
                        >
                          {index === 0 ? "Latest" : `#${index + 1}`}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest font-semibold">
                          SIG: {quake.properties.sig}
                        </span>
                        <span className="text-muted-foreground/30">•</span>
                        <div className="font-mono text-[10px] text-foreground uppercase tracking-wider text-right font-medium">
                          {formatDistanceToNow(
                            new Date(quake.properties.time),
                          ).replace("about ", "")}{" "}
                          ago
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location Bottom Row */}
                  <div className="mt-1 flex items-center gap-2 border-t border-border/40 pt-3">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-foreground truncate opacity-90">
                      {quake.properties.place}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          <ScrollBar
            orientation="horizontal"
            className="h-1.5 opacity-40 hover:opacity-100 transition-opacity"
          />
        </ScrollArea>
      </div>
    </div>
  );
}
