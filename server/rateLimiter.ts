/**
 * Limitador de taxa em memória, por IP, com janela deslizante. Como funções
 * serverless são efêmeras, isto é uma proteção "best-effort" contra abuso
 * casual — não substitui um limitador distribuído (Redis/Upstash) caso o
 * volume de tráfego venha a exigir um. Suficiente para o volume esperado de
 * um formulário de contato institucional.
 */

const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS_PER_WINDOW = 5

const hits = new Map<string, number[]>()

export function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (hits.get(ip) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS)

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    hits.set(ip, timestamps)
    return true
  }

  timestamps.push(now)
  hits.set(ip, timestamps)
  return false
}
