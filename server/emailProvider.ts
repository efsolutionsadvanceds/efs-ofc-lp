import type { ContactRequestPayload } from '../src/schemas/contactFormSchema'
import { HELP_TYPE_OPTIONS } from '../src/content/formOptions'

export type ProviderResult = { ok: true } | { ok: false; reason: 'not-configured' | 'dispatch-failed' }

function labelFor(options: readonly { value: string; label: string }[], value: string): string {
  return options.find((option) => option.value === value)?.label ?? value
}

function buildNotificationText(payload: ContactRequestPayload): string {
  const helpTypeLabel = labelFor(HELP_TYPE_OPTIONS, payload.helpType)
  const companyLine = payload.company ? `Empresa: ${payload.company}` : 'Empresa: (não informada)'

  return [
    'Nova solicitação de contato — E.F Solutions',
    '',
    `Nome: ${payload.name}`,
    companyLine,
    `WhatsApp: ${payload.whatsapp}`,
    `Tipo de ajuda: ${helpTypeLabel}`,
    payload.description ? '' : null,
    payload.description ? 'Descrição enviada:' : null,
    payload.description ? payload.description : null,
  ]
    .filter((line): line is string => line !== null)
    .join('\n')
}

async function dispatchViaResend(payload: ContactRequestPayload): Promise<ProviderResult> {
  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.CONTACT_FROM_EMAIL
  const toEmail = process.env.CONTACT_TO_EMAIL

  if (!apiKey || !fromEmail || !toEmail) {
    return { ok: false, reason: 'not-configured' }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        subject: `Novo contato: ${payload.company ? payload.company : payload.name}`,
        text: buildNotificationText(payload),
      }),
    })

    if (!response.ok) {
      console.error(`[contact] Resend respondeu com status ${response.status}`)
      return { ok: false, reason: 'dispatch-failed' }
    }

    return { ok: true }
  } catch (error) {
    console.error('[contact] Falha de rede ao chamar o Resend', error)
    return { ok: false, reason: 'dispatch-failed' }
  }
}

async function dispatchViaWebhook(payload: ContactRequestPayload): Promise<ProviderResult> {
  const webhookUrl = process.env.WEBHOOK_URL

  if (!webhookUrl) {
    return { ok: false, reason: 'not-configured' }
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: payload.name,
        company: payload.company || null,
        whatsapp: payload.whatsapp,
        helpType: payload.helpType,
        description: payload.description ?? null,
      }),
    })

    if (!response.ok) {
      console.error(`[contact] Webhook respondeu com status ${response.status}`)
      return { ok: false, reason: 'dispatch-failed' }
    }

    return { ok: true }
  } catch (error) {
    console.error('[contact] Falha de rede ao chamar o webhook', error)
    return { ok: false, reason: 'dispatch-failed' }
  }
}

/** Envia a notificação de contato através do provedor configurado via env vars. */
export async function dispatchContactNotification(payload: ContactRequestPayload): Promise<ProviderResult> {
  const provider = (process.env.CONTACT_PROVIDER ?? 'none').toLowerCase()

  switch (provider) {
    case 'resend':
      return dispatchViaResend(payload)
    case 'webhook':
      return dispatchViaWebhook(payload)
    default:
      return { ok: false, reason: 'not-configured' }
  }
}
