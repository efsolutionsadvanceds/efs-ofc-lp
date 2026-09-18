import type { VercelRequest, VercelResponse } from '@vercel/node'

import { handleContactRequest, resolveCorsOrigin } from '../server/contactHandler.js'

const MAX_BODY_BYTES = 20_000

function applySecurityHeaders(res: VercelResponse) {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Cache-Control', 'no-store')
}

function resolveClientIp(req: VercelRequest): string {
  const forwardedFor = req.headers['x-forwarded-for']
  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0]?.trim() ?? 'unknown'
  }
  return req.socket?.remoteAddress ?? 'unknown'
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  applySecurityHeaders(res)

  const allowedOrigin = resolveCorsOrigin(req.headers.origin)
  if (allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin)
    res.setHeader('Vary', 'Origin')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  }

  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, message: 'Método não permitido.' })
    return
  }

  const contentLength = Number(req.headers['content-length'] ?? 0)
  if (contentLength > MAX_BODY_BYTES) {
    res.status(413).json({ ok: false, message: 'Requisição excede o tamanho permitido.' })
    return
  }

  const userAgent = typeof req.headers['user-agent'] === 'string' ? req.headers['user-agent'] : undefined
  const result = await handleContactRequest({ body: req.body, ip: resolveClientIp(req), userAgent })
  res.status(result.statusCode).json(result.body)
}
