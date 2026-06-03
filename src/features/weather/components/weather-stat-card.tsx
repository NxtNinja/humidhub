import { ReactNode } from "react";

type Status = "good" | "moderate" | "poor";

type WeatherStatCardProps = {
  label: string;
  value: string;
  icon: ReactNode;
  status?: Status;
  hint?: string;
};

const statusStyles: Record<Status, string> = {
  good: "bg-green-500",
  moderate: "bg-yellow-500",
  poor: "bg-red-500",
};

export function WeatherStatCard({ label, value, icon, status, hint }: WeatherStatCardProps) {
  return (
    <div className="flex flex-col justify-between border-l border-primary/30 pl-3 py-1 shrink-0 transition-colors hover:border-primary gap-1">
      <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
        {icon}
        <span className="text-[9px] uppercase tracking-[0.15em] font-bold opacity-80 whitespace-nowrap">
          {label}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <p className="font-mono text-xl sm:text-2xl text-foreground font-medium whitespace-nowrap">
          {value}
        </p>
        {status && (
          <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${statusStyles[status]}`} />
        )}
      </div>
      {hint && (
        <p className="text-[8px] uppercase tracking-widest text-muted-foreground/70 font-medium mt-0.5">
          {hint}
        </p>
      )}
    </div>
  );
}
