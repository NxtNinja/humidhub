import { EarthquakeResponse } from "../types/earthquake.types";

export async function getRecentEarthquakes(): Promise<EarthquakeResponse> {
  const response = await fetch(
    "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&orderby=time&limit=50",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch earthquakes");
  }

  return response.json();
}
