import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Manrope Variable';
    src: url('/fonts/manrope-variable.woff2') format('woff2-variations'),
      url('/fonts/manrope-variable.woff2') format('woff2');
    font-weight: 400 800;
    font-style: normal;
    font-display: swap;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
    /* Mantém o alvo de qualquer âncora interna (#id) visível abaixo do
       header fixo — mesma altura em mobile e desktop, ver theme.layout.headerHeight. */
    scroll-padding-top: calc(${({ theme }) => theme.layout.headerHeight} + ${({ theme }) => theme.space[4]});
  }

  body {
    margin: 0;
    min-height: 100dvh;
    background: ${({ theme }) => theme.colors.navy};
    color: ${({ theme }) => theme.colors.textOnDark};
    font-family: ${({ theme }) => theme.fontStack};
    font-size: ${({ theme }) => theme.fontSizes.base};
    line-height: 1.6;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
  }

  #root {
    isolation: isolate;
  }

  img,
  picture,
  svg {
    max-width: 100%;
    display: block;
  }

  h1,
  h2,
  h3,
  h4 {
    margin: 0;
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.01em;
  }

  p {
    margin: 0;
  }

  ul,
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    color: inherit;
    background: none;
    border: none;
    cursor: pointer;
  }

  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
    border-radius: 4px;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.textOnGold};
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-delay: 0ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      transition-delay: 0ms !important;
      scroll-behavior: auto !important;
    }
  }
`
