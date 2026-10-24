/**
 * IDs das seções da landing page — usados nas âncoras do menu, nos
 * `aria-labelledby` e pela barra de conversão, que observa os grupos de CTA
 * do hero e do fechamento para não duplicar botões na tela.
 */
export const SECTION_IDS = {
  hero: 'inicio',
  services: 'servicos',
  solutions: 'solucoes',
  process: 'como-funciona',
  faq: 'duvidas',
  closing: 'contato',
} as const

export const HERO_CTA_ID = 'inicio-acoes'
export const CLOSING_CTA_ID = 'contato-acoes'
