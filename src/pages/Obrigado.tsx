import { Link, useLocation } from 'react-router-dom'

import { buttonStyles } from '@/components/ui/buttonStyles'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { pages } from '@/config/pages'
import { getSolutions } from '@/content/solutions'
import { useHydrated } from '@/hooks/useHydrated'
import { trackEvent } from '@/lib/analytics'
import { stagger } from '@/lib/stagger'
import { readThankYouServices } from '@/lib/thankYouState'
import { buildLeadUrl } from '@/lib/whatsapp'

/**
 * Página de obrigado (noindex). Cada CTA de WhatsApp abre a conversa e traz
 * esta aba para cá — a URL /obrigado serve como meta de conversão no GA4 e
 * no Google Ads, e a página lembra o passo que falta: tocar em "enviar"
 * dentro do WhatsApp.
 *
 * A seleção chega por `history.state` (sobrevive a recarregar a página). Ela
 * só é lida depois da hidratação, para o HTML pré-renderizado e o primeiro
 * render do cliente serem idênticos.
 */
export default function Obrigado() {
  const location = useLocation()
  const hydrated = useHydrated()
  const services = hydrated ? readThankYouServices(location.state) : []
  const solutions = getSolutions(services)

  return (
    <section aria-labelledby="obrigado-titulo" className="frame pt-8 pb-24 md:pt-12 md:pb-32">
      <Breadcrumbs items={pages.obrigado.breadcrumbs} />

      <div className="mt-16 max-w-3xl md:mt-24">
        <h1 id="obrigado-titulo" className="text-display">
          Falta só enviar a mensagem.
        </h1>
        <p className="mt-8 max-w-[29em] text-lead">
          O WhatsApp foi aberto com a sua mensagem pronta. Confira o texto e toque em enviar — respondemos com os
          próximos passos.
        </p>

        {solutions.length > 0 ? (
          <div className="rise mt-12 rounded-3xl bg-surface p-6 sm:p-7" style={stagger(0)}>
            <p className="text-small text-muted">Sua seleção</p>
            <ul className="mt-3 flex flex-col gap-2 text-body">
              {solutions.map((solution) => (
                <li key={solution.id}>{solution.title}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="rise mt-12 flex flex-wrap items-center gap-x-8 gap-y-5" style={stagger(1)}>
          <a
            href={buildLeadUrl(services)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_reopen', { services_count: services.length })}
            className={buttonStyles({ size: 'lg' })}
          >
            <WhatsAppIcon size={20} />
            Abrir o WhatsApp novamente
          </a>
          <Link to="/" className={buttonStyles({ variant: 'secondary', size: 'lg' })}>
            Voltar ao início
          </Link>
        </div>
      </div>
    </section>
  )
}
