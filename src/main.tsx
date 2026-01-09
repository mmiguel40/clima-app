import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'



// Actualizar título dinámicamente según ambiente
const envLabel = import.meta.env.VITE_ENV_LABEL;
const baseTitle = 'Clima App';
document.title = envLabel ? `${baseTitle} - ${envLabel}` : baseTitle;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
