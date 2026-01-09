# 🚀 Pipeline de CI/CD - Clima App

Este documento explica de forma sencilla cómo funciona nuestro sistema automático de pruebas y despliegue.

## ¿Qué es un Pipeline?

Es como una **línea de producción automática** que verifica que tu código funcione correctamente y lo publica en internet, todo sin intervención manual.

---

## 📋 Etapas del Pipeline

### 1️⃣ **Verificación de Salud de la API**
**¿Qué hace?** Verifica que el servicio de clima externo (Open-Meteo) esté funcionando.

**¿Por qué?** Si la API está caída, no tiene sentido continuar con el resto del proceso.

**Herramientas:**
- **Vitest**: Ejecuta pruebas automáticas para verificar que la API responda correctamente.

---

### 2️⃣ **Calidad de Código y Pruebas Unitarias**
**¿Qué hace?** Revisa que el código esté bien escrito y que las funciones individuales funcionen.

**Pasos:**
1. **Lint** - Verifica que el código siga las reglas de estilo (como ortografía en un documento).
2. **Pruebas Unitarias** - Prueba cada función por separado (ej: "¿convierte correctamente grados Celsius?").
3. **Cobertura de Código** - Mide qué porcentaje del código está siendo probado.
4. **Análisis de Calidad** - Detecta código duplicado, bugs potenciales y problemas de seguridad.

**Herramientas:**
- **ESLint**: Revisa el estilo y calidad del código.
- **Vitest**: Ejecuta las pruebas unitarias.
- **SonarCloud**: Analiza la calidad del código y genera reportes detallados.

---

### 3️⃣ **Pruebas End-to-End (E2E)**
**¿Qué hace?** Simula a un usuario real usando la aplicación completa.

**Ejemplo:** Abre el navegador, busca "Santiago de Chile", verifica que aparezca el clima correctamente, hace clic en el mapa, prueba el botón "Limpiar", etc.

**Herramientas:**
- **Playwright**: Automatiza un navegador real para probar la aplicación como lo haría un usuario.

---

### 4️⃣ **Despliegue a Desarrollo (DEV)**
**¿Qué hace?** Publica la aplicación en un entorno de pruebas para desarrolladores.

**URL:** `https://mmiguel40.github.io/clima-app/dev/`

**Herramientas:**
- **Vite**: Compila y optimiza el código para producción.
- **GitHub Pages**: Aloja la aplicación en internet de forma gratuita.

---

### 5️⃣ **Smoke Tests en DEV** 🆕
**¿Qué hace?** Valida que el despliegue a DEV funcionó correctamente ejecutando pruebas rápidas.

**Datos de Prueba:** Santiago de Chile, Buenos Aires

**¿Por qué?** Detecta problemas de despliegue antes de avanzar a QA.

**Herramientas:**
- **Playwright**: Ejecuta pruebas E2E contra el sitio desplegado.

---

### 6️⃣ **Despliegue a QA (Control de Calidad)**
**¿Qué hace?** Publica en un entorno donde el equipo de QA puede hacer pruebas manuales.

**⏸️ REQUIERE APROBACIÓN MANUAL** - Un humano debe revisar y aprobar antes de continuar.

**URL:** `https://mmiguel40.github.io/clima-app/qa/`

**Herramientas:**
- **Vite**: Compila el código.
- **GitHub Pages**: Publica en un subdirectorio separado.
- **GitHub Environments**: Gestiona la aprobación manual.

---

### 7️⃣ **Smoke Tests en QA** 🆕
**¿Qué hace?** Valida que el despliegue a QA funcionó correctamente con datos diferentes a DEV.

**Datos de Prueba:** Madrid, Bogotá, Ciudad de México

**¿Por qué?** Prueba con ciudades que tienen acentos y caracteres especiales del español.

**Herramientas:**
- **Playwright**: Ejecuta pruebas E2E contra el sitio de QA.

---

### 8️⃣ **Despliegue a Producción (PROD)**
**¿Qué hace?** Publica la versión final que verán los usuarios reales.

**⏸️ REQUIERE APROBACIÓN MANUAL** - Doble verificación antes de publicar al público.

**URL:** `https://mmiguel40.github.io/clima-app/`

**Herramientas:**
- **Vite**: Compila el código optimizado.
- **GitHub Pages**: Publica en la URL principal.
- **GitHub Environments**: Gestiona la aprobación manual.

---

### 9️⃣ **Smoke Tests en PROD** 🆕
**¿Qué hace?** Valida que el despliegue a producción funcionó correctamente con datos globales.

**Datos de Prueba:** New York, Tokyo, São Paulo

**¿Por qué?** Prueba con ciudades de diferentes continentes para validación global.

**Herramientas:**
- **Playwright**: Ejecuta pruebas E2E contra el sitio de producción.

---

## 🔄 Flujo Completo

```
┌─────────────────────┐
│  Código Actualizado │
└──────────┬──────────┘
           │
           ▼
    ┌──────────────┐
    │ 1. API Check │ ✅ ¿Funciona la API externa?
    └──────┬───────┘
           │
           ▼
    ┌──────────────────┐
    │ 2. Calidad       │ ✅ ¿Código limpio y probado?
    │    & Unit Tests  │
    └──────┬───────────┘
           │
           ▼
    ┌──────────────┐
    │ 3. E2E Tests │ ✅ ¿Funciona la app completa?
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ 4. DEV       │ 🚀 Publicado automáticamente
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ 5. Smoke DEV │ ✅ Pruebas: Santiago, Buenos Aires
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ ⏸️  APROBAR  │ 👤 Revisión manual
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ 6. QA        │ 🚀 Publicado tras aprobación
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ 7. Smoke QA  │ ✅ Pruebas: Madrid, Bogotá, CDMX
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ ⏸️  APROBAR  │ 👤 Revisión manual final
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ 8. PROD      │ 🎉 ¡Disponible para usuarios!
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ 9. Smoke PROD│ ✅ Pruebas: NY, Tokyo, São Paulo
    └──────────────┘
```

---

## 🎯 Segregación de Datos de Prueba

Cada ambiente usa **datos diferentes** para validar escenarios variados:

| Ambiente | Ciudades de Prueba | Propósito |
|----------|-------------------|-----------|
| **DEV** | Santiago de Chile, Buenos Aires | Desarrollo con datos conocidos |
| **QA** | Madrid, Bogotá, Ciudad de México | Validación con acentos y caracteres especiales |
| **PROD** | New York, Tokyo, São Paulo | Cobertura global con ciudades internacionales |

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
| **Vitest** | Framework de pruebas unitarias |
| **Playwright** | Framework de pruebas E2E |
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

✅ **Detección temprana de errores** - Los bugs se encuentran antes de llegar a producción  
✅ **Calidad consistente** - Cada cambio pasa por las mismas verificaciones  
✅ **Despliegues seguros** - Aprobaciones manuales previenen errores críticos  
✅ **Validación post-deploy** - Smoke tests confirman que cada despliegue funcionó  
✅ **Segregación de datos** - Cada ambiente prueba con datos diferentes  
✅ **Trazabilidad** - Historial completo de qué se desplegó y cuándo  
✅ **Ahorro de tiempo** - Automatización de tareas repetitivas  

---

## 🧪 Comandos de Testing

```bash
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

---

**Última actualización:** Enero 2026
