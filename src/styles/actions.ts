import { css } from 'styled-components'

export const goldActionStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: 44px;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl};
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.black};
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  letter-spacing: 0.03em;
  text-decoration: none;
  cursor: pointer;
  transition:
    transform ${({ theme }) => theme.motion.duration.fast}s ${({ theme }) => theme.motion.easing},
    filter ${({ theme }) => theme.motion.duration.fast}s ${({ theme }) => theme.motion.easing},
    box-shadow ${({ theme }) => theme.motion.duration.fast}s ${({ theme }) => theme.motion.easing};

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.05);
    box-shadow: 0 12px 28px rgba(253, 207, 69, 0.28);
  }

  &:active {
    transform: translateY(0);
    filter: brightness(0.97);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    filter: none;
    box-shadow: none;
  }

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
`
