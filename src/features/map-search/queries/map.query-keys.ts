export const mapKeys = {
  all: ["map"] as const,

  search: (query: string) => [...mapKeys.all, "search", query] as const,
};
