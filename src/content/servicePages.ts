import type { FaqItem } from './faq'
import type { ServiceSlug } from './serviceIndex'

/**
 * Conteúdo das páginas de serviço (carregado só com as rotas de serviço).
 * Regras: nenhum preço, prazo ou resultado garantido; nenhum número
 * inventado; respostas que tratam objeções reais de quem contrata.
 */

export interface ServiceItem {
  title: string
  text: string
}

export interface ServicePageContent {
  /** H1: primeira parte em tinta cheia, segunda em cinza. */
  heading: readonly [string, string]
  lead: string
  assurances: readonly [string, string, string]
  /** O que está incluído. */
  features: readonly ServiceItem[]
  /** Para quem é. */
  audiences: readonly ServiceItem[]
  /** Como o projeto acontece. */
  steps: readonly ServiceItem[]
  faq: readonly FaqItem[]
  /** Outros serviços relacionados (links internos). */
  related: readonly ServiceSlug[]
}

export const SERVICE_CONTENT: Record<ServiceSlug, ServicePageContent> = {
  'sistemas-personalizados': {
    heading: ['Sistemas de gestão sob medida', 'e ERP web para empresas'],
    lead: 'Vendas, estoque, agenda, financeiro e atendimento num só sistema, feito para o jeito que a sua empresa trabalha. Acesso pelo navegador e pelo celular, com integrações e relatórios que hoje dependem de planilhas.',
    assurances: ['Proposta com escopo por escrito', 'Acesso pelo celular e pelo computador', 'Integração com o que você já usa'],
    features: [
      {
        title: 'Módulos do seu processo',
        text: 'Vendas, orçamentos, estoque, compras, agenda, ordens de serviço e financeiro, só com os módulos que fazem sentido para a sua operação.',
      },
      {
        title: 'Painel com os números do dia',
        text: 'Indicadores e relatórios montados a partir dos dados do próprio sistema, sem copiar e colar entre planilhas.',
      },
      {
        title: 'Usuários e permissões',
        text: 'Cada pessoa vê e edita só o que precisa, com histórico de quem alterou o quê e quando.',
      },
      {
        title: 'Integrações',
        text: 'Conexão com ERPs, emissores de nota fiscal, meios de pagamento, planilhas e WhatsApp, quando as ferramentas permitem integração.',
      },
      {
        title: 'Acesso de qualquer lugar',
        text: 'Sistema web, que funciona no navegador do computador, do tablet e do celular, sem instalar nada.',
      },
      {
        title: 'Segurança e cópias de segurança',
        text: 'Acesso com login, conexão criptografada (HTTPS) e rotina de cópias de segurança definida no projeto.',
      },
    ],
    audiences: [
      {
        title: 'Empresas que vivem de planilhas',
        text: 'Quando várias pessoas editam o mesmo arquivo, os erros aparecem e ninguém sabe qual é a versão certa.',
      },
      {
        title: 'Operações com processo próprio',
        text: 'Quando o sistema pronto obriga a empresa a mudar o jeito de trabalhar, ou cobra por módulos que ninguém usa.',
      },
      {
        title: 'Prestadores de serviço',
        text: 'Agenda, ordens de serviço, técnicos em campo e cobrança acompanhados num lugar só.',
      },
      {
        title: 'Comércio e distribuição',
        text: 'Pedidos, estoque e entregas integrados, com a informação certa para quem vende e para quem separa.',
      },
    ],
    steps: [
      {
        title: 'Diagnóstico do processo',
        text: 'Entendemos como a sua empresa funciona hoje: quem faz o quê, onde estão as planilhas e o que mais toma tempo da equipe.',
      },
      {
        title: 'Proposta e escopo',
        text: 'Você recebe por escrito os módulos, as integrações, o prazo e o investimento, antes de qualquer compromisso.',
      },
      {
        title: 'Desenvolvimento em etapas',
        text: 'O sistema é entregue em partes, começando pelo módulo mais importante, para a equipe validar e usar cedo.',
      },
      {
        title: 'Implantação e evolução',
        text: 'Importação dos dados que já existem, treinamento da equipe e melhorias conforme o uso mostrar o que falta.',
      },
    ],
    faq: [
      {
        question: 'Quanto custa um sistema de gestão sob medida?',
        answer:
          'Depende dos módulos, das integrações e da quantidade de dados a migrar. Por isso o orçamento é feito depois de entender o seu processo: a proposta traz escopo, prazo e investimento por escrito. Começar pelo módulo mais importante costuma ser o caminho mais seguro.',
      },
      {
        question: 'Por que não usar um sistema pronto?',
        answer:
          'Um sistema pronto pode ser a melhor escolha quando atende o seu processo como ele é. O sob medida faz sentido quando a empresa precisa se adaptar demais à ferramenta, paga por recursos que não usa ou depende de planilhas paralelas para o que o sistema não faz. Na conversa inicial ajudamos a comparar os dois caminhos.',
      },
      {
        question: 'Dá para aproveitar os dados das planilhas atuais?',
        answer:
          'Na maioria dos casos, sim. Os dados são organizados e importados para o sistema na implantação, e essa migração entra no escopo da proposta.',
      },
      {
        question: 'O sistema funciona no celular?',
        answer:
          'Funciona. É um sistema web, acessado pelo navegador do computador, do tablet ou do celular, com telas pensadas para cada tamanho.',
      },
      {
        question: 'De quem são o sistema e os dados depois da entrega?',
        answer:
          'A propriedade do código, a hospedagem e o acesso aos dados ficam definidos por escrito na proposta, antes do início do projeto. Os dados da sua empresa continuam sendo da sua empresa.',
      },
    ],
    related: ['automacao-whatsapp', 'landing-pages-e-lojas'],
  },

  'automacao-whatsapp': {
    heading: ['Atendente virtual com IA no WhatsApp', 'e automação de atendimento'],
    lead: 'Um atendente que responde seus clientes na hora, a qualquer hora, com as informações do seu negócio. Ele tira dúvidas, coleta os dados do pedido, agenda e passa para a sua equipe só o que precisa de atenção humana.',
    assurances: ['Configurado com as informações do negócio', 'Passa para a equipe quando precisa', 'Plataforma oficial do WhatsApp'],
    features: [
      {
        title: 'Respostas com as informações do negócio',
        text: 'Serviços, faixas de preço, horários, formas de pagamento e políticas: o atendente responde a partir do conteúdo que você aprova.',
      },
      {
        title: 'Coleta de dados para orçamento',
        text: 'Pergunta o que a sua equipe precisa saber (serviço, endereço, prazo) e entrega o pedido organizado.',
      },
      {
        title: 'Agendamento',
        text: 'Registra pedidos de horário e, quando a agenda da empresa permite integração, consulta e reserva direto nela.',
      },
      {
        title: 'Transferência para humano',
        text: 'Regras claras de quando passar a conversa para a equipe, com o histórico junto, para ninguém repetir a pergunta.',
      },
      {
        title: 'Integrações e automações',
        text: 'Envia pedidos para planilhas, CRM ou sistema interno e avisa a equipe pelos canais combinados.',
      },
      {
        title: 'Plataforma oficial do WhatsApp',
        text: 'Implantação pela plataforma oficial da Meta, sem aplicativos não autorizados que colocam o número em risco de bloqueio.',
      },
    ],
    audiences: [
      {
        title: 'Clínicas e consultórios',
        text: 'Dúvidas sobre convênios, preparo e horários respondidas na hora, com o agendamento encaminhado para a recepção.',
      },
      {
        title: 'Prestadores de serviço',
        text: 'Orçamentos que já começam com os dados certos: o que o cliente precisa, onde e para quando.',
      },
      {
        title: 'Comércio e lojas',
        text: 'Disponibilidade, formas de pagamento e entrega respondidas fora do horário, sem perder a venda.',
      },
      {
        title: 'Escolas e cursos',
        text: 'Períodos de matrícula com muitas perguntas repetidas, respondidas a partir das informações que a escola aprova.',
      },
    ],
    steps: [
      {
        title: 'Mapeamento das conversas',
        text: 'Levantamos as perguntas mais comuns, os dados que a equipe precisa e os casos que devem ir direto para uma pessoa.',
      },
      {
        title: 'Base de conhecimento e regras',
        text: 'As informações do negócio viram a base do atendente, com o tom de voz e os limites do que ele pode responder.',
      },
      {
        title: 'Testes com situações reais',
        text: 'Antes de entrar no ar, o atendente é testado com conversas do dia a dia e ajustado até responder do jeito certo.',
      },
      {
        title: 'Acompanhamento',
        text: 'Depois de publicado, as conversas mostram o que melhorar: novas perguntas entram na base e as regras são refinadas.',
      },
    ],
    faq: [
      {
        question: 'O atendente com IA substitui a minha equipe?',
        answer:
          'Não. Ele cuida das perguntas repetidas e da coleta de dados, a qualquer hora, e passa para a equipe as conversas que precisam de atenção humana. A equipe ganha tempo para o que realmente exige uma pessoa.',
      },
      {
        question: 'E se o cliente perguntar algo que o atendente não sabe?',
        answer:
          'O atendente é configurado para responder só a partir das informações aprovadas. Quando não tem a resposta, ele avisa e transfere a conversa para a equipe, em vez de inventar.',
      },
      {
        question: 'Preciso trocar o número de WhatsApp da empresa?',
        answer:
          'Nem sempre. Dependendo do caso, o número atual pode ser usado na plataforma oficial ou um número novo pode ficar só para o atendente. As opções e as regras da Meta para cada situação são explicadas antes da implantação.',
      },
      {
        question: 'A Meta cobra pelo uso do WhatsApp?',
        answer:
          'A plataforma oficial tem cobrança da própria Meta para alguns tipos de mensagem, conforme a tabela vigente dela. Esse custo é separado do projeto e fica explicado na proposta.',
      },
      {
        question: 'Quanto tempo leva para colocar o atendente no ar?',
        answer:
          'Depende da quantidade de informações, das integrações e da aprovação da conta na Meta. O cronograma fica definido na proposta, junto com o escopo e o investimento.',
      },
    ],
    related: ['sistemas-personalizados', 'seo-e-divulgacao'],
  },

  'seo-e-divulgacao': {
    heading: ['SEO técnico e SEO local', 'para sua empresa aparecer no Google'],
    lead: 'Um site rápido, bem estruturado e com o conteúdo que seus clientes pesquisam, junto com um Perfil da Empresa no Google completo. Todo o trabalho é acompanhado no Google Search Console, com as decisões baseadas nas buscas reais.',
    assurances: ['Sem promessa de primeira posição', 'Acompanhamento no Search Console', 'SEO técnico, local e de conteúdo'],
    features: [
      {
        title: 'Auditoria técnica',
        text: 'Velocidade, indexação, erros de rastreamento, links quebrados, títulos, descrições e dados estruturados, com a lista do que corrigir primeiro.',
      },
      {
        title: 'SEO local',
        text: 'Perfil da Empresa no Google completo, área de atendimento, categorias certas e dados de contato iguais em todos os lugares.',
      },
      {
        title: 'Páginas para o que seus clientes buscam',
        text: 'Páginas por serviço e por região com conteúdo próprio, escritas a partir das pesquisas reais do seu público.',
      },
      {
        title: 'Conteúdo que responde dúvidas',
        text: 'Artigos que respondem as perguntas feitas antes da compra e levam o leitor para o orçamento.',
      },
      {
        title: 'Core Web Vitals',
        text: 'Site rápido e estável no celular, com as métricas de experiência que o Google mostra no Search Console.',
      },
      {
        title: 'Medição de resultados',
        text: 'Search Console, Google Analytics 4 e eventos de conversão configurados para saber quais buscas viram contato.',
      },
    ],
    audiences: [
      {
        title: 'Empresas locais',
        text: 'Quem atende numa cidade ou região e precisa aparecer no Google Maps para quem está perto.',
      },
      {
        title: 'Quem já tem site e não aparece',
        text: 'Sites lentos, sem páginas de serviço ou com problemas de indexação que o Google não consegue entender.',
      },
      {
        title: 'Empresas que vendem para empresas',
        text: 'Negócios pesquisados por especificação técnica, que precisam de páginas claras sobre o que fazem.',
      },
      {
        title: 'Negócios que dependem de anúncios',
        text: 'Quem quer reduzir a dependência de tráfego pago com visitas que chegam pela busca orgânica.',
      },
    ],
    steps: [
      {
        title: 'Diagnóstico',
        text: 'Análise técnica do site, do Perfil da Empresa e das buscas em que a empresa já aparece no Search Console.',
      },
      {
        title: 'Plano de prioridades',
        text: 'Lista do que corrigir e do que criar, em ordem de impacto, com as páginas e os temas de conteúdo.',
      },
      {
        title: 'Execução',
        text: 'Correções técnicas, novas páginas, conteúdo e otimização do Perfil da Empresa, seguindo o plano.',
      },
      {
        title: 'Acompanhamento',
        text: 'Leitura periódica do Search Console: buscas com muitas impressões e poucos cliques ganham títulos melhores, e novas oportunidades viram páginas.',
      },
    ],
    faq: [
      {
        question: 'Em quanto tempo o SEO dá resultado?',
        answer:
          'Depende da concorrência, da situação atual do site e da frequência de publicação. Correções técnicas e o Perfil da Empresa costumam surtir efeito antes; conteúdo novo leva mais tempo para ganhar posição. Por isso o acompanhamento é contínuo, com base nos dados do Search Console.',
      },
      {
        question: 'Vocês garantem a primeira posição no Google?',
        answer:
          'Não, e nenhuma empresa séria garante. Quem decide a ordem dos resultados é o Google. O que fazemos é deixar o site tecnicamente correto e relevante para as buscas do seu público, que é o que coloca a empresa na disputa.',
      },
      {
        question: 'Preciso ter endereço para aparecer no Google Maps?',
        answer:
          'O Perfil da Empresa pede um endereço real para a verificação, mas quem atende no local do cliente pode ocultá-lo e informar a área de atendimento. Endereço inventado viola as regras do Google e pode levar à suspensão do perfil.',
      },
      {
        question: 'Vocês fazem SEO em site feito por outra empresa?',
        answer:
          'Fazemos, desde que haja acesso ao site e à hospedagem. A auditoria mostra o que dá para corrigir na estrutura atual e quando vale mais a pena reconstruir.',
      },
      {
        question: 'O que é o Google Search Console?',
        answer:
          'É a ferramenta gratuita do Google que mostra em quais buscas o site aparece, quantos cliques recebe e quais páginas têm problemas. É a base para decidir o que melhorar primeiro.',
      },
    ],
    related: ['landing-pages-e-lojas', 'automacao-whatsapp'],
  },

  'landing-pages-e-lojas': {
    heading: ['Landing pages de alta conversão', 'e lojas virtuais'],
    lead: 'Páginas rápidas para campanhas, lançamentos e pedidos de orçamento, e lojas virtuais próprias com catálogo, carrinho e pagamento. Tudo pronto para o Google, para os anúncios e para o celular.',
    assurances: ['Carregamento rápido no celular', 'Medição de conversões', 'Loja própria, sem depender de marketplace'],
    features: [
      {
        title: 'Landing page por campanha',
        text: 'Uma página com uma oferta e uma ação, escrita para o público do anúncio ou da busca, sem distrações.',
      },
      {
        title: 'Texto e estrutura de conversão',
        text: 'Título claro, benefícios, prova real, perguntas frequentes e chamada para ação repetida nos pontos certos.',
      },
      {
        title: 'Loja virtual própria',
        text: 'Catálogo, variações, carrinho, frete e pagamento, com os pedidos organizados num painel fácil de usar.',
      },
      {
        title: 'Integração com WhatsApp',
        text: 'Pedido de orçamento ou dúvida sobre o produto direto no WhatsApp, com a mensagem pronta.',
      },
      {
        title: 'Velocidade e SEO',
        text: 'Páginas leves, imagens otimizadas e dados estruturados de produto e de empresa para aparecer melhor no Google.',
      },
      {
        title: 'Medição de resultados',
        text: 'Eventos de conversão no Google Analytics 4 e nos pixels de anúncios, para saber qual campanha traz cliente.',
      },
    ],
    audiences: [
      {
        title: 'Campanhas de anúncios',
        text: 'Quem anuncia no Google ou nas redes sociais e precisa de uma página feita para converter aquele clique.',
      },
      {
        title: 'Lançamentos e eventos',
        text: 'Uma página por lançamento, com inscrição ou pré-venda e prazo definido.',
      },
      {
        title: 'Quem vende só em marketplace',
        text: 'Empresas que querem um canal próprio, com a marca em primeiro plano e o contato direto com o cliente.',
      },
      {
        title: 'Catálogo com pedido pelo WhatsApp',
        text: 'Quem ainda não precisa de pagamento online e quer começar com catálogo e pedidos pelo WhatsApp.',
      },
    ],
    steps: [
      {
        title: 'Oferta e público',
        text: 'Definimos para quem é a página, qual ação ela deve gerar e o que precisa estar nela para convencer.',
      },
      {
        title: 'Texto e estrutura',
        text: 'Estrutura e textos primeiro, depois o visual, para cada seção ter um papel claro na decisão de compra.',
      },
      {
        title: 'Desenvolvimento e integrações',
        text: 'Página ou loja construída com foco em velocidade, integrada ao WhatsApp, aos meios de pagamento e à medição.',
      },
      {
        title: 'Testes e melhorias',
        text: 'Com os dados de conversão, testamos títulos, ofertas e chamadas para melhorar a página ao longo do tempo.',
      },
    ],
    faq: [
      {
        question: 'Qual a diferença entre landing page e site institucional?',
        answer:
          'O site institucional apresenta a empresa inteira, com várias páginas. A landing page tem um objetivo só (orçamento, inscrição ou compra) e é feita para quem chega de um anúncio ou de uma busca específica.',
      },
      {
        question: 'Loja virtual própria ou marketplace?',
        answer:
          'O marketplace traz público, mas cobra comissão e limita o contato com o cliente e a presença da sua marca. A loja própria dá controle sobre preço, experiência e relacionamento. Muitas empresas usam os dois, e a loja própria vira o canal principal com o tempo.',
      },
      {
        question: 'Dá para vender pelo WhatsApp sem pagamento online?',
        answer:
          'Dá. Um catálogo com pedido pelo WhatsApp é um bom começo: o cliente escolhe os produtos e a mensagem chega pronta para a sua equipe. Quando o volume crescer, a loja ganha carrinho e pagamento.',
      },
      {
        question: 'Quanto custa uma landing page ou uma loja virtual?',
        answer:
          'Depende da quantidade de páginas, das funcionalidades (variações, frete, pagamento, integrações) e de quem produz textos e fotos. O orçamento é feito sob medida, com escopo, prazo e investimento por escrito.',
      },
      {
        question: 'A página fica pronta para anúncios no Google e nas redes sociais?',
        answer:
          'Fica. A página é preparada com eventos de conversão e pixels de anúncios, que só são ativados depois do consentimento de cookies do visitante, como pede a LGPD.',
      },
    ],
    related: ['seo-e-divulgacao', 'sistemas-personalizados'],
  },
}
