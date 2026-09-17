import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, Loader2, TriangleAlert } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import { site } from '@/config/site'
import { HELP_TYPE_OPTIONS } from '@/content/formOptions'
import { submitContactForm } from '@/lib/contactApiClient'
import { trackLeadEvent } from '@/lib/metaPixel'
import { contactFormSchema, type ContactFormValues } from '@/schemas/contactFormSchema'
import { energyBorderGlow } from '@/styles/energyBorder'

import { Button } from '../ui/Button'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'
import { CheckboxField } from './CheckboxField'
import { SelectField } from './SelectField'
import { TextAreaField } from './TextAreaField'
import { TextField } from './TextField'

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'not-configured' | 'error'

const Shell = styled.div`
  background: ${({ theme }) => theme.colors.navy};
  border: 1px solid ${({ theme }) => theme.colors.borderOnDarkStrong};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.space[6]};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  ${energyBorderGlow}
`

const HeadingRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
  margin-bottom: ${({ theme }) => theme.space[2]};
`

const BrandMark = styled.img`
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => theme.radii.sm};
`

const Heading = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};

  &:focus-visible {
    outline: none;
  }
`

const SupportText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
  margin-bottom: ${({ theme }) => theme.space[5]};
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
`

const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
`

const SubmitMicrocopy = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textOnDarkSubtle};
`

const StatusRegion = styled.p`
  min-height: 1px;
`

const HoneypotField = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
`

const Spinner = styled(Loader2)`
  animation: spin 800ms linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 1600ms;
  }
`

const ResultPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space[3]};
  text-align: left;
`

const ResultIcon = styled.span<{ $tone: 'success' | 'warning' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme, $tone }) =>
    $tone === 'success' ? theme.colors.goldAlpha(0.16) : theme.colors.offWhiteAlpha(0.12)};
  color: ${({ theme }) => theme.colors.gold};

  svg {
    width: 26px;
    height: 26px;
  }
`

const ResultTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
`

const ResultText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
  line-height: 1.6;
`

const ErrorBanner = styled.p`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  padding: ${({ theme }) => theme.space[3]};
  border: 1px solid ${({ theme }) => theme.colors.borderGold};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.goldAlpha(0.08)};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textOnDark};

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.gold};
  }
`

/**
 * Formulário único do hero — a única forma de contato "oficial" do site.
 * O WhatsApp aparece apenas como alternativa quando o envio automático não
 * está configurado (ver estado `not-configured` abaixo), nunca como um
 * segundo caminho de conversão paralelo.
 */
export function ContactForm() {
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const formRenderedAtRef = useRef(Date.now())
  const headingRef = useRef<HTMLHeadingElement>(null)
  const previousStatusRef = useRef(status)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      company: '',
      whatsapp: '',
      description: '',
    },
  })

  useEffect(() => {
    if (previousStatusRef.current !== status) {
      headingRef.current?.focus()
    }
    previousStatusRef.current = status
  }, [status])

  async function onSubmit(values: ContactFormValues) {
    setStatus('submitting')
    setSubmitError(null)

    const honeypot = (document.getElementById('website') as HTMLInputElement | null)?.value ?? ''
    const metaEventId = crypto.randomUUID()

    const result = await submitContactForm({
      ...values,
      description: values.description?.trim() || undefined,
      website: honeypot,
      formRenderedAt: formRenderedAtRef.current,
      metaEventId,
    })

    if (result.status === 'success') {
      setStatus('success')
      // Só dispara após confirmação real do servidor — nunca no clique do botão.
      trackLeadEvent(metaEventId)
    } else if (result.status === 'not-configured') {
      setStatus('not-configured')
    } else {
      setStatus('error')
      setSubmitError(
        result.status === 'network-error'
          ? 'Verifique sua conexão com a internet e tente novamente.'
          : result.message,
      )
    }
  }

  function handleReset() {
    reset()
    setStatus('idle')
    setSubmitError(null)
    formRenderedAtRef.current = Date.now()
  }

  if (status === 'success') {
    return (
      <Shell>
        <ResultPanel role="status" aria-live="polite">
          <ResultIcon $tone="success" aria-hidden="true">
            <CheckCircle2 />
          </ResultIcon>
          <ResultTitle ref={headingRef} tabIndex={-1}>
            Recebemos sua solicitação
          </ResultTitle>
          <ResultText>
            A E.F Solutions vai analisar o contexto enviado e entrar em contato pelo WhatsApp informado para
            mostrar qual solução faz mais sentido para sua empresa.
          </ResultText>
          <Button type="button" $variant="secondary" onClick={handleReset}>
            Enviar outra solicitação
          </Button>
        </ResultPanel>
      </Shell>
    )
  }

  if (status === 'not-configured') {
    return (
      <Shell>
        <ResultPanel role="status" aria-live="polite">
          <ResultIcon $tone="warning" aria-hidden="true">
            <TriangleAlert />
          </ResultIcon>
          <ResultTitle ref={headingRef} tabIndex={-1}>
            Canal de envio em configuração
          </ResultTitle>
          <ResultText>
            Não conseguimos confirmar o envio automático agora — nenhuma informação foi perdida do seu lado, mas
            para garantir uma resposta, fale diretamente com a E.F Solutions pelo WhatsApp.
          </ResultText>
          {site.whatsapp.isConfigured ? (
            <Button as="a" href={site.whatsapp.url} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={18} />
              Falar pelo WhatsApp
            </Button>
          ) : null}
        </ResultPanel>
      </Shell>
    )
  }

  return (
    <Shell>
      <HeadingRow>
        <BrandMark src="/assets/logo-mark.png" width={28} height={28} alt="" aria-hidden="true" />
        <Heading ref={headingRef} tabIndex={-1}>
          Quero receber uma análise
        </Heading>
      </HeadingRow>
      <SupportText>Conte um pouco sobre sua empresa. Respondemos pelo WhatsApp que você informar.</SupportText>

      <Form
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
          void handleSubmit(onSubmit)(event)
        }}
      >
        <HoneypotField aria-hidden="true">
          <label htmlFor="website">Não preencha este campo</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </HoneypotField>

        <TextField
          id="name"
          label="Nome"
          placeholder="Ex.: Ana Ferreira"
          autoComplete="name"
          registration={register('name')}
          error={errors.name}
        />

        <TextField
          id="company"
          label="Empresa (opcional)"
          placeholder="Ex.: Ferreira Arquitetura"
          autoComplete="organization"
          registration={register('company')}
          error={errors.company}
        />

        <TextField
          id="whatsapp"
          label="WhatsApp"
          type="tel"
          placeholder="(11) 96787-3507"
          hint="Com DDD — é por onde a E.F Solutions vai te responder."
          autoComplete="tel"
          inputMode="tel"
          registration={register('whatsapp')}
          error={errors.whatsapp}
        />

        <SelectField
          id="helpType"
          label="Tipo de ajuda"
          placeholder="Selecione o que você procura"
          options={HELP_TYPE_OPTIONS}
          registration={register('helpType')}
          error={errors.helpType}
        />

        <TextAreaField
          id="description"
          label="Breve descrição"
          optional
          hint="Se quiser, conte mais sobre o que precisa."
          placeholder="Ex.: preciso de um site que traga mais pedidos de orçamento para minha empresa de reformas."
          maxLength={400}
          registration={register('description')}
          error={errors.description}
        />

        <CheckboxField
          id="consent"
          label={
            <>
              Concordo que a {site.name} use estas informações somente para entrar em contato sobre minha
              solicitação. Veja a <a href={site.legal.privacyHref}>Política de Privacidade</a>.
            </>
          }
          registration={register('consent')}
          error={errors.consent}
        />

        {status === 'error' && submitError ? (
          <ErrorBanner role="alert">
            <TriangleAlert aria-hidden="true" />
            {submitError}
          </ErrorBanner>
        ) : null}

        <ActionsRow>
          <Button type="submit" $fullWidth disabled={isSubmitting}>
            {isSubmitting || status === 'submitting' ? (
              <>
                <Spinner aria-hidden="true" size={18} />
                ENVIANDO INFORMAÇÕES…
              </>
            ) : (
              'Quero receber uma análise'
            )}
          </Button>
        </ActionsRow>
        <SubmitMicrocopy>Sem compromisso. A conversa começa pelo cenário atual da sua empresa.</SubmitMicrocopy>

        <StatusRegion role="status" aria-live="polite" className="visually-hidden">
          {status === 'submitting' ? 'Enviando sua solicitação...' : null}
        </StatusRegion>
      </Form>
    </Shell>
  )
}
