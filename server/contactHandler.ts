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

  const result = await dispatchContactNotification(payload)

  if (result.ok) {
    // Fire-and-forget: nunca deixa o rastreamento afetar a resposta ao usuário.
    void sendLeadEventToMetaCapi(payload, {
      eventId: payload.metaEventId ?? randomUUID(),
      clientIp: ip,
      userAgent,
    })
    return { statusCode: 200, body: { ok: true } }
  }

  if (result.reason === 'not-configured') {
    return { statusCode: 503, body: { ok: false, message: 'Canal de envio em configuração.' } }
  }

  return {
    statusCode: 502,
    body: { ok: false, message: 'Não foi possível enviar sua solicitação agora. Tente novamente em instantes.' },
  }
}
