import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import * as api from './services/api';

// Mock de los servicios API
vi.mock('./services/api');

// Mock de los componentes pesados
vi.mock('./components/MapView', () => ({
    default: ({ city }: { city: string }) => <div data-testid="map-view">Map: {city}</div>
}));

vi.mock('./components/AnimatedBackground', () => ({
    default: () => <div data-testid="animated-background">Background</div>
}));

describe('App', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renderiza el título correctamente', () => {
        render(<App />);
        expect(screen.getByText('Buscador de Clima y Mapas')).toBeInTheDocument();
    });

    it('renderiza el subtítulo', () => {
        render(<App />);
        expect(screen.getByText('POC: React + Vite + Leaflet + Open-Meteo')).toBeInTheDocument();
    });

    it('renderiza el SearchBar', () => {
        render(<App />);
        expect(screen.getByPlaceholderText(/buscar ciudad/i)).toBeInTheDocument();
    });

    it('muestra error cuando no se encuentran coordenadas', async () => {
        const user = userEvent.setup();
        vi.mocked(api.getCoordinates).mockResolvedValue(null);

        render(<App />);

        const input = screen.getByPlaceholderText(/buscar ciudad/i);
        const button = screen.getByRole('button', { name: /buscar/i });

        await user.type(input, 'CiudadInvalida');
        await user.click(button);

        await waitFor(() => {
            expect(screen.getByText(/no se encontraron coordenadas/i)).toBeInTheDocument();
        });
    });

    it('muestra clima cuando la búsqueda es exitosa', async () => {
        const user = userEvent.setup();

        vi.mocked(api.getCoordinates).mockResolvedValue({
            lat: 40.4168,
            lon: -3.7038,
            name: 'Madrid',
            country: 'España'
        });

        vi.mocked(api.getWeather).mockResolvedValue({
            temperature: 25,
            windSpeed: 10,
            weatherCode: 1
        });

        render(<App />);

        const input = screen.getByPlaceholderText(/buscar ciudad/i);
        const button = screen.getByRole('button', { name: /buscar/i });

        await user.type(input, 'Madrid');
        await user.click(button);

        await waitFor(() => {
            expect(screen.getByTestId('weather-card')).toBeInTheDocument();
        });

        expect(screen.getByTestId('map-view')).toBeInTheDocument();
    });

    it('muestra error cuando falla la obtención del clima', async () => {
        const user = userEvent.setup();

        vi.mocked(api.getCoordinates).mockResolvedValue({
            lat: 40.4168,
            lon: -3.7038,
            name: 'Madrid',
            country: 'España'
        });

        vi.mocked(api.getWeather).mockResolvedValue(null);

        render(<App />);

        const input = screen.getByPlaceholderText(/buscar ciudad/i);
        const button = screen.getByRole('button', { name: /buscar/i });

        await user.type(input, 'Madrid');
        await user.click(button);

        await waitFor(() => {
            expect(screen.getByText(/no se pudo obtener el clima/i)).toBeInTheDocument();
        });
    });

    it('limpia resultados al hacer click en limpiar', async () => {
        const user = userEvent.setup();

        vi.mocked(api.getCoordinates).mockResolvedValue({
            lat: 40.4168,
            lon: -3.7038,
            name: 'Madrid',
            country: 'España'
        });

        vi.mocked(api.getWeather).mockResolvedValue({
            temperature: 25,
            windSpeed: 10,
            weatherCode: 1
        });

        render(<App />);

        const input = screen.getByPlaceholderText(/buscar ciudad/i);
        const searchButton = screen.getByRole('button', { name: /buscar/i });

        await user.type(input, 'Madrid');
        await user.click(searchButton);

        await waitFor(() => {
            expect(screen.getByTestId('weather-card')).toBeInTheDocument();
        });

        const clearButton = screen.getByRole('button', { name: /limpiar/i });
        await user.click(clearButton);

        await waitFor(() => {
            expect(screen.queryByTestId('weather-card')).not.toBeInTheDocument();
        });
    });

    it('maneja errores de red correctamente', async () => {
        const user = userEvent.setup();
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        vi.mocked(api.getCoordinates).mockRejectedValue(new Error('Network error'));

        render(<App />);

        const input = screen.getByPlaceholderText(/buscar ciudad/i);
        const button = screen.getByRole('button', { name: /buscar/i });

        await user.type(input, 'Madrid');
        await user.click(button);

        await waitFor(() => {
            expect(screen.getByText(/ocurrió un error/i)).toBeInTheDocument();
        });

        consoleErrorSpy.mockRestore();
    });

    it('muestra estado de carga durante la búsqueda', async () => {
        const user = userEvent.setup();

        // Crear una promesa que podemos controlar
        let resolveCoordinates: any;
        const coordinatesPromise = new Promise((resolve) => {
            resolveCoordinates = resolve;
        });

        vi.mocked(api.getCoordinates).mockReturnValue(coordinatesPromise as any);

        render(<App />);

        const input = screen.getByPlaceholderText(/buscar ciudad/i);
        const button = screen.getByRole('button', { name: /buscar/i });

        await user.type(input, 'Madrid');
        await user.click(button);

        // El botón debería estar deshabilitado durante la carga
        expect(button).toBeDisabled();

        // Resolver la promesa
        resolveCoordinates({
            lat: 40.4168,
            lon: -3.7038,
            name: 'Madrid',
            country: 'España'
        });

        await waitFor(() => {
            expect(button).not.toBeDisabled();
        });
    });
});
