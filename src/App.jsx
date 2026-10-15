  // src/App.jsx
  import "./App.css";
  import { useMemo, useEffect } from "react";
  import { ThemeProvider } from "@mui/material/styles";
  import { CacheProvider } from "@emotion/react";
  import { Box, CssBaseline } from "@mui/material";

  import { ThemeModeProvider, useThemeMode } from "./context/ThemeModeContext";
  import LanguageProvider, { useLanguage } from "./context/LanguageContext";
  import { createEmotionCache } from "./theme/rtl";
  import { buildTheme } from "./theme/theme";

  import Dashboard from "./components/layout/Dashboard";

  function AppContent() {
    const { isRTL, lang } = useLanguage();
    const { mode } = useThemeMode();

    useEffect(() => {
      document.documentElement.dir = isRTL ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }, [isRTL, lang]);

    const cache = useMemo(() => createEmotionCache(isRTL), [isRTL]);

    const theme = useMemo(
    () => buildTheme({ isRTL, dark: mode === "dark" }),
    [isRTL, mode]
  );

    return (
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ minWidth: "100%", py: 0, minHeight: "100vh" }}>
            <Dashboard />
          </Box>
        </ThemeProvider>
      </CacheProvider>
    );
  }

  function App() {
    return (
      <ThemeModeProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </ThemeModeProvider>
    );
  }

  export default App;