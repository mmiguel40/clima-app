# 🌦️ Clima App - Buscador de Clima y Mapas

Aplicación web moderna para consultar el clima de cualquier ciudad del mundo con visualización en mapa interactivo.

## ✨ Características

- 🔍 **Búsqueda de ciudades** - Encuentra cualquier ciudad del mundo
- 🌡️ **Datos meteorológicos en tiempo real** - Temperatura, viento y condiciones actuales
- 🗺️ **Mapa interactivo** - Visualización con Leaflet y capas de satélite
- 🌐 **Multilenguaje** - Interfaz y datos en español
- 📱 **Diseño responsivo** - Funciona en desktop y móvil
- 🎨 **UI moderna** - Glassmorphism y animaciones suaves

## 🚀 Tecnologías

- **React 18** + **TypeScript** - Framework y tipado
- **Vite** - Build tool ultrarrápido
- **Leaflet** + **React-Leaflet** - Mapas interactivos
- **Open-Meteo API** - Datos meteorológicos gratuitos
- **Vitest** - Testing unitario
- **Playwright** - Testing E2E
- **ESLint** - Linting de código
- **SonarCloud** - Análisis de calidad

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

```bash
# Tests unitarios
npm run test

# Tests E2E
npm run test:e2e

# Linting
npm run lint

# Build de producción
npm run build
```

## 🌍 Despliegues

La aplicación está desplegada en GitHub Pages con tres entornos:

- **Desarrollo**: https://mmiguel40.github.io/clima-app/dev/
- **QA**: https://mmiguel40.github.io/clima-app/qa/
- **Producción**: https://mmiguel40.github.io/clima-app/

## 🔄 CI/CD Pipeline

El proyecto cuenta con un pipeline automatizado que incluye:

1. ✅ Verificación de salud de API
2. ✅ Linting y tests unitarios
3. ✅ Tests E2E con Playwright
4. ✅ Análisis de calidad con SonarCloud
5. ✅ Despliegue automático a Dev/QA/Prod

Ver [PIPELINE.md](./PIPELINE.md) para más detalles.

## 📝 Estructura del Proyecto

```
clima-app/
├── src/
│   ├── components/      # Componentes React
│   ├── services/        # Servicios de API
│   └── App.tsx          # Componente principal
├── e2e/                 # Tests End-to-End
├── .github/workflows/   # Pipeline de CI/CD
└── public/              # Assets estáticos
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👤 Autor

**Miguel Miguel**
- GitHub: [@mmiguel40](https://github.com/mmiguel40)

---

**Última actualización:** Enero 2026
