import { Stack, Button } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useLanguage } from "../../context/LanguageContext";
import { useThemeMode } from "../../context/ThemeModeContext";

const pillSx = {
  color: "rgba(255,255,255,0.85)",
  background: "rgba(255,255,255,0.1)",
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: 999,
  textTransform: "none",
  fontSize: "12px",
  px: 1.5,
  py: 0.5,

  "& .MuiButton-startIcon": {
    margin: 0,
    marginRight: "6px",
  },

  "& .MuiSvgIcon-root": {
    fontSize: "14px !important",
  },

  "&:hover": {
    background: "rgba(255,255,255,0.2)",
  },
};

export default function TopControls() {
  const { toggleLang, t, isRTL } = useLanguage();
  const { mode, toggleMode } = useThemeMode(); 

  return (
    <Stack
      direction="row"
      sx={{
        mb: 2,
        justifyContent: "space-between",
        flexDirection: isRTL ? "row-reverse" : "row",
      }}
    >
      <Button
        startIcon={<TranslateIcon />}
        sx={{
          ...pillSx,
          direction: "ltr",
        }}
        onClick={toggleLang}
      >
        {t.langToggle}
      </Button>

      <Button
        startIcon={mode === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
        sx={{
          ...pillSx,
          direction: "ltr",
        }}
        onClick={toggleMode} 
      >
        {mode === "dark" ? t.light : t.dark}
      </Button>
    </Stack>
  );
}