import { cx } from '@/lib/cx'

/** Dimensões reais do arquivo gerado por scripts/generate-brand-assets.cjs (evitam CLS). */
const SYMBOL = { src: '/assets/logo-symbol.png', width: 161, height: 96 }

interface WordmarkProps {
  className?: string
}

/**
 * Assinatura da marca: símbolo do circuito "EF" (imagem leve, com fundo
 * transparente) + nome em texto real — nítido em qualquer densidade de tela
 * e legível por leitores de tela e buscadores.
 */
export function Wordmark({ className }: WordmarkProps) {
  return (
    <span className={cx('inline-flex items-center gap-3', className)}>
      <img src={SYMBOL.src} width={SYMBOL.width} height={SYMBOL.height} alt="" decoding="async" className="h-8 w-auto" />
      <span className="text-body font-semibold tracking-[-0.02em] whitespace-nowrap">E.F Solutions</span>
    </span>
  )
}
