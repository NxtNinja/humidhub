import { Sun, Cloud, CloudRain, CloudLightning, Snowflake, CloudFog, type LucideProps } from "lucide-react";

type DailyForecastRowProps = {
  day: string;
  weather: string;
  weatherCode: number;
  maxTemp: number;
  minTemp: number;
};

const WeatherIcon = ({ code, ...props }: { code: number } & LucideProps) => {
  if (code === 0) return <Sun {...props} />;
  if ([1, 2, 3].includes(code)) return <Cloud {...props} />;
  if ([45, 48].includes(code)) return <CloudFog {...props} />;
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return <CloudRain {...props} />;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return <Snowflake {...props} />;
  if ([95, 96, 99].includes(code)) return <CloudLightning {...props} />;
  return <Sun {...props} />;
};

export function DailyForecastRow({
  day,
  weather,
  weatherCode,
  maxTemp,
  minTemp,
}: DailyForecastRowProps) {
  return (
    <div className="group relative min-w-24 md:min-w-28 flex flex-col items-center shrink-0 cursor-pointer p-4 rounded-2xl hover:bg-primary/5 transition-all duration-300 overflow-hidden border border-transparent hover:border-primary/20">
      
      {/* Background Watermark Icon on Hover */}
      <WeatherIcon code={weatherCode} className="absolute -right-4 -bottom-4 h-24 w-24 text-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <p className="font-mono text-[11px] sm:text-[12px] text-muted-foreground uppercase tracking-[0.2em] relative z-10 transition-colors group-hover:text-primary font-bold">
        {day}
      </p>
      
      <div className="my-4 relative z-10 text-muted-foreground group-hover:text-primary transition-colors">
        <WeatherIcon code={weatherCode} className="h-7 w-7 sm:h-8 sm:w-8 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
      </div>

      <div className="flex flex-col items-center relative z-10 group-hover:text-primary transition-colors">
        <p className="font-heading text-4xl sm:text-5xl font-black leading-none text-foreground group-hover:text-primary transition-colors">
          {Math.round(maxTemp)}°
        </p>
        <p className="font-mono text-xs text-muted-foreground/60 font-black mt-2 tracking-tighter">
          / {Math.round(minTemp)}°
        </p>
      </div>
      
      <p className="font-mono text-[9px] sm:text-[10px] text-center uppercase tracking-[0.1em] font-bold opacity-60 mt-4 relative z-10 line-clamp-2 w-full leading-tight">
        {weather}
      </p>
    </div>
  );
}
