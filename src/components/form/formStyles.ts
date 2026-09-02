import styled, { css } from 'styled-components'

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
`

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textOnDark};
`

export const Hint = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textOnDarkSubtle};
`

export const ErrorText = styled.p`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[1]};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gold};

  svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }
`

const inputBase = css`
  width: 100%;
  min-height: 44px;
  padding: ${({ theme }) => `${theme.space[3]} ${theme.space[4]}`};
  background: ${({ theme }) => theme.colors.navyAlpha(0.5)};
  border: 1px solid ${({ theme }) => theme.colors.borderOnDark};
  border-bottom: 2px solid ${({ theme }) => theme.colors.borderOnDark};
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.textOnDark};
  transition:
    border-bottom-color ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease},
    background-color ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textOnDarkSubtle};
  }

  &:focus {
    border-bottom-color: ${({ theme }) => theme.colors.gold};
    background: ${({ theme }) => theme.colors.navyAlpha(0.7)};
  }

  &[aria-invalid='true'] {
    border-bottom-color: ${({ theme }) => theme.colors.gold};
  }
`

export const StyledInput = styled.input`
  ${inputBase}
`

export const StyledTextArea = styled.textarea`
  ${inputBase}
  resize: none;
  min-height: 96px;
  transition:
    border-bottom-color ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease},
    background-color ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease},
    box-shadow ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease};

  /* Um pouco mais expressivo que o input padrão — glow dourado restrito à textarea. */
  &:focus {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.goldAlpha(0.14)};
  }
`

export const StyledSelect = styled.select`
  ${inputBase}
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, currentColor 50%),
    linear-gradient(135deg, currentColor 50%, transparent 50%);
  background-position:
    calc(100% - 20px) center,
    calc(100% - 15px) center;
  background-size:
    5px 5px,
    5px 5px;
  background-repeat: no-repeat;
`
