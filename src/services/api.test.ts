import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCoordinates, getWeather } from './api';

describe('API Service', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    describe('getCoordinates', () => {
        it('returns coordinates for a valid city', async () => {
            const mockResponse = {
                results: [
                    {
                        latitude: 10,
                        longitude: 20,
                        name: 'Test City',
                        country: 'Test Country',
                    },
                ],
            };

            globalThis.fetch = vi.fn().mockResolvedValue({
                json: vi.fn().mockResolvedValue(mockResponse),
            });

            const result = await getCoordinates('Test City');
            expect(result).toEqual({
                lat: 10,
                lon: 20,
                name: 'Test City',
                country: 'Test Country',
            });
            expect(fetch).toHaveBeenCalledWith(expect.stringContaining('geocoding-api'));
        });

        it('returns null if no results found', async () => {
            globalThis.fetch = vi.fn().mockResolvedValue({
                json: vi.fn().mockResolvedValue({ results: [] }),
            });

            const result = await getCoordinates('Nowhere');
            expect(result).toBeNull();
        });
    });

    describe('getWeather', () => {
        it('returns weather data for valid coords', async () => {
            const mockResponse = {
                current_weather: {
                    temperature: 25,
                    windspeed: 10,
                    weathercode: 1,
                },
            };

            globalThis.fetch = vi.fn().mockResolvedValue({
                json: vi.fn().mockResolvedValue(mockResponse),
            });

            const result = await getWeather(10, 20);
            expect(result).toEqual({
                temperature: 25,
                windSpeed: 10,
                weatherCode: 1,
            });
        });
    });
});
