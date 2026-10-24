import type { ReactNode } from 'react'

import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import type { PageMeta } from '@/config/pages'

interface LegalPageProps {
  meta: PageMeta
  title: string
  updatedAt: string
  children: ReactNode
}

/** Estrutura comum das páginas de texto (Privacidade e Termos). */
export function LegalPage({ meta, title, updatedAt, children }: LegalPageProps) {
  return (
    <article className="frame pt-8 pb-24 md:pt-12 md:pb-32">
      {meta.breadcrumbs ? <Breadcrumbs items={meta.breadcrumbs} /> : null}

      <header className="mt-12 md:mt-16">
        <h1 className="max-w-[13.25em] text-title">{title}</h1>
        <p className="mt-4 text-small text-muted">Última atualização: {updatedAt}</p>
      </header>

      <div className="mt-14 flex max-w-[45em] flex-col gap-12">{children}</div>
    </article>
  )
}

interface LegalSectionProps {
  title: string
  children: ReactNode
}

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section>
      <h2 className="text-lead font-semibold">{title}</h2>
      <div className="mt-4 flex flex-col gap-4 text-body">{children}</div>
    </section>
  )
}
