
const BASE_URL = "https://geocoding-api.open-meteo.com/v1/search";

export async function searchLocation(city, lang) {
  try {
    const response = await fetch(
      `${BASE_URL}?name=${encodeURIComponent(city)}&count=5&language=${lang}&format=json`
    );

    if (!response.ok) {
      throw new Error(`Location API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.results) return [];

    return data.results.map((item) => ({
      name: item.name,
      lat: item.latitude,
      lon: item.longitude,
      country: item.country_code,
      state: item.admin1 || null,
    }));
  } catch (error) {
    console.error("Location search error:", error);
    throw error;
  }
}