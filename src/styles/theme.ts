const colors = {
  background: '#05070B',
  black: '#000000',
  surfaceDark: '#11161D',
  surfaceElevated: '#1A2029',
  metallicGray: '#7F8996',
  darkBlue: '#001F5B',
  gold: '#FDCF45',
  white: '#FFFFFF',
  textMuted: '#AAB2BF',
  borderSubtle: 'rgba(255, 255, 255, 0.12)',
  danger: '#FF8A8A',
} as const

const typography = {
  fontFamily: "'Inter Variable', 'Inter', system-ui, sans-serif",
  fontFamilyMono:
    "ui-monospace, 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '2.75rem',
    '4xl': '3.5rem',
  },
} as const

const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '6rem',
} as const

const radii = {
  sm: '4px',
  md: '8px',
  lg: '16px',
  full: '9999px',
} as const

const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.4)',
  md: '0 4px 12px rgba(0, 0, 0, 0.45)',
  lg: '0 12px 32px rgba(0, 0, 0, 0.5)',
} as const

const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const

const layout = {
  maxWidth: '1280px',
  readableWidth: '640px',
  gutterDesktop: spacing.xl,
  gutterMobile: spacing.md,
} as const

const zIndex = {
  base: 0,
  decorative: 0,
  content: 1,
  sticky: 20,
  header: 40,
  skipLink: 100,
} as const

const motion = {
  duration: {
    fast: 0.2,
    standard: 0.35,
    deliberate: 0.6,
  },
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
} as const

export const theme = {
  colors,
  typography,
  spacing,
  radii,
  shadows,
  breakpoints,
  layout,
  zIndex,
  motion,
}

export type AppTheme = typeof theme
