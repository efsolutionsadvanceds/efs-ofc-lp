import { Link } from 'react-router-dom'

import { WhatsAppCta } from '@/components/conversion/WhatsAppCta'
import { textLinkStyles } from '@/components/ui/buttonStyles'
import { site } from '@/config/site'
import { cx } from '@/lib/cx'

interface SiteFooterProps {
  /** Reserva espaço para a barra de conversão fixa (só existe na home, no celular). */
  reserveBarSpace: boolean
}

/**
 * Fechamento da página, não um mapa do site: uma frase, poucos links e a
 * assinatura em tamanho display. Nome, telefone e país aparecem iguais aqui
 * e no schema LocalBusiness (consistência de NAP para SEO local).
 */
export function SiteFooter({ reserveBarSpace }: SiteFooterProps) {
  return (
    <footer
      className={cx(
        'frame pt-20 md:pt-28',
        reserveBarSpace ? 'pb-[calc(6.5rem+env(safe-area-inset-bottom))] md:pb-14' : 'pb-14',
      )}
    >
      <div className="grid gap-12 md:grid-cols-12 md:gap-6">
        <p className="max-w-[20em] text-lead md:col-span-6">
          Engenharia de software para empresas que querem vender mais e trabalhar melhor.
        </p>

        <nav aria-label="Rodapé" className="md:col-span-2 md:col-start-8">
          <ul className="flex flex-col gap-3">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={textLinkStyles}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex flex-col gap-3 md:col-span-3 md:col-start-10">
          <li>
            <WhatsAppCta location="footer" className={textLinkStyles}>
              WhatsApp {site.whatsapp.display}
            </WhatsAppCta>
          </li>
          <li>
            <Link to={site.legal.privacyHref} className={textLinkStyles}>
              Política de Privacidade
            </Link>
          </li>
          <li>
            <Link to={site.legal.termsHref} className={textLinkStyles}>
              Termos de Uso
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-20 flex flex-col gap-6 md:mt-28 md:flex-row md:items-end md:justify-between">
        <p aria-hidden="true" className="text-display">
          {site.name}
        </p>
        <p className="text-small text-muted">
          © {__BUILD_YEAR__} {site.legalName} · {site.tagline}
        </p>
      </div>
    </footer>
  )
}
