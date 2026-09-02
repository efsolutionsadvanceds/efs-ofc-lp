export interface SelectOption {
  value: string
  label: string
}

/** "Tipo de ajuda" — o que o visitante procura ao preencher o formulário do hero. */
export const HELP_TYPE_OPTIONS = [
  { value: 'site-ou-landing-page', label: 'Site ou landing page' },
  { value: 'sistema-sob-medida', label: 'Sistema sob medida' },
  { value: 'agente-de-ia', label: 'Agente de IA' },
  { value: 'trafego-pago', label: 'Tráfego pago' },
  { value: 'dominio-e-google', label: 'Domínio e presença no Google' },
  { value: 'ainda-nao-sei', label: 'Ainda não sei' },
] as const satisfies readonly SelectOption[]

export type HelpTypeValue = (typeof HELP_TYPE_OPTIONS)[number]['value']
