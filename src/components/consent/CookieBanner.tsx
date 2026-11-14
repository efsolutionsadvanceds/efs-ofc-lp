import { Link } from 'react-router-dom'

import { buttonStyles, inlineLinkStyles } from '@/components/ui/buttonStyles'
import { site } from '@/config/site'
import { cx } from '@/lib/cx'

import { useConsent } from './ConsentContext'

/**
 * Aviso de cookies: aparece até o visitante escolher. Aceitar e recusar têm
 * o mesmo peso visual e ficam a um toque (orientação da ANPD); o detalhe
 * por categoria fica em "Preferências". Não bloqueia a página.
 *
 * Fixo na base da tela (celular) ou no canto inferior esquerdo (desktop):
 * nunca desloca o conteúdo. A barra de conversão espera a escolha.
 */
export function CookieBanner() {
  const { bannerVisible, choose, openPreferences } = useConsent()
  if (!bannerVisible) return null

  return (
    <section
      aria-label="Aviso de cookies"
      className={cx(
        'fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-raised text-ink',
        'px-(--gutter) pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-18px_40px_-12px_rgb(0_0_0/0.6)]',
        'md:inset-x-auto md:bottom-6 md:left-6 md:w-[27rem] md:rounded-2xl md:border md:p-5 md:shadow-[0_28px_64px_-20px_rgb(0_0_0/0.8)]',
        'animate-[sheet-in_300ms_var(--ease-out)_both] motion-reduce:animate-[fade_200ms_ease_both]',
      )}
    >
      <p className="text-small text-ink/90">
        Usamos cookies de medição (Google Analytics) e de marketing (Meta Pixel) só se você permitir. Saiba mais na{' '}
        <Link to={site.legal.cookiesHref} className={inlineLinkStyles}>
          Política de Cookies
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => choose({ analytics: false, marketing: false })}
          className={buttonStyles({ variant: 'secondary', size: 'sm' })}
        >
          Recusar
        </button>
        <button
          type="button"
          onClick={() => choose({ analytics: true, marketing: true })}
          className={buttonStyles({ variant: 'secondary', size: 'sm' })}
        >
          Aceitar
        </button>
        <button
          type="button"
          onClick={openPreferences}
          className="h-10 rounded-md px-3 text-small text-muted underline decoration-muted/40 underline-offset-4 transition-colors duration-150 hover:text-ink"
        >
          Preferências
        </button>
      </div>
    </section>
  )
}
