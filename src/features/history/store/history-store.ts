import { atomWithStorage } from "jotai/utils";
import { SearchLocation } from "@/features/map-search/types/search-location.types";

export type HistoryItem = {
  id: string;
  location: SearchLocation;
  timestamp: number;
};

export const historyAtom = atomWithStorage<HistoryItem[]>("humidhub-history", []);
