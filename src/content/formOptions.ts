export interface SelectOption {
  value: string
  label: string
}

/** "Qual solução procura?" — opções exibidas no formulário de contato. */
export const HELP_TYPE_OPTIONS = [
  { value: 'site-ou-landing-page', label: 'Criação de site ou landing page' },
  { value: 'loja-virtual', label: 'Loja virtual' },
  { value: 'sistema-personalizado', label: 'Sistema personalizado' },
  { value: 'automacao-whatsapp', label: 'Automação de WhatsApp' },
  { value: 'seo-e-divulgacao', label: 'SEO ou divulgação digital' },
  { value: 'ainda-nao-sei', label: 'Ainda não sei qual solução preciso' },
] as const satisfies readonly SelectOption[]

export type HelpTypeValue = (typeof HELP_TYPE_OPTIONS)[number]['value']
