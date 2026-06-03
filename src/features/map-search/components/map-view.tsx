"use client";

import { useEffect, useRef } from "react";
import Map, { Marker, MapRef } from "react-map-gl/maplibre";
import { MapPin } from "lucide-react";
import { SearchLocation } from "../types/search-location.types";

type Props = {
  selectedLocation: SearchLocation | null;
};

export function MapView({ selectedLocation }: Props) {
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    if (!selectedLocation) return;

    const [longitude, latitude] = selectedLocation.geometry.coordinates;

    mapRef.current?.flyTo({
      center: [longitude, latitude],
      zoom: 12,
      duration: 2000,
    });
  }, [selectedLocation]);

  return (
    <div className="mt-8 overflow-hidden w-full h-[400px] sm:h-[500px] rounded-xl border border-border/40 ring-1 ring-white/5 relative shadow-xl">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 78.9629,
          latitude: 20.5937,
          zoom: 4,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
      >
        {selectedLocation && (
          <Marker
            longitude={selectedLocation.geometry.coordinates[0]}
            latitude={selectedLocation.geometry.coordinates[1]}
            anchor="bottom"
          >
            <div className="flex flex-col items-center">
              <div className="h-3 w-3 rounded-full bg-primary ring-4 ring-primary/30 animate-pulse" />
            </div>
          </Marker>
        )}
      </Map>

      {/* Empty state overlay */}
      {!selectedLocation && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-2 bg-card/60 backdrop-blur-sm border border-border/40 rounded-lg px-6 py-4">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Search a location to explore
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
