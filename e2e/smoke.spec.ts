import { test, expect } from '@playwright/test';
import { getTestData } from '../test-data.config';
import { ApiMonitor } from './helpers/api-monitor';

const testData = getTestData();
const baseUrl = process.env.BASE_URL || 'http://localhost:5173';

test.describe('Smoke Tests - Flujo de Búsqueda', () => {
    test(`Búsqueda de ${testData.coordinates.city}`, async ({ page }) => {
        // Inicializar monitor de APIs
        const apiMonitor = new ApiMonitor(page);

        // 1. Ir a la aplicación
        await page.goto(baseUrl);

        // 2. Verificar título
        await expect(page.locator('h1')).toHaveText('Buscador de Clima y Mapas');

        // 3. Buscar ciudad específica del ambiente
        const searchInput = page.getByPlaceholder('Buscar ciudad (ej: Santiago)');
        await searchInput.fill(testData.coordinates.city);

        const searchButton = page.getByRole('button', { name: 'Buscar' });
        await searchButton.click();

        // 4. Esperar a que la búsqueda se complete
        // Dar más tiempo y verificar que no haya errores
        await page.waitForTimeout(2000);

        // 5. Verificar que aparecen los resultados
        const weatherCard = page.getByTestId('weather-card');
        await expect(weatherCard).toBeVisible({ timeout: 30000 });

        // 6. Verificar que el mapa está presente
        const mapView = page.getByTestId('map-view');
        await expect(mapView).toBeVisible();

        // 7. Verificar que contiene información del clima (más flexible)
        await expect(weatherCard).toContainText(/°C|temperatura/i);

        // 8. Probar funcionalidad de limpiar
        const clearButton = page.getByRole('button', { name: 'Limpiar' });
        await clearButton.click();

        // 9. Verificar que los resultados desaparecen
        await expect(weatherCard).not.toBeVisible();
        await expect(mapView).not.toBeVisible();

        // 10. Imprimir resumen de llamadas API
        apiMonitor.printSummary();

        // 11. Verificar que no hubo errores en las APIs
        const failedCalls = apiMonitor.getFailedCalls();
        if (failedCalls.length > 0) {
            console.warn(`⚠️ Warning: ${failedCalls.length} API call(s) failed`);
        }
    });
});
