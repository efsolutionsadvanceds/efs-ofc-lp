/**
 * Depoimentos de clientes reais, autorizados para divulgação (fonte:
 * EF-doc-oficial). As falas são transcritas como o cliente escreveu: não
 * reescrever, resumir nem "melhorar" o texto (só a pontuação final foi
 * padronizada).
 *
 * `site`: o site entregue, publicado como link externo. Sem `site`, o
 * cliente aparece sem link, com o `status` do projeto (ex.: domínio ainda
 * não publicado).
 *
 * Sem schema Review/AggregateRating: avaliações publicadas pela própria
 * empresa não são elegíveis para resultados enriquecidos no Google.
 */

export interface Testimonial {
  id: string
  quote: string
  /** Quem falou: a empresa ou, quando conhecida, a pessoa. */
  author: string
  /** Empresa da pessoa que falou. */
  company?: string
  site?: { href: string; label: string }
  status?: string
}

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: 'frd-locacoes',
    quote: 'Vamos montar um pacote de serviço melhor. O Site que você desenvolveu pra gente está trazendo clientes mesmo.',
    author: 'FRD Locações',
    site: { href: 'https://www.frdlocacoes.com.br', label: 'frdlocacoes.com.br' },
  },
  {
    id: 'mark-assistencia',
    quote:
      'Pessoal da E.F Solutions deu uma atenção especial e desenvolveu. O Site ficou show demais. Recomendo de olhos fechados, parabéns para a empresa!',
    author: 'Mark Assistência',
    site: { href: 'https://www.markassistencia.com.br', label: 'markassistencia.com.br' },
  },
  {
    id: 'celebrando-seu-casamento',
    quote: 'Esse nível de dedicação é surreal. Desse jeito, vamos fazer negócio pra sempre.',
    author: 'Vinícius',
    company: 'Celebrando seu Casamento',
    status: 'Em desenvolvimento',
  },
]
