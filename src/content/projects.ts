/**
 * Projetos entregues, exibidos em /projetos. Tudo aqui descreve o que está
 * publicado nos sites dos clientes (verificado nos próprios sites) e usa as
 * falas autorizadas de src/content/testimonials.ts. Nenhum número,
 * resultado ou detalhe inventado: se não dá para verificar, não entra.
 */

export interface Project {
  id: string
  client: string
  segment: string
  /** Cidade e UF, quando o próprio cliente publica. */
  location?: string
  /** O que o site precisava fazer pelo negócio. */
  goal: string
  /** O que foi entregue (visível no site publicado). */
  delivered: readonly string[]
  /** Depoimento do cliente (id em src/content/testimonials.ts). */
  testimonialId: string
  site?: { href: string; label: string }
  status?: string
}

export const PROJECTS: readonly Project[] = [
  {
    id: 'frd-locacoes',
    client: 'FRD Locações',
    segment: 'Locação de motos com opção de compra',
    location: 'Florianópolis, SC',
    goal: 'Explicar com clareza como funciona a locação de motos com opção de compra, com planos e crediário próprio, e levar quem se interessa direto para a conversa no WhatsApp.',
    delivered: [
      'Site de página única com as seções de planos, franquia, localização e contato.',
      'Formulário que monta a mensagem com os dados do interessado e envia pelo WhatsApp.',
      'Botões de WhatsApp com mensagem pronta em vários pontos da página.',
      'Horário de atendimento e rota até a loja pelo Google Maps.',
      'Página dedicada para quem quer ser franqueado.',
    ],
    testimonialId: 'frd-locacoes',
    site: { href: 'https://www.frdlocacoes.com.br', label: 'frdlocacoes.com.br' },
  },
  {
    id: 'mark-assistencia',
    client: 'Mark Assistência',
    segment: 'Assistência técnica de celulares (iPhone e Android)',
    location: 'Osasco, SP',
    goal: 'Mostrar os serviços de reparo com clareza, passar confiança antes do primeiro contato e transformar a visita em pedido de orçamento pelo WhatsApp.',
    delivered: [
      'Site com páginas de serviços, preços de referência, produtos, avaliações e contato.',
      'Botões de WhatsApp com mensagem pronta para cada tipo de reparo.',
      'Endereço, horário e rota até a loja pelo Google Maps e pelo Waze.',
      'Política de privacidade e termos de uso.',
    ],
    testimonialId: 'mark-assistencia',
    site: { href: 'https://www.markassistencia.com.br', label: 'markassistencia.com.br' },
  },
  {
    id: 'celebrando-seu-casamento',
    client: 'Celebrando seu Casamento',
    segment: 'Casamentos',
    goal: 'Projeto em desenvolvimento. Os detalhes do que foi entregue entram nesta página no lançamento oficial.',
    delivered: [],
    testimonialId: 'celebrando-seu-casamento',
    status: 'Em desenvolvimento',
  },
]
