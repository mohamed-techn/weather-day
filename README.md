# 🌤️ WeatherDay

**WeatherDay** is a modern, responsive weather application built with React and Material UI — featuring full **Arabic/English bilingual support with RTL**, **light/dark mode**, and real-time weather data.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-007FFF?logo=mui&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

<!--
📸 Add a screenshot or GIF here once deployed:
![App Preview](./screenshots/preview.png)
-->

## 🔗 Live Demo

> _Add your deployment link here (Vercel / Netlify)_

## ✨ Features

- 🌍 **Full i18n support** — Arabic and English with automatic RTL/LTR layout switching
- 🌙 **Light / Dark mode** — respects the user's system preference on first visit, remembers their choice afterward
- 📍 **Smart location handling** — remembers the last searched city (saved to `localStorage`), falls back to a default city on first visit
- 🔢 **Localized numbers** — displays Arabic-Indic numerals automatically in Arabic mode
- 🌅 **Day/night aware UI** — sun/moon icon and sky gradient adapt to the actual time of day at the selected location
- 🎨 **Glassmorphism design** — frosted-glass cards that adapt their tint to light/dark mode
- 🔍 **Live city search** — debounced search with geocoding, showing localized city/country names
- 📊 **Full forecast suite** — current conditions, hourly forecast, 7-day forecast, sunrise/sunset arc, humidity, wind, UV index, visibility

## 🛠️ Tech Stack

| Category | Tools |
|---|---|
| Framework | React 19 + Vite |
| UI Library | Material UI (MUI) v6 |
| Styling / RTL | Emotion + stylis-plugin-rtl |
| Icons | Lucide React |
| Weather Data | [Open-Meteo API](https://open-meteo.com/) (free, no API key required) |
| State Management | React Context API |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed

### Installation

```bash
# Clone the repository
git clone https://github.com/mohamed-techn/weather-day.git
cd weather-day

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Shared components (GlassCard, etc.)
│   ├── layout/           # Dashboard, TopControls
│   └── weather/           # HeroTemperature, HourlyForecast, DailyForecast, SkyArc, DetailsGrid
├── context/
│   ├── LanguageContext.jsx   # i18n state (Arabic/English)
│   └── ThemeModeContext.jsx  # Light/Dark mode state
├── locales/
│   ├── en.json
│   └── ar.json
├── services/
│   ├── weatherApi.js          # Open-Meteo forecast API
│   ├── locationApi.js         # Geocoding (search + reverse)
│   └── weatherCodeMap.js      # WMO weather code → condition mapping
├── theme/
│   ├── theme.js           # MUI theme builder (light/dark, RTL, fonts)
│   ├── rtl.js              # Emotion cache for RTL support
│   └── palette.js          # Glassmorphism color tokens
├── utils/
│   ├── numberFormat.js     # Arabic-Indic numeral formatting
│   ├── countryNames.js     # Localized country names
│   └── skyGradient.js      # Dynamic background gradients
└── data/
    └── conditions.js       # Sky gradients + day/night condition resolver
```

## 🌐 API

This project uses the free [Open-Meteo API](https://open-meteo.com/) — no API key or sign-up required:
- **Forecast API** for current, hourly, and daily weather data
- **Geocoding API** for city search and reverse geocoding

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Mohamed Ehab**
- GitHub: [@mohamed-techn](https://github.com/mohamed-techn)
- LinkedIn: [Mohamed Ehab](https://www.linkedin.com/in/mohamed-ehab-70143732a)
