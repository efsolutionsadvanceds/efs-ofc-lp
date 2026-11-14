import { useSelection } from '@/components/conversion/SelectionContext'
import { WhatsAppCta } from '@/components/conversion/WhatsAppCta'
import { buttonStyles, textLinkStyles } from '@/components/ui/buttonStyles'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { CLOSING_CTA_ID, SECTION_IDS } from '@/config/sections'
import { getSolutions } from '@/content/solutions'

/**
 * Fechamento em painel com grade e brilho. O botão usa a mesma seleção da
 * barra fixa (que se esconde enquanto este bloco está visível).
 */
interface ClosingSectionProps {
  /** Onde fica o seletor de soluções: na própria página (padrão) ou na home. */
  pickerHref?: string
}

export function ClosingSection({ pickerHref = `#${SECTION_IDS.solutions}` }: ClosingSectionProps) {
  const { selected } = useSelection()
  const summary = getSolutions(selected)
    .map((solution) => solution.shortLabel)
    .join(' · ')

  return (
    <section id={SECTION_IDS.closing} aria-labelledby="contato-titulo" className="frame section-space">
      <div className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-surface px-6 py-16 text-center sm:px-12 md:py-24">
        <div
          aria-hidden="true"
          className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_0%,#000_20%,transparent_75%)]"
        />
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -z-10 h-56 w-[min(40rem,90%)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-3xl"
        />

        <h2 id="contato-titulo" className="mx-auto max-w-[12em] text-display">
          Seu projeto começa <span className="text-muted">com uma conversa.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-[29em] text-lead text-ink/80">
          Envie sua seleção pelo WhatsApp. Respondemos com perguntas objetivas e, em seguida, uma proposta clara.
        </p>

        <div id={CLOSING_CTA_ID} className="mt-12 flex flex-col items-center gap-5">
          <WhatsAppCta location="closing" className={buttonStyles({ size: 'lg' })}>
            <WhatsAppIcon size={20} />
            {selected.length === 0 ? 'Falar no WhatsApp' : 'Enviar seleção pelo WhatsApp'}
          </WhatsAppCta>

          <p className="text-small text-muted">
            {selected.length === 0 ? (
              <>
                Ou{' '}
                <a href={pickerHref} className={textLinkStyles}>
                  escolha as soluções
                </a>{' '}
                antes de enviar.
              </>
            ) : (
              <>
                Sua seleção: {summary}.{' '}
                <a href={pickerHref} className={textLinkStyles}>
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
