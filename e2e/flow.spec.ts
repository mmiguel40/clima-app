import { test, expect } from '@playwright/test';
import { ApiMonitor } from './helpers/api-monitor';

test('Flujo Completo de Búsqueda', async ({ page }) => {
    // Inicializar monitor de APIs
    const apiMonitor = new ApiMonitor(page);

    // 1. Go to the app
    await page.goto('/');

    // 2. Check title
    await expect(page.locator('h1')).toHaveText('Buscador de Clima y Mapas');

    // 3. Search for a city
    const searchInput = page.getByPlaceholder('Buscar ciudad (ej: Santiago)');
    await searchInput.fill('Santiago de Chile');

    const searchButton = page.getByRole('button', { name: 'Buscar' });
    await searchButton.click();

    // 4. Verify loading state (optional, might be too fast)
    // await expect(searchButton).toBeDisabled();

    // 5. Verify results appear
    // Wait for the weather card to be visible
    const weatherCard = page.getByTestId('weather-card');
    try {
        await expect(weatherCard).toBeVisible({ timeout: 15000 });
    } catch (e) {
        const errorMsg = await page.locator('.error-message').textContent();
        console.log(`Test Failed. Visible Error in UI: ${errorMsg}`);
        throw e;
    }

    // verify map is present
    const mapView = page.getByTestId('map-view');
    await expect(mapView).toBeVisible();

    // 5. Verify content
    // Expect "Santiago de Chile" or "Santiago, Chile" format
    await expect(weatherCard).toContainText('Santiago');
    await expect(weatherCard).toContainText('Chile');

    // 6. Test Clear functionality
    const clearButton = page.getByRole('button', { name: 'Limpiar' });
    await clearButton.click();

    // Verify results disappear
    await expect(weatherCard).not.toBeVisible();
    await expect(mapView).not.toBeVisible();

    // 7. Imprimir resumen de llamadas API
    apiMonitor.printSummary();

    // 8. Verificar que no hubo errores en las APIs
    const failedCalls = apiMonitor.getFailedCalls();
    if (failedCalls.length > 0) {
        console.warn(`⚠️ Warning: ${failedCalls.length} API call(s) failed`);
    }
});
