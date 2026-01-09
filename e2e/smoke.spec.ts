import { test, expect } from '@playwright/test';
import { getTestData } from '../test-data.config';

const testData = getTestData();
const baseUrl = process.env.BASE_URL || 'http://localhost:5173';

test.describe('Smoke Tests - Flujo de Búsqueda', () => {
    test(`Búsqueda de ${testData.coordinates.city}`, async ({ page }) => {
        // 1. Ir a la aplicación
        await page.goto(baseUrl);

        // 2. Verificar título
        await expect(page.locator('h1')).toHaveText('Buscador de Clima y Mapas');

        // 3. Buscar ciudad específica del ambiente
        const searchInput = page.getByPlaceholder('Buscar ciudad (ej: Santiago)');
        await searchInput.fill(testData.coordinates.city);

        const searchButton = page.getByRole('button', { name: 'Buscar' });
        await searchButton.click();

        // 4. Verificar que aparecen los resultados
        const weatherCard = page.getByTestId('weather-card');
        await expect(weatherCard).toBeVisible({ timeout: 15000 });

        // 5. Verificar que el mapa está presente
        const mapView = page.getByTestId('map-view');
        await expect(mapView).toBeVisible();

        // 6. Verificar que contiene el nombre de la ciudad
        await expect(weatherCard).toContainText(testData.coordinates.city.split(' ')[0]);

        // 7. Probar funcionalidad de limpiar
        const clearButton = page.getByRole('button', { name: 'Limpiar' });
        await clearButton.click();

        // 8. Verificar que los resultados desaparecen
        await expect(weatherCard).not.toBeVisible();
        await expect(mapView).not.toBeVisible();
    });
});
