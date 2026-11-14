import { X } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui/Badge'
import { buttonStyles, inlineLinkStyles } from '@/components/ui/buttonStyles'
import { site } from '@/config/site'
import type { ConsentChoice } from '@/lib/tracking'

import { useConsent } from './ConsentContext'

interface CategoryProps {
  title: string
  text: string
  children: ReactNode
}

function Category({ title, text, children }: CategoryProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 p-4">
      <div>
        <p className="text-small font-medium">{title}</p>
        <p className="mt-1 text-small text-muted">{text}</p>
      </div>
      {children}
    </div>
  )
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="group relative mt-0.5 grid size-6 shrink-0 cursor-pointer place-items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        aria-label={label}
        className="peer absolute inset-0 size-full cursor-pointer appearance-none rounded-[5px] ring-2 ring-muted/70 transition-[box-shadow] duration-200 checked:ring-accent focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none size-3.5 scale-[0.8] rounded-[3px] bg-accent opacity-0 transition-[scale,opacity] duration-200 ease-out peer-checked:scale-100 peer-checked:opacity-100"
      />
    </label>
  )
}

/**
 * Preferências por categoria, num <dialog> nativo (foco preso, Esc fecha,
 * leitor de tela anuncia o título). Abre pelo aviso, pelo rodapé e pela
 * Política de Cookies; mostra a escolha atual.
 */
export function CookiePreferences() {
  const { ready, consent, preferencesOpen, closePreferences, choose } = useConsent()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [draft, setDraft] = useState<ConsentChoice>({ analytics: false, marketing: false })

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (preferencesOpen && !dialog.open) {
      setDraft({ analytics: consent?.analytics ?? false, marketing: consent?.marketing ?? false })
      dialog.showModal()
    } else if (!preferencesOpen && dialog.open) {
      dialog.close()
    }
  }, [preferencesOpen, consent])

  if (!ready) return null

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="cookies-preferencias-titulo"
      onClose={closePreferences}
      // Clique fora do painel (no fundo escurecido) fecha.
      onClick={(event) => {
        if (event.target === event.currentTarget) closePreferences()
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(34rem,calc(100%-2rem))] overflow-y-auto rounded-2xl border border-white/10 bg-raised p-0 text-ink shadow-[0_32px_80px_-24px_rgb(0_0_0/0.9)] backdrop:bg-black/70 open:animate-[dialog-in_200ms_var(--ease-out)_both] motion-reduce:open:animate-[fade_150ms_ease_both]"
    >
      <form
        className="p-6 sm:p-8"
        onSubmit={(event) => {
          event.preventDefault()
          choose(draft)
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="cookies-preferencias-titulo" className="text-lead font-semibold">
            Preferências de cookies
          </h2>
          <button
            type="button"
            onClick={closePreferences}
            aria-label="Fechar"
            className="-mt-1 -mr-2 grid size-9 shrink-0 place-items-center rounded-md text-muted transition-[color,scale] duration-150 hover:text-ink active:scale-[0.97]"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>
        <p className="mt-2 text-small text-muted">
          Escolha o que o site pode usar. Dá para mudar quando quiser, pelo link no rodapé.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Category title="Necessários" text="Guardam a sua escolha sobre cookies neste navegador. Não identificam você.">
            <Badge className="mt-0.5">Sempre ativos</Badge>
          </Category>
          <Category
            title="Medição"
            text="Google Analytics 4: estatísticas agregadas de uso, como páginas visitadas, origem do acesso e cliques nos botões."
          >
            <Toggle
              label="Permitir cookies de medição"
              checked={draft.analytics}
              onChange={(analytics) => setDraft((current) => ({ ...current, analytics }))}
            />
          </Category>
          <Category title="Marketing" text="Meta Pixel: mede o resultado de anúncios no Facebook e no Instagram.">
            <Toggle
              label="Permitir cookies de marketing"
              checked={draft.marketing}
              onChange={(marketing) => setDraft((current) => ({ ...current, marketing }))}
            />
          </Category>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button type="submit" className={buttonStyles({ size: 'sm' })}>
            Salvar preferências
          </button>
          <button
            type="button"
            onClick={() => choose({ analytics: false, marketing: false })}
            className={buttonStyles({ variant: 'secondary', size: 'sm' })}
          >
            Recusar todos
          </button>
          <button
            type="button"
            onClick={() => choose({ analytics: true, marketing: true })}
            className={buttonStyles({ variant: 'secondary', size: 'sm' })}
          >
            Aceitar todos
          </button>
        </div>

        <p className="mt-5 text-micro text-muted">
          Detalhes na{' '}
          <Link to={site.legal.cookiesHref} onClick={closePreferences} className={inlineLinkStyles}>
            Política de Cookies
          </Link>
          .
        </p>
      </form>
    </dialog>
  )
}
