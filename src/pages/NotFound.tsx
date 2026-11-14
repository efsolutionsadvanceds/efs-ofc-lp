import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { WhatsAppCta } from '@/components/conversion/WhatsAppCta'
import { Badge } from '@/components/ui/Badge'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { buttonArrowStyles, buttonStyles, navLinkStyles } from '@/components/ui/buttonStyles'
import { GridBackdrop } from '@/components/ui/GridBackdrop'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { Vector404 } from '@/components/vectors/Vector404'
import { pages } from '@/config/pages'
import { SECTION_IDS } from '@/config/sections'
import { CITIES_HUB_PATH } from '@/content/cityIndex'
import { stagger } from '@/lib/stagger'

/** Atalhos para os destinos mais procurados. */
const SHORTCUTS = [
  { href: `/#${SECTION_IDS.services}`, label: 'Serviços' },
  { href: `/#${SECTION_IDS.solutions}`, label: 'Montar orçamento' },
  { href: CITIES_HUB_PATH, label: 'Sites por cidade' },
  { href: `/#${SECTION_IDS.faq}`, label: 'Dúvidas frequentes' },
]

/**
 * 404 (noindex). No build vira `dist/404.html`, que o Vercel entrega com
 * status HTTP 404 real para qualquer endereço inexistente — sem "soft 404"
 * (página de erro respondendo 200), que prejudica o SEO. O "404" em matriz
 * de pontos segue a linguagem dos vetores do site.
 */
export default function NotFound() {
  return (
    <section aria-labelledby="nao-encontrada-titulo" className="relative isolate overflow-x-clip">
      <GridBackdrop />

      <div className="frame pt-8 pb-24 md:pt-12 md:pb-32">
        <Breadcrumbs items={pages.naoEncontrada.breadcrumbs} />

        <div className="mt-16 grid grid-cols-1 items-center gap-16 md:mt-24 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Badge>Erro 404</Badge>
            <h1 id="nao-encontrada-titulo" className="mt-6 text-display">
              Esta página <span className="text-muted">não existe.</span>
            </h1>
            <p className="mt-8 max-w-[26.5em] text-lead text-ink/80">
              O endereço pode ter mudado ou sido digitado incorretamente. Que tal voltar ao início?
            </p>

            <div className="rise mt-12 flex flex-wrap items-center gap-3" style={stagger(0)}>
              <Link to="/" className={buttonStyles({ size: 'lg' })}>
                Voltar ao início
                <ArrowRight aria-hidden="true" className={buttonArrowStyles} />
              </Link>
              <WhatsAppCta location="not_found" className={buttonStyles({ variant: 'secondary', size: 'lg' })}>
                <WhatsAppIcon size={20} />
                Falar no WhatsApp
              </WhatsAppCta>
            </div>

            <nav aria-label="Atalhos" className="rise mt-12" style={stagger(1)}>
              <p className="font-mono text-micro text-muted">Talvez você procure</p>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-small">
                {SHORTCUTS.map((item) => (
                  <li key={item.href}>
                    {item.href.startsWith('/#') ? (
                      <a href={item.href} className={navLinkStyles}>
                        {item.label}
                      </a>
                    ) : (
                      <Link to={item.href} className={navLinkStyles}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <Vector404 />
          </div>
        </div>
      </div>
    </section>
  )
}
