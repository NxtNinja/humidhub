import { BookOpen, Thermometer, Droplets, Wind, Activity, Target, ShieldAlert, Sun, Info, MapPin } from "lucide-react";
import React from "react";

const MetricsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="pb-8 pt-4 sm:pt-6 mt-4">
        {/* Header Section */}
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
              TELEMETRY GLOSSARY
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hidden sm:block">
            METRICS REFERENCE
          </span>
        </div>

        <div className="flex flex-col gap-3 pb-8 mb-8 border-b border-border/40">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-[0.85] tracking-tighter text-foreground">
            METRICS
            <br />
            EXPLAINED
          </h1>
          <p className="max-w-2xl border-l-2 border-primary/50 pl-3 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground py-0.5">
            A comprehensive guide to understanding the environmental and atmospheric data provided across HumidHub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-16 lg:max-w-4xl">
          
          {/* Weather Category */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center gap-3 pb-2 border-b-2 border-primary/20">
              <Thermometer className="h-6 w-6 text-primary" />
              <h2 className="font-heading text-2xl sm:text-3xl font-black tracking-tight uppercase">Weather Metrics</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <MetricCard 
                title="Air Temperature" 
                icon={<Thermometer />} 
                description="The ambient air temperature measured at 2 meters above ground level."
              />
              <MetricCard 
                title="Apparent Temperature" 
                icon={<Info />} 
                description="The 'feels like' temperature. It combines air temperature, relative humidity, and wind speed to calculate how hot or cold it actually feels to the human body."
              />
              <MetricCard 
                title="Relative Humidity" 
                icon={<Droplets />} 
                description="The amount of water vapor in the air compared to the maximum amount it could hold at that temperature. Measured as a percentage."
              />
              <MetricCard 
                title="Wind Velocity" 
                icon={<Wind />} 
                description="The speed of the wind measured at 10 meters above ground level. Higher speeds indicate more turbulent atmospheric conditions."
              />
              <MetricCard 
                title="Surface Pressure" 
                icon={<Target />} 
                description="The atmospheric pressure at the Earth's surface. Low pressure typically indicates stormy weather, while high pressure indicates clear skies."
              />
              <MetricCard 
                title="Visibility" 
                icon={<Activity />} 
                description="The maximum distance at which an object can be clearly seen. Low visibility is often caused by fog, smoke, or heavy precipitation."
              />
              <MetricCard 
                title="Cloud Cover" 
                icon={<Wind />} 
                description="The fraction of the sky obscured by clouds, represented as a percentage."
              />
              <MetricCard 
                title="Precipitation" 
                icon={<Droplets />} 
                description="The total depth of liquid water equivalent (rain, snow, sleet) falling in a given period."
              />
            </div>
          </section>

          {/* Air Quality Category */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center gap-3 pb-2 border-b-2 border-blue-500/20">
              <Activity className="h-6 w-6 text-blue-500" />
              <h2 className="font-heading text-2xl sm:text-3xl font-black tracking-tight uppercase">Air Quality Metrics</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <MetricCard 
                title="European AQI" 
                icon={<Activity />} 
                description="A standardized scale (0-100+) used to report daily air quality. Lower numbers represent cleaner air, while higher numbers indicate severe health risks."
                accent="blue"
              />
              <MetricCard 
                title="PM2.5" 
                icon={<Wind />} 
                description="Fine particulate matter smaller than 2.5 micrometers. These particles are microscopic and can penetrate deep into the lungs and bloodstream."
                accent="blue"
              />
              <MetricCard 
                title="PM10" 
                icon={<Wind />} 
                description="Coarse particulate matter smaller than 10 micrometers. Commonly consists of dust, pollen, and mold."
                accent="blue"
              />
              <MetricCard 
                title="Nitrogen Dioxide (NO₂)" 
                icon={<ShieldAlert />} 
                description="A reddish-brown toxic gas primarily emitted by vehicle exhaust and power plants. Aggravates respiratory diseases like asthma."
                accent="blue"
              />
              <MetricCard 
                title="Carbon Monoxide (CO)" 
                icon={<ShieldAlert />} 
                description="An odorless, colorless gas resulting from incomplete combustion. At high levels, it is highly toxic and prevents oxygen from entering the blood."
                accent="blue"
              />
              <MetricCard 
                title="Ozone (O₃)" 
                icon={<Sun />} 
                description="Ground-level ozone is a key ingredient of urban smog. It is created by chemical reactions between oxides of nitrogen and volatile organic compounds."
                accent="blue"
              />
              <MetricCard 
                title="UV Index" 
                icon={<Sun />} 
                description="An international standard measurement of the strength of sunburn-producing ultraviolet radiation at a particular place and time."
                accent="blue"
              />
            </div>
          </section>

          {/* Seismic Category */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center gap-3 pb-2 border-b-2 border-orange-500/20">
              <MapPin className="h-6 w-6 text-orange-500" />
              <h2 className="font-heading text-2xl sm:text-3xl font-black tracking-tight uppercase">Seismic Metrics</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <MetricCard 
                title="Magnitude" 
                icon={<Activity />} 
                description="A number that characterizes the relative size of an earthquake, based on measurement of the maximum motion recorded by a seismograph."
                accent="orange"
              />
              <MetricCard 
                title="Depth" 
                icon={<Target />} 
                description="The depth where the earthquake began to rupture. Shallower earthquakes typically cause more damage than deeper ones."
                accent="orange"
              />
              <MetricCard 
                title="SIG Score" 
                icon={<ShieldAlert />} 
                description="The 'Significance' score is a heuristic value (0-1000+) generated by the USGS. It incorporates magnitude, max felt intensity, and economic impact."
                accent="orange"
              />
            </div>
          </section>

        </div>
      </section>
    </div>
  );
};

// Reusable UI component for the glossary cards
const MetricCard = ({ 
  title, 
  icon, 
  description,
  accent = "primary" 
}: { 
  title: string, 
  icon: React.ReactNode, 
  description: string,
  accent?: "primary" | "blue" | "orange"
}) => {
  const accentColors = {
    primary: "text-primary border-primary/20 bg-primary/5",
    blue: "text-blue-500 border-blue-500/20 bg-blue-500/5",
    orange: "text-orange-500 border-orange-500/20 bg-orange-500/5",
  };

  const currentAccent = accentColors[accent];

  return (
    <div className={`flex flex-col gap-3 p-5 rounded-xl border border-border/50 bg-card/30 hover:bg-card/50 transition-colors`}>
      <div className="flex items-center gap-2 pb-2 border-b border-border/30">
        <div className={`p-1.5 rounded-md ${currentAccent}`}>
          {React.cloneElement(icon as React.ReactElement, { className: "h-4 w-4" })}
        </div>
        <h3 className="font-mono text-xs font-bold tracking-widest uppercase text-foreground">
          {title}
        </h3>
      </div>
      <p className="font-mono text-[11px] leading-relaxed text-muted-foreground opacity-90">
        {description}
      </p>
    </div>
  );
};

export default MetricsPage;
