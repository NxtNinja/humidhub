import Link from "next/link";
import { AlertTriangle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 text-center">
      
      {/* Technical 404 Display */}
      <div className="relative mb-8 group cursor-default">
        <h1 className="font-heading text-[120px] sm:text-[180px] font-black text-primary/5 tracking-tighter select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center mix-blend-overlay">
          <AlertTriangle className="h-16 w-16 sm:h-24 sm:w-24 text-primary group-hover:scale-110 group-hover:text-red-500 transition-all duration-500" strokeWidth={1.5} />
        </div>
      </div>
      
      {/* Text Content */}
      <div className="space-y-4 max-w-md">
        <h2 className="font-mono text-xl sm:text-2xl uppercase tracking-[0.2em] font-bold text-foreground">
          Signal Lost
        </h2>
        <div className="h-px w-12 bg-primary/30 mx-auto" />
        <p className="text-muted-foreground font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] opacity-80 leading-loose">
          The atmospheric coordinates you are seeking do not exist in our telemetry database.
        </p>
      </div>

      {/* Action Button */}
      <Link 
        href="/" 
        className="mt-12 group flex items-center gap-3 px-8 py-4 border border-primary/20 hover:border-primary/50 bg-primary/5 hover:bg-primary/10 transition-all duration-300 rounded-xl"
      >
        <Home className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-foreground group-hover:text-primary transition-colors">
          Return to Radar
        </span>
      </Link>
    </div>
  );
}
