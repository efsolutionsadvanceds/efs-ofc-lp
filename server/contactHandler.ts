import { randomUUID } from 'node:crypto'

import { contactRequestSchema } from '../src/schemas/contactFormSchema.js'
import { dispatchContactNotification } from './emailProvider.js'
import { sendLeadEventToMetaCapi } from './metaConversionsApi.js'
import { isRateLimited } from './rateLimiter.js'

const MIN_SUBMIT_MS = 1200

const DEV_ORIGINS = ['http://localhost:5173', 'http://127.0.0.1:5173']

export interface ContactHandlerRequest {
  body: unknown
  ip: string
  userAgent?: string
}

export interface ContactHandlerResponse {
  statusCode: number
  body: { ok: boolean; message?: string }
}

/** Resolve a origem autorizada a chamar a API, com base em ALLOWED_ORIGIN. */
export function resolveCorsOrigin(requestOrigin: string | undefined | null): string | null {
  if (!requestOrigin) return null

  const allowlist = (process.env.ALLOWED_ORIGIN ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)

  if (DEV_ORIGINS.includes(requestOrigin)) return requestOrigin
  if (allowlist.includes(requestOrigin)) return requestOrigin

  return null
}

/**
 * Núcleo da API de contato, independente de framework — reutilizado tanto
 * pela função serverless da Vercel (api/contact.ts) quanto pelo middleware
 * de desenvolvimento do Vite (server/contactApiDevPlugin.ts), para que o
 * comportamento seja idêntico em `yarn dev` e em produção.
 */
export async function handleContactRequest({
  body,
  ip,
  userAgent,
}: ContactHandlerRequest): Promise<ContactHandlerResponse> {
  if (isRateLimited(ip)) {
    return {
      statusCode: 429,
      body: { ok: false, message: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.' },
    }
  }

  const parsed = contactRequestSchema.safeParse(body)
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]
    return { statusCode: 400, body: { ok: false, message: firstIssue?.message ?? 'Dados inválidos.' } }
  }

  const payload = parsed.data

  if (payload.website) {
    return { statusCode: 400, body: { ok: false, message: 'Não foi possível processar sua solicitação.' } }
  }

  const elapsed = Date.now() - payload.formRenderedAt
  if (!Number.isFinite(elapsed) || elapsed < MIN_SUBMIT_MS) {
    return { statusCode: 400, body: { ok: false, message: 'Envio muito rápido. Tente novamente.' } }
  }

  // O WhatsApp é o canal principal de contato: o visitante deve ser
  // encaminhado a ele sempre que passar pela validação e pelas checagens
  // antibot acima, independentemente de haver (ou não) um provedor de
  // notificação por e-mail/webhook configurado. Por isso a notificação e o
  // evento da Conversions API são "fire-and-forget" — nunca bloqueiam nem
  // condicionam esta resposta.
  void dispatchContactNotification(payload)
  void sendLeadEventToMetaCapi(payload, {
    eventId: payload.metaEventId ?? randomUUID(),
    clientIp: ip,
    userAgent,
  })

  return { statusCode: 200, body: { ok: true } }
}
