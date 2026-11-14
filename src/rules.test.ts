import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

/**
 * Regras inegociáveis verificadas no código-fonte (o HTML final é
 * verificado em entry-server.test.tsx): nenhuma cor roxa em lugar nenhum e
 * nenhum rastreamento carregado direto no HTML, antes do consentimento.
 */

const ROOT = fileURLToPath(new URL('..', import.meta.url))

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return sourceFiles(full)
    return /\.(tsx?|css)$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name) ? [full] : []
  })
}

const FILES = [...sourceFiles(path.join(ROOT, 'src')), path.join(ROOT, 'index.html')].map((file) => ({
  file: path.relative(ROOT, file),
  text: readFileSync(file, 'utf8'),
}))

/** Matiz (0 a 360), saturação e luminosidade (0 a 1) de uma cor RGB. */
function hsl(r: number, g: number, b: number) {
  const [red, green, blue] = [r / 255, g / 255, b / 255]
  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)
  const light = (max + min) / 2
  const delta = max - min
  if (delta === 0) return { hue: 0, sat: 0, light }
  const sat = delta / (1 - Math.abs(2 * light - 1))
  const hue =
    max === red ? 60 * (((green - blue) / delta) % 6) : max === green ? 60 * ((blue - red) / delta + 2) : 60 * ((red - green) / delta + 4)
  return { hue: (hue + 360) % 360, sat, light }
}

function isPurple(r: number, g: number, b: number): boolean {
  const { hue, sat, light } = hsl(r, g, b)
  return hue >= 255 && hue <= 320 && sat >= 0.25 && light >= 0.12 && light <= 0.9
}

function colorsIn(text: string): { literal: string; purple: boolean }[] {
  const found: { literal: string; purple: boolean }[] = []
  for (const [literal, hex = ''] of text.matchAll(/#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})\b/gi)) {
    const full = hex.length === 3 ? [...hex].map((c) => c + c).join('') : hex.slice(0, 6)
    const [r, g, b] = [0, 2, 4].map((i) => Number.parseInt(full.slice(i, i + 2), 16)) as [number, number, number]
    found.push({ literal, purple: isPurple(r, g, b) })
  }
  for (const [literal, r, g, b] of text.matchAll(/rgba?\(\s*(\d+)[\s,_]+(\d+)[\s,_]+(\d+)/g)) {
    found.push({ literal, purple: isPurple(Number(r), Number(g), Number(b)) })
  }
  for (const [literal, chroma, hue] of text.matchAll(/oklch\(\s*[\d.]+%?[\s_]+([\d.]+)[\s_]+([\d.]+)/g)) {
    found.push({ literal, purple: Number(chroma) > 0.05 && Number(hue) >= 270 && Number(hue) <= 340 })
  }
  return found
}

describe('regras inegociáveis no código-fonte', () => {
  it('nenhuma cor roxa (hex, rgb ou oklch)', () => {
    const purple = FILES.flatMap(({ file, text }) =>
      colorsIn(text)
        .filter((color) => color.purple)
        .map((color) => `${file}: ${color.literal}`),
    )
    expect(purple).toEqual([])
  })

  it('nenhuma classe ou nome de cor roxa', () => {
    const named = FILES.flatMap(({ file, text }) =>
      [...text.matchAll(/\b(?:purple|violet|fuchsia|indigo|lavender|magenta)\b/gi)].map((match) => `${file}: ${match[0]}`),
    )
    expect(named).toEqual([])
  })

  it('o detector reconhece roxo e não confunde o turquesa da marca', () => {
    expect(colorsIn('#7c3aed rgb(139 92 246)').every((color) => color.purple)).toBe(true)
    expect(colorsIn('#18c8c8 #09090b #fafafa rgb(24_200_200/0.16)').some((color) => color.purple)).toBe(false)
  })

  it('o HTML-base não carrega Google Analytics nem Meta Pixel (só depois do consentimento)', () => {
    const html = FILES.find(({ file }) => file === 'index.html')?.text ?? ''
    expect(html).not.toMatch(/googletagmanager|gtag\(|fbq\(|connect\.facebook\.net|facebook\.com\/tr/)
  })
})
