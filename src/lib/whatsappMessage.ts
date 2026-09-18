import { HELP_TYPE_OPTIONS } from '@/content/formOptions'
import type { ContactFormValues } from '@/schemas/contactFormSchema'

function labelForHelpType(value: string): string {
  return HELP_TYPE_OPTIONS.find((option) => option.value === value)?.label ?? value
}

/**
 * Monta a mensagem pré-preenchida do WhatsApp a partir dos dados do
 * formulário — função pura, sem efeitos colaterais, para poder ser testada
 * isoladamente (acentos, quebras de linha, campos opcionais vazios).
 * A codificação da URL (uma única vez) é responsabilidade de quem consome
 * este texto (ver `site.whatsapp.buildUrl`, que usa `URLSearchParams`).
 */
export function buildLeadWhatsAppMessage(values: Pick<ContactFormValues, 'name' | 'company' | 'helpType' | 'description'>): string {
  const lines = [
    `Olá! Meu nome é ${values.name} e vim pelo site da E.F Solutions.`,
    values.company ? `Empresa: ${values.company}` : null,
    `Tipo de ajuda: ${labelForHelpType(values.helpType)}`,
    values.description ? `Descrição: ${values.description}` : null,
  ]

  return lines.filter((line): line is string => Boolean(line)).join('\n')
}
