import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import WeatherCard from './WeatherCard';
import type { WeatherData } from '../services/api';

describe('WeatherCard Component', () => {
    const mockData: WeatherData = {
        temperature: 20,
        windSpeed: 10,
        weatherCode: 0, // Should be "Despejado"
    };

    it('renders city name correctly', () => {
        render(<WeatherCard data={mockData} city="Test City" />);
        expect(screen.getByText(/Clima en Test City/i)).toBeInTheDocument();
    });

    it('translates code 0 to "Despejado"', () => {
        render(<WeatherCard data={{ ...mockData, weatherCode: 0 }} city="Test City" />);
        expect(screen.getByText('Despejado')).toBeInTheDocument();
    });

    it('translates code 61 to "Lluvia"', () => {
        render(<WeatherCard data={{ ...mockData, weatherCode: 61 }} city="Test City" />);
        expect(screen.getByText('Lluvia')).toBeInTheDocument();
    });

    it('translates unknown code to "Desconocido"', () => {
        render(<WeatherCard data={{ ...mockData, weatherCode: 999 }} city="Test City" />);
        expect(screen.getByText('Desconocido')).toBeInTheDocument();
    });

    it('handles long city names without crashing', () => {
        render(<WeatherCard data={mockData} city="Very Long Name That Should Not Break The UI" />);
        expect(screen.getByText(/Very Long Name/i)).toBeInTheDocument();
    });
});
