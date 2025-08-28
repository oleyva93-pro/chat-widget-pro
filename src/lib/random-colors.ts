const colorsForRandom = [
  "#0ea5e9",
  "#7c3aed",
  "#22c55e",
  "#eab308",
  "#be123c",
  "#0f766e",
  "#ea580c",
  "#4f46e5",
  "#15803d",
  "#9d174d",
];

export function getRandomColor(text = "_") {
  if (!text || text.length === 0) return colorsForRandom[0];

  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  return colorsForRandom[Math.abs(hash) % colorsForRandom.length];
}
