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

import { useCurrentLocation } from "../hooks/use-current-location";
import { LocationInfoCard } from "./location-info-card";

export function LocationHero() {
  const { location, isLoading, error } = useCurrentLocation();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <section className="py-4 sm:py-6 border-b border-border/50 pb-6">
        <div className="space-y-4">
          <div className="h-4 w-32 animate-pulse bg-muted" />
          <div className="h-12 sm:h-16 w-64 animate-pulse bg-muted" />
          <div className="flex gap-4 mt-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-10 w-24 animate-pulse border-l border-muted pl-4"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !location) {
    return (
      <section className="py-4 sm:py-6 border-b border-border/50 pb-6">
        <p className="font-mono text-xs uppercase text-destructive tracking-widest">
          [ Error: Unable to detect location ]
        </p>
      </section>
    );
  }

  const primaryName =
    location.address.city ??
    location.address.municipality ??
    location.address.county ??
    location.address.suburb ??
    "Current Location";

  return (
    <section className="py-4 sm:py-6 flex flex-col border-b border-border/40 pb-6">
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
      <div className="py-2 sm:py-4 flex flex-col gap-2">
        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-foreground uppercase leading-[0.85] break-words">
          {primaryName}
        </h1>

        <p className="font-mono text-[10px] sm:text-xs text-muted-foreground max-w-2xl leading-relaxed uppercase tracking-widest border-l border-primary/50 pl-3 mt-1 line-clamp-3">
          {location.display_name}
        </p>
      </div>

      {/* Technical Data Grid (Wrapping) */}
      <div className="mt-4 pt-4 border-t border-border/40 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-6 pb-2">
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
