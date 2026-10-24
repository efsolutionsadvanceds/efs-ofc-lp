import { site } from '@/config/site'
import { getSolutions, type SolutionId } from '@/content/solutions'

/** Mensagem usada quando o visitante chama sem selecionar nenhuma solução. */
export const GENERIC_LEAD_MESSAGE =
  'Olá, E.F Solutions! Vim pelo site e quero conversar sobre um projeto para a minha empresa.'

/**
 * Monta a mensagem pré-formatada enviada ao WhatsApp. Usa a formatação nativa
 * do WhatsApp (`*negrito*`) e marcadores "•" — sem emoji, que alguns
 * aplicativos de desktop corrompem ao abrir links do wa.me. As soluções
 * seguem a ordem do catálogo, não a ordem dos cliques.
 */
export function buildLeadMessage(selected: readonly SolutionId[]): string {
  const solutions = getSolutions(selected)
  if (solutions.length === 0) return GENERIC_LEAD_MESSAGE

  return [
    'Olá, E.F Solutions! Vim pelo site e quero um orçamento.',
    '',
    '*Soluções de interesse:*',
    ...solutions.map((solution) => `• ${solution.messageLabel}`),
    '',
    'Podemos conversar?',
  ].join('\n')
}

/**
 * `encodeURIComponent` em vez de URLSearchParams: espaços viram `%20` (e não
 * `+`) e quebras de linha viram `%0A` — o formato documentado pelo WhatsApp.
 */
export function buildWhatsAppUrl(message: string, digits: string = site.whatsapp.digits): string {
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

export function buildLeadUrl(selected: readonly SolutionId[]): string {
  return buildWhatsAppUrl(buildLeadMessage(selected))
}
