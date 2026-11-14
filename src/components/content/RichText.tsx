import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { inlineLinkStyles } from '@/components/ui/buttonStyles'

const TOKEN = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g

/**
 * Texto dos artigos com a marcação mínima de src/content/articles.ts:
 * `[texto](/caminho)` vira link interno (navegação sem recarregar) e
 * `**texto**` vira destaque. Todo o resto é texto puro (sem HTML).
 */
export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = []
  let last = 0

  for (const match of text.matchAll(TOKEN)) {
    const index = match.index ?? 0
    if (index > last) parts.push(text.slice(last, index))
    const [whole, label, href, strong] = match
    if (label && href) {
      parts.push(
        <Link key={index} to={href} className={inlineLinkStyles}>
          {label}
        </Link>,
      )
    } else if (strong) {
      parts.push(
        <strong key={index} className="font-semibold text-ink">
          {strong}
        </strong>,
      )
    }
    last = index + whole.length
  }
  if (last < text.length) parts.push(text.slice(last))

  return <Fragment>{parts}</Fragment>
}
