import { describe, expect, it } from 'vitest'

import { CITY_CONTENT } from './cities'
import { CITY_INDEX } from './cityIndex'

/** As 15 cidades aprovadas para a primeira fase. */
const APPROVED = [
  'São Paulo',
  'Campinas',
  'Guarulhos',
  'São Bernardo do Campo',
  'Santo André',
  'Osasco',
  'Sorocaba',
  'Ribeirão Preto',
  'São José dos Campos',
  'Barueri',
  'Santos',
  'Jundiaí',
  'São José do Rio Preto',
  'Piracicaba',
  'Mogi das Cruzes',
]

function shingles(text: string): Set<string> {
  const words = text.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []
  const set = new Set<string>()
  for (let i = 0; i + 3 <= words.length; i++) set.add(words.slice(i, i + 3).join(' '))
  return set
}

function jaccard(a: Set<string>, b: Set<string>): number {
  let shared = 0
  for (const item of a) if (b.has(item)) shared++
  return shared / (a.size + b.size - shared)
}

describe('cidades', () => {
  it('são exatamente as 15 cidades aprovadas, com slugs únicos e em minúsculas', () => {
    expect(CITY_INDEX.map((city) => city.name)).toEqual(APPROVED)
    const slugs = CITY_INDEX.map((city) => city.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) expect(slug).toMatch(/^[a-z]+(-[a-z]+)*$/)
  })

  it('cada cidade tem description própria, de até 160 caracteres, que cita a cidade', () => {
    const descriptions = CITY_INDEX.map((city) => city.description)
    expect(new Set(descriptions).size).toBe(descriptions.length)
    for (const city of CITY_INDEX) {
      expect(city.description.length).toBeLessThanOrEqual(160)
      expect(city.description).toContain(city.name)
    }
  })

  it('as cidades próximas existem e nunca apontam para a própria página', () => {
    for (const city of CITY_INDEX) {
      const { nearby } = CITY_CONTENT[city.slug]
      expect(nearby.length).toBeGreaterThanOrEqual(3)
      expect(nearby).not.toContain(city.slug)
      expect(new Set(nearby).size).toBe(nearby.length)
    }
  })

  it('o texto próprio de cada cidade não se repete entre as páginas', () => {
    const texts = CITY_INDEX.map((city) => {
      const content = CITY_CONTENT[city.slug]
      const text = [
        content.intro,
        content.summary,
        ...content.context,
        ...content.sectors.flatMap((sector) => [sector.name, sector.text]),
        ...content.faq.flatMap((item) => [item.question, item.answer]),
      ].join(' ')
      // Sem o nome da cidade: um texto-modelo com o nome trocado daria semelhança ~1.
      return shingles(text.replaceAll(city.name, 'CIDADE'))
    })

    let highest = 0
    for (let a = 0; a < texts.length; a++) {
      for (let b = a + 1; b < texts.length; b++) highest = Math.max(highest, jaccard(texts[a]!, texts[b]!))
    }
    // Medido em nov/2026: máximo 0,054, média 0,016 (um modelo com o nome trocado daria 1).
    expect(highest).toBeLessThan(0.1)
  })
})
