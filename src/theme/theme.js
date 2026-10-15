// src/theme/theme.js
import { createTheme } from "@mui/material/styles";

export function buildTheme({ isRTL, dark }) {
  const bodyFont = isRTL
    ? "'IBM', 'Segoe UI', Tahoma, Arial, sans-serif"
    : "'Inter', ui-sans-serif, system-ui, sans-serif";

  const displayFont = isRTL
    ? "'El Messiri', 'Segoe UI', Tahoma, Arial, sans-serif"
    : "'Fraunces', ui-serif, Georgia, serif";

  return createTheme({
    direction: isRTL ? "rtl" : "ltr",
    palette: {
      mode: dark ? "dark" : "light",
      text: {
        primary: "#FFFFFF",
        secondary: "rgba(255,255,255,0.7)",
      },
    },
    typography: {
      fontFamily: bodyFont,
      fontSize: isRTL ? 15 : 14,
      h1: { fontFamily: displayFont },
      h2: { fontFamily: displayFont },
      h3: { fontFamily: displayFont },
      body1: { lineHeight: isRTL ? 1.8 : 1.5 },
      body2: { lineHeight: isRTL ? 1.8 : 1.5 },
    },
    shape: {
      borderRadius: 16,
    },
  });
}