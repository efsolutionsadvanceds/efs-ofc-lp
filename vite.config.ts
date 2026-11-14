import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { loadEnv, type Plugin } from 'vite'
import { defineConfig } from 'vitest/config'

/**
 * Verificação de propriedade do Google Search Console (método "tag HTML"):
 * com `VITE_GOOGLE_SITE_VERIFICATION` definido, a meta entra no <head> de
 * todas as páginas no build. Sem a variável, nada é adicionado.
 *
 * O Google Analytics 4 e o Meta Pixel não entram mais no HTML: só carregam
 * no navegador, depois do consentimento de cookies (src/lib/tracking.ts).
 */
function googleSiteVerification(token: string | undefined): Plugin {
  return {
    name: 'efsolutions:google-site-verification',
    apply: 'build',
    transformIndexHtml() {
      if (!token) return []
      if (!/^[\w-]{10,100}$/.test(token)) {
        console.warn('[search-console] VITE_GOOGLE_SITE_VERIFICATION inválido: a meta de verificação não foi incluída.')
        return []
      }
      return [{ tag: 'meta', attrs: { name: 'google-site-verification', content: token }, injectTo: 'head' }]
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    plugins: [react(), tailwindcss(), googleSiteVerification(env.VITE_GOOGLE_SITE_VERIFICATION?.trim())],
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
