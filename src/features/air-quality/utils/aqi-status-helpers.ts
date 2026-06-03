export type AQIStatus = { status: "good" | "moderate" | "poor"; hint: string };

export function getPm25Status(v: number): AQIStatus {
  if (v <= 10) return { status: "good", hint: "WHO safe level" };
  if (v <= 25) return { status: "moderate", hint: "Acceptable level" };
  return { status: "poor", hint: "Unhealthy level" };
}

export function getPm10Status(v: number): AQIStatus {
  if (v <= 20) return { status: "good", hint: "WHO safe level" };
  if (v <= 50) return { status: "moderate", hint: "Acceptable level" };
  return { status: "poor", hint: "Unhealthy level" };
}

export function getNo2Status(v: number): AQIStatus {
  if (v <= 40) return { status: "good", hint: "Safe level" };
  if (v <= 100) return { status: "moderate", hint: "Moderate exposure" };
  return { status: "poor", hint: "High exposure" };
}

export function getUvStatus(v: number): AQIStatus {
  if (v <= 2) return { status: "good", hint: "Low — no protection needed" };
  if (v <= 5) return { status: "moderate", hint: "Moderate — use sunscreen" };
  if (v <= 7) return { status: "moderate", hint: "High — protection needed" };
  return { status: "poor", hint: "Very high — limit exposure" };
}

export function getCoStatus(v: number): AQIStatus {
  if (v <= 4400) return { status: "good", hint: "Safe level" };
  if (v <= 9400) return { status: "moderate", hint: "Moderate level" };
  return { status: "poor", hint: "Hazardous level" };
}

export function getOzoneStatus(v: number): AQIStatus {
  if (v <= 60) return { status: "good", hint: "Good air quality" };
  if (v <= 120) return { status: "moderate", hint: "Moderate ozone" };
  return { status: "poor", hint: "High ozone level" };
}
