import { describe, expect, it } from 'vitest'
import { parseMeasurementId } from './analyticsConfig'

describe('parseMeasurementId', () => {
  it('aceita um Measurement ID no formato esperado', () => {
    expect(parseMeasurementId('G-ABCD123456')).toBe('G-ABCD123456')
  })

  it('remove espaços em branco nas extremidades antes de validar', () => {
    expect(parseMeasurementId('  G-ABCD123456  ')).toBe('G-ABCD123456')
  })

  it('retorna null quando o valor está ausente', () => {
    expect(parseMeasurementId(undefined)).toBeNull()
  })

  it('retorna null quando o valor é uma string vazia', () => {
    expect(parseMeasurementId('')).toBeNull()
    expect(parseMeasurementId('   ')).toBeNull()
  })

  it('retorna null para um formato mal configurado (sem o prefixo G-)', () => {
    expect(parseMeasurementId('UA-12345678-1')).toBeNull()
  })

  it('retorna null para um valor claramente inválido', () => {
    expect(parseMeasurementId('não-e-um-id')).toBeNull()
    expect(parseMeasurementId('G-')).toBeNull()
  })
})
