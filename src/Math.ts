export function clamp(
  x: number,
  lower: number = Number.NEGATIVE_INFINITY,
  upper: number = Number.POSITIVE_INFINITY,
): number {
  return Math.min(Math.max(x, lower), upper);
}

export function roundTo(x: number, precision: number): number {
  // `/ (1 / precision)` is preferred over `* precision` to avoid rounding bugs
  return Math.round(x / precision) / (1 / precision);
}
