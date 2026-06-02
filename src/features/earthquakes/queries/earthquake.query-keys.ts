export const earthquakeKeys = {
  all: ["earthquakes"] as const,

  recent: () => [...earthquakeKeys.all, "recent"] as const,
};
