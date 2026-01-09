export interface Coordinates {
  lat: number;
  lon: number;
  name: string;
  country: string;
}

export interface WeatherData {
  temperature: number;
  windSpeed: number;
  weatherCode: number;
}

export const getCoordinates = async (cityName: string): Promise<Coordinates | null> => {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=es&format=json`
    );

    if (!response.ok) {
      console.error(`Geocoding API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      console.warn(`No results found for city: ${cityName}`);
      return null;
    }

    const result = data.results[0];
    return {
      lat: result.latitude,
      lon: result.longitude,
      name: result.name,
      country: result.country,
    };
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
};

export const getWeather = async (lat: number, lon: number): Promise<WeatherData | null> => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );
    const data = await response.json();

    if (!data.current_weather) {
      return null;
    }

    return {
      temperature: data.current_weather.temperature,
      windSpeed: data.current_weather.windspeed,
      weatherCode: data.current_weather.weathercode,
    };
  } catch (error) {
    console.error(`Error fetching weather for ${lat},${lon}:`, error);
    return null;
  }
};
