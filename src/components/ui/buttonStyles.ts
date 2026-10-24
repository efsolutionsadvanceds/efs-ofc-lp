import { cx } from '@/lib/cx'

/**
 * Classes dos botões — formato pílula. Micro-interações:
 * - hover: uma camada (::before) acende por trás do texto; no primário, um
 *   brilho turquesa desfocado (::after) surge em volta do botão;
 * - clique: o botão comprime levemente (scale);
 * - foco: anel global de :focus-visible.
 *
 * Exposto como função (e não como componente) para servir igualmente a
 * <a>, <Link> e <button> sem `as` polimórfico.
 */

export type ButtonVariant = 'primary' | 'secondary'
export type ButtonSize = 'sm' | 'md' | 'lg'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: cx(
    'bg-accent text-accent-ink before:bg-white/25',
    'after:absolute after:-inset-1 after:-z-20 after:rounded-full after:bg-accent/60 after:opacity-0 after:blur-lg',
    'after:transition-opacity after:duration-300 hover:after:opacity-70',
  ),
  secondary: 'border border-white/10 bg-white/[0.03] text-ink before:bg-white/[0.06]',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-small',
  md: 'h-12 px-5 text-body',
  lg: 'h-13 px-6 text-body',
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

/** Seta que avança alguns pixels no hover do botão (usar dentro de buttonStyles). */
export const buttonArrowStyles =
  'size-4 transition-transform duration-300 ease-out-expo group-hover/button:translate-x-0.5'

/** Link dentro de texto corrido: sempre sublinhado, para não depender só da cor. */
export const inlineLinkStyles =
  'font-medium underline decoration-ink/40 decoration-1 underline-offset-4 transition-opacity duration-200 hover:opacity-70'

/** Link de texto com sublinhado que cresce no hover (scaleX). */
export const textLinkStyles = cx(
  'relative inline-flex items-center gap-2 font-medium',
  'after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-current',
  'after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 active:opacity-70',
)

/** Link discreto de navegação (header/rodapé): cinza que acende no hover. */
export const navLinkStyles = 'text-muted transition-colors duration-200 hover:text-ink active:opacity-70'
