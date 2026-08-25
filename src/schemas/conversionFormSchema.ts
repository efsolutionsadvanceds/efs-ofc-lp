import { z } from 'zod'
import { priorityOptions, segmentOptions } from '../data/conversionForm'

export const NAME_MAX_LENGTH = 80
export const COMPANY_MAX_LENGTH = 100
export const CONTEXT_MAX_LENGTH = 500

export const conversionFormSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(1, 'Informe o seu nome.')
    .max(NAME_MAX_LENGTH, `Informe um nome com até ${NAME_MAX_LENGTH} caracteres.`),
  empresa: z
    .string()
    .trim()
    .min(1, 'Informe o nome da empresa.')
    .max(COMPANY_MAX_LENGTH, `Informe um nome de empresa com até ${COMPANY_MAX_LENGTH} caracteres.`),
  segmento: z.enum(segmentOptions, {
    error: 'Selecione o segmento principal.',
  }),
  prioridade: z.enum(priorityOptions, {
    error: 'Selecione a prioridade mais importante neste momento.',
  }),
  contexto: z
    .string()
    .trim()
    .max(CONTEXT_MAX_LENGTH, `O contexto deve ter até ${CONTEXT_MAX_LENGTH} caracteres.`),
})

export type ConversionFormValues = z.infer<typeof conversionFormSchema>

export interface ConversionFormErrors {
  nome?: string
  empresa?: string
  segmento?: string
  prioridade?: string
}

type ConversionFormFieldErrorKey = keyof ConversionFormErrors

const FIELD_ERROR_KEYS: readonly ConversionFormFieldErrorKey[] = [
  'nome',
  'empresa',
  'segmento',
  'prioridade',
]

function isFieldErrorKey(value: unknown): value is ConversionFormFieldErrorKey {
  return FIELD_ERROR_KEYS.includes(value as ConversionFormFieldErrorKey)
}

export type ConversionFormParseResult =
  | { success: true; data: ConversionFormValues }
  | { success: false; errors: ConversionFormErrors }

export interface ConversionFormInput {
  nome: string
  empresa: string
  segmento: string
  prioridade: string
  contexto: string
}

/**
 * Valida os valores brutos do formulário (strings de estado do React) contra
 * o schema. Nunca lança — sempre retorna um resultado tipado para a UI decidir
 * o que fazer (focar o primeiro campo inválido, exibir mensagens etc.).
 */
export function parseConversionForm(values: ConversionFormInput): ConversionFormParseResult {
  const result = conversionFormSchema.safeParse(values)

  if (result.success) {
    return { success: true, data: result.data }
  }

  const errors: ConversionFormErrors = {}

  for (const issue of result.error.issues) {
    const field = issue.path[0]
    if (isFieldErrorKey(field) && !errors[field]) {
      errors[field] = issue.message
    }
  }

  return { success: false, errors }
}
