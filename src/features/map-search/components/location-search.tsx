"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";

import { useLocationSearch } from "../hooks/use-location-search";
import { SearchLocation } from "../types/search-location.types";
import { SearchResultItem } from "./search-result-item";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDebounce } from "@/hooks/use-debounce";

type Props = {
  onSelect: (location: SearchLocation) => void;
};

export function LocationSearch({ onSelect }: Props) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);

  const search = useLocationSearch(debouncedQuery);
  const isTyping = query !== debouncedQuery;
  const showLoader =
    query.length >= 3 && (isTyping || search.isPending || search.isFetching);

  return (
    <div className="relative">
      <div className="mt-8 relative w-full max-w-2xl group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-50">
          {showLoader ? (
            <Loader2 className="h-4 w-4 text-primary animate-spin" />
          ) : (
            <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          )}
        </div>
        <Input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SEARCH CITY, PLACE OR COORDINATES..."
          className="pl-12 h-14 bg-card/50 backdrop-blur-sm border-border/40 font-mono text-[10px] sm:text-xs uppercase tracking-widest focus-visible:ring-1 focus-visible:ring-primary focus-visible:bg-card focus-visible:border-primary/50 transition-all rounded-md"
        />
      </div>

      {search.data && search.data.features.length > 0 && (
        <ScrollArea className="absolute z-50 mt-2 w-full max-w-2xl h-80 rounded-lg border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl ring-1 ring-black/5">
          <div className="flex flex-col">
            {search.data.features.map((location) => (
              <SearchResultItem
                key={location.properties.osm_id}
                location={location}
                onSelect={(selected) => {
                  setQuery(""); // Clear UX
                  onSelect(selected);
                }}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
