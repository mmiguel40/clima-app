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

**Ejemplo:** Abre el navegador, busca "Santiago", verifica que aparezca el clima, hace clic en el mapa, etc.

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

### 5️⃣ **Despliegue a QA (Control de Calidad)**
**¿Qué hace?** Publica en un entorno donde el equipo de QA puede hacer pruebas manuales.

**⏸️ REQUIERE APROBACIÓN MANUAL** - Un humano debe revisar y aprobar antes de continuar.

**URL:** `https://mmiguel40.github.io/clima-app/qa/`

**Herramientas:**
- **Vite**: Compila el código.
- **GitHub Pages**: Publica en un subdirectorio separado.
- **GitHub Environments**: Gestiona la aprobación manual.

---

### 6️⃣ **Despliegue a Producción (PROD)**
**¿Qué hace?** Publica la versión final que verán los usuarios reales.

**⏸️ REQUIERE APROBACIÓN MANUAL** - Doble verificación antes de publicar al público.

**URL:** `https://mmiguel40.github.io/clima-app/`

**Herramientas:**
- **Vite**: Compila el código optimizado.
- **GitHub Pages**: Publica en la URL principal.
- **GitHub Environments**: Gestiona la aprobación manual.

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
    │ ⏸️  APROBAR  │ 👤 Revisión manual
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ 5. QA        │ 🚀 Publicado tras aprobación
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ ⏸️  APROBAR  │ 👤 Revisión manual final
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ 6. PROD      │ 🎉 ¡Disponible para usuarios!
    └──────────────┘
```

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
✅ **Trazabilidad** - Historial completo de qué se desplegó y cuándo  
✅ **Ahorro de tiempo** - Automatización de tareas repetitivas  

---

## 🎯 ¿Cuándo se ejecuta?

El pipeline se activa automáticamente cuando:
- Se hace `push` a las ramas `main`, `develop` o `release/*`
- Se abre o actualiza un Pull Request
- Se ejecuta manualmente desde GitHub Actions

---

**Última actualización:** Enero 2026
