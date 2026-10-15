import { SKIES } from "../data/conditions";

export function getSkyGradient(conditionKey, mode) {
  const sky = SKIES[conditionKey] || SKIES.clear;
  const base = `linear-gradient(160deg, ${sky.grad[0]} 0%, ${sky.grad[1]} 55%, ${sky.grad[2]} 100%)`;
  if (mode != "dark") return base;
  return `linear-gradient(160deg, rgba(6,8,16,0.72), rgba(6,8,16,0.55)), ${base}`;
}
