import { Stack, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import WeatherIcon from "./WeatherIcon";
import { mapWeatherCode } from "../../services/weatherCodeMap";
import GlassCard from "../common/GlassCard";
import { useLanguage } from "../../context/LanguageContext";
import { glass } from "../../theme/palette";
import { formatNumber } from "../../utils/numberFormat";
import { displayTemp } from "../../utils/convertUnits";


export default function DailyForecast({ data, unit = "C" }) {
  const weekdayKeys = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const theme = useTheme();
  const { t, lang } = useLanguage();
  const colors = theme.palette.mode === "dark" ? glass.dark : glass.light;

  const daily = data?.daily;
  if (!daily?.time?.length) return null;

  const forecast = daily.time.slice(0, 7).map((dateStr, index) => {
    const date = new Date(dateStr);
    const { main } = mapWeatherCode(daily.weather_code[index]);

    let label;
    if (index === 0) {
      label = t.today;
    } else if (index === 1) {
      label = t.tomorrow;
    } else {
      const dayKey = weekdayKeys[date.getDay()]; 
      label = t.weekdays[dayKey];
    }

    return {
      date,
      label,
      min: displayTemp(daily.temperature_2m_min[index], unit),
      max: displayTemp(daily.temperature_2m_max[index], unit),
      icon: main.toLowerCase(),
    };
  });

  const weekMin = Math.min(...forecast.map((d) => d.min));
  const weekMax = Math.max(...forecast.map((d) => d.max));
  const weekRange = weekMax - weekMin || 1;

  return (
    <GlassCard sx={{ mt: 3 }}>
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
        {t.daily}
      </Typography>
      <Stack
        direction="column"
        spacing={2}
        sx={{
          overflowX: "auto",
          pb: 0.5,
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
          px: 2,
        }}
      >
        {forecast.map((day, i) => (
          <Stack
            key={day.date.getTime()}
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              pt: 2,
              borderTop: i === 0 ? "none" : `1px solid ${colors.cardBorder}`,
              color: theme.palette.text.primary,
            }}
          >
            <Typography variant="body2" sx={{ width: 64 }}>
              {day.label}
            </Typography>
            <WeatherIcon cond={day.icon} size={17} />
            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: 96,
                alignItems: "center",
                justifyContent: "flex-end",
                fontVariantNumeric: "tabular-nums",
                
              }}
            >
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {formatNumber(day.min, lang)}°
              </Typography>
              <Box
                sx={{
                  width: 48,
                  height: 4,
                  borderRadius: 999,
                  background: colors.cardBorder,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    height: "100%",
                    borderRadius: 999,
                    background: theme.palette.text.secondary ,
                    insetInlineStart: `${((day.min - weekMin) / weekRange) * 100}%`,
                    width: `${((day.max - day.min) / weekRange) * 100}%`,
                  }}
                />
              </Box>
              <Typography variant="body2">{formatNumber(day.max, lang)}°</Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </GlassCard>
  );
}