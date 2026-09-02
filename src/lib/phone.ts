/** Mantém apenas dígitos de um valor digitado livremente. */
export function onlyDigits(value: string): string {
  return value.replace(/\D/g, '')
}

/**
 * Aceita um número de WhatsApp brasileiro digitado em qualquer formato comum
 * (com ou sem DDI 55, com ou sem parênteses/traço/espaços) e retorna os
 * dígitos normalizados com DDI, no formato "55DDNNNNNNNNN" (12 ou 13 dígitos).
 * Retorna `null` quando o valor não corresponde a um telefone brasileiro
 * plausível (DDD + 8 ou 9 dígitos).
 */
export function normalizeBrazilianWhatsApp(value: string): string | null {
  const digits = onlyDigits(value)

  let withCountryCode = digits
  if (!digits.startsWith('55') || (digits.length !== 12 && digits.length !== 13)) {
    if (digits.length === 10 || digits.length === 11) {
      withCountryCode = `55${digits}`
    }
  }

  if (withCountryCode.length !== 12 && withCountryCode.length !== 13) {
    return null
  }

  const ddd = withCountryCode.slice(2, 4)
  const localNumber = withCountryCode.slice(4)

  if (Number(ddd) < 11 || Number(ddd) > 99) return null
  if (localNumber.length !== 8 && localNumber.length !== 9) return null

  return withCountryCode
}

export function isValidBrazilianWhatsApp(value: string): boolean {
  return normalizeBrazilianWhatsApp(value) !== null
}

/** Formata os dígitos normalizados (com DDI) para exibição amigável. */
export function formatBrazilianWhatsApp(digits: string): string {
  const ddd = digits.slice(2, 4)
  const localNumber = digits.slice(4)
  const splitAt = localNumber.length - 4
  return `+55 (${ddd}) ${localNumber.slice(0, splitAt)}-${localNumber.slice(splitAt)}`
}
