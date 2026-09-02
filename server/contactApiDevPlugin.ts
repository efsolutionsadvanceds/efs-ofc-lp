import type { Plugin } from 'vite'

import { handleContactRequest, resolveCorsOrigin } from './contactHandler'

const MAX_BODY_BYTES = 20_000

async function readJsonBody(req: import('http').IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = []
  let totalBytes = 0

  for await (const chunk of req) {
    const buffer = chunk as Buffer
    totalBytes += buffer.length
    if (totalBytes > MAX_BODY_BYTES) {
      throw new Error('PAYLOAD_TOO_LARGE')
    }
    chunks.push(buffer)
  }

  const raw = Buffer.concat(chunks).toString('utf-8')
  return raw ? JSON.parse(raw) : {}
}

/**
 * Middleware de desenvolvimento que reproduz a função serverless de
 * api/contact.ts durante `yarn dev`, já que o Vite não executa funções da
 * Vercel localmente. Permite testar o fluxo de contato ponta a ponta sem
 * depender de `vercel dev`.
 */
export function contactApiDevPlugin(): Plugin {
  return {
    name: 'ef-solutions-contact-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        res.setHeader('X-Content-Type-Options', 'nosniff')
        res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
        res.setHeader('Cache-Control', 'no-store')

        const origin = req.headers.origin
        const allowedOrigin = resolveCorsOrigin(Array.isArray(origin) ? origin[0] : origin)
        if (allowedOrigin) {
          res.setHeader('Access-Control-Allow-Origin', allowedOrigin)
          res.setHeader('Vary', 'Origin')
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        }

        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          res.end()
          return
        }

        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: false, message: 'Método não permitido.' }))
          return
        }

        try {
          const body = await readJsonBody(req)
          const forwardedFor = req.headers['x-forwarded-for']
          const ip =
            (typeof forwardedFor === 'string' ? forwardedFor.split(',')[0]?.trim() : undefined) ??
            req.socket.remoteAddress ??
            'unknown'

          const result = await handleContactRequest({ body, ip })
          res.statusCode = result.statusCode
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(result.body))
        } catch (error) {
          const isTooLarge = error instanceof Error && error.message === 'PAYLOAD_TOO_LARGE'
          res.statusCode = isTooLarge ? 413 : 400
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              ok: false,
              message: isTooLarge ? 'Requisição excede o tamanho permitido.' : 'Requisição inválida.',
            }),
          )
        }
      })
    },
  }
}
