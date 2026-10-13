import { formatBrazilianWhatsApp, normalizeBrazilianWhatsApp } from '@/lib/phone'

/**
 * Configuração central da marca e dos canais de contato.
 *
 * Número de WhatsApp: já verificado a partir dos materiais reais da E.F
 * Solutions. Para trocar o número em produção sem editar código, defina
 * `VITE_WHATSAPP_NUMBER` (com DDI, ex.: "5511999999999") nas variáveis de
 * ambiente do provedor de hospedagem — o valor abaixo continua como
 * fallback caso a variável não esteja definida. Se algum dia o fallback
 * precisar mudar, este é o único lugar a editar.
 */
const VERIFIED_WHATSAPP_DIGITS = '5511967873507'

const envWhatsAppDigits = normalizeBrazilianWhatsApp(import.meta.env.VITE_WHATSAPP_NUMBER ?? '')
const WHATSAPP_DIGITS = envWhatsAppDigits ?? VERIFIED_WHATSAPP_DIGITS
const WHATSAPP_DISPLAY = formatBrazilianWhatsApp(WHATSAPP_DIGITS)

const DEFAULT_WHATSAPP_MESSAGE =
  'Olá! Vim pelo site da E.F Solutions e quero entender qual solução pode ajudar minha empresa.'

function buildWhatsAppUrl(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  const params = new URLSearchParams({ text: message })
  return `https://wa.me/${WHATSAPP_DIGITS}?${params.toString()}`
}

export const site = {
  name: 'E.F Solutions',
  legalName: 'E.F Solutions',
  domain: 'https://www.efsolutions.com.br',
  locale: 'pt-BR',
  positioning: 'Criação de sites, sistemas, automações e divulgação digital para o seu negócio.',
  whatsapp: {
    digits: WHATSAPP_DIGITS,
    display: WHATSAPP_DISPLAY,
    defaultMessage: DEFAULT_WHATSAPP_MESSAGE,
    buildUrl: buildWhatsAppUrl,
    url: buildWhatsAppUrl(),
    /** Falso apenas se o número resolvido ficar vazio — protege contra publicar um link quebrado. */
    isConfigured: WHATSAPP_DIGITS.length > 0,
  },
  nav: [
    { href: '/', label: 'Início' },
    { href: '/solucoes', label: 'Soluções' },
    { href: '/contato', label: 'Contato' },
  ],
  services: [
    { href: '/solucoes#sites', label: 'Criação de sites' },
    { href: '/solucoes#sistemas', label: 'Sistemas personalizados' },
    { href: '/solucoes#automacao', label: 'Automação de WhatsApp' },
    { href: '/solucoes#divulgacao', label: 'SEO e divulgação digital' },
  ],
  legal: {
    privacyHref: '/privacidade',
    termsHref: '/termos',
  },
  /**
   * Redes sociais reais da E.F Solutions — propositalmente vazio. Nenhum
   * perfil foi confirmado ainda; preencher aqui assim que os handles reais
   * forem informados (não inventar URLs). A página de contato só renderiza
   * a linha de redes sociais quando este array tiver itens.
   */
  social: [] as readonly { label: string; href: string; icon: 'instagram' | 'linkedin' | 'tiktok' | 'facebook' }[],
} as const

export type SiteConfig = typeof site
