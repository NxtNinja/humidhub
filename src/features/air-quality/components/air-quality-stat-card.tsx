import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  label: string;
  value: string;
};

export function AirQualityStatCard({ icon, label, value }: Props) {
  return (
    <div className="flex flex-col justify-between border-l border-primary/30 pl-3 py-1 shrink-0 transition-colors hover:border-primary">
      <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
        {icon}
        <span className="text-[9px] uppercase tracking-[0.15em] font-bold opacity-80 whitespace-nowrap">
          {label}
        </span>
      </div>
      <p className="font-mono text-xl sm:text-2xl text-foreground font-medium whitespace-nowrap">
        {value}
      </p>
    </div>
  );
}
