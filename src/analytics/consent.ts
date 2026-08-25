export type ConsentStatus = 'granted' | 'denied'

const CONSENT_STORAGE_KEY = 'efsa:analytics-consent'

/**
 * localStorage pode lançar em navegação privada/cookies bloqueados — nesses
 * casos a preferência simplesmente não persiste entre sessões, mas o site
 * continua funcionando normalmente.
 */
export function getStoredConsent(): ConsentStatus | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

export function storeConsent(status: ConsentStatus): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, status)
  } catch {
    // Armazenamento indisponível — nada a fazer, a escolha só não persiste.
  }
}
