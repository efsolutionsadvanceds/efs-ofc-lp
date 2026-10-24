/**
 * Perguntas frequentes — exibidas na seção "Dúvidas" da home e serializadas
 * no schema FAQPage (as diretrizes do Google exigem que o conteúdo marcado
 * esteja visível na página, por isso as duas saídas leem deste mesmo array).
 *
 * As cinco perguntas cobrem, nesta ordem: o mecanismo de contato (reduz o
 * atrito), preço/prazo (principal objeção) e as três ofertas centrais.
 */

export interface FaqItem {
  question: string
  answer: string
}

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: 'Como funciona o primeiro contato?',
    answer:
      'Você seleciona nesta página as soluções que fazem sentido para o seu negócio — pode ser mais de uma — e toca em enviar. O WhatsApp abre com a mensagem pronta e, a partir daí, entendemos o seu cenário e indicamos o melhor caminho. Se ainda não souber do que precisa, é só chamar sem selecionar nada.',
  },
  {
    question: 'Quanto custa e quanto tempo leva um projeto?',
    answer:
      'Depende do escopo: um site institucional é bem diferente de um sistema de gestão completo. Por isso, cada projeto é orçado sob medida. Depois da conversa inicial, você recebe uma proposta com escopo, prazo e investimento definidos por escrito, antes de qualquer compromisso.',
  },
  {
    question: 'O site já sai otimizado para aparecer no Google?',
    answer:
      'Sim. Todo site é construído com SEO técnico desde a base: carregamento rápido, estrutura semântica, metadados, dados estruturados, sitemap e boa experiência no celular. Nenhuma empresa séria garante a primeira posição no Google, mas um site bem construído é a fundação para ser encontrado por quem procura o que você oferece.',
  },
  {
    question: 'Como funciona o assistente virtual com IA?',
    answer:
      'Ele é configurado com as informações do seu negócio e atende pelo WhatsApp a qualquer hora: responde dúvidas frequentes, coleta os dados de quem pede orçamento e encaminha a conversa para a sua equipe quando é preciso um atendimento humano.',
  },
  {
    question: 'O sistema é feito sob medida ou é um software pronto?',
    answer:
      'Sob medida. Primeiro entendemos como a sua empresa funciona; depois desenvolvemos um sistema web com as telas, regras e relatórios de que a sua operação precisa, acessível de qualquer navegador e integrado às ferramentas que você já usa, quando fizer sentido.',
  },
]
