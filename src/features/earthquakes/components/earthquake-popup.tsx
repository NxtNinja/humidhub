import { formatDistanceToNow } from "date-fns";
import { Clock, MapPin, Target, AlertTriangle, Waves } from "lucide-react";

type Props = {
  magnitude: number;
  place: string;
  depth: number;
  time: number;
  sig: number;
  tsunami: number;
};

export function EarthquakePopup({ magnitude, place, depth, time, sig, tsunami }: Props) {
  let severityText = "text-primary";
  let severityBg = "bg-primary";
  
  if (magnitude >= 5.0) {
    severityText = "text-destructive";
    severityBg = "bg-destructive";
  } else if (magnitude >= 3.0) {
    severityText = "text-orange-500";
    severityBg = "bg-orange-500";
  }

  return (
    <div className="w-[280px] sm:w-[320px] flex flex-col relative overflow-hidden bg-card/95 backdrop-blur-md">
      {/* Top Severity Bar */}
      <div className={`absolute top-0 left-0 w-full h-[4px] ${severityBg}`} />

      {/* Header Area */}
      <div className="p-4 pb-3 flex items-start justify-between border-b border-border/50 bg-muted/10">
        <div className="flex flex-col">
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">
            Magnitude
          </span>
          <div className={`font-heading text-5xl font-black leading-none tracking-tighter ${severityText}`}>
            {magnitude.toFixed(1)}
          </div>
        </div>
        
        {tsunami === 1 && (
          <div className="flex items-center gap-1.5 bg-destructive/10 px-2 py-1 rounded-md border border-destructive/20 mt-1">
            <Waves className="h-3 w-3 text-destructive" />
            <span className="font-mono text-[9px] font-bold text-destructive uppercase tracking-widest animate-pulse">
              Tsunami Warning
            </span>
          </div>
        )}
      </div>

      {/* Body Area */}
      <div className="p-4 flex flex-col gap-4">
        {/* Location */}
        <div className="flex items-start gap-2.5">
          <MapPin className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-foreground leading-snug">
            {place}
          </span>
        </div>

        {/* Telemetry Grid */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-4 bg-muted/20 p-3 rounded-lg border border-border/40 mt-1">
          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              <Target className="h-3 w-3" /> Depth
            </span>
            <span className="font-mono text-[11px] sm:text-xs font-semibold text-foreground pl-[18px]">
              {depth.toFixed(1)} km
            </span>
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              <AlertTriangle className="h-3 w-3" /> Sig Score
            </span>
            <span className="font-mono text-[11px] sm:text-xs font-semibold text-foreground pl-[18px]">
              {sig}
            </span>
          </div>
          
          <div className="flex flex-col gap-1 col-span-2">
            <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              <Clock className="h-3 w-3" /> Time Detected
            </span>
            <span className={`font-mono text-[11px] sm:text-xs font-semibold pl-[18px] ${severityText}`}>
              {formatDistanceToNow(new Date(time))} ago
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
