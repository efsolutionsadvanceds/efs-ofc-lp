import { cx } from '@/lib/cx'

interface GridBackdropProps {
  className?: string
}

/**
 * Grade técnica de 1px atrás do conteúdo, esmaecendo a partir do topo.
 * Puramente decorativa: gradientes CSS (zero bytes de imagem, não concorre
 * ao LCP) e fora da árvore de acessibilidade.
 */
export function GridBackdrop({ className }: GridBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className={cx(
        'bg-grid pointer-events-none absolute inset-0 -z-10',
        '[mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,#000_30%,transparent_78%)]',
        className,
      )}
    />
  )
}
