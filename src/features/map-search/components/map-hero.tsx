"use client";

import { Globe2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSetAtom } from "jotai";

import { LocationSearch } from "./location-search";
import { LocationDetails } from "./location-details";
import { MapView } from "./map-view";
import { SearchLocation } from "../types/search-location.types";
import { historyAtom } from "@/features/history/store/history-store";

import { CurrentWeatherCard } from "@/features/weather/components/current-weather-card";
import { AirQualityCard } from "@/features/air-quality/components/air-quality-card";
import { HourlyForecast } from "@/features/weather/components/hourly-forecast";
import { DailyForecast } from "@/features/weather/components/daily-forecast";

export function MapHero() {
  const searchParams = useSearchParams();
  const setHistory = useSetAtom(historyAtom);

  const [selectedLocation, setSelectedLocation] = useState<SearchLocation | null>(() => {
    const latParam = searchParams.get("lat");
    const lonParam = searchParams.get("lon");
    const nameParam = searchParams.get("name");

    if (latParam && lonParam && nameParam) {
      return {
        type: "Feature",
        properties: {
          osm_type: "node",
          osm_id: Date.now(),
          osm_key: "place",
          osm_value: "city",
          type: "city",
          name: nameParam,
          country: "",
          countrycode: "",
        },
        geometry: {
          type: "Point",
          coordinates: [parseFloat(lonParam), parseFloat(latParam)],
        },
      };
    }
    return null;
  });

  const weatherRef = useRef<HTMLDivElement>(null);

  const lat = selectedLocation?.geometry.coordinates[1];
  const lon = selectedLocation?.geometry.coordinates[0];

  useEffect(() => {
    const latParam = searchParams.get("lat");
    const lonParam = searchParams.get("lon");
    const nameParam = searchParams.get("name");

    if (latParam && lonParam && nameParam) {
      // Give the map time to render, then scroll to data
      setTimeout(() => {
        weatherRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 600);
    }
  }, [searchParams]);

  const handleSelect = (location: SearchLocation) => {
    setSelectedLocation(location);
    
    // Save to history (don't deduplicate so we can count frequencies)
    setHistory((prev) => {
      return [
        {
          id: String(location.properties.osm_id),
          location,
          timestamp: Date.now(),
        },
        ...prev,
      ].slice(0, 50); // Keep last 50 items
    });

    // Give the map flyTo animation time to start, then scroll to data
    setTimeout(() => {
      weatherRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 600);
  };

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

      {/* Hero Title */}
      <div className="flex flex-col gap-3 pb-2">
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-[0.85] tracking-tighter text-foreground">
          MAP
          <br />
          EXPLORER
        </h1>
        <p className="max-w-2xl border-l-2 border-primary/50 pl-3 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground py-0.5">
          Explore weather, air quality and environmental conditions anywhere in
          the world.
        </p>
      </div>

      {/* Search */}
      <LocationSearch onSelect={handleSelect} />

      {/* Map */}
      <MapView selectedLocation={selectedLocation} />

      {/* Location Details */}
      <LocationDetails location={selectedLocation} />

      {/* Environmental Telemetry */}
      {selectedLocation && lat !== undefined && lon !== undefined && (
        <div ref={weatherRef}>
          <CurrentWeatherCard latitude={lat} longitude={lon} />
          <AirQualityCard latitude={lat} longitude={lon} />
          <HourlyForecast latitude={lat} longitude={lon} />
          <DailyForecast latitude={lat} longitude={lon} />
        </div>
      )}
    </section>
  );
}

