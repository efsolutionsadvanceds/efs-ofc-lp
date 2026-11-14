import { formatBrazilianWhatsApp, normalizeBrazilianWhatsApp } from '@/lib/phone'

import { SECTION_IDS } from './sections'

/**
 * Configuração central da marca e dos canais de contato.
 *
 * Número de WhatsApp: já verificado a partir dos materiais reais da E.F
 * Solutions. Para trocar o número em produção sem editar código, defina
 * `VITE_WHATSAPP_NUMBER` (com DDI, ex.: "5511999999999") nas variáveis de
 * ambiente do provedor de hospedagem — o valor abaixo continua como
 * fallback caso a variável não esteja definida.
 */
const VERIFIED_WHATSAPP_DIGITS = '5511967873507'

const envWhatsAppDigits = normalizeBrazilianWhatsApp(import.meta.env.VITE_WHATSAPP_NUMBER ?? '')
const WHATSAPP_DIGITS = envWhatsAppDigits ?? VERIFIED_WHATSAPP_DIGITS

interface PostalAddress {
  addressCountry: string
  addressRegion?: string
  addressLocality?: string
  streetAddress?: string
  postalCode?: string
}

/**
 * Endereço usado no schema da empresa (ProfessionalService). Só o país é conhecido com certeza;
 * cidade, UF, rua e CEP ficam de fora até serem confirmados — nunca inventar.
 * O Google exige o endereço completo para exibir o painel de empresa local
 * nos resultados, então vale preencher assim que os dados reais existirem.
 */
const ADDRESS: PostalAddress = { addressCountry: 'BR' }

interface SocialProfile {
  label: string
  href: string | null
  confirmed: boolean
}

export const site = {
  name: 'E.F Solutions',
  legalName: 'E.F Solutions',
  tagline: 'Engenharia de software',
  domain: 'https://www.efsolutions.com.br',
  locale: 'pt-BR',
  description:
    'Criação de sites profissionais para empresas, desenvolvimento de sistemas de gestão sob medida, atendente virtual com IA no WhatsApp e otimização SEO para o Google.',
  whatsapp: {
    digits: WHATSAPP_DIGITS,
    display: formatBrazilianWhatsApp(WHATSAPP_DIGITS),
    e164: `+${WHATSAPP_DIGITS}`,
  },
  /** Âncoras da landing page — usadas no header e no rodapé. */
  nav: [
    { href: `/#${SECTION_IDS.services}`, label: 'Serviços' },
    { href: '/projetos', label: 'Projetos' },
    { href: '/conteudos', label: 'Conteúdos' },
    { href: '/sobre', label: 'Sobre' },
    { href: `/#${SECTION_IDS.faq}`, label: 'Dúvidas' },
  ],
  legal: {
    privacyHref: '/politica-de-privacidade',
    termsHref: '/termos-de-uso',
    cookiesHref: '/politica-de-cookies',
  },
  address: ADDRESS,
  /** Imagem de compartilhamento (Open Graph) — gerada por scripts/generate-brand-assets.cjs. */
  ogImage: {
    path: '/og-image.jpg',
    width: 1200,
    height: 630,
    type: 'image/jpeg',
    alt: 'E.F Solutions, engenharia de software',
  },
  /** Logo quadrada (≥112px) para o schema da empresa. */
  logoPath: '/android-chrome-512x512.png',
  /**
   * Perfis oficiais da E.F Solutions. Um perfil só aparece no rodapé e no
   * `sameAs` do schema depois de `confirmed: true`: publicar o perfil de
   * outra empresa por engano confundiria o Google sobre quem é a marca.
   * Para ativar, confira a URL exata e troque `confirmed` para `true`.
   */
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/efsolutions', confirmed: false },
    // Preencher com a URL da página da empresa no LinkedIn (ex.: https://www.linkedin.com/company/...).
    { label: 'LinkedIn', href: null, confirmed: false },
  ] as readonly SocialProfile[],
} as const

export type SiteConfig = typeof site

/** Perfis confirmados (com URL): os únicos publicados no rodapé e no schema. */
export function confirmedSocialProfiles(): { label: string; href: string }[] {
  return site.social.flatMap((profile) =>
    profile.confirmed && profile.href ? [{ label: profile.label, href: profile.href }] : [],
  )
}

/** Monta uma URL absoluta no domínio canônico a partir de um caminho ("/x"). */
export function absoluteUrl(path: string): string {
  return path === '/' ? `${site.domain}/` : `${site.domain}${path}`
}
