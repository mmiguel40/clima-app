import React from 'react';
import type { WeatherData } from '../services/api';
import './WeatherCard.css';

interface WeatherCardProps {
    data: WeatherData;
    city: string;
}

// WMO Weather interpretation codes (https://open-meteo.com/en/docs)
const getWeatherDescription = (code: number): string => {
    if (code === 0) return 'Despejado';
    if (code >= 1 && code <= 3) return 'Parcialmente Nublado';
    if (code >= 45 && code <= 48) return 'Niebla';
    if (code >= 51 && code <= 55) return 'Llovizna';
    if (code >= 61 && code <= 65) return 'Lluvia';
    if (code >= 71 && code <= 75) return 'Nieve';
    if (code >= 80 && code <= 82) return 'Chubascos';
    if (code >= 95 && code <= 99) return 'Tormenta Eléctrica';
    return 'Desconocido';
};

const WeatherCard: React.FC<WeatherCardProps> = ({ data, city }) => {
    return (
        <div className="weather-card" data-testid="weather-card">
            <h2>Clima en {city}</h2>
            <div className="weather-info">
                <div className="info-item">
                    <span className="label">Temperatura</span>
                    <span className="value">{data.temperature}°C</span>
                </div>
                <div className="info-item">
                    <span className="label">Viento</span>
                    <span className="value">{data.windSpeed} km/h</span>
                </div>
                <div className="info-item">
                    <span className="label">Condición</span>
                    <span className="value">{getWeatherDescription(data.weatherCode)}</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
