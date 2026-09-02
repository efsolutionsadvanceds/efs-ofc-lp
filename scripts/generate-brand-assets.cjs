/**
 * Script de build único (não integrado ao bundle do navegador) para gerar
 * variantes otimizadas da logo real e o pacote completo de favicons a partir
 * dela. Executado manualmente via `node scripts/generate-brand-assets.cjs`.
 * Usa sharp + png-to-ico (devDependencies) — nenhuma das duas entra no
 * bundle de produção, pois nada em src/ as importa.
 */
const path = require('node:path')
const fs = require('node:fs')
const sharp = require('sharp')
const pngToIco = require('png-to-ico').default

const ROOT = path.resolve(__dirname, '..')
const SRC_LOGO = path.join(ROOT, 'public/assets/logo-efsolutions.jpeg')
const ASSETS_DIR = path.join(ROOT, 'public/assets')
const PUBLIC_DIR = path.join(ROOT, 'public')

// Regiões de conteúdo medidas por varredura de pixels (ver investigação) —
// coordenadas absolutas na imagem-fonte de 1254x1254.
const MONOGRAM_SQUARE = { left: 173, top: 85, width: 900, height: 900 }
const HEADER_LOCKUP = { left: 221, top: 280, width: 804, height: 668 }
const FULL_LOGO = { left: 211, top: 270, width: 824, height: 744 }

async function main() {
  const base = sharp(SRC_LOGO)
  const meta = await base.metadata()
  console.log(`Fonte: ${SRC_LOGO} (${meta.width}x${meta.height}, ${meta.format})`)

  // 1) Marca quadrada (monograma) — mestre 512x512 para favicons, marca
  //    d'água do hero, âncora da seção de impacto e marca compacta do form.
  await sharp(SRC_LOGO)
    .extract(MONOGRAM_SQUARE)
    .resize(512, 512)
    .png({ quality: 92 })
    .toFile(path.join(ASSETS_DIR, 'logo-mark.png'))
  console.log('gerado: assets/logo-mark.png (512x512)')

  // 2) Lockup do header (monograma + "E.F Solutions", sem a tagline) —
  //    fonte generosa para nitidez em telas de alta densidade.
  const headerHeight = 200
  const headerWidth = Math.round((headerHeight * HEADER_LOCKUP.width) / HEADER_LOCKUP.height)
  await sharp(SRC_LOGO)
    .extract(HEADER_LOCKUP)
    .resize(headerWidth, headerHeight)
    .png({ quality: 92 })
    .toFile(path.join(ASSETS_DIR, 'logo-header.png'))
  console.log(`gerado: assets/logo-header.png (${headerWidth}x${headerHeight})`)

  // 3) Logo completa (monograma + wordmark + tagline), recortada apenas do
  //    excesso de fundo — para o rodapé.
  const fullWidth = 900
  const fullHeight = Math.round((fullWidth * FULL_LOGO.height) / FULL_LOGO.width)
  await sharp(SRC_LOGO)
    .extract(FULL_LOGO)
    .resize(fullWidth, fullHeight)
    .jpeg({ quality: 86 })
    .toFile(path.join(ASSETS_DIR, 'logo-full.jpg'))
  console.log(`gerado: assets/logo-full.jpg (${fullWidth}x${fullHeight})`)

  // 4) Pacote de favicons, todos derivados da marca quadrada.
  const markMaster = path.join(ASSETS_DIR, 'logo-mark.png')
  const faviconSizes = [16, 32, 48, 64, 128, 256]
  const pngBuffers = []
  for (const size of faviconSizes) {
    const buf = await sharp(markMaster).resize(size, size).png().toBuffer()
    pngBuffers.push(buf)
    if ([16, 32, 48].includes(size)) {
      fs.writeFileSync(path.join(PUBLIC_DIR, `favicon-${size}x${size}.png`), buf)
      console.log(`gerado: favicon-${size}x${size}.png`)
    }
  }
  await sharp(markMaster).resize(180, 180).png().toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'))
  console.log('gerado: apple-touch-icon.png (180x180)')
  await sharp(markMaster).resize(192, 192).png().toFile(path.join(PUBLIC_DIR, 'android-chrome-192x192.png'))
  console.log('gerado: android-chrome-192x192.png')
  await sharp(markMaster).resize(512, 512).png().toFile(path.join(PUBLIC_DIR, 'android-chrome-512x512.png'))
  console.log('gerado: android-chrome-512x512.png')

  const icoBuffer = await pngToIco(pngBuffers)
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), icoBuffer)
  console.log(`gerado: favicon.ico (contém ${faviconSizes.join(', ')}px)`)

  console.log('\nConcluído.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
