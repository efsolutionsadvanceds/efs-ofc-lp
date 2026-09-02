import { AlertCircle } from 'lucide-react'
import type { ReactNode } from 'react'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import styled from 'styled-components'

import { ErrorText } from './formStyles'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
`

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space[3]};
`

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  min-width: 20px;
  margin-top: 2px;
  accent-color: ${({ theme }) => theme.colors.gold};
`

const ConsentText = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};

  a {
    color: ${({ theme }) => theme.colors.gold};
    text-decoration: underline;
  }
`

interface CheckboxFieldProps {
  id: string
  label: ReactNode
  registration: UseFormRegisterReturn
  error?: FieldError
}

export function CheckboxField({ id, label, registration, error }: CheckboxFieldProps) {
  const errorId = `${id}-error`

  return (
    <Wrapper>
      <Row>
        <Checkbox
          id={id}
          type="checkbox"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...registration}
        />
        <ConsentText htmlFor={id}>{label}</ConsentText>
      </Row>
      {error ? (
        <ErrorText id={errorId} role="alert">
          <AlertCircle aria-hidden="true" />
          {error.message}
        </ErrorText>
      ) : null}
    </Wrapper>
  )
}
