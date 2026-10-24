import type { ReactNode } from 'react'

import { Badge } from '@/components/ui/Badge'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { GridBackdrop } from '@/components/ui/GridBackdrop'
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
    <article className="relative isolate overflow-x-clip">
      <GridBackdrop className="h-[28rem]" />

      <div className="frame pt-8 pb-24 md:pt-12 md:pb-32">
        {meta.breadcrumbs ? <Breadcrumbs items={meta.breadcrumbs} /> : null}

        <header className="mt-12 md:mt-16">
          <Badge>Atualizado em {updatedAt}</Badge>
          <h1 className="mt-6 max-w-[13.25em] text-title">{title}</h1>
        </header>

        <div className="mt-14 flex max-w-[45em] flex-col gap-12">{children}</div>
      </div>
    </article>
  )
}

interface LegalSectionProps {
  title: string
  children: ReactNode
}

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="border-t border-white/10 pt-10">
      <h2 className="text-lead font-semibold">{title}</h2>
      <div className="mt-4 flex flex-col gap-4 text-body text-ink/85">{children}</div>
    </section>
  )
}
