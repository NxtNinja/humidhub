"use client";

import { Wind, Activity, ShieldAlert, Sun } from "lucide-react";

import { useAirQuality } from "../hooks/use-air-quality";
import { getAQIStatus } from "../utils/get-aqi-status";
import { AirQualityStatCard } from "./air-quality-stat-card";
import {
  getPm25Status,
  getPm10Status,
  getNo2Status,
  getUvStatus,
  getCoStatus,
  getOzoneStatus,
} from "../utils/aqi-status-helpers";

type Props = {
  latitude: number;
  longitude: number;
};

export function AirQualityCard({ latitude, longitude }: Props) {
  const { data, isLoading, error } = useAirQuality(latitude, longitude);

  if (isLoading) {
    return (
      <section className="py-6 sm:py-8 border-b border-border/40 pb-8">
        <div className="flex justify-between items-center mb-8">
          <div className="h-4 w-32 bg-primary/5 animate-pulse" />
          <div className="h-4 w-24 bg-primary/5 animate-pulse hidden sm:block" />
        </div>
        <div className="h-24 sm:h-32 w-48 sm:w-64 animate-pulse bg-primary/5 mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-6 pt-6 border-t border-border/40">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 w-full animate-pulse border-l-2 border-primary/20 pl-4 bg-primary/5" />
          ))}
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="py-6 sm:py-8 border-b border-border/40 pb-8">
        <p className="font-mono text-xs uppercase text-destructive tracking-widest font-bold">
          [ Error: Air quality sensors offline ]
        </p>
      </section>
    );
  }

  const { current, current_units } = data;
  const aqiStatus = getAQIStatus(current.european_aqi);

  const pm25 = getPm25Status(current.pm2_5);
  const pm10 = getPm10Status(current.pm10);
  const no2 = getNo2Status(current.nitrogen_dioxide);
  const uv = getUvStatus(current.uv_index);
  const co = getCoStatus(current.carbon_monoxide);
  const ozone = getOzoneStatus(current.ozone);

  return (
    <section className="py-6 sm:py-8 flex flex-col border-b border-border/40 pb-8">
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2 text-foreground font-bold tracking-[0.2em] text-[10px] uppercase">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </div>
          <span>ATMOSPHERIC SENSORS</span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
          <span>AQI STANDARD: EU</span>
        </div>
      </div>

      {/* Main AQI Block */}
      <div className="py-4 flex flex-col">
        <div className="flex items-center gap-3 mb-2">
          <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-primary" strokeWidth={2} />
          <p className="font-mono text-xs sm:text-sm text-foreground font-semibold uppercase tracking-widest border-l-2 border-primary pl-3">
            {aqiStatus}
          </p>
        </div>
        <div className="flex items-start mt-2">
          <h2 className="font-heading text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter text-foreground uppercase leading-none">
            {Math.round(current.european_aqi)}
          </h2>
          <span className="text-2xl sm:text-3xl font-black text-muted-foreground/60 mt-1 sm:mt-2 ml-1">
            {current_units.european_aqi}
          </span>
        </div>
      </div>

      {/* Pollutant Data Grid */}
      <div className="mt-6 pt-6 border-t border-border/40 grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-6">
        <AirQualityStatCard
          icon={<Activity className="h-3 w-3" />}
          label="PM2.5"
          value={`${current.pm2_5} ${current_units.pm2_5}`}
          status={pm25.status}
          hint={pm25.hint}
        />
        <AirQualityStatCard
          icon={<Wind className="h-3 w-3" />}
          label="PM10"
          value={`${current.pm10} ${current_units.pm10}`}
          status={pm10.status}
          hint={pm10.hint}
        />
        <AirQualityStatCard
          icon={<ShieldAlert className="h-3 w-3" />}
          label="NO₂"
          value={`${current.nitrogen_dioxide} ${current_units.nitrogen_dioxide}`}
          status={no2.status}
          hint={no2.hint}
        />
        <AirQualityStatCard
          icon={<Sun className="h-3 w-3" />}
          label="UV Index"
          value={`${current.uv_index} ${current_units.uv_index}`}
          status={uv.status}
          hint={uv.hint}
        />
        <AirQualityStatCard
          icon={<Activity className="h-3 w-3" />}
          label="CO"
          value={`${current.carbon_monoxide} ${current_units.carbon_monoxide}`}
          status={co.status}
          hint={co.hint}
        />
        <AirQualityStatCard
          icon={<Wind className="h-3 w-3" />}
          label="Ozone"
          value={`${current.ozone} ${current_units.ozone}`}
          status={ozone.status}
          hint={ozone.hint}
        />
      </div>
    </section>
  );
}

