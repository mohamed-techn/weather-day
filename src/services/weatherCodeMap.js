
export function mapWeatherCode(code) {
  const map = {
    0: { main: "Clear", description: "clear sky", icon: "01d" },
    1: { main: "Clouds", description: "mainly clear", icon: "02d" },
    2: { main: "Clouds", description: "partly cloudy", icon: "02d" },
    3: { main: "Clouds", description: "overcast", icon: "03d" },
    45: { main: "Fog", description: "fog", icon: "50d" },
    48: { main: "Fog", description: "rime fog", icon: "50d" },
    51: { main: "Drizzle", description: "light drizzle", icon: "09d" },
    53: { main: "Drizzle", description: "moderate drizzle", icon: "09d" },
    55: { main: "Drizzle", description: "dense drizzle", icon: "09d" },
    61: { main: "Rain", description: "slight rain", icon: "10d" },
    63: { main: "Rain", description: "moderate rain", icon: "10d" },
    65: { main: "Rain", description: "heavy rain", icon: "10d" },
    71: { main: "Snow", description: "slight snow", icon: "13d" },
    73: { main: "Snow", description: "moderate snow", icon: "13d" },
    75: { main: "Snow", description: "heavy snow", icon: "13d" },
    80: { main: "Rain", description: "rain showers", icon: "09d" },
    81: { main: "Rain", description: "moderate showers", icon: "09d" },
    82: { main: "Rain", description: "violent showers", icon: "09d" },
    95: { main: "Thunderstorm", description: "thunderstorm", icon: "11d" },
    96: { main: "Thunderstorm", description: "thunderstorm with hail", icon: "11d" },
    99: { main: "Thunderstorm", description: "heavy thunderstorm", icon: "11d" },
  };

  return map[code] || { main: "Clear", description: "clear sky", icon: "01d" };
}