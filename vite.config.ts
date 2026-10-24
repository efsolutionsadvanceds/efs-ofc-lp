import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { loadEnv, type Plugin } from 'vite'
import { defineConfig } from 'vitest/config'

const GA_MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]{4,}$/

/**
 * Google Analytics 4 (gtag.js) injetado no <head> apenas no build de
 * produção e apenas quando `VITE_GA_MEASUREMENT_ID` tiver um ID válido
 * (G-XXXXXXXXXX). Sem a variável, nenhum script do Google é carregado — e o
 * `yarn dev` nunca envia dados para o relatório real.
 *
 * Page views: o `config` registra o primeiro carregamento; navegações
 * internas (ex.: ida à página de obrigado) são capturadas pela "Medição
 * otimizada" do GA4 (eventos de histórico do navegador), ativa por padrão.
 */
function googleAnalytics(measurementId: string | undefined): Plugin {
  return {
    name: 'efsolutions:google-analytics',
    apply: 'build',
    transformIndexHtml() {
      if (!measurementId) return []
      if (!GA_MEASUREMENT_ID_PATTERN.test(measurementId)) {
        console.warn(`[google-analytics] VITE_GA_MEASUREMENT_ID inválido ("${measurementId}") — GA4 não será incluído.`)
        return []
      }
      return [
        {
          tag: 'script',
          attrs: { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${measurementId}` },
          injectTo: 'head',
        },
        {
          tag: 'script',
          children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${measurementId}');`,
          injectTo: 'head',
        },
      ]
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    plugins: [react(), tailwindcss(), googleAnalytics(env.VITE_GA_MEASUREMENT_ID?.trim())],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    define: {
      __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
    },
    build: {
      target: 'es2020',
      sourcemap: false,
    },
    test: {
      environment: 'node',
      include: ['src/**/*.test.{ts,tsx}'],
    },
  }
})
