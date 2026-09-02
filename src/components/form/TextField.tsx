import { AlertCircle } from 'lucide-react'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

import { ErrorText, Field, Hint, Label, StyledInput } from './formStyles'

interface TextFieldProps {
  id: string
  label: string
  type?: 'text' | 'tel'
  placeholder?: string
  hint?: string
  autoComplete?: string
  inputMode?: 'text' | 'tel' | 'numeric'
  tabIndex?: number
  registration: UseFormRegisterReturn
  error?: FieldError
}

export function TextField({
  id,
  label,
  type = 'text',
  placeholder,
  hint,
  autoComplete,
  inputMode,
  tabIndex,
  registration,
  error,
}: TextFieldProps) {
  const errorId = `${id}-error`
  const hintId = `${id}-hint`

  return (
    <Field>
      <Label htmlFor={id}>{label}</Label>
      <StyledInput
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        tabIndex={tabIndex}
        aria-invalid={Boolean(error)}
        aria-describedby={[hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined}
        {...registration}
      />
      {hint ? <Hint id={hintId}>{hint}</Hint> : null}
      {error ? (
        <ErrorText id={errorId} role="alert">
          <AlertCircle aria-hidden="true" />
          {error.message}
        </ErrorText>
      ) : null}
    </Field>
  )
}
