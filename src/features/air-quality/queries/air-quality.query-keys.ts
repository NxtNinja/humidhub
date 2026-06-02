export const airQualityKeys = {
  all: ["air-quality"] as const,

  current: (latitude: number, longitude: number) =>
    [...airQualityKeys.all, latitude, longitude] as const,
};
