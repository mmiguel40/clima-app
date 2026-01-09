/**
 * Configuración de datos de prueba por ambiente
 * Cada ambiente usa ciudades diferentes para validar escenarios variados
 */

export interface TestData {
    cities: string[];
    expectedCountries: string[];
    coordinates: {
        lat: number;
        lon: number;
        city: string;
    };
}

export const TEST_DATA: Record<string, TestData> = {
    development: {
        cities: ['Santiago de Chile', 'Buenos Aires'],
        expectedCountries: ['Chile', 'Argentina'],
        coordinates: {
            lat: -33.45,
            lon: -70.66,
            city: 'Santiago de Chile'
        }
    },
    qa: {
        cities: ['Santiago de Chile', 'Bogotá', 'Ciudad de México'],
        expectedCountries: ['Chile', 'Colombia', 'México'],
        coordinates: {
            lat: -33.45,
            lon: -70.66,
            city: 'Santiago de Chile'
        }
    },
    production: {
        cities: ['New York', 'Tokyo', 'São Paulo'],
        expectedCountries: ['United States', 'Japan', 'Brazil'],
        coordinates: {
            lat: 40.71,
            lon: -74.00,
            city: 'New York'
        }
    }
};

/**
 * Obtiene los datos de prueba según el ambiente
 */
export function getTestData(): TestData {
    const env = process.env.TEST_ENV || 'development';
    return TEST_DATA[env] || TEST_DATA.development;
}
