export function getMarkerSize(magnitude: number) {
  if (magnitude < 2) return 10;

  if (magnitude < 4) return 16;

  if (magnitude < 6) return 24;

  return 36;
}
