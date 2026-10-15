import { Stack, Typography, Box, Button } from "@mui/material";
import { MapPin } from "lucide-react";
import WeatherIcon from "./WeatherIcon";
import { mapWeatherCode } from "../../services/weatherCodeMap";
import { resolveConditionKey } from "../../data/conditions";
import { useTheme } from "@mui/material/styles";
import { useLanguage } from "../../context/LanguageContext";
import { formatNumber } from "../../utils/numberFormat";
import { getCountryName } from "../../utils/countryNames";
import { displayTemp } from "../../utils/convertUnits";

export default function HeroTemperature({ data, unit = "C", onToggleUnit }) {
  const { t, lang } = useLanguage();
  const theme = useTheme();

  const current = data?.current;
  const today = data?.daily;
  const location = data?.location;

  if (!current) return null;

  const temperature = displayTemp(current.temperature_2m, unit);
  const feelsLike = displayTemp(current.apparent_temperature, unit);

  const { main: cond } = mapWeatherCode(current.weather_code);
  const condKey = cond.toLowerCase();


  // is_day بييجي من الـ API نفسه (1 = نهار، 0 = ليل) حسب توقيت المكان فعليًا
  const isDay = current.is_day !== 0;
  const iconKey = resolveConditionKey(condKey, isDay);

  // الترجمة بتستخدم المفتاح الأساسي (clear) مش "clear-night"،
  // لأن الوصف النصي "سماء صافية" بيفضل صح سواء نهار أو ليل
  const condLabel = t.conditions?.[condKey] || cond;
    
  const high = today?.temperature_2m_max?.[0] != null
    ? displayTemp(today.temperature_2m_max[0], unit)
    : null;

  const low = today?.temperature_2m_min?.[0] != null
    ? displayTemp(today.temperature_2m_min[0], unit)
    : null;

  // نحول كل رقم من الحرارة لنص مترجم، لو عربي هيبقى فيه حرف واحد لكل خانة
  const tempDigits = formatNumber(temperature, lang).split("");

  return (
    <Stack
      spacing={0.5}
      sx={{ color: theme.palette.text.primary, textAlign: "center", alignItems: "center", mb: 1, mt: 3 }}
    >
      <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", opacity: 0.8, fontSize: 14 }}>
        <MapPin size={14} />
        <Typography variant="body2">
          {location?.name || "Unknown"}
          {location?.country ? `, ${getCountryName(location.country, lang)}` : ""}
        </Typography>
      </Stack>

      <Typography
        sx={{
          fontFamily: "serif",
          fontWeight: 300,
          fontSize: { xs: 16, sm: 20 },
          lineHeight: 1,
          letterSpacing: "-0.10em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {tempDigits.map((digit, index) => (
          <Box
            key={index}
            component="span"
            sx={{ position: "relative", top: index % 2 === 1 ? "-4px" : "0px", marginLeft: "1px" }}
          >
            {digit}
          </Box>
        ))}
        <Box component="span" sx={{ fontWeight: 300, fontSize: "18px", position: "relative", top: "-.4em", ml: "2px" }}>
          °
        </Box>
      </Typography>

      <Stack direction="row" spacing={1} sx={{ opacity: 0.9, alignItems: "center" }}>
        <WeatherIcon cond={iconKey} size={20} />
        <Typography variant="body1">{condLabel}</Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          · {t.feelsLike} {formatNumber(feelsLike, lang)}°
        </Typography>
      </Stack>

      <Typography variant="body2" sx={{ opacity: 0.7, fontVariantNumeric: "tabular-nums" }}>
        {t.hi}:{high != null ? formatNumber(high, lang) : "--"}° {t.lo}:{low != null ? formatNumber(low, lang) : "--"}°
      </Typography>

      <Button
        size="small"
        onClick={onToggleUnit}
        sx={{
          mt: "10px !important",
          color: "rgba(255,255,255,0.85)",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: 999,
          textTransform: "none",
          px: 2,
          "&:hover": { background: "rgba(255,255,255,0.1)" },
        }}
      >
        {lang === "ar" ? `التحويل لـ °${unit === "C" ? "F" : "C"}` : `Switch to °${unit === "C" ? "F" : "C"}`}
      </Button>
    </Stack>
  );
}