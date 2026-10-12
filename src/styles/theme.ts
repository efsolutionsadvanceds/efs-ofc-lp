/**
 * Design tokens — identidade "Premium Neon Corporate": fundo azul-marinho
 * profundo quase preto, superfícies em grafite, e dois acentos usados com
 * moderação (azul elétrico para profundidade/links, verde neon reservado a
 * CTAs e destaques principais — nunca os dois ao mesmo tempo no mesmo
 * elemento). `offWhite` é o texto primário sobre fundo escuro.
 */

const colors = {
  navy: '#070B14',
  graphite: '#182338',
  offWhite: '#F2F5FC',
  accentBlue: '#4C8DFF',
  accent: '#35E6A0',

  // Tons sólidos derivados do navy (navy + grafite) — usados onde uma cor
  // sólida opaca é necessária (cartões sobre imagens, por exemplo).
  surface: '#0C1830',
  surfaceElevated: '#182338',

  // Variações alfa das cores-base — usar estas para bordas, overlays e
  // texto com opacidade controlada em vez de introduzir cinza.
  navyAlpha: (alpha: number) => `rgba(7, 11, 20, ${alpha})`,
  accentAlpha: (alpha: number) => `rgba(53, 230, 160, ${alpha})`,
  accentBlueAlpha: (alpha: number) => `rgba(76, 141, 255, ${alpha})`,
  offWhiteAlpha: (alpha: number) => `rgba(242, 245, 252, ${alpha})`,

  textOnDark: '#F2F5FC',
  textOnDarkMuted: 'rgba(242, 245, 252, 0.72)',
  textOnDarkSubtle: 'rgba(242, 245, 252, 0.52)',
  textOnLight: '#070B14',
  textOnLightMuted: 'rgba(7, 11, 20, 0.68)',
  textOnAccent: '#070B14',

  borderOnDark: 'rgba(151, 176, 215, 0.18)',
  borderOnDarkStrong: 'rgba(151, 176, 215, 0.3)',
  borderAccent: 'rgba(53, 230, 160, 0.45)',
  borderOnLight: 'rgba(7, 11, 20, 0.12)',

  success: '#35E6A0',
  danger: '#FF6B6B',
} as const

const breakpoints = {
  xs: 360,
  sm: 430,
  md: 768,
  lg: 1024,
  xl: 1366,
  xxl: 1440,
  xxxl: 1920,
} as const

const fontStack =
  "'Manrope Variable', Manrope, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

const fontSizes = {
  xs: 'clamp(0.75rem, 0.71rem + 0.2vw, 0.8125rem)',
  sm: 'clamp(0.875rem, 0.83rem + 0.2vw, 0.9375rem)',
  base: 'clamp(1rem, 0.95rem + 0.25vw, 1.0625rem)',
  md: 'clamp(1.125rem, 1.05rem + 0.35vw, 1.25rem)',
  lg: 'clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)',
  xl: 'clamp(1.5rem, 1.3rem + 0.9vw, 1.875rem)',
  '2xl': 'clamp(1.875rem, 1.6rem + 1.3vw, 2.375rem)',
  '3xl': 'clamp(2.25rem, 1.85rem + 2vw, 3rem)',
  '4xl': 'clamp(2.75rem, 2.1rem + 3vw, 3.75rem)',
  '5xl': 'clamp(3.25rem, 2.3rem + 4.5vw, 4.75rem)',
} as const

const space = {
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
} as const

const radii = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  pill: '999px',
}

const shadows = {
  sm: '0 2px 8px rgba(7, 11, 20, 0.18)',
  md: '0 8px 24px rgba(7, 11, 20, 0.24)',
  lg: '0 16px 40px rgba(7, 11, 20, 0.32)',
  accent: '0 6px 20px rgba(53, 230, 160, 0.25)',
}

const layout = {
  maxWidth: '1280px',
  readingWidth: '65ch',
  gutter: 'clamp(1.25rem, 4vw, 3rem)',
  /** Altura real do header fixo (SiteHeader) — igual em mobile e desktop (Row min-height 72px + borda de 1px). */
  headerHeight: '73px',
}

const zIndex = {
  base: 0,
  decorative: 1,
  content: 2,
  stickyElement: 10,
  header: 100,
  mobileMenu: 200,
  skipLink: 300,
}

const motion = {
  durationFast: '200ms',
  durationBase: '550ms',
  durationSlow: '700ms',
  stagger: 80,
  ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
}

export const theme = {
  colors,
  breakpoints,
  fontStack,
  fontSizes,
  space,
  radii,
  shadows,
  layout,
  zIndex,
  motion,
} as const

export type Theme = typeof theme
