import { z } from 'zod'

const measurementIdSchema = z
  .string()
  .regex(/^G-[A-Z0-9]+$/, 'Formato esperado: G-XXXXXXXXXX')

/**
 * Função pura (sem ler `import.meta.env`) para permanecer facilmente testável.
 * Retorna `null` tanto para valor ausente quanto para valor mal formatado —
 * em ambos os casos o Analytics deve permanecer desativado com segurança.
 */
export function parseMeasurementId(raw: string | undefined): string | null {
  const trimmed = raw?.trim()

  if (!trimmed) {
    return null
  }

  const result = measurementIdSchema.safeParse(trimmed)
  return result.success ? result.data : null
}

const rawMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
const resolvedMeasurementId = parseMeasurementId(rawMeasurementId)

if (rawMeasurementId?.trim() && !resolvedMeasurementId && import.meta.env.DEV) {
  console.warn(
    '[EFSA] VITE_GA_MEASUREMENT_ID está definido mas não corresponde ao formato esperado (G-XXXXXXXXXX). O Google Analytics permanecerá desativado.',
  )
}

export const analyticsConfig = {
  measurementId: resolvedMeasurementId,
  isEnabled: resolvedMeasurementId !== null,
} as const
