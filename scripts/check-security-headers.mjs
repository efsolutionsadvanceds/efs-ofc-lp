#!/usr/bin/env node
/**
 * Verificador somente leitura de cabeçalhos de segurança de produção.
 *
 * Uso:
 *   node scripts/check-security-headers.mjs <url>
 *   yarn security:headers <url>
 *
 * Este script:
 * - não modifica nada, não faz deploy, não altera DNS ou configuração;
 * - exige uma URL explícita como argumento (nunca roda automaticamente);
 * - reporta em português quais cabeçalhos esperados estão presentes ou ausentes;
 * - NÃO prova que o site está completamente seguro — apenas confirma a
 *   presença/ausência dos cabeçalhos observados nesta checagem pontual.
 *
 * Não usa nenhuma dependência de terceiros (apenas módulos nativos do Node).
 */

import { request as httpRequest } from 'node:http'
import { request as httpsRequest } from 'node:https'

const EXPECTED_HEADERS = [
  {
    name: 'strict-transport-security',
    label: 'Strict-Transport-Security',
    recommendation: 'Habilitar HSTS somente após confirmar 100% do tráfego em HTTPS.',
  },
  {
    name: 'content-security-policy',
    label: 'Content-Security-Policy',
    recommendation: 'Validar primeiro em modo Report-Only antes de aplicar em bloqueio.',
  },
  {
    name: 'x-content-type-options',
    label: 'X-Content-Type-Options',
    recommendation: 'Valor esperado: "nosniff".',
  },
  {
    name: 'referrer-policy',
    label: 'Referrer-Policy',
    recommendation: 'Valor recomendado: "strict-origin-when-cross-origin".',
  },
  {
    name: 'permissions-policy',
    label: 'Permissions-Policy',
    recommendation: 'Restringir recursos não usados pelo site (câmera, microfone, geolocalização etc.).',
  },
  {
    name: 'x-frame-options',
    label: 'X-Frame-Options',
    recommendation: 'Defesa em profundidade; valor recomendado: "DENY".',
  },
]

function fetchHeaders(targetUrl) {
  return new Promise((resolvePromise, rejectPromise) => {
    const parsed = new URL(targetUrl)
    const requester = parsed.protocol === 'http:' ? httpRequest : httpsRequest

    const req = requester(
      {
        hostname: parsed.hostname,
        port: parsed.port || undefined,
        path: `${parsed.pathname}${parsed.search}`,
        method: 'GET',
        headers: { 'user-agent': 'efsa-security-headers-check/1.0 (somente leitura)' },
      },
      (res) => {
        resolvePromise({
          statusCode: res.statusCode ?? 0,
          headers: res.headers,
        })
        res.resume()
      },
    )

    req.on('error', rejectPromise)
    req.end()
  })
}

async function main() {
  const targetUrl = process.argv[2]

  if (!targetUrl) {
    console.error(
      'Uso: node scripts/check-security-headers.mjs <url>\n' +
        'Exemplo: node scripts/check-security-headers.mjs https://exemplo-de-producao.com.br',
    )
    process.exitCode = 1
    return
  }

  let parsedUrl
  try {
    parsedUrl = new URL(targetUrl)
  } catch {
    console.error(`URL inválida: ${targetUrl}`)
    process.exitCode = 1
    return
  }

  console.log(`Verificando cabeçalhos de: ${parsedUrl.href}\n`)

  if (parsedUrl.protocol === 'http:') {
    try {
      const httpResult = await fetchHeaders(parsedUrl.href)
      const location = httpResult.headers.location ?? ''
      const redirectsToHttps = location.startsWith('https://')
      console.log(
        redirectsToHttps
          ? '✅ A URL http:// redireciona para https://.'
          : '❌ A URL http:// NÃO parece redirecionar para https:// (verifique manualmente).',
      )
    } catch (error) {
      console.log(`⚠️  Não foi possível verificar o redirecionamento HTTP→HTTPS: ${error.message}`)
    }
    console.log('')
  }

  let result
  try {
    result = await fetchHeaders(parsedUrl.href)
  } catch (error) {
    console.error(`Falha ao acessar a URL informada: ${error.message}`)
    process.exitCode = 1
    return
  }

  console.log(`Status HTTP recebido: ${result.statusCode}\n`)
  console.log('Cabeçalhos de segurança esperados:\n')

  let missingCount = 0

  for (const expected of EXPECTED_HEADERS) {
    const value = result.headers[expected.name]
    if (value) {
      console.log(`✅ ${expected.label}: presente ("${value}")`)
    } else {
      missingCount += 1
      console.log(`❌ ${expected.label}: AUSENTE — ${expected.recommendation}`)
    }
  }

  console.log('')
  if (missingCount === 0) {
    console.log(
      '✅ Todos os cabeçalhos verificados estão presentes.\n' +
        'IMPORTANTE: isso confirma apenas a presença desses cabeçalhos nesta checagem pontual — ' +
        'não é uma prova de que o site está completamente seguro.',
    )
  } else {
    console.log(
      `⚠️  ${missingCount} cabeçalho(s) ausente(s). Consulte docs/PRODUCTION_SECURITY_HEADERS.md ` +
        'para a estratégia recomendada antes de aplicar em produção.',
    )
  }
}

main()
