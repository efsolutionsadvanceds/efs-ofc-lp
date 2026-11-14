import { describe, expect, it } from 'vitest'

import { buildLlmsTxt } from './llms'

describe('llms.txt', () => {
  const llms = buildLlmsTxt()

  it('segue o formato do llmstxt.org: título, resumo e seções com links', () => {
    expect(llms.startsWith('# E.F Solutions\n\n> ')).toBe(true)
    expect(llms).toContain('\n## Serviços\n')
    expect(llms).toContain('\n## Criação de sites por cidade\n')
  })

  it('todos os links são absolutos e no domínio oficial', () => {
    const urls = [...llms.matchAll(/\]\(([^)]+)\)/g)].map((match) => match[1])
    expect(urls.length).toBeGreaterThan(18)
    for (const url of urls) expect(url).toMatch(/^https:\/\/www\.efsolutions\.com\.br\//)
  })

  it('sem travessões nem emoji', () => {
    expect(llms).not.toMatch(/[–—]/)
    expect(llms).not.toMatch(/\p{Extended_Pictographic}/u)
  })
})
