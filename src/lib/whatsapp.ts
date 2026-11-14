import { site } from '@/config/site'
import { getSolutions, type SolutionId } from '@/content/solutions'

/** Mensagem usada quando o visitante chama sem selecionar nenhuma solução. */
export const GENERIC_LEAD_MESSAGE =
  'Olá, E.F Solutions! Vim pelo site e quero conversar sobre um projeto para a minha empresa.'

/** Página de origem do contato: cidade, serviço ou artigo (entra na mensagem e no GA4). */
export interface LeadOrigin {
  city?: { slug: string; name: string }
  service?: { slug: string; name: string }
  article?: { slug: string; name: string }
}

function sourceOf(origin: LeadOrigin): string | null {
  if (origin.city) return `pela página de criação de sites em ${origin.city.name}`
  if (origin.service) return `pela página de ${origin.service.name}`
  if (origin.article) return `pelo artigo “${origin.article.name}”`
  return null
}

/**
 * Monta a mensagem pré-formatada enviada ao WhatsApp. Usa a formatação nativa
 * do WhatsApp (`*negrito*`) e marcadores "•" — sem emoji, que alguns
 * aplicativos de desktop corrompem ao abrir links do wa.me. As soluções
 * seguem a ordem do catálogo, não a ordem dos cliques.
 *
 * Sem página de origem (ex.: home), a mensagem é exatamente a de sempre.
 */
export function buildLeadMessage(selected: readonly SolutionId[], origin: LeadOrigin = {}): string {
  const solutions = getSolutions(selected)
  const source = sourceOf(origin)

  if (solutions.length === 0) {
    return source
      ? `Olá, E.F Solutions! Vim ${source} e quero conversar sobre um projeto para a minha empresa.`
      : GENERIC_LEAD_MESSAGE
  }

  return [
    `Olá, E.F Solutions! Vim ${source ?? 'pelo site'} e quero um orçamento.`,
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

export function buildLeadUrl(selected: readonly SolutionId[], origin: LeadOrigin = {}): string {
  return buildWhatsAppUrl(buildLeadMessage(selected, origin))
}
