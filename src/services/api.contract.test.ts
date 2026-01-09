// @vitest-environment node
import { describe, it, expect } from 'vitest';

// PRUEBA DE CONTRATO: Llamadas reales a Open-Meteo
// Esta prueba se ejecuta en el pipeline de CI para verificar que la API externa esté funcionando
// y no haya cambiado su esquema (contrato).

describe('Contrato de API Open-Meteo', () => {
    it('API de Geocodificación retorna el esquema esperado para "Santiago"', async () => {
        const response = await fetch('https://geocoding-api.open-meteo.com/v1/search?name=Santiago&count=1&language=es&format=json');
        expect(response.status).toBe(200);

        const data = await response.json();

        // Validación de Esquema
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

    it('API de Pronóstico retorna el esquema esperado', async () => {
        // Coordenadas de Berlín
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true');
        expect(response.status).toBe(200);

        const data = await response.json();

        // Validación de Esquema
        expect(data).toHaveProperty('current_weather');
        const weather = data.current_weather;
        expect(weather).toHaveProperty('temperature');
        expect(weather).toHaveProperty('windspeed');
        expect(weather).toHaveProperty('weathercode');
        expect(typeof weather.temperature).toBe('number');
    });
});
