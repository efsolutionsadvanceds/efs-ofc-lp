import './styles/app.css'

import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

const container = document.getElementById('root')
if (!container) {
  throw new Error('Elemento #root não encontrado no index.html')
}

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Em produção o HTML de cada rota já vem pré-renderizado (scripts/prerender.mjs)
// e o React apenas o hidrata. No `yarn dev` o #root chega vazio e a árvore é
// montada do zero.
if (container.firstElementChild) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
