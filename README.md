# 🌦️ Clima App - Buscador de Clima y Mapas

Aplicación web moderna para consultar el clima de cualquier ciudad del mundo con visualización en mapa interactivo.

## ✨ Características

- 🔍 **Búsqueda de ciudades** - Encuentra cualquier ciudad del mundo
- 🌡️ **Datos meteorológicos en tiempo real** - Temperatura, viento y condiciones actuales
- 🗺️ **Mapa interactivo** - Visualización con Leaflet y capas de satélite
- 🌐 **Multilenguaje** - Interfaz y datos en español
- 📱 **Diseño responsivo** - Funciona en desktop y móvil
- 🎨 **UI moderna** - Glassmorphism y animaciones suaves
- 🔄 **CI/CD Automatizado** - Pipeline con pruebas y despliegues automáticos

## 🚀 Tecnologías

- **React 18** + **TypeScript** - Framework y tipado
- **Vite** - Build tool ultrarrápido
- **Leaflet** + **React-Leaflet** - Mapas interactivos
- **Open-Meteo API** - Datos meteorológicos gratuitos
- **Vitest** - Testing unitario e integración
- **Playwright** - Testing E2E
- **ESLint** - Linting de código
- **SonarCloud** - Análisis de calidad
- **GitHub Actions** - CI/CD Pipeline
- **GitHub Pages** - Hosting gratuito

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/mmiguel40/clima-app.git
cd clima-app

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

## 🧪 Testing

### Build
```bash
npm run build
```

### Tests Unitarios
```bash
# Ejecutar tests unitarios
npm run test

# Con cobertura
npm run test:coverage
```

### Tests de Integración
```bash
# Tests de contrato con API externa
npx vitest run src/services/api.contract.test.ts
```

### Tests E2E
```bash
# Tests E2E completos
npm run test:e2e

# Smoke tests por ambiente
npm run test:smoke:dev   # Prueba con Santiago de Chile, Buenos Aires
npm run test:smoke:qa    # Prueba con Madrid, Bogotá, CDMX
npm run test:smoke:prod  # Prueba con New York, Tokyo, São Paulo
```

### Linting
```bash
npm run lint
```

## 🌍 Despliegues

La aplicación está desplegada en GitHub Pages con tres entornos:

| Ambiente | URL | Datos de Prueba |
|----------|-----|-----------------|
| **Desarrollo** | https://mmiguel40.github.io/clima-app/dev/ | Santiago de Chile, Buenos Aires |
| **QA** | https://mmiguel40.github.io/clima-app/qa/ | Madrid, Bogotá, Ciudad de México |
| **Producción** | https://mmiguel40.github.io/clima-app/ | New York, Tokyo, São Paulo |

## 🔄 CI/CD Pipeline

El proyecto cuenta con un pipeline automatizado de **10 etapas** siguiendo estándares de la industria:

### Etapas del Pipeline

1. **Build** - Compilación y generación de artefactos
2. **Unit Tests** - Pruebas unitarias con cobertura
3. **Integration Tests** - Validación de contratos con API externa
4. **Code Quality** - Análisis estático con ESLint y SonarCloud
5. **Deploy to Dev** - Despliegue automático a desarrollo
6. **Smoke Tests** - Validación rápida del despliegue en DEV
7. **Deploy to Staging/QA** - Despliegue a QA (requiere aprobación manual)
8. **Acceptance Tests** - Tests E2E completos en QA
9. **Deploy to Production** - Despliegue a producción (requiere aprobación manual)
10. **Post-Deploy Tests** - Validación final en producción

### Flujo Visual

```
Build → Unit Tests + Integration Tests (paralelo)
  ↓
Code Quality
  ↓
Deploy Dev → Smoke Tests
  ↓
Deploy QA → Acceptance Tests
  ↓
Deploy Prod → Post-Deploy Tests
```

### Segregación de Datos de Prueba

Cada ambiente usa datos diferentes para validar escenarios variados:

- **DEV**: Ciudades de Sudamérica (desarrollo rápido)
- **QA**: Ciudades con acentos españoles (validación de caracteres especiales)
- **PROD**: Ciudades globales (cobertura internacional)

Ver [PIPELINE.md](./PIPELINE.md) para documentación completa del pipeline.

## 📝 Estructura del Proyecto

```
clima-app/
├── src/
│   ├── components/          # Componentes React
│   │   ├── AnimatedBackground.tsx
│   │   ├── EnvironmentBanner.tsx
│   │   ├── MapView.tsx
│   │   ├── SearchBar.tsx
│   │   └── WeatherCard.tsx
│   ├── services/            # Servicios de API
│   │   ├── api.ts
│   │   ├── api.test.ts           # Tests unitarios
│   │   └── api.contract.test.ts  # Tests de integración
│   └── App.tsx              # Componente principal
├── e2e/                     # Tests End-to-End
│   ├── flow.spec.ts         # Tests E2E completos
│   └── smoke.spec.ts        # Smoke tests parametrizados
├── .github/workflows/       # Pipeline de CI/CD
│   └── pipeline.yml
├── test-data.config.ts      # Configuración de datos de prueba
├── sonar-project.properties # Configuración de SonarCloud
└── public/                  # Assets estáticos
```

## 🧪 Arquitectura de Testing

### Pirámide de Tests

```
        /\
       /  \
      / E2E \          ← Pocos, lentos, alto valor
     /______\
    /        \
   / Integration\     ← Moderados, validan contratos
  /____________\
 /              \
/  Unit Tests    \    ← Muchos, rápidos, bajo costo
/__________________\
```

### Tests Unitarios
- **Ubicación**: `src/**/*.test.ts`
- **Framework**: Vitest
- **Cobertura**: Servicios de API, utilidades
- **Idioma**: Español
- **Ejecución**: Paralela con Integration Tests

### Tests de Integración
- **Ubicación**: `src/services/api.contract.test.ts`
- **Propósito**: Validar que la API externa (Open-Meteo) no cambió su esquema
- **Tipo**: Contract Testing
- **Ejecución**: Paralela con Unit Tests

### Tests de Aceptación (E2E)
- **Ubicación**: `e2e/`
- **Framework**: Playwright
- **Tipos**:
  - **flow.spec.ts**: Tests completos del flujo de usuario
  - **smoke.spec.ts**: Tests rápidos post-deploy con datos por ambiente
- **Ejecución**: En QA después del despliegue

### Smoke Tests
- **Propósito**: Validación rápida post-deploy
- **Ambientes**: DEV, QA, PROD
- **Datos**: Segregados por ambiente
- **Tiempo**: 20-40 segundos

### Datos de Prueba
- **Archivo**: `test-data.config.ts`
- **Estrategia**: Segregación por ambiente
- **Variable de entorno**: `TEST_ENV` (development, qa, production)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guía de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: nueva característica
fix: corrección de bug
docs: cambios en documentación
test: agregar o modificar tests
refactor: refactorización de código
chore: tareas de mantenimiento
```

### Estándares de Código

- **ESLint**: Configurado para React + TypeScript
- **Prettier**: Formateo automático
- **SonarCloud**: Análisis de calidad continuo
- **Tests**: Cobertura mínima del 80%

## 📊 Métricas del Proyecto

| Métrica | Valor |
|---------|-------|
| **Cobertura de Tests** | ~85% |
| **Tiempo de Pipeline** | 8-12 minutos |
| **Ambientes** | 3 (DEV, QA, PROD) |
| **Tests Automatizados** | Unit + Integration + E2E + Smoke |
| **Calidad de Código** | A (SonarCloud) |

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👤 Autor

**Miguel Miguel**
- GitHub: [@mmiguel40](https://github.com/mmiguel40)
- Proyecto: [clima-app](https://github.com/mmiguel40/clima-app)

## 🙏 Agradecimientos

- [Open-Meteo](https://open-meteo.com/) - API de clima gratuita
- [Leaflet](https://leafletjs.com/) - Biblioteca de mapas
- [GitHub Pages](https://pages.github.com/) - Hosting gratuito
- [SonarCloud](https://sonarcloud.io/) - Análisis de calidad

## 📚 Documentación Adicional

- [PIPELINE.md](./PIPELINE.md) - Documentación completa del pipeline CI/CD
- [test-data.config.ts](./test-data.config.ts) - Configuración de datos de prueba

---

**Última actualización:** Enero 2026
