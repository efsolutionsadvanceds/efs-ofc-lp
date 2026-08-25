import { useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { MessageCircle } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import styled from 'styled-components'
import { contact } from '../../config/contact'
import { priorityOptions, segmentOptions } from '../../data/conversionForm'
import { goldActionStyles } from '../../styles/actions'
import { buildViewportRevealProps } from '../../utils/motionPresets'
import { SignalConvergence } from '../visuals/SignalConvergence'
import {
  ContentWrapper,
  Eyebrow,
  SectionContainer,
  SectionHeading,
  SectionIntro,
  SectionParagraph,
} from './sectionPrimitives'

const NAME_MAX = 80
const COMPANY_MAX = 100
const CONTEXT_MAX = 500

interface FormValues {
  nome: string
  empresa: string
  segmento: string
  prioridade: string
  contexto: string
}

interface FormErrors {
  nome?: string
  empresa?: string
  segmento?: string
  prioridade?: string
}

const initialValues: FormValues = {
  nome: '',
  empresa: '',
  segmento: '',
  prioridade: '',
  contexto: '',
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.nome.trim()) errors.nome = 'Informe o seu nome.'
  if (!values.empresa.trim()) errors.empresa = 'Informe o nome da empresa.'
  if (!values.segmento) errors.segmento = 'Selecione o segmento principal.'
  if (!values.prioridade) errors.prioridade = 'Selecione a prioridade mais importante neste momento.'

  return errors
}

function buildWhatsAppFormMessage(values: FormValues): string {
  const contexto = values.contexto.trim() || 'Não informado'

  return [
    'Olá! Vim pelo site da EFSA e gostaria de conversar sobre o meu cenário.',
    '',
    `Nome: ${values.nome.trim()}`,
    `Empresa: ${values.empresa.trim()}`,
    `Segmento: ${values.segmento}`,
    `Principal prioridade: ${values.prioridade}`,
    `Contexto: ${contexto}`,
    '',
    'Gostaria de entender qual solução faz mais sentido para a minha empresa.',
  ].join('\n')
}

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing['2xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: minmax(320px, 0.8fr) minmax(0, 1.2fr);
    gap: clamp(${({ theme }) => theme.spacing.xl}, 4vw, ${({ theme }) => theme.spacing['3xl']});
    align-items: start;
  }
`

const VisualColumn = styled.div`
  max-width: ${({ theme }) => theme.layout.readableWidth};
  width: 100%;
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: none;
    margin: 0;
    position: sticky;
    top: ${({ theme }) => theme.spacing['4xl']};
    z-index: ${({ theme }) => theme.zIndex.sticky};
  }
`

const FormColumn = styled.div`
  max-width: ${({ theme }) => theme.layout.readableWidth};
  width: 100%;
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: none;
    margin: 0;
  }
`

const FormShell = styled.div`
  position: relative;
  overflow: hidden;
  padding: clamp(${({ theme }) => theme.spacing.lg}, 4vw, ${({ theme }) => theme.spacing['2xl']});
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.surfaceElevated},
    ${({ theme }) => theme.colors.surfaceDark}
  );
  box-shadow: ${({ theme }) => theme.shadows.sm};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.22), transparent);
  }
`

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const FieldBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const FieldLabelRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`

const FieldLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.white};
`

const FieldNote = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.metallicGray};
`

const fieldStyles = `
  min-height: 44px;
  padding: 0.625rem 0.875rem;
  font-family: inherit;
`

const TextInput = styled.input`
  ${fieldStyles}
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceDark};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.sizes.sm};

  &[aria-invalid='true'] {
    border-color: ${({ theme }) => theme.colors.danger};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 2px;
  }
`

const SelectInput = styled.select`
  ${fieldStyles}
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceDark};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.sizes.sm};

  &[aria-invalid='true'] {
    border-color: ${({ theme }) => theme.colors.danger};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 2px;
  }
`

const TextArea = styled.textarea`
  min-height: 120px;
  max-height: 320px;
  padding: 0.75rem 0.875rem;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceDark};
  color: ${({ theme }) => theme.colors.white};
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  line-height: 1.5;
  resize: vertical;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 2px;
  }
`

const CharCounter = styled.span`
  align-self: flex-end;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.metallicGray};
`

const ErrorText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.danger};
`

const FieldsetBlock = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: 0;
  padding: 0;
  border: 0;
`

const Legend = styled.legend`
  padding: 0;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.white};
`

const RadioList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: 44px;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceDark};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  input {
    accent-color: ${({ theme }) => theme.colors.gold};
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  &:has(input:focus-visible) {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 2px;
  }
`

const SubmitButton = styled.button`
  ${goldActionStyles}
  align-self: flex-start;
`

const SupportText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.metallicGray};
`

const PrivacyMicrocopy = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.metallicGray};
`

const FallbackNotice = styled.p`
  margin: 0;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceElevated};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.white};
`

const FallbackLink = styled.a`
  color: ${({ theme }) => theme.colors.gold};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`

export function ConversionSection() {
  const shouldReduceMotion = useReducedMotion()
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null)

  const nomeRef = useRef<HTMLInputElement>(null)
  const empresaRef = useRef<HTMLInputElement>(null)
  const segmentoRef = useRef<HTMLSelectElement>(null)
  const primeiraPrioridadeRef = useRef<HTMLInputElement>(null)

  function handleTextChange(field: 'nome' | 'empresa' | 'contexto') {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target
      setValues((prev) => ({ ...prev, [field]: value }))
      if (field === 'nome' || field === 'empresa') {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
      }
    }
  }

  function handleSegmentoChange(event: ChangeEvent<HTMLSelectElement>) {
    setValues((prev) => ({ ...prev, segmento: event.target.value }))
    setErrors((prev) => ({ ...prev, segmento: undefined }))
  }

  function handlePrioridadeChange(event: ChangeEvent<HTMLInputElement>) {
    setValues((prev) => ({ ...prev, prioridade: event.target.value }))
    setErrors((prev) => ({ ...prev, prioridade: undefined }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting) return

    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (nextErrors.nome) {
      nomeRef.current?.focus()
      return
    }
    if (nextErrors.empresa) {
      empresaRef.current?.focus()
      return
    }
    if (nextErrors.segmento) {
      segmentoRef.current?.focus()
      return
    }
    if (nextErrors.prioridade) {
      primeiraPrioridadeRef.current?.focus()
      return
    }

    setIsSubmitting(true)
    const message = buildWhatsAppFormMessage(values)
    const url = contact.buildWhatsAppUrl(message)
    setFallbackUrl(url)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <SectionContainer id="contato">
      <ContentWrapper>
        <SectionIntro {...buildViewportRevealProps({ reduceMotion: !!shouldReduceMotion })}>
          <Eyebrow>VAMOS IDENTIFICAR O PRÓXIMO PASSO</Eyebrow>
          <SectionHeading>Conte o cenário. A engenharia começa pela pergunta certa.</SectionHeading>
          <SectionParagraph>
            Compartilhe as informações essenciais e continue a conversa diretamente pelo WhatsApp.
          </SectionParagraph>
        </SectionIntro>

        <ContactGrid>
          <VisualColumn>
            <SignalConvergence />
          </VisualColumn>

          <FormColumn>
            <FormShell>
              <Form onSubmit={handleSubmit} noValidate>
            <FieldRow>
              <FieldBlock>
                <FieldLabelRow>
                  <FieldLabel htmlFor="form-nome">Seu nome</FieldLabel>
                  <FieldNote>Obrigatório</FieldNote>
                </FieldLabelRow>
                <TextInput
                  ref={nomeRef}
                  id="form-nome"
                  name="nome"
                  type="text"
                  autoComplete="name"
                  maxLength={NAME_MAX}
                  value={values.nome}
                  onChange={handleTextChange('nome')}
                  aria-invalid={errors.nome ? true : undefined}
                  aria-describedby={errors.nome ? 'form-nome-erro' : undefined}
                />
                {errors.nome && (
                  <ErrorText id="form-nome-erro" role="alert">
                    {errors.nome}
                  </ErrorText>
                )}
              </FieldBlock>

              <FieldBlock>
                <FieldLabelRow>
                  <FieldLabel htmlFor="form-empresa">Nome da empresa</FieldLabel>
                  <FieldNote>Obrigatório</FieldNote>
                </FieldLabelRow>
                <TextInput
                  ref={empresaRef}
                  id="form-empresa"
                  name="empresa"
                  type="text"
                  autoComplete="organization"
                  maxLength={COMPANY_MAX}
                  value={values.empresa}
                  onChange={handleTextChange('empresa')}
                  aria-invalid={errors.empresa ? true : undefined}
                  aria-describedby={errors.empresa ? 'form-empresa-erro' : undefined}
                />
                {errors.empresa && (
                  <ErrorText id="form-empresa-erro" role="alert">
                    {errors.empresa}
                  </ErrorText>
                )}
              </FieldBlock>
            </FieldRow>

            <FieldBlock>
              <FieldLabelRow>
                <FieldLabel htmlFor="form-segmento">Segmento principal</FieldLabel>
                <FieldNote>Obrigatório</FieldNote>
              </FieldLabelRow>
              <SelectInput
                ref={segmentoRef}
                id="form-segmento"
                name="segmento"
                value={values.segmento}
                onChange={handleSegmentoChange}
                aria-invalid={errors.segmento ? true : undefined}
                aria-describedby={errors.segmento ? 'form-segmento-erro' : undefined}
              >
                <option value="" disabled>
                  Selecione o segmento
                </option>
                {segmentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </SelectInput>
              {errors.segmento && (
                <ErrorText id="form-segmento-erro" role="alert">
                  {errors.segmento}
                </ErrorText>
              )}
            </FieldBlock>

            <FieldsetBlock aria-describedby={errors.prioridade ? 'form-prioridade-erro' : undefined}>
              <Legend>Qual é a principal prioridade agora?</Legend>
              <RadioList>
                {priorityOptions.map((option, index) => (
                  <RadioOption key={option}>
                    <input
                      ref={index === 0 ? primeiraPrioridadeRef : undefined}
                      type="radio"
                      name="prioridade"
                      value={option}
                      checked={values.prioridade === option}
                      onChange={handlePrioridadeChange}
                      aria-invalid={errors.prioridade ? true : undefined}
                    />
                    {option}
                  </RadioOption>
                ))}
              </RadioList>
              {errors.prioridade && (
                <ErrorText id="form-prioridade-erro" role="alert">
                  {errors.prioridade}
                </ErrorText>
              )}
            </FieldsetBlock>

            <FieldBlock>
              <FieldLabelRow>
                <FieldLabel htmlFor="form-contexto">Conte brevemente o principal desafio</FieldLabel>
                <FieldNote>Opcional</FieldNote>
              </FieldLabelRow>
              <TextArea
                id="form-contexto"
                name="contexto"
                maxLength={CONTEXT_MAX}
                value={values.contexto}
                onChange={handleTextChange('contexto')}
              />
              <CharCounter>
                {values.contexto.length}/{CONTEXT_MAX}
              </CharCounter>
            </FieldBlock>

            <SubmitButton type="submit" disabled={isSubmitting}>
              <MessageCircle aria-hidden="true" />
              CONTINUAR PELO WHATSAPP
            </SubmitButton>
            <SupportText>Você poderá revisar a mensagem antes de enviá-la.</SupportText>
            <PrivacyMicrocopy>
              Este site não armazena os dados preenchidos neste formulário.
            </PrivacyMicrocopy>

            {fallbackUrl && (
              <FallbackNotice>
                Se a aba do WhatsApp não abriu automaticamente,{' '}
                <FallbackLink href={fallbackUrl} target="_blank" rel="noopener noreferrer">
                  use este link para continuar a conversa
                </FallbackLink>
                .
              </FallbackNotice>
            )}
              </Form>
            </FormShell>
          </FormColumn>
        </ContactGrid>
      </ContentWrapper>
    </SectionContainer>
  )
}
