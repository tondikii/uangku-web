const baseColors = [
  "#4ade80",
  "#f87171",
  "#fbbf24",
  "#60a5fa",
  "#a855f7",
  "#22d3ee",
];

function adjustLightness(hex: string, amount: number) {
  const num = parseInt(hex.replace("#", ""), 16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00ff) + amount;
  let b = (num & 0x0000ff) + amount;

  r = Math.max(Math.min(255, r), 0);
  g = Math.max(Math.min(255, g), 0);
  b = Math.max(Math.min(255, b), 0);

  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

export function getCategoryColor(index: number): string {
  const base = baseColors[index % baseColors.length];
  const cycle = Math.floor(index / baseColors.length);

  // setiap cycle berikutnya dibuat sedikit lebih terang
  return adjustLightness(base, cycle * 20);
}
