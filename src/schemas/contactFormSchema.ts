import { z } from 'zod'

import { HELP_TYPE_OPTIONS } from '../content/formOptions'
import { isValidBrazilianWhatsApp } from '../lib/phone'

const helpTypeValues = HELP_TYPE_OPTIONS.map((option) => option.value) as [string, ...string[]]

/**
 * Formulário único do hero — coleta apenas o necessário para iniciar uma
 * conversa qualificada (ver briefing de reposicionamento comercial).
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Informe seu nome completo.')
    .max(80, 'Use no máximo 80 caracteres.'),
  /** Opcional — nem todo visitante tem ou quer informar uma empresa. */
  company: z.string().trim().max(100, 'Use no máximo 100 caracteres.').optional().or(z.literal('')),
  whatsapp: z
    .string()
    .trim()
    .min(8, 'Informe seu WhatsApp com DDD.')
    .max(20, 'Número muito longo.')
    .refine(isValidBrazilianWhatsApp, {
      message: 'Informe um WhatsApp válido com DDD, ex.: (11) 96787-3507.',
    }),
  helpType: z.enum(helpTypeValues, {
    errorMap: () => ({ message: 'Selecione o tipo de ajuda que procura.' }),
  }),
  /** Opcional — sem mínimo, pois o visitante pode preferir detalhar depois. */
  description: z.string().trim().max(500, 'Use no máximo 500 caracteres.').optional().or(z.literal('')),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'É necessário concordar para enviarmos sua solicitação.' }),
  }),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

export const CONTACT_FORM_FIELDS = ['name', 'company', 'whatsapp', 'helpType', 'description', 'consent'] as const

/**
 * Envelope enviado à API — inclui os campos de negócio mais os sinais
 * antibot (honeypot vazio + tempo mínimo de preenchimento). Validado
 * novamente no servidor, que é a fonte de verdade final.
 */
export const contactRequestSchema = contactFormSchema.extend({
  website: z.string().max(0, 'Campo inválido.').optional().or(z.literal('')),
  formRenderedAt: z.number().int().positive(),
  /** Mesmo ID usado no evento "Lead" do Meta Pixel no navegador — permite deduplicação na Conversions API. */
  metaEventId: z.string().max(100).optional(),
})

export type ContactRequestPayload = z.infer<typeof contactRequestSchema>
