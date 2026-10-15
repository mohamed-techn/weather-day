import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { glass } from "../../theme/palette";

export default function GlassCard({ children, sx = {}, ...props }) {
  const theme = useTheme();
  const colors = theme.palette.mode === "dark" ? glass.dark : glass.light;

  return (
    <Box
      {...props}
      sx={{
        background: colors.cardBg,
        border: `1px solid ${colors.cardBorder}`,
        borderRadius: `${theme.shape.borderRadius}px`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        px: 2.3,
        py: 2,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}