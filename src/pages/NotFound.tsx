import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { WhatsAppCta } from '@/components/conversion/WhatsAppCta'
import { Badge } from '@/components/ui/Badge'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { buttonArrowStyles, buttonStyles } from '@/components/ui/buttonStyles'
import { GridBackdrop } from '@/components/ui/GridBackdrop'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { pages } from '@/config/pages'
import { stagger } from '@/lib/stagger'

/**
 * 404 minimalista (noindex). No build vira `dist/404.html`, que o Vercel
 * entrega com status HTTP 404 real para qualquer endereço inexistente — sem
 * "soft 404" (página de erro respondendo 200), que prejudica o SEO.
 */
export default function NotFound() {
  return (
    <section aria-labelledby="nao-encontrada-titulo" className="relative isolate overflow-x-clip">
      <GridBackdrop />

      <div className="frame pt-8 pb-24 md:pt-12 md:pb-32">
        <Breadcrumbs items={pages.naoEncontrada.breadcrumbs} />

        <div className="mt-16 max-w-3xl md:mt-24">
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
        </div>
      </div>
    </section>
  )
}
