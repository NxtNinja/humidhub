import { Globe2 } from "lucide-react";
import { HistoryHero } from "@/features/history/components/history-hero";
import { HistoryTimeline } from "@/features/history/components/history-timeline";
import { HistoryAnalytics } from "@/features/history/components/history-analytics";
import { RecentSearchesGrid } from "@/features/history/components/recent-searches-grid";

export default function HistoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="border-b border-border/40 pb-8 pt-4 sm:pt-6 mt-4">
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-2">
            <Globe2 className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
              ENVIRONMENTAL EXPLORER
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            ACTIVITY LOG
          </span>
        </div>

        {/* Hero Title */}
        <div className="flex flex-col gap-3 pb-8">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-[0.85] tracking-tighter text-foreground">
            SEARCH
            <br />
            HISTORY
          </h1>
          <p className="max-w-2xl border-l-2 border-primary/50 pl-3 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground py-0.5">
            Review your past environmental inquiries and teleport back to any location instantly.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {/* Section 1 */}
          <HistoryHero />

          {/* Section 4 */}
          <RecentSearchesGrid />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Section 3 */}
            <HistoryAnalytics />
            
            {/* Section 2 */}
            <HistoryTimeline />
          </div>
        </div>
      </section>
    </div>
  );
}
