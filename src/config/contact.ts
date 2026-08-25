const WHATSAPP_NUMBER = '5511967873507'

const WHATSAPP_MESSAGE =
  'Olá! Vim pelo site da E.F Solutions e quero entender qual solução pode gerar mais resultados para minha empresa.'

function buildWhatsAppUrl(message: string): string {
  const params = new URLSearchParams({ text: message })
  return `https://wa.me/${WHATSAPP_NUMBER}?${params.toString()}`
}

export const contact = {
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappMessage: WHATSAPP_MESSAGE,
  whatsappUrl: buildWhatsAppUrl(WHATSAPP_MESSAGE),
  buildWhatsAppUrl,
} as const

export type ContactConfig = typeof contact
