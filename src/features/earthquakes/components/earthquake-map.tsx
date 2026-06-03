"use client";

import { useMemo } from "react";
import "maplibre-gl/dist/maplibre-gl.css";

import Map, { Marker } from "react-map-gl/maplibre";

import { EarthquakePopup } from "./earthquake-popup";
import { getMarkerSize } from "../utils/get-marker-size";
import { EarthquakeResponse } from "../types/earthquake.types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type EarthquakeFeature = EarthquakeResponse["features"][number];

type Props = {
  earthquakes: EarthquakeFeature[];
  selected: EarthquakeFeature | null;
  onSelect: (quake: EarthquakeFeature | null) => void;
};

export function EarthquakeMap({ earthquakes, selected, onSelect }: Props) {
  const initialViewState = useMemo(
    () => ({
      longitude: 0,
      latitude: 20,
      zoom: 1.4,
    }),
    [],
  );

  return (
    <div className="overflow-hidden w-full h-87.5 sm:h-112.5 lg:h-137.5 rounded-xl border border-border/40 ring-1 ring-white/5 relative shadow-xl">
      <Map
        id="main-map"
        initialViewState={initialViewState}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {earthquakes.map((quake) => {
          const [longitude, latitude] = quake.geometry.coordinates;
          const mag = quake.properties.mag ?? 0;

          return (
            <Marker key={quake.id} longitude={longitude} latitude={latitude}>
              <Popover
                open={selected?.id === quake.id}
                onOpenChange={(open) => {
                  if (open) onSelect(quake);
                  else if (selected?.id === quake.id) onSelect(null);
                }}
              >
                <PopoverTrigger asChild>
                  <button className="cursor-pointer transition-transform hover:scale-125 focus:outline-none">
                    <div
                      className={`rounded-full border-2 border-background shadow-[0_0_15px_rgba(239,68,68,0.5)] ${
                        mag >= 5.0
                          ? "bg-destructive"
                          : mag >= 3.0
                            ? "bg-orange-500"
                            : "bg-primary"
                      }`}
                      style={{
                        width: getMarkerSize(mag),
                        height: getMarkerSize(mag),
                      }}
                    />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  side="top"
                  sideOffset={10}
                  className="w-auto p-0 border-none bg-transparent shadow-none"
                >
                  <div className="bg-background border border-border/40 shadow-xl rounded-md overflow-hidden relative">
                    <EarthquakePopup
                      magnitude={quake.properties.mag ?? 0}
                      place={quake.properties.place}
                      depth={quake.geometry.coordinates[2]}
                      time={quake.properties.time}
                      sig={quake.properties.sig ?? 0}
                      tsunami={quake.properties.tsunami ?? 0}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </Marker>
          );
        })}
      </Map>

      {/* Subtle Map overlay gradient */}
      <div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-inset ring-white/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]" />
    </div>
  );
}
