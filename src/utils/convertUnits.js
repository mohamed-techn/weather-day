export function toFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

// Displays a temperature in the chosen unit, rounded.
export function displayTemp(celsius, unit) {
  return unit === "C" ? Math.round(celsius) : toFahrenheit(celsius);
}
