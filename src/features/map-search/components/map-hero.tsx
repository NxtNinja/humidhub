"use client";

import { Globe2 } from "lucide-react";
import { LocationSearch } from "./location-search";
import { SearchLocation } from "../types/search-location.types";
import { useState } from "react";

export function MapHero() {
  const [, setSelectedLocation] = useState<SearchLocation | null>(null);
  return (
    <section className="border-b border-border/40 pb-8 pt-4 sm:pt-6 mt-4">
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <Globe2 className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
            ENVIRONMENTAL EXPLORER
          </span>
        </div>

        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          LIVE LOCATION SEARCH
        </span>
      </div>

      {/* Hero Content */}
      <div className="flex flex-col gap-4">
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-[0.85] tracking-tighter text-foreground wrap-break-words">
          MAP
          <br />
          EXPLORER
        </h1>

        <p className="max-w-2xl border-l-2 border-primary/50 pl-3 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-2 py-0.5">
          Explore weather, air quality and environmental conditions anywhere in
          the world.
        </p>
      </div>

      <LocationSearch onSelect={setSelectedLocation} />
    </section>
  );
}
