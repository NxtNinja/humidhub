import { SearchLocationResponse } from "../types/search-location.types";

export async function searchLocations(
  query: string,
): Promise<SearchLocationResponse> {
  const response = await fetch(
    `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=8`,
  );

  if (!response.ok) {
    throw new Error("Failed to search locations");
  }

  return response.json();
}
