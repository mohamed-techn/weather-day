import React from "react";
import {
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
} from "lucide-react";

const ICONS = {
  clear: Sun,
  "clear-night": Moon,
  clouds: Cloud,
  fog: Cloud,
  rain: CloudRain,
  drizzle: CloudDrizzle,
  snow: CloudSnow,
  thunderstorm: CloudLightning,
};

export default function WeatherIcon({ cond, size = 24, color = "#FFFFFF" }) {
  const Icon = ICONS[cond] || Sun;
  return <Icon size={size} color={color} strokeWidth={1.75} />;
}