import { useEffect, useState } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Stack, Paper, Typography, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { MapPin } from "lucide-react";

import { searchLocation } from "../../services/locationApi";
import { useLanguage } from "../../context/LanguageContext";
import { getCountryName } from "../../utils/countryNames";
import { glass } from "../../theme/palette";

export default function SearchBar({ onLocationSelect }) {
  const { lang, t } = useLanguage();
  const theme = useTheme();
  const colors = theme.palette.mode === "dark" ? glass.dark : glass.light;

  const [city, setCity] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const trimmed = city.trim();

    if (trimmed.length === 0) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const timer = setTimeout(async () => {
      try {
        const data = await searchLocation(trimmed, lang);
        setResults(data);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [city, lang]);

  const handleSelectLocation = (location) => {
    onLocationSelect({
      name: location.name,
      lat: location.lat,
      lon: location.lon,
      country: location.country,
      state: location.state,
    });

    setCity(location.name);
    setResults([]);
    setOpen(false);
  };

  const showDropdown = open && city.trim().length > 0;

  return (
    <Stack
      spacing={1}
      sx={{
        position: "relative",
      }}
    >
      {/* Search */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          background: colors.inputBg,
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: 3,
          px: 2,
          py: 1.25,
          backdropFilter: "blur(12px)",
          alignItems: "center",
        }}
      >
        <SearchIcon
          sx={{
            fontSize: 16,
            color: theme.palette.text.secondary,
          }}
        />

        <InputBase
          value={city}
          onChange={(event) => {
            setCity(event.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (city.trim()) setOpen(true);
          }}
          placeholder={t.search}
          sx={{
            color: theme.palette.text.primary,
            width: "100%",
            fontSize: 14,

            "& input::placeholder": {
              color: theme.palette.text.secondary,
              opacity: 1,
            },
          }}
        />

        {loading && (
          <CircularProgress size={14} sx={{ color: theme.palette.text.secondary }} />
        )}
      </Stack>

      {/* Results */}
      {showDropdown && (
        <Paper
          elevation={0}
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            mt: 0.5,
            background: colors.listBg,
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
            zIndex: 10,
          }}
        >
          {loading && (
            <Typography
              sx={{
                px: 2,
                py: 1.5,
                fontSize: 13,
                color: colors.listMuted,
              }}
            >
              {t.searching}
            </Typography>
          )}

          {!loading && results.length === 0 && (
            <Typography
              sx={{
                px: 2,
                py: 1.5,
                fontSize: 13,
                color: colors.listMuted,
              }}
            >
              {t.noMatches}
            </Typography>
          )}

          {!loading &&
            results.map((location) => (
              <Stack
                key={`${location.lat}-${location.lon}`}
                direction="row"
                spacing={1}
                onClick={() => handleSelectLocation(location)}
                sx={{
                  alignItems: "center",
                  px: 2,
                  py: 1.2,
                  cursor: "pointer",
                  color: colors.listText,

                  "&:hover": {
                    background: colors.listHover,
                  },
                }}
              >
                {/* Location Icon */}
                <MapPin size={16} color={colors.listMuted} strokeWidth={2} />

                {/* Location Name */}
                <Stack spacing={0}>
                  <Typography
                    sx={{
                      color: colors.listText,
                      fontSize: 14,
                      lineHeight: 1.4,
                    }}
                  >
                    {location.name}
                  </Typography>
                  <Typography
                    sx={{ color: colors.listMuted, fontSize: 11, lineHeight: 1.3 }}
                  >
                    {location.state
                      ? `${location.state}, ${getCountryName(location.country, lang)}`
                      : getCountryName(location.country, lang)}
                  </Typography>
                </Stack>
              </Stack>
            ))}
        </Paper>
      )}
    </Stack>
  );
}