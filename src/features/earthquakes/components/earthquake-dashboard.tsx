"use client";

import { Activity } from "lucide-react";
import { format } from "date-fns";

import { useRecentEarthquakes } from "../hooks/use-recent-earthquakes";
import { EarthquakeStats } from "./earthquake-stats";

export function EarthquakeDashboard() {
  const { data, isLoading, error } = useRecentEarthquakes();

  if (isLoading) {
    return (
      <section className="py-10 sm:py-16 border-b border-border/40 pb-12 flex flex-col">
        <div className="flex items-center gap-2 mb-6 text-primary">
          <Activity className="h-4 w-4 animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
            Acquiring Seismic Telemetry...
          </span>
        </div>
        <div className="h-24 w-3/4 max-w-xl bg-primary/5 animate-pulse rounded-sm" />
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="py-10 sm:py-16 border-b border-border/40 pb-12">
        <p className="font-mono text-xs uppercase text-destructive tracking-widest font-bold">
          [ Error: Seismic telemetry offline ]
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col border-b border-border/40 pb-8 pt-4 sm:pt-6 mt-4">
      {/* SEISMIC ACTIVITY FEED */}
      <div className="flex items-center gap-2 pb-4">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </div>
        <span className="font-mono text-[10px] text-foreground font-bold tracking-[0.2em] uppercase">
          SEISMIC ACTIVITY FEED
        </span>
      </div>

      {/* EARTHQUAKE MONITOR */}
      <div className="flex flex-col gap-3 py-2">
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-[0.85] tracking-tighter text-foreground wrap-break-words">
          EARTHQUAKE<br />
          MONITOR
        </h1>
        
        <p className="max-w-2xl font-mono text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-2 border-l-2 border-primary/50 pl-3 py-0.5">
          Track real-time seismic events around the globe.
        </p>
      </div>

      {/* Metadata */}
      <div className="mt-6 flex flex-col gap-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
        <p>Last Updated: {format(new Date(data.metadata.generated), "yyyy-MM-dd HH:mm 'UTC'")}</p>
        <p className="text-primary flex items-center gap-1.5">
          <Activity className="h-3 w-3" /> USGS Feed Active
        </p>
        <p>{data.features.length} Events Loaded</p>
      </div>

      {/* Grid of Stats */}
      <EarthquakeStats data={data} />
    </section>
  );
}
