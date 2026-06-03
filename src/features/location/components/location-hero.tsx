"use client";

import {
  MapPin,
  Map,
  Mailbox,
  Navigation,
  Globe,
  Landmark,
  Building,
  Flag,
} from "lucide-react";
import { format } from "date-fns";
import { useEffect, useState } from "react";

import { LocationInfoCard } from "./location-info-card";
import { NominatimLocation } from "../types/nominatim.types";

type LocationHeroProps = {
  location: NominatimLocation;
};

export function LocationHero({ location }: LocationHeroProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);

    return () => clearInterval(timer);
  }, []);

  const primaryName =
    location.address.city ??
    location.address.municipality ??
    location.address.county ??
    location.address.suburb ??
    "Current Location";

  return (
    <section className="flex flex-col border-b border-border/40 pb-6 pt-4 sm:pt-6 mt-4">
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2 text-primary font-bold tracking-[0.2em] text-[10px] uppercase">
          <MapPin className="h-3.5 w-3.5" />

          <span>{location.type || "SYS.LOC.DETECTED"}</span>
        </div>

        <p className="font-mono text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {format(time, "yyyy-MM-dd / HH:mm:ss")}
        </p>
      </div>

      {/* Massive Title Block */}
      <div className="flex flex-col gap-2 py-2 sm:py-4">
        <h1 className="font-heading text-5xl font-black uppercase leading-[0.85] tracking-tighter text-foreground wrap-break-words sm:text-6xl md:text-7xl">
          {primaryName}
        </h1>

        <p className="mt-1 max-w-2xl border-l border-primary/50 pl-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground line-clamp-3 sm:text-xs">
          {location.display_name}
        </p>
      </div>

      {/* Technical Data Grid */}
      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border/40 pb-2 pt-4 sm:grid-cols-3 lg:grid-cols-4">
        {location.address.country && (
          <LocationInfoCard
            icon={<Globe className="h-3 w-3" />}
            label="Country"
            value={location.address.country}
          />
        )}

        {location.address.state && (
          <LocationInfoCard
            icon={<Map className="h-3 w-3" />}
            label="State"
            value={location.address.state}
          />
        )}

        {(location.address.county || location.address.state_district) && (
          <LocationInfoCard
            icon={<Landmark className="h-3 w-3" />}
            label="District"
            value={
              location.address.state_district ??
              location.address.county ??
              "N/A"
            }
          />
        )}

        {location.address.suburb && (
          <LocationInfoCard
            icon={<Building className="h-3 w-3" />}
            label="Suburb"
            value={location.address.suburb}
          />
        )}

        <LocationInfoCard
          icon={<Mailbox className="h-3 w-3" />}
          label="Postcode"
          value={location.address.postcode ?? "N/A"}
        />

        <LocationInfoCard
          icon={<Flag className="h-3 w-3" />}
          label="Code"
          value={
            location.address.country_code
              ? location.address.country_code.toUpperCase()
              : "N/A"
          }
        />

        <div className="col-span-2 sm:col-span-1 lg:col-span-2">
          <LocationInfoCard
            icon={<Navigation className="h-3 w-3" />}
            label="Telemetry (LAT/LON)"
            value={`${Number(location.lat).toFixed(6)}, ${Number(location.lon).toFixed(6)}`}
          />
        </div>
      </div>
    </section>
  );
}
