type Status = "good" | "moderate" | "poor";
export type WeatherStatus = { status: Status; hint: string };

export function getHumidityStatus(h: number): WeatherStatus {
  if (h >= 30 && h <= 60) return { status: "good", hint: "Comfortable range" };
  if (h < 20 || h > 80) return { status: "poor", hint: h < 20 ? "Very dry air" : "Very humid air" };
  return { status: "moderate", hint: h < 30 ? "Slightly dry" : "Slightly humid" };
}

export function getWindStatus(w: number): WeatherStatus {
  if (w <= 20) return { status: "good", hint: "Calm conditions" };
  if (w <= 40) return { status: "moderate", hint: "Moderate breeze" };
  return { status: "poor", hint: "Strong winds" };
}

export function getVisibilityStatus(v: number): WeatherStatus {
  if (v >= 10000) return { status: "good", hint: "Clear visibility" };
  if (v >= 4000) return { status: "moderate", hint: "Moderate visibility" };
  return { status: "poor", hint: "Low visibility" };
}

export function getCloudStatus(c: number): WeatherStatus {
  if (c <= 25) return { status: "good", hint: "Mostly clear sky" };
  if (c <= 75) return { status: "moderate", hint: "Partly cloudy" };
  return { status: "poor", hint: "Overcast sky" };
}

export function getPrecipStatus(p: number): WeatherStatus {
  if (p === 0) return { status: "good", hint: "No precipitation" };
  if (p <= 2.5) return { status: "moderate", hint: "Light rain" };
  return { status: "poor", hint: "Heavy precipitation" };
}

export function getPressureStatus(p: number): WeatherStatus {
  if (p >= 1000 && p <= 1025) return { status: "good", hint: "Normal pressure" };
  if (p >= 980 && p < 1000) return { status: "moderate", hint: "Low pressure system" };
  if (p > 1025) return { status: "moderate", hint: "High pressure system" };
  return { status: "poor", hint: "Extreme pressure" };
}
