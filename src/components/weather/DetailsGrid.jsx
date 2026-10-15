// import { Grid, Stack, Typography } from "@mui/material";
// import { Droplets, Wind, Gauge, Eye } from "lucide-react";
// import GlassCard from "../common/GlassCard";
// import { useTheme } from "@mui/material/styles";
// import { useLanguage } from "../../context/LanguageContext";

// export default function DetailsGrid({ data }) {
//   const { t } = useLanguage();
//   const theme = useTheme();
//   const current = data?.current;

//   if (!current) return null;

//   const humidity = current.relative_humidity_2m != null
//     ? `${Math.round(current.relative_humidity_2m)}%`
//     : "--";

//   const wind = current.wind_speed_10m != null
//     ? `${Math.round(current.wind_speed_10m)} Km/h`
//     : "--";

//   const uvIndex = current.uv_index != null
//     ? Math.round(current.uv_index)
//     : "--";

//   const visibility = current.visibility != null
//     ? `${Math.round(current.visibility / 1000)} Km`
//     : "--";

//   const items = [
//     { icon: Droplets, label: t.humidity, value: humidity },
//     { icon: Wind, label: t.wind, value: wind },
//     { icon: Gauge, label: t.uv, value: uvIndex },
//     { icon: Eye, label: t.visibility, value: visibility },
//   ];

//   return (
//     <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
//       {items.map(({ icon: Icon, label, value }, i) => (
//         <Grid size={6} key={i}>
//           <GlassCard
//             sx={{
//               color:theme.palette.text.primary,
//               mt: 3,
//             }}
//           >
//             <Stack
//               direction="row"
//               spacing={0.75}
//               sx={{ opacity: 0.6, mb: 1.5, alignItems: "center" }}
//             >
//               <Icon size={13} />
//               <Typography
//                 variant="caption"
//                 sx={{ textTransform: "uppercase", letterSpacing: 1 }}
//               >
//                 {label}
//               </Typography>
//             </Stack>
//             <Typography
//               sx={{
//                 fontFamily: "'Fraunces', serif",
//                 fontWeight: 400,
//                 fontSize: 18,
//                 fontVariantNumeric: "tabular-nums",
//               }}
//             >
//               {value}
//             </Typography>
//           </GlassCard>
//         </Grid>
//       ))}
//     </Grid>
//   );
// }

import { Grid, Stack, Typography } from "@mui/material";
import { Droplets, Wind, Gauge, Eye } from "lucide-react";
import GlassCard from "../common/GlassCard";
import { useTheme } from "@mui/material/styles";
import { useLanguage } from "../../context/LanguageContext";
import { formatNumber } from "../../utils/numberFormat";

export default function DetailsGrid({ data }) {
  const { t, lang } = useLanguage();
  const theme = useTheme();
  const current = data?.current;

  if (!current) return null;

  const humidity = current.relative_humidity_2m != null
    ? `${formatNumber(Math.round(current.relative_humidity_2m), lang)}%`
    : "--";

  const wind = current.wind_speed_10m != null
    ? `${formatNumber(Math.round(current.wind_speed_10m), lang)} ${t.kmh}`
    : "--";

  const uvIndex = current.uv_index != null
    ? formatNumber(Math.round(current.uv_index), lang)
    : "--";

  const visibility = current.visibility != null
    ? `${formatNumber(Math.round(current.visibility / 1000), lang)} ${t.km}`
    : "--";

  const items = [
    { icon: Droplets, label: t.humidity, value: humidity },
    { icon: Wind, label: t.wind, value: wind },
    { icon: Gauge, label: t.uv, value: uvIndex },
    { icon: Eye, label: t.visibility, value: visibility },
  ];

  return (
    <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {items.map(({ icon: Icon, label, value }, i) => (
        <Grid size={6} key={i}>
          <GlassCard sx={{ color: theme.palette.text.primary, mt: 3 }}>
            <Stack direction="row" spacing={0.75} sx={{ opacity: 0.6, mb: 1.5, alignItems: "center" }}>
              <Icon size={13} />
              <Typography variant="caption" sx={{ textTransform: "uppercase", letterSpacing: 1 }}>
                {label}
              </Typography>
            </Stack>
            <Typography
              sx={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 400,
                fontSize: 18,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {value}
            </Typography>
          </GlassCard>
        </Grid>
      ))}
    </Grid>
  );
}