/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WHATSAPP_NUMBER?: string
  readonly VITE_GA_MEASUREMENT_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/** Ano do build, injetado pelo Vite (`define` em vite.config.ts) — usado no copyright do rodapé. */
declare const __BUILD_YEAR__: number
