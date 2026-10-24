/**
 * Script manual (não faz parte do bundle do navegador) que gera os
 * derivados da logo real a partir do arquivo-fonte
 * `public/assets/logo-efsolutions.jpeg`:
 *
 * - `public/assets/logo-symbol.png`: só o símbolo (circuito "EF") com fundo
 *   transparente — usado no header ao lado do nome em texto;
 * - favicons e ícones de app (símbolo sobre o fundo da marca — o nome por
 *   extenso fica ilegível em 16-48px, por isso fica de fora);
 * - `public/og-image.jpg` (1200x630): cartão de compartilhamento Open Graph
 *   para WhatsApp, LinkedIn etc. Composição centralizada, que sobrevive ao
 *   recorte quadrado que o WhatsApp aplica em prévias pequenas.
 *
 * Executar com `yarn assets`. Usa sharp + png-to-ico (devDependencies) —
 * nenhum dos dois entra no bundle de produção.
 */
const path = require('node:path')
const fs = require('node:fs')
const sharp = require('sharp')
const pngToIco = require('png-to-ico').default

const ROOT = path.resolve(__dirname, '..')
const SRC_LOGO = path.join(ROOT, 'public/assets/logo-efsolutions.jpeg')
const ASSETS_DIR = path.join(ROOT, 'public/assets')
const PUBLIC_DIR = path.join(ROOT, 'public')

/** Fundo da marca — mesmo valor de --color-ground em src/styles/app.css. */
const GROUND = { r: 13, g: 14, b: 17, alpha: 1 }

/** Fundo quase preto da logo-fonte e as duas "tintas" do desenho (medidos por amostragem). */
const SOURCE_BG = [18, 19, 23]
const INKS = [
  [244, 246, 246], // branco
  [24, 200, 200], // turquesa
]
/** Abaixo desta fração de tinta o pixel é só textura/ruído do fundo. */
const NOISE_FLOOR = 0.08
/** O símbolo fica acima desta linha na logo-fonte; abaixo dela estão o nome e a tagline. */
const SYMBOL_MAX_Y = 820

/**
 * Separa o desenho do fundo escuro: cada pixel é tratado como uma mistura
 * entre o fundo e uma das tintas — a fração da tinta vira o alpha e a cor
 * final é a tinta pura. Resultado: bordas suaves e sem halo escuro, em
 * qualquer cor de fundo.
 */
function keyOut(rgb, width, height) {
  const rgba = Buffer.alloc(width * height * 4)
  const inkVectors = INKS.map((ink) => {
    const v = ink.map((channel, index) => channel - SOURCE_BG[index])
    return { ink, v, lengthSq: v[0] ** 2 + v[1] ** 2 + v[2] ** 2 }
  })

  for (let i = 0, o = 0; i < rgb.length; i += 3, o += 4) {
    const d = [rgb[i] - SOURCE_BG[0], rgb[i + 1] - SOURCE_BG[1], rgb[i + 2] - SOURCE_BG[2]]
    let best = null
    for (const { ink, v, lengthSq } of inkVectors) {
      const amount = Math.min(1, Math.max(0, (d[0] * v[0] + d[1] * v[1] + d[2] * v[2]) / lengthSq))
      const residual = (d[0] - amount * v[0]) ** 2 + (d[1] - amount * v[1]) ** 2 + (d[2] - amount * v[2]) ** 2
      if (!best || residual < best.residual) best = { ink, amount, residual }
    }
    const alpha = best.amount < NOISE_FLOOR ? 0 : best.amount
    rgba[o] = best.ink[0]
    rgba[o + 1] = best.ink[1]
    rgba[o + 2] = best.ink[2]
    rgba[o + 3] = Math.round(alpha * 255)
  }
  return rgba
}

/** Menor retângulo com pixels visíveis dentro da faixa vertical informada. */
function contentBox(rgba, width, height, { maxY = height, threshold = 0.3 * 255, padding = 6 } = {}) {
  let left = width
  let top = height
  let right = -1
  let bottom = -1
  for (let y = 0; y < Math.min(maxY, height); y++) {
    for (let x = 0; x < width; x++) {
      if (rgba[(y * width + x) * 4 + 3] > threshold) {
        if (x < left) left = x
        if (x > right) right = x
        if (y < top) top = y
        if (y > bottom) bottom = y
      }
    }
  }
  left = Math.max(0, left - padding)
  top = Math.max(0, top - padding)
  right = Math.min(width - 1, right + padding)
  bottom = Math.min(height - 1, bottom + padding)
  return { left, top, width: right - left + 1, height: bottom - top + 1 }
}

function rawImage(rgba, width, height) {
  return sharp(rgba, { raw: { width, height, channels: 4 } })
}

async function squareIcon(symbolPng, size, paddingRatio) {
  const inner = Math.round(size * (1 - paddingRatio * 2))
  const symbol = await sharp(symbolPng).resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer()
  return sharp({ create: { width: size, height: size, channels: 4, background: GROUND } })
    .composite([{ input: symbol, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toBuffer()
}

async function main() {
  const { data, info } = await sharp(SRC_LOGO).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height } = info
  console.log(`Fonte: ${path.relative(ROOT, SRC_LOGO)} (${width}x${height})`)

  const keyed = keyOut(data, width, height)

  // 1) Símbolo transparente (header). 96px de altura = nítido até 3x em 32px.
  const symbolBox = contentBox(keyed, width, height, { maxY: SYMBOL_MAX_Y })
  const symbolMaster = await rawImage(keyed, width, height).extract(symbolBox).png().toBuffer()
  const symbolHeader = await sharp(symbolMaster).resize({ height: 96 }).png({ compressionLevel: 9, palette: true, quality: 95 }).toFile(path.join(ASSETS_DIR, 'logo-symbol.png'))
  console.log(`gerado: assets/logo-symbol.png (${symbolHeader.width}x${symbolHeader.height})`)

  // 2) Favicons e ícones de app.
  const pngBuffers = []
  for (const size of [16, 32, 48]) {
    const buffer = await squareIcon(symbolMaster, size, 0.06)
    pngBuffers.push(buffer)
    fs.writeFileSync(path.join(PUBLIC_DIR, `favicon-${size}x${size}.png`), buffer)
    console.log(`gerado: favicon-${size}x${size}.png`)
  }
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), await pngToIco(pngBuffers))
  console.log('gerado: favicon.ico (16, 32, 48px)')

  for (const [file, size, padding] of [
    ['apple-touch-icon.png', 180, 0.14],
    ['android-chrome-192x192.png', 192, 0.14],
    ['android-chrome-512x512.png', 512, 0.14],
  ]) {
    fs.writeFileSync(path.join(PUBLIC_DIR, file), await squareIcon(symbolMaster, size, padding))
    console.log(`gerado: ${file}`)
  }

  // 3) Imagem Open Graph 1200x630: logo completa (símbolo + nome + tagline) centralizada.
  const fullBox = contentBox(keyed, width, height)
  const fullLogo = await rawImage(keyed, width, height).extract(fullBox).resize({ height: 430 }).png().toBuffer()
  await sharp({ create: { width: 1200, height: 630, channels: 4, background: GROUND } })
    .composite([{ input: fullLogo, gravity: 'center' }])
    .flatten({ background: GROUND })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(PUBLIC_DIR, 'og-image.jpg'))
  console.log('gerado: og-image.jpg (1200x630)')

  console.log('\nConcluído.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
