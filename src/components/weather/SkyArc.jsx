import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Sunrise, Sunset, Sun, Moon } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
export default function SkyArc({ data }) {
  const { t, lang } = useLanguage(); // ضيفها فوق


  const daily = data?.daily;

  if (!daily?.sunrise?.[0] || !daily?.sunset?.[0]) return null;

const sunriseDate = new Date(daily.sunrise[0]);
const sunsetDate = new Date(daily.sunset[0]);
// current.time جاي بتوقيت المكان، فنقارن بيه مش بتوقيت الجهاز
const now = new Date(data?.current?.time ?? Date.now());

const toMinutes = (date) => date.getHours() * 60 + date.getMinutes();

const sr = toMinutes(sunriseDate);
const ss = toMinutes(sunsetDate);
const nowMin = toMinutes(now);

  const formatTime = (date) =>
    date.toLocaleTimeString(lang === "ar" ? "ar-EG" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  const sunrise = formatTime(sunriseDate);
  const sunset = formatTime(sunsetDate);
  const nowLabel = formatTime(now);

const isDay = data?.current?.is_day != null
  ? data.current.is_day !== 0
  : nowMin >= sr && nowMin < ss;
  let progress;

  if (isDay) {
    progress = Math.min(Math.max((nowMin - sr) / (ss - sr), 0), 1);
  } else {
    const nightLen = 24 * 60 - (ss - sr);
    const sinceSunset = nowMin >= ss ? nowMin - ss : nowMin + (24 * 60 - ss);
    progress = Math.min(Math.max(sinceSunset / nightLen, 0), 1);
  }

  const W = 320;
  const H = 150;
  const cx = W / 2;
  const cy = H - 4;
  const r = 130;

  const angle = Math.PI - progress * Math.PI;

  const px = cx + r * Math.cos(angle);
  const py = cy - r * Math.sin(angle);

  const leftLabel = isDay ? sunrise : sunset;
  const rightLabel = isDay ? sunset : sunrise;
  const arcPath = `
    M ${cx - r} ${cy}
    A ${r} ${r} 0 0 1 ${cx + r} ${cy}
  `;

  return (
    <Box sx={{ my: 2 }}>
      <Box
        component="svg"
        viewBox={`0 0 ${W} ${H}`}
        dir="ltr"
        sx={{
          width: "100%",
          maxWidth: 320,
          mx: "auto",
          display: "block",
          overflow: "visible",
        }}
      >
        {/* Full Arc */}
        <path
          d={arcPath}
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1.5"
          strokeDasharray="2 6"
          strokeLinecap="round"
        />

        {/* Progress Arc */}
        <path
          d={arcPath}
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={`${progress * Math.PI * r} 999`}
        />

        {/* Sun */}
        <circle cx={px} cy={py} r="9" fill="#FFFFFF" opacity="0.95" />
        {/* Sun Glow */}
        <circle cx={px} cy={py} r="16" fill="#FFFFFF" opacity="0.18" />

        <text
          x={cx - r}
          y={cy + 22}
          fontSize="11"
          fill="rgba(255,255,255,0.75)"
          textAnchor="middle"
        >
          {leftLabel}
        </text>
        <text
          x={cx + r}
          y={cy + 22}
          fontSize="11"
          fill="rgba(255,255,255,0.75)"
          textAnchor="middle"
        >
          {rightLabel}
        </text>
      </Box>
      <Stack
        direction="row"
        sx={{ px: 2, mt: -0.7, mx: 6.5, justifyContent: "space-between" }}
        dir="ltr"
      >
        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
          <Sunrise size={12} color="rgba(255,255,255,0.6)" />
          <Typography variant="caption" sx={{ paddingX:.5,color: "rgba(255,255,255,0.6)" }}>
            {isDay ? t.sunrise : t.sunset}
          </Typography>
        </Stack>

        {/* Middle Icon Now Time */}
        {isDay ? (
          <Stack
            direction="row"
            sx={{ mt: -10, color: "white", gap: 1, alignItems: "center" }}
          >
            <Stack sx={{ filter: "drop-shadow(0 0 6px rgba(255, 244, 170, 0.95))" }}>
              <Sun size={20} color="#FFF4B0" strokeWidth={2.2} />
            </Stack>
            {nowLabel}
          </Stack>
        ) : (
          <Stack
            direction="row"
            sx={{ mt: -10, color: "white", gap: 1, alignItems: "center" }}
          >
            <Stack sx={{ filter: "drop-shadow(0 0 7px rgba(210, 225, 255, 0.9))" }}>
              <Moon size={20} color="#E8EEFF" strokeWidth={2.2} />
            </Stack>
            {nowLabel}
          </Stack>
        )}

        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
          <Typography variant="caption" sx={{ paddingX:.5, color: "rgba(255,255,255,0.6)" }}>
            {isDay ? t.sunset : t.sunrise}
          </Typography>
          <Sunset size={12} color="rgba(255,255,255,0.6)" />
        </Stack>
      </Stack>
    </Box>
  );
}