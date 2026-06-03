"use client";

import { MapPin, Globe, Navigation } from "lucide-react";
import { SearchLocation } from "../types/search-location.types";

type Props = {
  location: SearchLocation | null;
};

export function LocationDetails({ location }: Props) {
  if (!location) return null;

  const [longitude, latitude] = location.geometry.coordinates;

  return (
    <div className="mt-6 flex flex-col gap-4 border-t border-border/40 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
            LOCATION TELEMETRY
          </span>
        </div>
        <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground/70 font-semibold bg-muted/40 px-1.5 py-0.5 rounded-sm">
          {location.properties.osm_value || "LOCATION"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1 border-l-2 border-primary/40 pl-3">
          <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">Place</span>
          <span className="font-mono text-xs font-bold uppercase tracking-wide text-foreground">
            {location.properties.name}
          </span>
        </div>

        <div className="flex flex-col gap-1 border-l-2 border-border/40 pl-3">
          <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground flex items-center gap-1">
            <Globe className="h-2.5 w-2.5" /> Region
          </span>
          <span className="font-mono text-xs uppercase tracking-wide text-foreground">
            {[location.properties.city, location.properties.state, location.properties.country]
              .filter(Boolean)
              .join(" • ")}
          </span>
        </div>

        <div className="flex flex-col gap-1 border-l-2 border-border/40 pl-3">
          <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground flex items-center gap-1">
            <Navigation className="h-2.5 w-2.5" /> Coordinates
          </span>
          <span className="font-mono text-xs uppercase tracking-wide text-foreground">
            {Number(latitude).toFixed(5)}, {Number(longitude).toFixed(5)}
          </span>
        </div>
      </div>
    </div>
  );
}
