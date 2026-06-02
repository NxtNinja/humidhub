import type { NominatimLocation } from "../types/nominatim.types";

export async function reverseGeocode(
  latitude: number,
  longitude: number,
): Promise<NominatimLocation> {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2`,
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to reverse geocode location");
  }

  return response.json();
}
