import { describe, it, expect } from 'vitest';

// CONTRACT TEST: Real Calls to Open-Meteo
// This test is intended to be run in the CI pipeline to verify the external API is healthy
// and hasn't changed its schema (contract).

describe('Open-Meteo API Contract', () => {
    it('Geocoding API returns expected schema for "Santiago"', async () => {
        const response = await fetch('https://geocoding-api.open-meteo.com/v1/search?name=Santiago&count=1&language=es&format=json');
        expect(response.status).toBe(200);

        const data = await response.json();

        // Schema Validation
        expect(data).toHaveProperty('results');
        expect(Array.isArray(data.results)).toBe(true);
        expect(data.results.length).toBeGreaterThan(0);

        const firstResult = data.results[0];
        expect(firstResult).toHaveProperty('latitude');
        expect(firstResult).toHaveProperty('longitude');
        expect(firstResult).toHaveProperty('name');
        expect(typeof firstResult.latitude).toBe('number');
        expect(typeof firstResult.longitude).toBe('number');
    });

    it('Forecast API returns expected schema', async () => {
        // Berlin coordinates
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true');
        expect(response.status).toBe(200);

        const data = await response.json();

        // Schema Validation
        expect(data).toHaveProperty('current_weather');
        const weather = data.current_weather;
        expect(weather).toHaveProperty('temperature');
        expect(weather).toHaveProperty('windspeed');
        expect(weather).toHaveProperty('weathercode');
        expect(typeof weather.temperature).toBe('number');
    });
});
