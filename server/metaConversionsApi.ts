import { createHash } from 'node:crypto'

import type { ContactRequestPayload } from '../src/schemas/contactFormSchema'
import { normalizeBrazilianWhatsApp } from '../src/lib/phone'

const GRAPH_API_VERSION = 'v21.0'
const SITE_URL = 'https://www.efsolutions.com.br/'

function sha256(value: string): string {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex')
}

export interface CapiContext {
  eventId: string
  clientIp: string
  userAgent?: string
}

/**
 * Envia o evento "Lead" para a Conversions API do Meta, como complemento
 * server-side ao Pixel do navegador (útil quando bloqueadores de anúncios ou
 * restrições de rastreamento do iOS impedem o Pixel de disparar). Usa o
 * mesmo `eventId` do Pixel para deduplicação no Events Manager.
 *
 * Nunca lança erro — falha de rede ou configuração ausente não deve afetar
 * a resposta do formulário de contato ao usuário. Silenciosamente ignorado
 * (`not-configured`) enquanto as variáveis de ambiente não estiverem
 * definidas.
 */
export async function sendLeadEventToMetaCapi(
  payload: ContactRequestPayload,
  context: CapiContext,
): Promise<{ ok: boolean; reason?: string }> {
  const pixelId = process.env.META_PIXEL_ID
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN

  if (!pixelId || !accessToken) {
    return { ok: false, reason: 'not-configured' }
  }

  const normalizedPhone = normalizeBrazilianWhatsApp(payload.whatsapp)

  try {
    const response = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_token: accessToken,
        data: [
          {
            event_name: 'Lead',
            event_time: Math.floor(Date.now() / 1000),
            event_id: context.eventId,
            action_source: 'website',
            event_source_url: SITE_URL,
            user_data: {
              // Nunca enviamos telefone em texto puro — apenas o hash SHA-256
              // exigido pela CAPI ("Advanced Matching").
              ph: normalizedPhone ? [sha256(normalizedPhone)] : undefined,
              client_ip_address: context.clientIp !== 'unknown' ? context.clientIp : undefined,
              client_user_agent: context.userAgent,
            },
          },
        ],
      }),
    })

    if (!response.ok) {
      console.error(`[meta-capi] Graph API respondeu com status ${response.status}`)
      return { ok: false, reason: 'dispatch-failed' }
    }

    return { ok: true }
  } catch (error) {
    console.error('[meta-capi] Falha de rede ao chamar a Conversions API', error)
    return { ok: false, reason: 'dispatch-failed' }
  }
}
