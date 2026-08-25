import type { ConversionFormValues } from '../schemas/conversionFormSchema'

export function buildWhatsAppFormMessage(data: ConversionFormValues): string {
  const contexto = data.contexto || 'Não informado'

  return [
    'Olá! Vim pelo site da EFSA e gostaria de conversar sobre o meu cenário.',
    '',
    `Nome: ${data.nome}`,
    `Empresa: ${data.empresa}`,
    `Segmento: ${data.segmento}`,
    `Principal prioridade: ${data.prioridade}`,
    `Contexto: ${contexto}`,
    '',
    'Gostaria de entender qual solução faz mais sentido para a minha empresa.',
  ].join('\n')
}
