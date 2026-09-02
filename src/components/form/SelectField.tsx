import { AlertCircle } from 'lucide-react'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

import type { SelectOption } from '@/content/formOptions'

import { ErrorText, Field, Hint, Label, StyledSelect } from './formStyles'

interface SelectFieldProps {
  id: string
  label: string
  placeholder: string
  options: readonly SelectOption[]
  hint?: string
  registration: UseFormRegisterReturn
  error?: FieldError
}

export function SelectField({ id, label, placeholder, options, hint, registration, error }: SelectFieldProps) {
  const errorId = `${id}-error`
  const hintId = `${id}-hint`

  return (
    <Field>
      <Label htmlFor={id}>{label}</Label>
      <StyledSelect
        id={id}
        defaultValue=""
        aria-invalid={Boolean(error)}
        aria-describedby={[hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined}
        {...registration}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
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
