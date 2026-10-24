import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { WhatsAppCta } from '@/components/conversion/WhatsAppCta'
import { navLinkStyles } from '@/components/ui/buttonStyles'
import { Wordmark } from '@/components/ui/Wordmark'
import { site } from '@/config/site'
import { cx } from '@/lib/cx'

interface SiteFooterProps {
  /** Reserva espaço para a barra de conversão fixa (só existe na home, no celular). */
  reserveBarSpace: boolean
}

function FooterColumn({ title, className, children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <p className="font-mono text-micro text-muted">{title}</p>
      <ul className="mt-4 flex flex-col gap-3 text-small">{children}</ul>
    </div>
  )
}

/**
 * Rodapé em colunas, separado por bordas de 1px. Nome, telefone e país
 * aparecem iguais aqui e no schema LocalBusiness (consistência de NAP para
 * SEO local).
 */
export function SiteFooter({ reserveBarSpace }: SiteFooterProps) {
  return (
    <footer
      className={cx(
        'border-t border-white/10',
        reserveBarSpace && 'pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-0',
      )}
    >
      <div className="frame grid grid-cols-1 gap-12 py-14 md:grid-cols-12 md:gap-6 md:py-16">
        <div className="md:col-span-5">
          <Link
            to="/"
            aria-label={`${site.name} — página inicial`}
            className="-m-2 inline-flex rounded-xl p-2 transition-opacity duration-200 hover:opacity-80"
          >
            <Wordmark />
          </Link>
          <p className="mt-5 max-w-[24em] text-small text-muted">
            Criação de sites profissionais, sistemas sob medida e atendimento virtual com IA para empresas de todo o
            Brasil.
          </p>
        </div>

        <FooterColumn title="Navegação" className="md:col-span-2 md:col-start-7">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className={navLinkStyles}>
                {item.label}
              </a>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Contato" className="md:col-span-2">
          <li>
            <WhatsAppCta location="footer" className={navLinkStyles}>
              WhatsApp {site.whatsapp.display}
            </WhatsAppCta>
          </li>
          <li className="text-muted">Atendimento em todo o Brasil</li>
        </FooterColumn>

        <FooterColumn title="Legal" className="md:col-span-2">
          <li>
            <Link to={site.legal.privacyHref} className={navLinkStyles}>
              Política de Privacidade
            </Link>
          </li>
          <li>
            <Link to={site.legal.termsHref} className={navLinkStyles}>
              Termos de Uso
            </Link>
          </li>
        </FooterColumn>
      </div>

      <div className="border-t border-white/10">
        <div className="frame flex flex-col gap-2 py-6 font-mono text-micro text-muted sm:flex-row sm:justify-between">
          <p>
            © {__BUILD_YEAR__} {site.legalName}. Todos os direitos reservados.
          </p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
