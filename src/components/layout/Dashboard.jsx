import { useEffect, useMemo, useState } from "react";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";

import TopControls from "./TopControls";
import SearchBar from "./SearchBar";
import HeroTemperature from "../weather/HeroTemperature";
import SkyArc from "../weather/SkyArc";
import HourlyForecast from "../weather/HourlyForecast";
import DailyForecast from "../weather/DailyForecast";
import DetailsGrid from "../weather/DetailsGrid";

import { useThemeMode } from "../../context/ThemeModeContext";
import { useLanguage } from "../../context/LanguageContext";
import { getWeather } from "../../services/weatherApi";
import { getSkyGradient } from "../../utils/skyGradient";
import { mapWeatherCode } from "../../services/weatherCodeMap";
import { resolveConditionKey } from "../../data/conditions";
import { DEFAULT_LOCATION } from "../../services/defaultLocation";

const STORAGE_KEY = "lastLocation";

export default function Dashboard() {
  const [weatherData, setWeatherData] = useState(null);
  const { mode } = useThemeMode();
  const { lang } = useLanguage();
  const [unit, setUnit] = useState("C");
  const handleLocationSelect = async (location, { persist = true } = {}) => {
    try {
      const data = await getWeather(location.lat, location.lon);

      setWeatherData({
        ...data,
        location: {
          name: location.name,
          country: location.country,
        },
      });

      if (persist) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            name: location.name,
            lat: location.lat,
            lon: location.lon,
            country: location.country,
          })
        );
      }
    } catch (error) {
      console.error("Weather error:", error);
    }
  };

  // عند فتح الصفحة، نشوف فيه مدينة محفوظة ولا نستخدم الافتراضية
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const location = JSON.parse(saved);
        handleLocationSelect(location, { persist: false }); // مش محتاج يعيد الحفظ
        return;
      } catch {
        // لو الداتا المحفوظة باظت لأي سبب نكمل على الافتراضي
      }
    }

    const fallback = {
      name: lang === "ar" ? DEFAULT_LOCATION.nameAr : DEFAULT_LOCATION.name,
      lat: DEFAULT_LOCATION.lat,
      lon: DEFAULT_LOCATION.lon,
      country: DEFAULT_LOCATION.country,
    };

    handleLocationSelect(fallback, { persist: false });
  }, []); // مرة واحدة بس عند فتح الصفحة

  const conditionKey = useMemo(() => {
    const code = weatherData?.current?.weather_code;
    if (code == null) return "clear";

    const { main } = mapWeatherCode(code);
    const isDay = weatherData.current.is_day !== 0;

    return resolveConditionKey(main.toLowerCase(), isDay);
  }, [weatherData?.current?.weather_code, weatherData?.current?.is_day]);
  
  const background = getSkyGradient(conditionKey, mode);

  return (
    <Box sx={{ background, transition: "background 0.6s ease" }}>
      <Container maxWidth="sm" sx={{ py: 2, minHeight: "100vh" }}>
        <TopControls />

        <SearchBar onLocationSelect={handleLocationSelect} />

        {weatherData && (
          <>
            <HeroTemperature
              data={weatherData}
              unit={unit}
              onToggleUnit={() => setUnit((prev) => (prev === "C" ? "F" : "C"))}
            />
            <SkyArc data={weatherData} />
            <HourlyForecast data={weatherData} unit={unit} />
            <DailyForecast data={weatherData} unit={unit} />
            <DetailsGrid data={weatherData} />
          </>
        )}
      </Container>
    </Box>
  );
}