export function getAQIStatus(aqi: number) {
  if (aqi <= 20) return "Excellent";

  if (aqi <= 40) return "Good";

  if (aqi <= 60) return "Moderate";

  if (aqi <= 80) return "Poor";

  if (aqi <= 100) return "Very Poor";

  return "Extremely Poor";
}
