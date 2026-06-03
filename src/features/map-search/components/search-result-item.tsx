import { MapPin } from "lucide-react";

import { SearchLocation } from "../types/search-location.types";

type Props = {
  location: SearchLocation;

  onSelect: (location: SearchLocation) => void;
};

export function SearchResultItem({ location, onSelect }: Props) {
  return (
    <button
      onClick={() => onSelect(location)}
      className="group flex w-full items-start gap-3 border-b border-border/40 px-4 py-3.5 text-left transition-all duration-200 hover:bg-primary/5 hover:border-primary/20 last:border-0"
    >
      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />

      <div className="flex flex-col gap-1.5 w-full">
        <p className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-foreground line-clamp-2 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
          {location.properties.name}
          {[location.properties.city, location.properties.state, location.properties.country]
            .filter(Boolean)
            .map(part => ` • ${part}`)
            .join("")}
        </p>
        <div className="flex items-center justify-between w-full">
          <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground/70 font-semibold bg-muted/40 px-1.5 py-0.5 rounded-sm">
            {location.properties.osm_value || "LOCATION"}
          </span>
          <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">
            LAT: {Number(location.geometry.coordinates[1]).toFixed(4)} • LON: {Number(location.geometry.coordinates[0]).toFixed(4)}
          </span>
        </div>
      </div>
    </button>
  );
}
