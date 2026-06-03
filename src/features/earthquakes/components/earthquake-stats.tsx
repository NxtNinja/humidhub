import { EarthquakeResponse } from "../types/earthquake.types";

type Props = {
  data: EarthquakeResponse;
};

export function EarthquakeStats({ data }: Props) {
  const eventsCount = data.features.length;

  let strongest = 0;
  let totalMag = 0;
  let tsunamiCount = 0;

  data.features.forEach((quake) => {
    const mag = quake.properties.mag || 0;
    if (mag > strongest) strongest = mag;
    totalMag += mag;
    if (quake.properties.tsunami === 1) tsunamiCount++;
  });

  const avgMag = eventsCount > 0 ? (totalMag / eventsCount).toFixed(1) : "0.0";

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
      {/* Box 1: EVENTS */}
      <div className="flex flex-col border border-border/40 bg-card p-4 transition-colors hover:bg-primary/5 hover:border-primary/50">
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-2">
          EVENTS
        </span>
        <span className="font-heading text-3xl font-black text-foreground uppercase tracking-tighter">
          {eventsCount}
        </span>
      </div>

      {/* Box 2: STRONGEST */}
      <div className="flex flex-col border border-border/40 bg-card p-4 transition-colors hover:bg-primary/5 hover:border-primary/50">
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-2">
          STRONGEST
        </span>
        <span className="font-heading text-3xl font-black text-foreground uppercase tracking-tighter">
          M {strongest.toFixed(1)}
        </span>
      </div>

      {/* Box 3: AVG MAG */}
      <div className="flex flex-col border border-border/40 bg-card p-4 transition-colors hover:bg-primary/5 hover:border-primary/50">
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-2">
          AVG MAG
        </span>
        <span className="font-heading text-3xl font-black text-foreground uppercase tracking-tighter">
          M {avgMag}
        </span>
      </div>

      {/* Box 4: TSUNAMI */}
      <div className="flex flex-col border border-border/40 bg-card p-4 transition-colors hover:bg-primary/5 hover:border-primary/50">
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-2">
          TSUNAMI
        </span>
        <span className="font-heading text-3xl font-black text-foreground uppercase tracking-tighter">
          {tsunamiCount} ALERT{tsunamiCount !== 1 && "S"}
        </span>
      </div>
    </div>
  );
}
