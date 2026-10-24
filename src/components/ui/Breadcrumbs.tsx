import { Link } from 'react-router-dom'

import type { BreadcrumbItem } from '@/config/pages'

interface BreadcrumbsProps {
  items: readonly BreadcrumbItem[]
}

/**
 * Trilha de navegação acessível (nav + lista ordenada + aria-current). Os
 * mesmos itens, vindos de src/config/pages.ts, geram o schema BreadcrumbList
 * no <head> — a trilha visível e a marcada nunca divergem.
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Trilha de navegação">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-small text-muted">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1
          return (
            <li key={item.name} className="flex items-center gap-2">
              {isCurrent || !item.path ? (
                <span aria-current={isCurrent ? 'page' : undefined} className={isCurrent ? 'text-ink' : undefined}>
                  {item.name}
                </span>
              ) : (
                <Link to={item.path} className="transition-opacity duration-200 hover:opacity-70">
                  {item.name}
                </Link>
              )}
              {isCurrent ? null : <span aria-hidden="true">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
