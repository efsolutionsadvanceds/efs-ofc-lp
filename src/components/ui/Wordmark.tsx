import logoSymbol from '@/assets/brand/logo-symbol.png'
import { cx } from '@/lib/cx'

/**
 * Dimensões reais do arquivo gerado por scripts/generate-brand-assets.cjs
 * (evitam CLS). Importado pelo Vite: o arquivo sai com hash no nome, então
 * o cache imutável de /assets nunca prende uma versão antiga da logo.
 */
const SYMBOL = { src: logoSymbol, width: 161, height: 96 }

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
