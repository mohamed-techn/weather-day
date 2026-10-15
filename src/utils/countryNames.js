// src/utils/countryNames.js
export function getCountryName(countryCode, lang) {
  if (!countryCode) return "";
  try {
    const displayNames = new Intl.DisplayNames(
      [lang === "ar" ? "ar" : "en"],
      { type: "region" }
    );
    return displayNames.of(countryCode.toUpperCase());
  } catch {
    return countryCode;
  }
}