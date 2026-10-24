import { CLOSING_CTA_ID, HERO_CTA_ID } from '@/config/sections'
import { describeSelectionCount, getSolutions } from '@/content/solutions'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { useElementInView } from '@/hooks/useElementInView'
import { cx } from '@/lib/cx'

import { useSelection } from './SelectionContext'
import { WhatsAppCta } from './WhatsAppCta'

/**
 * CTA fixo que agrega a seleção em tempo real e envia para o WhatsApp.
 * - Celular: barra de largura total colada à base da tela (respeita a área
 *   segura do iPhone). Desktop: cartão flutuante centralizado.
 * - Aparece quando os botões do hero saem da tela (ou assim que algo é
 *   selecionado) e some enquanto o CTA final está visível, para nunca haver
 *   dois botões iguais lado a lado.
 * - É `position: fixed` e entra só com transform/opacity: não desloca nenhum
 *   conteúdo (CLS zero). O rodapé reserva espaço para ela no celular.
 */
export function ConversionBar() {
  const { selected } = useSelection()
  const heroCtaInView = useElementInView(HERO_CTA_ID, true)
  const closingCtaInView = useElementInView(CLOSING_CTA_ID, false)

  const count = selected.length
  const isVisible = !closingCtaInView && (count > 0 || !heroCtaInView)
  const summary = getSolutions(selected)
    .map((solution) => solution.shortLabel)
    .join(' · ')

  return (
    <aside
      aria-label="Resumo do seu orçamento"
      inert={!isVisible}
      className={cx(
        'fixed z-40 flex items-center gap-4 border-t border-white/10 bg-raised text-ink md:border',
        'inset-x-0 bottom-0 px-(--gutter) pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-18px_40px_-12px_rgb(0_0_0/0.6)]',
        'md:inset-x-auto md:bottom-6 md:left-1/2 md:w-[min(42rem,calc(100%-2*var(--gutter)))] md:-translate-x-1/2 md:rounded-3xl md:py-3 md:pr-3 md:pl-6 md:shadow-[0_28px_64px_-20px_rgb(0_0_0/0.8)]',
        'transition-[translate,opacity] duration-500 ease-out-expo motion-reduce:transition-opacity',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[calc(100%+1.5rem)] opacity-0',
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="text-small text-muted">{count === 0 ? 'Orçamento sem compromisso' : describeSelectionCount(count)}</p>
        <p className="truncate text-body font-medium">{count === 0 ? 'Monte seu orçamento' : summary}</p>
      </div>

      <WhatsAppCta location="sticky_bar" className={buttonStyles({ size: 'md' })}>
        <WhatsAppIcon size={20} />
        <span className="md:hidden">{count === 0 ? 'WhatsApp' : 'Enviar'}</span>
        <span className="hidden md:inline">{count === 0 ? 'Falar no WhatsApp' : 'Enviar pelo WhatsApp'}</span>
      </WhatsAppCta>
    </aside>
  )
}
