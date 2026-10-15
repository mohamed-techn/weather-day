
// sky gradients in light & dark mode 
// dark mode deepens them with an overlay instead of swapping palettes.
export const SKIES = {
  clear: { grad: ["#5FA8E0", "#F5C542", "#F4A672"] },
  "clear-night": { grad: ["#0B1533", "#1B2A4A", "#2E3A66"] },
  clouds: { grad: ["#6E7A8A", "#94A0AC", "#B9C1C9"] },
  fog: { grad: ["#6E7A8A", "#94A0AC", "#B9C1C9"] },
  rain: { grad: ["#3A4A63", "#4A5568", "#6B9BD1"] },
  drizzle: { grad: ["#4C5C74", "#6B7C93", "#9AAEC4"] },
  snow: { grad: ["#1B2A4A", "#41537A", "#B9C7DE"] },
  thunderstorm: { grad: ["#101623", "#2B3352", "#4A5568"] },
};

export function resolveConditionKey(condition, isDay) {
  if (!isDay && condition === "clear") return "clear-night";
  return condition;
}

