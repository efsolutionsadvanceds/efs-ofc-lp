import { cx } from '@/lib/cx'

/**
 * Classes dos botões — um único formato (cantos totalmente arredondados) e
 * preenchimento chapado. O retorno visual usa só opacity e transform:
 * hover acende uma camada (::before) por trás do texto e o clique comprime
 * levemente o botão. O foco usa o anel global de :focus-visible.
 *
 * Exposto como função (e não como componente) para servir igualmente a
 * <a>, <Link> e <button> sem `as` polimórfico.
 */

export type ButtonVariant = 'primary' | 'secondary'
export type ButtonSize = 'sm' | 'md' | 'lg'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-ink before:bg-ink/20',
  secondary: 'bg-surface text-ink before:bg-ink/[0.07]',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-small',
  md: 'h-12 px-5 text-body',
  lg: 'h-14 px-7 text-body',
}

export function buttonStyles({ variant = 'primary', size = 'md' }: { variant?: ButtonVariant; size?: ButtonSize } = {}) {
  return cx(
    'group/button relative isolate inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full font-medium whitespace-nowrap',
    'transition-transform duration-200 ease-out active:scale-[0.97]',
    'before:absolute before:inset-0 before:-z-10 before:rounded-full before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100',
    VARIANTS[variant],
    SIZES[size],
  )
}

/** Link dentro de texto corrido: sempre sublinhado, para não depender só da cor. */
export const inlineLinkStyles =
  'font-medium underline decoration-ink/40 decoration-1 underline-offset-4 transition-opacity duration-200 hover:opacity-70'

/** Link de texto com sublinhado que cresce no hover (scaleX). */
export const textLinkStyles = cx(
  'relative inline-flex items-center gap-2 font-medium',
  'after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-current',
  'after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 active:opacity-70',
)
