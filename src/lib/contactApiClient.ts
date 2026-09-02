import type { ContactRequestPayload } from '@/schemas/contactFormSchema'

export type ContactSubmitResult =
  | { status: 'success' }
  | { status: 'not-configured' }
  | { status: 'rejected'; message: string }
  | { status: 'network-error' }

/**
 * Envia o formulário para a API de contato. Nunca resolve como sucesso sem
 * uma confirmação explícita do servidor (`{ ok: true }`).
 */
export async function submitContactForm(payload: ContactRequestPayload): Promise<ContactSubmitResult> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (response.status === 503) {
      return { status: 'not-configured' }
    }

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { message?: string } | null
      return {
        status: 'rejected',
        message: data?.message ?? 'Não foi possível enviar sua solicitação. Tente novamente.',
      }
    }

    const data = (await response.json().catch(() => null)) as { ok?: boolean } | null
    if (data?.ok) {
      return { status: 'success' }
    }

    return { status: 'rejected', message: 'Não foi possível confirmar o envio. Tente novamente.' }
  } catch {
    return { status: 'network-error' }
  }
}
