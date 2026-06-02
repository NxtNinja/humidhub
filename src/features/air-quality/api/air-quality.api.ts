import { AirQuality } from "../types/air-quality.types";

export async function getAirQuality(
  latitude: number,
  longitude: number,
): Promise<AirQuality> {
  const response = await fetch(
    `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=european_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone,uv_index`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch air quality");
  }

  return response.json();
}
