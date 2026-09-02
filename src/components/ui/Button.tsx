import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.textOnGold};
    border: 1px solid ${({ theme }) => theme.colors.gold};

    &:hover:not(:disabled) {
      background: #e0b562;
      box-shadow: ${({ theme }) => theme.shadows.gold};
    }
  `,
  secondary: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.textOnDark};
    border: 1px solid ${({ theme }) => theme.colors.borderOnDarkStrong};

    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.gold};
      color: ${({ theme }) => theme.colors.gold};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.gold};
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
  border-radius: ${({ theme }) => theme.radii.pill};
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  letter-spacing: 0.01em;
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
