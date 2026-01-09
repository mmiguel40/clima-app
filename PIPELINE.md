# 🚀 Pipeline de CI/CD - Clima App

Este documento explica de forma sencilla cómo funciona nuestro sistema automático de pruebas y despliegue.

## ¿Qué es un Pipeline?

Es como una **línea de producción automática** que verifica que tu código funcione correctamente y lo publica en internet, todo sin intervención manual.

---

## 📋 Etapas del Pipeline

### 1️⃣ **Build (Construcción)**
**¿Qué hace?** Compila el código y genera los archivos optimizados para producción.

**¿Por qué?** Detecta errores de compilación antes de ejecutar pruebas, ahorrando tiempo.

**Herramientas:**
- **Vite**: Compilador ultrarrápido que optimiza el código.
- **TypeScript**: Verifica tipos durante la compilación.

---

### 2️⃣ **Unit Tests (Pruebas Unitarias)**
**¿Qué hace?** Prueba cada función individual del código por separado.

**Ejemplo:** Verifica que la función de conversión de temperatura funcione correctamente.

**Herramientas:**
- **Vitest**: Framework de pruebas rápido y moderno.
- **Coverage**: Mide qué porcentaje del código está cubierto por pruebas.

---

### 3️⃣ **Integration Tests (Pruebas de Integración)**
**¿Qué hace?** Verifica que los servicios externos (API de clima) funcionen correctamente.

**¿Por qué?** Si la API externa está caída o cambió su formato, lo detectamos inmediatamente.

**Herramientas:**
- **Vitest**: Ejecuta llamadas reales a la API de Open-Meteo.
- **Contract Testing**: Valida que el esquema de datos no haya cambiado.

---

### 4️⃣ **Code Quality (Calidad de Código)**
**¿Qué hace?** Analiza el código en busca de problemas de calidad, seguridad y estilo.

**Pasos:**
1. **Lint** - Verifica que el código siga las reglas de estilo.
2. **SonarCloud** - Detecta bugs potenciales, código duplicado y vulnerabilidades de seguridad.

**Herramientas:**
- **ESLint**: Analizador de código JavaScript/TypeScript.
- **SonarCloud**: Plataforma de análisis de calidad en la nube.

---

### 5️⃣ **Deploy to Dev (Despliegue a Desarrollo)**
**¿Qué hace?** Publica la aplicación en un entorno de pruebas para desarrolladores.

**URL:** `https://mmiguel40.github.io/clima-app/dev/`

**Herramientas:**
- **Vite**: Compila y optimiza el código.
- **GitHub Pages**: Aloja la aplicación gratuitamente.

---

### 6️⃣ **Smoke Tests (Pruebas de Humo)**
**¿Qué hace?** Ejecuta pruebas rápidas para verificar que el despliegue a DEV funcionó.

**Datos de Prueba:** Santiago de Chile, Buenos Aires

**¿Por qué?** Detecta problemas de despliegue antes de avanzar a QA.

**Herramientas:**
- **Playwright**: Automatiza un navegador real para probar la aplicación desplegada.

---

### 7️⃣ **Deploy to Staging/QA (Despliegue a QA)**
**¿Qué hace?** Publica en un entorno donde el equipo de QA puede hacer pruebas manuales.

**⏸️ REQUIERE APROBACIÓN MANUAL** - Un humano debe revisar y aprobar antes de continuar.

**URL:** `https://mmiguel40.github.io/clima-app/qa/`

**Herramientas:**
- **GitHub Environments**: Gestiona la aprobación manual.
- **GitHub Pages**: Publica en un subdirectorio separado.

---

### 8️⃣ **Acceptance Tests (Pruebas de Aceptación)**
**¿Qué hace?** Ejecuta pruebas completas de usuario final en el ambiente de QA.

**Incluye:**
- **E2E Tests**: Simula usuarios reales navegando la aplicación completa.
- **Smoke Tests QA**: Validación rápida con datos específicos de QA.

**Datos de Prueba:** Madrid, Bogotá, Ciudad de México

**¿Por qué?** Valida que la aplicación funcione como espera el usuario final.

**Herramientas:**
- **Playwright**: Ejecuta tests E2E completos y smoke tests.

---

### 9️⃣ **Deploy to Production (Despliegue a Producción)**
**¿Qué hace?** Publica la versión final que verán los usuarios reales.

**⏸️ REQUIERE APROBACIÓN MANUAL** - Doble verificación antes de publicar al público.

**URL:** `https://mmiguel40.github.io/clima-app/`

**Herramientas:**
- **GitHub Environments**: Gestiona la aprobación manual final.
- **GitHub Pages**: Publica en la URL principal.

---

### 🔟 **Post-Deploy Tests (Pruebas Post-Despliegue)**
**¿Qué hace?** Valida que el despliegue a producción funcionó correctamente.

**Datos de Prueba:** New York, Tokyo, São Paulo

**¿Por qué?** Confirma que los usuarios reales pueden acceder y usar la aplicación.

**Herramientas:**
- **Playwright**: Ejecuta smoke tests contra el sitio de producción.

---

## 🔄 Flujo Completo

```
┌─────────────────────┐
│  Código Actualizado │
└──────────┬──────────┘
           │
           ▼
    ┌──────────────┐
    │ 1. Build     │ 🔨 Compilar código
    └──────┬───────┘
           │
           ├─────────────────┐
           │                 │
           ▼                 ▼
    ┌──────────────┐  ┌──────────────────┐
    │ 2. Unit      │  │ 3. Integration   │
    │    Tests     │  │    Tests         │
    └──────┬───────┘  └────────┬─────────┘
           │                   │
           └─────────┬─────────┘
                     │
                     ▼
              ┌──────────────┐
              │ 4. Code      │ 🔍 Análisis de calidad
              │    Quality   │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │ 5. Deploy    │ 🚀 Publicar a DEV
              │    to Dev    │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │ 6. Smoke     │ ✅ Validar DEV
              │    Tests     │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │ ⏸️  APROBAR  │ 👤 Revisión manual
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │ 7. Deploy    │ 🚀 Publicar a QA
              │    to QA     │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │ 8. Acceptance│ ✅ Tests completos en QA
              │    Tests     │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │ ⏸️  APROBAR  │ 👤 Revisión final
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │ 9. Deploy    │ 🎉 Publicar a PROD
              │    to Prod   │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │10. Post-Deploy│ ✅ Validar PROD
              │    Tests     │
              └──────────────┘
```

---

## 🎯 Segregación de Datos de Prueba

Cada ambiente usa **datos diferentes** para validar escenarios variados:

| Etapa | Ambiente | Ciudades de Prueba | Propósito |
|-------|----------|-------------------|-----------|
| **Smoke Tests** | DEV | Santiago de Chile, Buenos Aires | Desarrollo con datos conocidos |
| **Acceptance Tests** | QA | Madrid, Bogotá, Ciudad de México | Validación con acentos y caracteres especiales |
| **Post-Deploy Tests** | PROD | New York, Tokyo, São Paulo | Cobertura global con ciudades internacionales |

**Beneficios:**
- ✅ Mayor cobertura de escenarios
- ✅ Detecta bugs específicos de datos
- ✅ Valida que cada despliegue funcionó correctamente
- ✅ Independencia entre ambientes

---

## 🛠️ Tecnologías Utilizadas

| Herramienta | Propósito |
|-------------|-----------|
| **GitHub Actions** | Ejecuta el pipeline automáticamente |
| **Node.js 20** | Entorno de ejecución de JavaScript |
| **Vite** | Compilador y optimizador de código |
| **TypeScript** | Tipado estático y verificación en tiempo de compilación |
| **Vitest** | Framework de pruebas unitarias e integración |
| **Playwright** | Framework de pruebas E2E y smoke tests |
| **ESLint** | Verificador de calidad de código |
| **SonarCloud** | Análisis profundo de calidad y seguridad |
| **GitHub Pages** | Hosting gratuito de sitios web |
| **GitHub Environments** | Gestión de aprobaciones manuales |
| **cross-env** | Variables de entorno multiplataforma |

---

## ⚙️ Configuración de Aprobaciones Manuales

Para activar las pausas de aprobación manual:

1. Ve a **Settings** → **Environments** en GitHub
2. Configura el entorno **`qa`**:
   - Activa "Required reviewers"
   - Agrega los usuarios que pueden aprobar
3. Repite para el entorno **`production`**

---

## 📊 Beneficios del Pipeline

✅ **Build separado** - Detecta errores de compilación temprano  
✅ **Tests paralelos** - Unit + Integration corren simultáneamente  
✅ **Calidad consistente** - Cada cambio pasa por las mismas verificaciones  
✅ **Despliegues seguros** - Aprobaciones manuales previenen errores críticos  
✅ **Validación post-deploy** - Smoke tests confirman que cada despliegue funcionó  
✅ **Segregación de datos** - Cada ambiente prueba con datos diferentes  
✅ **Trazabilidad** - Historial completo de qué se desplegó y cuándo  
✅ **Estándar de la industria** - Nombres y orden reconocidos universalmente  

---

## 🧪 Comandos de Testing

```bash
# Build
npm run build

# Tests unitarios
npm run test

# Tests E2E completos
npm run test:e2e

# Smoke tests por ambiente
npm run test:smoke:dev
npm run test:smoke:qa
npm run test:smoke:prod

# Linting
npm run lint

# Cobertura de código
npm run test:coverage
```

---

## 🎯 ¿Cuándo se ejecuta?

El pipeline se activa automáticamente cuando:
- Se hace `push` a las ramas `main`, `develop` o `release/*`
- Se abre o actualiza un Pull Request
- Se ejecuta manualmente desde GitHub Actions

---

## 📁 Archivos de Configuración

- **`.github/workflows/pipeline.yml`** - Definición del pipeline
- **`test-data.config.ts`** - Datos de prueba por ambiente
- **`e2e/smoke.spec.ts`** - Smoke tests parametrizados
- **`e2e/flow.spec.ts`** - Tests E2E completos
- **`sonar-project.properties`** - Configuración de SonarCloud
- **`vitest.config.ts`** - Configuración de Vitest
- **`playwright.config.ts`** - Configuración de Playwright

---

## 📈 Métricas del Pipeline

| Métrica | Valor Típico |
|---------|--------------|
| **Tiempo Total** | 8-12 minutos |
| **Build** | 30-60 segundos |
| **Unit Tests** | 10-20 segundos |
| **Integration Tests** | 5-10 segundos |
| **Code Quality** | 30-60 segundos |
| **Smoke Tests** | 20-40 segundos |
| **Acceptance Tests** | 1-2 minutos |
| **Post-Deploy Tests** | 20-40 segundos |

---

## 🔍 Troubleshooting

### El pipeline falla en Build
- Verifica errores de TypeScript
- Revisa que todas las dependencias estén instaladas

### Tests unitarios fallan
- Ejecuta localmente: `npm run test`
- Revisa los cambios recientes en el código

### Smoke tests fallan
- Verifica que el sitio esté desplegado correctamente
- Revisa la configuración de datos de prueba en `test-data.config.ts`

### SonarCloud falla
- Verifica que `SONAR_TOKEN` esté configurado en GitHub Secrets
- Revisa que la rama `main` esté configurada como rama principal en SonarCloud

---

**Última actualización:** Enero 2026
