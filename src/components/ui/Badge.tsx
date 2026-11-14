import type { ReactNode } from 'react'

import { cx } from '@/lib/cx'

interface BadgeProps {
  children: ReactNode
  tone?: 'neutral' | 'accent'
  className?: string
}

/** Etiqueta compacta em fonte mono, com borda de 1px e cantos retos (sem pílula). */
export function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-micro whitespace-nowrap',
        tone === 'accent' ? 'border-accent/30 bg-accent/10 text-accent' : 'border-white/10 bg-white/[0.04] text-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}
