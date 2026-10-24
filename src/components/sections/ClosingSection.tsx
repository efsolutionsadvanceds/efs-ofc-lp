import { useSelection } from '@/components/conversion/SelectionContext'
import { WhatsAppCta } from '@/components/conversion/WhatsAppCta'
import { buttonStyles, textLinkStyles } from '@/components/ui/buttonStyles'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { CLOSING_CTA_ID, SECTION_IDS } from '@/config/sections'
import { getSolutions } from '@/content/solutions'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { stagger } from '@/lib/stagger'

/**
 * Fechamento — o único momento centralizado da página. O botão usa a mesma
 * seleção da barra fixa (que se esconde enquanto este bloco está visível).
 */
export function ClosingSection() {
  const { ref, revealState } = useRevealOnScroll<HTMLElement>()
  const { selected } = useSelection()
  const summary = getSolutions(selected)
    .map((solution) => solution.shortLabel)
    .join(' · ')

  return (
    <section
      ref={ref}
      data-reveal={revealState}
      id={SECTION_IDS.closing}
      aria-labelledby="contato-titulo"
      className="section-space bg-surface"
    >
      <div className="frame flex flex-col items-center text-center">
        <h2 id="contato-titulo" data-reveal-item style={stagger(0)} className="max-w-[10em] text-display">
          Seu projeto começa com uma conversa.
        </h2>
        <p data-reveal-item style={stagger(1)} className="mt-8 max-w-[29em] text-lead">
          Envie sua seleção pelo WhatsApp. Respondemos com perguntas objetivas e, em seguida, uma proposta clara.
        </p>

        <div id={CLOSING_CTA_ID} data-reveal-item style={stagger(2)} className="mt-12 flex flex-col items-center gap-5">
          <WhatsAppCta location="closing" className={buttonStyles({ size: 'lg' })}>
            <WhatsAppIcon size={20} />
            {selected.length === 0 ? 'Falar no WhatsApp' : 'Enviar seleção pelo WhatsApp'}
          </WhatsAppCta>

          <p className="text-small text-muted">
            {selected.length === 0 ? (
              <>
                Ou{' '}
                <a href={`#${SECTION_IDS.solutions}`} className={textLinkStyles}>
                  escolha as soluções
                </a>{' '}
                antes de enviar.
              </>
            ) : (
              <>
                Sua seleção: {summary}.{' '}
                <a href={`#${SECTION_IDS.solutions}`} className={textLinkStyles}>
                  Editar
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  )
}
