import { Earthquake } from "../types/earthquake.types";

export async function getRecentEarthquakes(): Promise<Earthquake> {
  const response = await fetch(
    "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&orderby=time&limit=10",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch earthquakes");
  }

  return response.json();
}
