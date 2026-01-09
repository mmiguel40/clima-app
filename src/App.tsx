import { useState } from 'react';
import './App.css';
import EnvironmentBanner from './components/EnvironmentBanner';
import SearchBar from './components/SearchBar';
import MapView from './components/MapView';
import WeatherCard from './components/WeatherCard';
import AnimatedBackground from './components/AnimatedBackground';
import { getCoordinates, getWeather } from './services/api';
import type { Coordinates, WeatherData } from './services/api';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    setWeather(null); // Clear previous weather

    try {
      const coords = await getCoordinates(city);
      if (!coords) {
        setError(`No se encontraron coordenadas para "${city}"`);
        setCoordinates(null);
        return;
      }

      setCoordinates(coords);

      // Fetch weather immediately after coordinates
      const weatherData = await getWeather(coords.lat, coords.lon);
      if (weatherData) {
        setWeather(weatherData);
      } else {
        setError('No se pudo obtener el clima');
      }

    } catch (err) {
      setError('Ocurrió un error al buscar los datos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCoordinates(null);
    setWeather(null);
    setError(null);
  };

  return (
    <>
      <EnvironmentBanner />
      <AnimatedBackground />
      <div className="app-container">
        <h1>Buscador de Clima y Mapas</h1>
        <p>POC: React + Vite + Leaflet + Open-Meteo</p>

        <SearchBar onSearch={handleSearch} onClear={handleClear} isLoading={loading} />

        {error && <div className="error-message">{error}</div>}

        {coordinates && (
          <div className="results-container">
            <div className="result-half map-half">
              <MapView
                lat={coordinates.lat}
                lon={coordinates.lon}
                city={`${coordinates.name}, ${coordinates.country}`}
              />
            </div>
            {weather && (
              <div className="result-half weather-half">
                <WeatherCard
                  data={weather}
                  city={`${coordinates.name}, ${coordinates.country}`}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
