import { AlertCircle } from 'lucide-react'
import { useState, type ChangeEvent } from 'react'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import styled from 'styled-components'

import { ErrorText, Field, Hint, Label, StyledTextArea } from './formStyles'

interface TextAreaFieldProps {
  id: string
  label: string
  placeholder?: string
  hint?: string
  optional?: boolean
  maxLength?: number
  registration: UseFormRegisterReturn
  error?: FieldError
}

const HintRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};
`

const Counter = styled.span<{ $isNearLimit: boolean }>`
  flex-shrink: 0;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme, $isNearLimit }) =>
    $isNearLimit ? theme.colors.gold : theme.colors.textOnDarkSubtle};
  font-variant-numeric: tabular-nums;
`

/**
 * Envelope só para posicionar o pequeno traço de destaque à esquerda — não
 * altera o tamanho da textarea, então não há salto de layout ao focar.
 */
const TextAreaShell = styled.div`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: -1px;
    top: ${({ theme }) => theme.space[2]};
    bottom: ${({ theme }) => theme.space[2]};
    width: 3px;
    border-radius: ${({ theme }) => theme.radii.pill};
    background: ${({ theme }) => theme.colors.borderOnDark};
    transform: translateX(0);
    transition:
      background-color ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease},
      transform ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease};
  }

  &:focus-within::before {
    background: ${({ theme }) => theme.colors.gold};
    transform: translateX(2px);
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      transition: none;
    }
  }
`

export function TextAreaField({
  id,
  label,
  placeholder,
  hint,
  optional = false,
  maxLength,
  registration,
  error,
}: TextAreaFieldProps) {
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const [charCount, setCharCount] = useState(0)

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setCharCount(event.target.value.length)
    void registration.onChange(event)
  }

  return (
    <Field>
      <Label htmlFor={id}>
        {label} {optional ? <span aria-hidden="true">(opcional)</span> : null}
      </Label>
      <TextAreaShell>
        <StyledTextArea
          id={id}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={[hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined}
          aria-required={!optional}
          maxLength={maxLength}
          rows={4}
          {...registration}
          onChange={handleChange}
        />
      </TextAreaShell>
      <HintRow>
        {hint ? <Hint id={hintId}>{hint}</Hint> : <span />}
        {maxLength ? (
          <Counter $isNearLimit={charCount > maxLength * 0.9} aria-hidden="true">
            {charCount}/{maxLength}
          </Counter>
        ) : null}
      </HintRow>
      {error ? (
        <ErrorText id={errorId} role="alert">
          <AlertCircle aria-hidden="true" />
          {error.message}
        </ErrorText>
      ) : null}
    </Field>
  )
}
