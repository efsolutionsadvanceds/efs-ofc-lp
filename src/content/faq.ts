/**
 * Perguntas frequentes — exibidas na seção "Dúvidas" da home e serializadas
 * no schema FAQPage (as diretrizes do Google exigem que o conteúdo marcado
 * esteja visível na página, por isso as duas saídas leem deste mesmo array).
 *
 * As perguntas seguem o formato em que as pessoas pesquisam no Google
 * ("quanto custa…", "quanto tempo leva…", "como funciona…") e cobrem as
 * três ofertas centrais, o SEO e o próprio processo de orçamento. Nenhuma
 * resposta inventa preço, prazo ou resultado garantido.
 */

export interface FaqItem {
  question: string
  answer: string
}

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: 'Quanto custa a criação de um site profissional para empresa?',
    answer:
      'Depende do tipo de site (institucional, landing page ou loja virtual), da quantidade de páginas e das integrações necessárias. Por isso cada projeto é orçado sob medida: depois de uma conversa rápida pelo WhatsApp, você recebe uma proposta com escopo, prazo e investimento definidos por escrito, antes de qualquer compromisso.',
  },
  {
    question: 'Quanto tempo leva para desenvolver um sistema de gestão sob medida?',
    answer:
      'O prazo depende dos módulos (vendas, estoque, agenda, financeiro) e das integrações com as ferramentas que você já usa. Primeiro entendemos como a sua empresa funciona; o cronograma fica definido na proposta, junto com o escopo e o investimento.',
  },
  {
    question: 'Como funciona o atendente virtual com IA no WhatsApp?',
    answer:
      'Ele é configurado com as informações do seu negócio e atende pelo WhatsApp a qualquer hora: responde dúvidas frequentes, coleta os dados de quem pede orçamento e encaminha a conversa para a sua equipe quando é preciso um atendimento humano.',
  },
  {
    question: 'Como o SEO ajuda minha empresa a aparecer no Google?',
    answer:
      'O SEO deixa o site rápido, bem estruturado e fácil de entender para o Google: metadados, dados estruturados, sitemap, conteúdo pensado para o que seus clientes pesquisam e Perfil da Empresa atualizado. A indexação e o desempenho são acompanhados no Google Search Console. Nenhuma empresa séria garante a primeira posição, mas é esse trabalho que coloca o seu site na disputa.',
  },
  {
    question: 'Como funciona o orçamento pelo WhatsApp?',
    answer:
      'Você marca nesta página as soluções que fazem sentido para o seu negócio — pode ser mais de uma — e toca em enviar. O WhatsApp abre com a mensagem pronta, sem formulário. A partir daí, entendemos o seu cenário e indicamos o melhor caminho. Se ainda não souber do que precisa, é só chamar sem selecionar nada.',
  },
]
