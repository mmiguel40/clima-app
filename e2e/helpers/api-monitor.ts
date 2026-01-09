import { Page } from '@playwright/test';

export interface ApiCall {
    timestamp: string;
    method: string;
    url: string;
    status: number;
    statusText: string;
    duration?: number;
    requestBody?: unknown;
    responseBody?: unknown;
}

export class ApiMonitor {
    private apiCalls: ApiCall[] = [];
    private requestStartTimes: Map<string, number> = new Map();

    constructor(private page: Page, private apiPatterns: string[] = ['open-meteo.com']) {
        this.setupListeners();
    }

    private setupListeners() {
        // Capturar requests
        this.page.on('request', async (request) => {
            if (this.shouldMonitor(request.url())) {
                const requestId = `${request.method()}-${request.url()}`;
                this.requestStartTimes.set(requestId, Date.now());

                process.stdout.write(`📤 [REQUEST] ${request.method()} ${request.url()}\n`);

                // Capturar body si existe
                try {
                    const postData = request.postData();
                    if (postData) {
                        process.stdout.write(`   Body: ${postData}\n`);
                    }
                } catch {
                    // Ignorar si no se puede obtener el body
                }
            }
        });

        // Capturar responses
        this.page.on('response', async (response) => {
            if (this.shouldMonitor(response.url())) {
                const requestId = `${response.request().method()}-${response.url()}`;
                const startTime = this.requestStartTimes.get(requestId);
                const duration = startTime ? Date.now() - startTime : undefined;

                const apiCall: ApiCall = {
                    timestamp: new Date().toISOString(),
                    method: response.request().method(),
                    url: response.url(),
                    status: response.status(),
                    statusText: response.statusText(),
                    duration
                };

                // Intentar capturar response body (solo para JSON)
                try {
                    const contentType = response.headers()['content-type'];
                    if (contentType?.includes('application/json')) {
                        apiCall.responseBody = await response.json();
                    }
                } catch {
                    // Ignorar si no se puede parsear
                }

                this.apiCalls.push(apiCall);

                // Log con formato según el código de estado
                const statusEmoji = this.getStatusEmoji(response.status());
                process.stdout.write(`${statusEmoji} [RESPONSE] ${response.status()} ${response.statusText()} - ${response.url()}\n`);
                if (duration) {
                    process.stdout.write(`   Duration: ${duration}ms\n`);
                }

                // Limpiar el mapa de tiempos
                this.requestStartTimes.delete(requestId);
            }
        });
    }

    private shouldMonitor(url: string): boolean {
        return this.apiPatterns.some(pattern => url.includes(pattern));
    }

    private getStatusEmoji(status: number): string {
        if (status >= 200 && status < 300) return '✅';
        if (status >= 300 && status < 400) return '🔄';
        if (status >= 400 && status < 500) return '⚠️';
        if (status >= 500) return '❌';
        return '📥';
    }

    /**
     * Obtiene todas las llamadas API capturadas
     */
    getApiCalls(): ApiCall[] {
        return [...this.apiCalls];
    }

    /**
     * Obtiene llamadas fallidas (status >= 400)
     */
    getFailedCalls(): ApiCall[] {
        return this.apiCalls.filter(call => call.status >= 400);
    }

    /**
     * Verifica si todas las llamadas fueron exitosas
     */
    allCallsSuccessful(): boolean {
        return this.apiCalls.every(call => call.status >= 200 && call.status < 400);
    }

    /**
     * Imprime un resumen de todas las llamadas
     */
    printSummary(): void {
        const lines = [
            '\n📊 ============ API Calls Summary ============',
            `   Total calls: ${this.apiCalls.length}`,
            `   Successful: ${this.apiCalls.filter(c => c.status >= 200 && c.status < 400).length}`,
            `   Failed: ${this.getFailedCalls().length}`
        ];

        if (this.apiCalls.length > 0) {
            const callsWithDuration = this.apiCalls.filter(c => c.duration);
            if (callsWithDuration.length > 0) {
                const avgDuration = callsWithDuration
                    .reduce((sum, c) => sum + (c.duration || 0), 0) / callsWithDuration.length;
                lines.push(`   Avg duration: ${avgDuration.toFixed(0)}ms`);
            }

            // Mostrar detalles de cada llamada
            lines.push('\n   📋 API Calls Details:');
            this.apiCalls.forEach((call, index) => {
                const emoji = this.getStatusEmoji(call.status);
                const duration = call.duration ? ` (${call.duration}ms)` : '';
                lines.push(`   ${index + 1}. ${emoji} ${call.method} ${call.status} ${duration}`);
                lines.push(`      ${call.url}`);
            });
        }

        if (this.getFailedCalls().length > 0) {
            lines.push('\n   ❌ Failed calls:');
            this.getFailedCalls().forEach(call => {
                lines.push(`      ${call.status} ${call.method} ${call.url}`);
            });
        }

        lines.push('============================================\n');

        // Escribir directamente a stdout
        const message = lines.join('\n');
        process.stdout.write(message);
    }

    /**
     * Limpia el historial de llamadas
     */
    clear(): void {
        this.apiCalls = [];
        this.requestStartTimes.clear();
    }
}
