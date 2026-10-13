import styled, { css, keyframes } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 1px rgba(53, 230, 160, 0.5), 0 0 16px 2px rgba(53, 230, 160, 0.25); }
  50% { box-shadow: 0 0 0 1px rgba(53, 230, 160, 0.8), 0 0 30px 8px rgba(53, 230, 160, 0.45); }
`

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.textOnAccent};
    border: 1px solid ${({ theme }) => theme.colors.accent};
    animation: ${pulseGlow} 2.2s ease-in-out infinite;

    &:hover:not(:disabled) {
      background: #4eeab0;
      transform: translateY(-2px) scale(1.04);
    }

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  `,
  secondary: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.textOnDark};
    border: 1px solid ${({ theme }) => theme.colors.borderOnDarkStrong};

    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.accent};
      color: ${({ theme }) => theme.colors.accent};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.accent};
    border: 1px solid transparent;
    padding-inline: ${({ theme }) => theme.space[2]};

    &:hover:not(:disabled) {
      text-decoration: underline;
    }
  `,
} as const

export const Button = styled.button<{ $variant?: ButtonVariant; $fullWidth?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[2]};
  min-height: 44px;
  padding: ${({ theme }) => `${theme.space[3]} ${theme.space[6]}`};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-family: inherit;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  letter-spacing: 0.02em;
  text-transform: uppercase;
  white-space: nowrap;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  transition:
    transform ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease},
    box-shadow ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease},
    background-color ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease},
    border-color ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease},
    color ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease};

  ${({ $variant = 'primary' }) => variantStyles[$variant]}

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
