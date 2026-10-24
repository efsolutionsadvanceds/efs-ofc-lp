import { Link } from 'react-router-dom'

import { WhatsAppCta } from '@/components/conversion/WhatsAppCta'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { buttonStyles } from '@/components/ui/buttonStyles'
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
    <section aria-labelledby="nao-encontrada-titulo" className="frame pt-8 pb-24 md:pt-12 md:pb-32">
      <Breadcrumbs items={pages.naoEncontrada.breadcrumbs} />

      <div className="mt-16 max-w-3xl md:mt-24">
        <h1 id="nao-encontrada-titulo" className="text-display">
          Esta página não existe.
        </h1>
        <p className="mt-8 max-w-[26.5em] text-lead">
          O endereço pode ter mudado ou sido digitado incorretamente. Que tal voltar ao início?
        </p>

        <div className="rise mt-12 flex flex-wrap items-center gap-x-8 gap-y-5" style={stagger(0)}>
          <Link to="/" className={buttonStyles({ size: 'lg' })}>
            Voltar ao início
          </Link>
          <WhatsAppCta location="not_found" className={buttonStyles({ variant: 'secondary', size: 'lg' })}>
            <WhatsAppIcon size={20} />
            Falar no WhatsApp
          </WhatsAppCta>
        </div>
      </div>
    </section>
  )
}
