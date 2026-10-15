// src/utils/numberFormat.js
export function formatNumber(value, lang) {
  if (value === null || value === undefined || value === "--") return value;
  const num = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(num)) return value;

  if (lang === "ar") {
    // نحدد نظام الأرقام صراحة عشان نضمن ظهور الأرقام الهندية دايمًا
    return new Intl.NumberFormat("ar-EG-u-nu-arab").format(num);
  }
  return num.toString();
}