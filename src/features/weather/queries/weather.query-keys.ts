export const weatherKeys = {
  all: ["weather"] as const,

  current: (lat: number, lon: number) =>
    [...weatherKeys.all, "current", lat, lon] as const,

  hourly: (lat: number, lon: number) =>
    [...weatherKeys.all, "hourly", lat, lon] as const,

  daily: (lat: number, lon: number) =>
    [...weatherKeys.all, "daily", lat, lon] as const,
};
