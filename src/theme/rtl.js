
import createCache from "@emotion/cache";
import rtlPlugin from "@mui/stylis-plugin-rtl";

export function createEmotionCache(isRTL) {
  return createCache({
    key: isRTL ? "muirtl" : "mui",
    stylisPlugins: isRTL ? [rtlPlugin] : [],
  });
}