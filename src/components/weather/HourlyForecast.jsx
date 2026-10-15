import { Stack, Typography, Box } from "@mui/material";
import WeatherIcon from "./WeatherIcon";
import { mapWeatherCode } from "../../services/weatherCodeMap";
import GlassCard from "../common/GlassCard";
import { useTheme } from "@mui/material/styles";
import { useLanguage } from "../../context/LanguageContext";
import { formatNumber } from "../../utils/numberFormat";
import { displayTemp } from "../../utils/convertUnits";

export default function HourlyForecast({ data, unit = "C" }) {
  const theme = useTheme();
  const hourly = data?.hourly;
  const { t, lang } = useLanguage();

  if (!hourly?.time?.length) return null;

  const now = new Date();

  const startIndex = hourly.time.findIndex((t) => new Date(t) >= now);
  const safeStart = startIndex === -1 ? 0 : startIndex;

  const next24 = hourly.time
    .slice(safeStart, safeStart + 24)
    .map((time, i) => {
      const index = safeStart + i;
      const date = new Date(time);
      const { main } = mapWeatherCode(hourly.weather_code[index]);

      return {
        time: date.toLocaleTimeString(lang === "ar" ? "ar-EG" : "en-US", {
          hour: "numeric",
          hour12: true,
        }),
        // temperature: Math.round(hourly.temperature_2m[index]),
        temperature: displayTemp(hourly.temperature_2m[index], unit),
        cond: main.toLowerCase(),
      };
    });

  return (
    <GlassCard

      sx={{
        mt: 3,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: theme.palette.text.secondary ,
          textTransform: "uppercase",
          letterSpacing: 1,
          mb: 1,
          display: "block",
        }}
      >
        {t.hourly}
      </Typography>

      <Box sx={{ position: "relative" }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            overflowX: "auto",
            pb: 0.5,
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
            px: 2,
          }}
        >
          {next24.map((h, i) => (
            <Stack
              key={i}
              spacing={0.8}
              sx={{ color: theme.palette.text.primary , flexShrink: 0, width: 52 }}
            >
              <Typography
                variant="caption"
                sx={{ opacity: 0.7, fontVariantNumeric: "tabular-nums" }}
              >
                {h.time}
              </Typography>
              <WeatherIcon cond={h.cond} size={18} />
              <Typography variant="body2" sx={{ fontVariantNumeric: "tabular-nums" }}>
                {formatNumber(h.temperature, lang)}°
              </Typography>
            </Stack>
          ))}
        </Stack>

        {/* تلميح بصري: فيه محتوى إضافي على اليمين */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: 32,
            pointerEvents: "none",
            background:
              "linear-gradient(to right, rgba(0, 0, 0, 0),  rgba(255, 255, 255, 0.21))",
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4,
          }}
        />
      </Box>
    </GlassCard>
  );
}