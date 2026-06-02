import { CurrentWeather } from "../types/weather.types";

export async function getCurrentWeather(
  latitude: number,
  longitude: number,
): Promise<CurrentWeather> {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,is_day,surface_pressure,visibility,cloud_cover,precipitation&hourly=temperature_2m,weather_code&forecast_hours=12&timezone=auto&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=7`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather");
  }

  return response.json();
}
