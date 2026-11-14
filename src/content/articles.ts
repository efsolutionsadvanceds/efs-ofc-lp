import type { ArticleSlug } from './articleIndex'

/**
 * Texto dos artigos da área de conteúdos (carregado só com a rota do
 * artigo). Marcação simples dentro dos textos: `[texto](/caminho)` para
 * links internos e `**texto**` para destaque.
 *
 * Regras: nenhum preço, estatística ou resultado inventado; só fatos
 * verificáveis (regras públicas do Google e da Meta, por exemplo).
 */

export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul' | 'ol'; items: readonly string[] }

export interface ArticleSection {
  /** Âncora da seção (sumário). */
  id: string
  heading: string
  blocks: readonly ArticleBlock[]
}

export interface ArticleContent {
  intro: readonly string[]
  sections: readonly ArticleSection[]
  /** Chamada contextual para o WhatsApp no fim do artigo. */
  cta: { title: string; text: string }
}

export const ARTICLE_CONTENT: Record<ArticleSlug, ArticleContent> = {
  'quanto-custa-criar-um-site-profissional': {
    intro: [
      '“Quanto custa um site?” é uma das primeiras perguntas de quem decide ter presença profissional na internet, e a resposta honesta é: depende. Não por falta de transparência, mas porque “site” pode ser uma página de campanha ou um sistema com área do cliente, e o trabalho por trás de cada um é muito diferente.',
      'Este guia mostra o que realmente compõe o preço de um site profissional, os custos que continuam depois da entrega e como pedir orçamentos que dá para comparar de verdade. Não há tabela de preços aqui, de propósito: valores sem escopo definido mais confundem do que ajudam.',
    ],
    sections: [
      {
        id: 'tipos-de-site',
        heading: 'Primeiro, qual site você precisa?',
        blocks: [
          { type: 'p', text: 'O tipo de site é o fator que mais muda o tamanho do trabalho. Os formatos mais comuns são:' },
          {
            type: 'ul',
            items: [
              '**Landing page:** uma página com um objetivo só, como pedido de orçamento, inscrição ou venda de um produto. É o formato ideal para campanhas de anúncios. Veja mais em [landing pages e lojas virtuais](/landing-pages-e-lojas).',
              '**Site institucional:** apresenta a empresa, os serviços, a equipe e as formas de contato, em várias páginas. É a base da presença no Google.',
              '**Loja virtual:** catálogo, carrinho, frete, pagamento e gestão de pedidos. Envolve integrações e regras de negócio que um site institucional não tem.',
              '**Portal ou sistema:** área do cliente, login, cadastros e painéis. Aqui o projeto já é de software, mais perto de um [sistema sob medida](/sistemas-personalizados).',
            ],
          },
          {
            type: 'p',
            text: 'Quanto mais funcionalidades e integrações, maior o escopo. Por isso começar pelo que o negócio precisa agora, e não por tudo o que seria bom ter um dia, costuma ser a decisão mais econômica.',
          },
        ],
      },
      {
        id: 'o-que-compoe-o-preco',
        heading: 'O que compõe o preço de um site',
        blocks: [
          {
            type: 'p',
            text: 'Dois sites com o mesmo número de páginas podem ter orçamentos bem diferentes. A diferença está no que entra no trabalho.',
          },
          { type: 'h3', text: 'Estratégia e estrutura' },
          {
            type: 'p',
            text: 'Antes do visual, alguém precisa decidir quais páginas o site terá, o que cada uma deve responder e quais buscas do Google ela pretende atender. Esse planejamento evita retrabalho e é o que separa um site que gera contatos de um site que só existe.',
          },
          { type: 'h3', text: 'Conteúdo' },
          {
            type: 'p',
            text: 'Textos, fotos e vídeos. Se a empresa já tem material pronto, o custo é menor; se o texto precisa ser escrito do zero e pensado para o Google, ele vira parte importante do projeto. Fotos reais da empresa passam mais confiança do que imagens de banco.',
          },
          { type: 'h3', text: 'Design' },
          {
            type: 'p',
            text: 'Um modelo pronto adaptado custa menos e fica pronto mais rápido, mas tende a parecer com muitos outros sites. Um layout sob medida segue a identidade da marca e é desenhado em torno do objetivo de cada página.',
          },
          { type: 'h3', text: 'Desenvolvimento e desempenho' },
          {
            type: 'p',
            text: 'É aqui que se decide se o site vai abrir rápido no celular, funcionar bem em qualquer tela e ser fácil de manter. Velocidade não é detalhe: o Google acompanha a experiência das páginas pelos Core Web Vitals, e o visitante impaciente desiste antes de ver o conteúdo.',
          },
          { type: 'h3', text: 'Funcionalidades e integrações' },
          {
            type: 'p',
            text: 'Botões de WhatsApp com mensagem pronta, agenda online, catálogo, formulários conectados ao CRM, área restrita, blog. Cada integração exige configuração, testes e manutenção.',
          },
          { type: 'h3', text: 'SEO técnico' },
          {
            type: 'p',
            text: 'Títulos e descrições únicos, endereços limpos, dados estruturados, sitemap, imagens otimizadas e páginas que o Google consegue ler. Quando isso é feito desde o início, sai mais barato do que corrigir depois. Entenda o trabalho completo em [SEO técnico e SEO local](/seo-e-divulgacao).',
          },
          { type: 'h3', text: 'Privacidade e LGPD' },
          {
            type: 'p',
            text: 'Política de privacidade, termos de uso e um aviso de cookies que realmente bloqueia as ferramentas de medição até o visitante permitir. É obrigação legal e também um sinal de seriedade para quem visita.',
          },
        ],
      },
      {
        id: 'custos-recorrentes',
        heading: 'Os custos que continuam depois da entrega',
        blocks: [
          { type: 'p', text: 'O preço do projeto não é o custo total do site. Alguns itens se repetem ao longo do tempo:' },
          {
            type: 'ul',
            items: [
              '**Domínio:** o endereço do site. Domínios .com.br são registrados no Registro.br, com renovação periódica. O domínio deve ficar no nome ou no CNPJ da sua empresa.',
              '**Hospedagem:** o serviço que mantém o site no ar. O custo varia com o tipo de site e o volume de visitas.',
              '**E-mail profissional:** contas com o domínio da empresa costumam ser um serviço à parte.',
              '**Manutenção:** atualizações de segurança, ajustes de conteúdo e pequenas melhorias.',
              '**Ferramentas pagas:** temas, plugins ou serviços de terceiros que alguns sites usam e que cobram assinatura.',
            ],
          },
          {
            type: 'p',
            text: 'Pergunte, já no orçamento, quais desses custos existem no seu caso e quem paga cada um. Surpresa depois da entrega é o que mais gera desconfiança entre cliente e fornecedor.',
          },
        ],
      },
      {
        id: 'construtor-freelancer-ou-empresa',
        heading: 'Construtor pronto, freelancer ou empresa?',
        blocks: [
          {
            type: 'ul',
            items: [
              '**Construtores de site** (plataformas de arrastar e soltar): bons para começar com pouco, mas limitam desempenho, SEO e personalização, e o site fica preso à plataforma.',
              '**Freelancer:** pode entregar um ótimo trabalho, mas o projeto depende de uma pessoa só, inclusive para manutenção e suporte.',
              '**Empresa de desenvolvimento:** processo definido, mais de uma especialidade envolvida e continuidade, o que costuma pesar quando o site é parte importante das vendas.',
            ],
          },
          {
            type: 'p',
            text: 'Não existe resposta certa para todos. O que importa é o que está escrito na proposta: escopo, prazos, quem é dono do quê e o que acontece depois da entrega.',
          },
        ],
      },
      {
        id: 'sinais-de-alerta',
        heading: 'Sinais de alerta num orçamento',
        blocks: [
          {
            type: 'ul',
            items: [
              'Preço fechado sem nenhuma pergunta sobre o seu negócio.',
              'Escopo vago, sem a lista de páginas e funcionalidades.',
              'Domínio registrado no nome do fornecedor, e não da sua empresa.',
              'Nenhuma menção a acesso ao painel, aos arquivos ou à hospedagem.',
              'Promessa de “primeira posição garantida no Google”. Ninguém controla a ordem dos resultados.',
              'Prazo sem etapas nem momentos de aprovação.',
            ],
          },
        ],
      },
      {
        id: 'como-pedir-orcamento',
        heading: 'Como pedir um orçamento que dá para comparar',
        blocks: [
          { type: 'p', text: 'Quanto mais claro o pedido, mais parecidas (e comparáveis) serão as propostas. Antes de pedir, tenha em mãos:' },
          {
            type: 'ol',
            items: [
              'O objetivo principal do site: gerar pedidos de orçamento, vender online, apresentar a empresa ou outro.',
              'As páginas ou seções que você imagina e as funcionalidades indispensáveis.',
              'O que você já tem: logo, textos, fotos, domínio, site atual.',
              'Sites de que você gosta, de qualquer ramo, e o porquê.',
              'O prazo desejado e se existe alguma data importante, como um lançamento.',
            ],
          },
          {
            type: 'p',
            text: 'E peça que a proposta traga, por escrito, o escopo, o prazo, o investimento, as formas de pagamento e o que não está incluído.',
          },
        ],
      },
      {
        id: 'o-que-faz-demorar',
        heading: 'O que faz um site demorar mais',
        blocks: [
          { type: 'p', text: 'O prazo segue a mesma lógica do preço: depende do escopo. Os fatores que mais alongam um projeto são:' },
          {
            type: 'ul',
            items: [
              '**Conteúdo atrasado:** textos e fotos que dependem da empresa e não chegam no tempo combinado.',
              '**Aprovações demoradas:** cada rodada de ajustes sem prazo definido empurra o cronograma.',
              '**Integrações:** sistemas de terceiros, como pagamento ou CRM, exigem configuração e testes.',
              '**Escopo que cresce no meio do caminho:** funcionalidades novas pedidas depois da proposta.',
              '**Migração de site antigo:** redirecionar os endereços antigos para não perder posições no Google dá trabalho, mas é indispensável.',
            ],
          },
          { type: 'p', text: 'Um cronograma com etapas, responsáveis e datas de aprovação, combinado no início, é o que mais protege o prazo.' },
        ],
      },
      {
        id: 'checklist-da-proposta',
        heading: 'Checklist: o que uma boa proposta precisa ter',
        blocks: [
          {
            type: 'ul',
            items: [
              'Lista de páginas e funcionalidades incluídas.',
              'Quem produz textos e fotos, e o que acontece se o conteúdo atrasar.',
              'Etapas do projeto, com datas de entrega e de aprovação.',
              'Quantidade de rodadas de ajuste incluídas.',
              'Investimento, formas de pagamento e o que gera custo extra.',
              'Domínio e hospedagem: em nome de quem ficam e quem paga.',
              'Acesso ao painel, aos arquivos e às contas criadas para o site.',
              'Configuração de SEO técnico, Search Console e medição de conversões.',
              'Política de privacidade, termos de uso e aviso de cookies.',
              'Suporte depois da entrega: o que está incluído e por quanto tempo.',
            ],
          },
        ],
      },
      {
        id: 'como-orcamos',
        heading: 'Como a E.F Solutions faz o orçamento',
        blocks: [
          {
            type: 'p',
            text: 'Na E.F Solutions, você marca no site as soluções que fazem sentido para o seu negócio e a mensagem chega pronta no nosso WhatsApp, sem formulário. A partir daí fazemos as perguntas necessárias e enviamos a proposta com escopo, prazo e investimento definidos por escrito, antes de qualquer compromisso.',
          },
          {
            type: 'p',
            text: 'Para ver como trabalhamos na prática, conheça os [projetos entregues](/projetos) e as páginas de [criação de sites por cidade](/criacao-de-sites).',
          },
        ],
      },
    ],
    cta: {
      title: 'Quer saber quanto custa o seu site?',
      text: 'Conte o que você precisa pelo WhatsApp. A mensagem já chega com o serviço marcado, e você recebe uma proposta por escrito.',
    },
  },

  'como-funciona-atendente-ia-no-whatsapp': {
    intro: [
      'Responder rápido no WhatsApp virou parte do atendimento de qualquer empresa, e é justamente aí que muita venda se perde: a mensagem chega à noite, no fim de semana ou no meio de um dia corrido, e o cliente procura outra opção. Um atendente com inteligência artificial resolve boa parte disso, desde que seja bem configurado.',
      'Este guia explica como esse atendente funciona por dentro, o que ele faz bem, onde precisa de limites e quais regras da Meta valem para quem usa o WhatsApp de forma profissional.',
    ],
    sections: [
      {
        id: 'o-que-e',
        heading: 'O que é, e o que não é, um atendente com IA',
        blocks: [
          {
            type: 'p',
            text: 'O atendente com IA é um assistente que conversa em linguagem natural pelo WhatsApp da empresa. Diferente dos robôs de menu (“digite 1 para orçamento”), ele entende a pergunta do jeito que o cliente escreveu e responde com base nas informações do negócio.',
          },
          {
            type: 'p',
            text: 'Ele não é um assistente de uso geral, que responde sobre qualquer assunto. Um bom atendente é focado: conhece os serviços, os horários, as políticas e os processos da empresa, e reconhece quando o assunto precisa ir para uma pessoa.',
          },
        ],
      },
      {
        id: 'ia-ou-menu',
        heading: 'Atendente com IA ou robô de menu?',
        blocks: [
          { type: 'p', text: 'Os dois têm lugar. O robô de menu funciona bem para fluxos curtos e previsíveis, como escolher um departamento. O atendente com IA se destaca quando as perguntas variam e o cliente escreve do jeito dele.' },
          {
            type: 'ul',
            items: [
              '**Menu:** previsível e simples de manter, mas frustra quando a dúvida não cabe nas opções.',
              '**IA:** entende perguntas abertas e conduz a conversa, mas precisa de uma base de conhecimento bem feita e de regras claras.',
              '**Combinação:** muitas empresas usam a IA para entender a necessidade e um fluxo guiado para etapas sensíveis, como confirmar um agendamento.',
            ],
          },
        ],
      },
      {
        id: 'aplicativo-ou-plataforma',
        heading: 'Aplicativo WhatsApp Business ou plataforma oficial?',
        blocks: [
          {
            type: 'p',
            text: 'O aplicativo WhatsApp Business, instalado no celular, foi pensado para o atendimento feito por pessoas, com recursos como respostas rápidas e mensagens de ausência. Automações com IA usam a plataforma oficial do WhatsApp para empresas, mantida pela Meta, acessada diretamente ou por meio de um provedor.',
          },
          {
            type: 'p',
            text: 'Usar a plataforma oficial é o que dá segurança ao número. Ferramentas não autorizadas, que simulam um celular conectado, violam os termos do WhatsApp e colocam o número em risco de bloqueio.',
          },
        ],
      },
      {
        id: 'como-a-ia-sabe-responder',
        heading: 'Como a IA sabe o que responder',
        blocks: [
          { type: 'p', text: 'O coração do atendente é a base de conhecimento: o conjunto de informações que ele pode usar. Normalmente ela inclui:' },
          {
            type: 'ul',
            items: [
              'Serviços e produtos, com o que está incluído em cada um.',
              'Faixas de preço ou a regra para orçamento, quando a empresa prefere não informar valores.',
              'Horários, endereço, área de atendimento e formas de pagamento.',
              'Políticas de troca, cancelamento, garantia e prazos.',
              'Perguntas frequentes e as respostas aprovadas pela empresa.',
            ],
          },
          {
            type: 'p',
            text: 'Quando o cliente pergunta, o sistema busca na base os trechos relacionados e a IA monta a resposta a partir deles. Junto com a base vão as instruções: o tom de voz da marca, o que o atendente nunca deve prometer e quando transferir a conversa.',
          },
          {
            type: 'p',
            text: 'Manter a base atualizada faz parte do trabalho. Mudou o horário ou um serviço? A base é atualizada e o atendente passa a responder certo.',
          },
        ],
      },
      {
        id: 'caminho-da-conversa',
        heading: 'O caminho de uma conversa',
        blocks: [
          {
            type: 'ol',
            items: [
              '**Recebe a mensagem** e identifica o que o cliente quer: tirar uma dúvida, pedir orçamento, agendar ou acompanhar um pedido.',
              '**Responde ou pergunta** o que falta, sempre a partir das informações aprovadas.',
              '**Coleta os dados** necessários para o próximo passo, como serviço, endereço e prazo.',
              '**Registra ou agenda**, quando há integração com a agenda, o CRM ou o sistema da empresa.',
              '**Transfere para a equipe** quando o caso pede uma pessoa, com o histórico da conversa junto.',
            ],
          },
          {
            type: 'p',
            text: 'Essa transferência é tão importante quanto as respostas. Reclamações, negociações e casos fora do padrão devem ir para a equipe, e o cliente precisa saber quando passa a falar com uma pessoa.',
          },
        ],
      },
      {
        id: 'integracoes',
        heading: 'Integrações que fazem diferença',
        blocks: [
          { type: 'p', text: 'Sozinho, o atendente responde. Integrado, ele resolve:' },
          {
            type: 'ul',
            items: [
              '**Agenda:** consulta horários e registra agendamentos para a equipe confirmar.',
              '**CRM ou planilha:** cada contato vira um registro, com os dados que o atendente coletou.',
              '**Sistemas internos:** consulta de pedidos, status de entrega ou ordens de serviço, quando o sistema da empresa permite.',
              '**Avisos para a equipe:** notificação no canal combinado quando chega um pedido importante.',
            ],
          },
          {
            type: 'p',
            text: 'Se a empresa ainda controla tudo em planilhas, vale ler também sobre [quando migrar da planilha para um sistema](/conteudos/sistema-personalizado-ou-planilha-quando-migrar).',
          },
        ],
      },
      {
        id: 'regras-da-meta',
        heading: 'Regras da Meta que você precisa conhecer',
        blocks: [
          {
            type: 'ul',
            items: [
              '**Janela de atendimento:** depois de cada mensagem do cliente, a empresa pode responder livremente por 24 horas. Fora dessa janela, só é possível iniciar a conversa com modelos de mensagem aprovados pela Meta.',
              '**Cobrança:** a Meta cobra alguns tipos de mensagem, conforme a tabela vigente dela. Esse custo é da plataforma e separado do projeto.',
              '**Conta empresarial:** a empresa precisa de uma conta empresarial na Meta, e algumas funções dependem da verificação do negócio.',
              '**Uso permitido:** as políticas da plataforma permitem atendentes de IA dedicados ao atendimento da própria empresa e não permitem assistentes de IA de uso geral.',
              '**Consentimento:** o cliente precisa ter aceitado receber mensagens da empresa, principalmente as mensagens iniciadas pela empresa.',
            ],
          },
          {
            type: 'p',
            text: 'As regras mudam de tempos em tempos, então a implantação deve sempre seguir a documentação oficial da Meta vigente no momento do projeto.',
          },
        ],
      },
      {
        id: 'cuidados',
        heading: 'Cuidados para a IA ajudar, e não atrapalhar',
        blocks: [
          {
            type: 'ul',
            items: [
              '**Respostas inventadas:** limite o atendente ao conteúdo aprovado e oriente-o a admitir quando não sabe, transferindo a conversa.',
              '**Promessas indevidas:** preços, prazos e condições especiais devem seguir regras claras, para a IA não oferecer o que a empresa não pode cumprir.',
              '**Dados pessoais:** a conversa envolve dados protegidos pela LGPD. Colete só o necessário, informe a finalidade e combine com o fornecedor como os dados são guardados.',
              '**Transparência:** o cliente deve saber que está falando com um assistente virtual.',
            ],
          },
        ],
      },
      {
        id: 'como-medir',
        heading: 'Como saber se está funcionando',
        blocks: [
          { type: 'p', text: 'Algumas perguntas ajudam a avaliar o atendente depois das primeiras semanas no ar:' },
          {
            type: 'ul',
            items: [
              'Quanto tempo o cliente espera pela primeira resposta?',
              'Quantas conversas viram orçamento ou agendamento?',
              'Quais perguntas acabam transferidas para a equipe, e por quê?',
              'Quais respostas os clientes não entenderam ou corrigiram?',
            ],
          },
          {
            type: 'p',
            text: 'As conversas transferidas mostram o que falta na base de conhecimento. Cada ajuste deixa o atendente mais útil para o cliente e para a equipe.',
          },
        ],
      },
      {
        id: 'exemplos-por-segmento',
        heading: 'Exemplos de uso por segmento',
        blocks: [
          { type: 'h3', text: 'Clínicas e consultórios' },
          { type: 'p', text: 'Responde sobre especialidades, convênios aceitos e preparo de exames, coleta os dados do paciente e encaminha o pedido de horário para a recepção confirmar.' },
          { type: 'h3', text: 'Prestadores de serviço' },
          { type: 'p', text: 'Entende o que o cliente precisa, pergunta endereço e urgência e entrega para a equipe um pedido de orçamento completo, sem idas e vindas.' },
          { type: 'h3', text: 'Comércio' },
          { type: 'p', text: 'Informa disponibilidade, formas de pagamento e entrega, e encaminha pedidos para a equipe separar, inclusive fora do horário comercial.' },
          { type: 'h3', text: 'Escolas e cursos' },
          { type: 'p', text: 'Responde sobre cursos, documentos e prazos de matrícula e passa para a secretaria os casos que precisam de atenção.' },
        ],
      },
      {
        id: 'como-comecar',
        heading: 'Como começar',
        blocks: [
          {
            type: 'p',
            text: 'O caminho mais seguro é começar pelo básico: perguntas frequentes, coleta de dados para orçamento e transferência para a equipe. Depois de validado, entram as integrações com agenda e sistemas.',
          },
          {
            type: 'p',
            text: 'Na E.F Solutions, o projeto começa pelo mapeamento das conversas reais da sua empresa e passa por testes antes de ir ao ar. Veja os detalhes em [atendente virtual com IA no WhatsApp](/automacao-whatsapp).',
          },
        ],
      },
    ],
    cta: {
      title: 'Quer um atendente com IA no seu WhatsApp?',
      text: 'Conte como é o atendimento da sua empresa hoje. A mensagem já chega com o serviço marcado.',
    },
  },

  'sistema-personalizado-ou-planilha-quando-migrar': {
    intro: [
      'A planilha é a primeira ferramenta de gestão de quase toda empresa, e com razão: é flexível, conhecida e está sempre à mão. O problema aparece aos poucos, quando o negócio cresce e a planilha continua a mesma.',
      'Este guia ajuda a reconhecer o momento de mudar, a comparar sistema pronto e sistema sob medida e a migrar sem parar a operação.',
    ],
    sections: [
      {
        id: 'por-que-a-planilha-funciona',
        heading: 'Por que a planilha funciona tão bem no começo',
        blocks: [
          {
            type: 'p',
            text: 'No início, poucas pessoas mexem nos dados, o volume é pequeno e o processo ainda está mudando. A planilha acompanha essas mudanças sem custo e sem depender de ninguém. Para muitas tarefas, ela continua sendo a melhor ferramenta, inclusive em empresas grandes.',
          },
          {
            type: 'p',
            text: 'A questão não é abandonar a planilha, e sim perceber quando ela deixou de ser uma ferramenta e virou o sistema da empresa, sem ter sido feita para isso.',
          },
        ],
      },
      {
        id: 'sinais-de-gargalo',
        heading: 'Sinais de que a planilha virou gargalo',
        blocks: [
          {
            type: 'ul',
            items: [
              '**Várias versões do mesmo arquivo** circulando por e-mail ou WhatsApp, e ninguém sabe qual é a certa.',
              '**Erros que custam caro:** uma fórmula apagada, uma linha duplicada, um estoque que não bate.',
              '**Retrabalho:** a mesma informação digitada em dois ou três lugares.',
              '**Falta de permissões:** qualquer pessoa pode ver e alterar tudo, inclusive dados financeiros.',
              '**Sem histórico:** quando algo muda, não dá para saber quem mudou nem quando.',
              '**Relatórios manuais:** fechar o mês exige horas de copiar, colar e conferir.',
              '**Dependência de uma pessoa:** só um funcionário entende a planilha e, quando ele falta, a operação trava.',
              '**Acesso difícil fora do escritório:** quem está em campo não consegue consultar nem atualizar nada pelo celular.',
            ],
          },
          {
            type: 'p',
            text: 'Se alguns desses sinais aparecem com frequência, a planilha provavelmente já custa mais do que parece, em tempo e em erros.',
          },
        ],
      },
      {
        id: 'tres-caminhos',
        heading: 'Três caminhos possíveis',
        blocks: [
          { type: 'h3', text: 'Organizar melhor a planilha' },
          {
            type: 'p',
            text: 'Às vezes o problema é de organização: separar abas, travar fórmulas, usar planilhas compartilhadas com permissões. É o passo mais barato e vale tentar enquanto o volume ainda é pequeno.',
          },
          { type: 'h3', text: 'Sistema pronto (ERP ou software de mercado)' },
          {
            type: 'p',
            text: 'Ferramentas prontas cobrem processos comuns, como vendas, estoque e financeiro, e começam a funcionar rápido. Funcionam bem quando o processo da empresa é parecido com o que a ferramenta espera. O custo costuma ser uma assinatura por usuário ou por módulo.',
          },
          { type: 'h3', text: 'Sistema sob medida' },
          {
            type: 'p',
            text: 'Um sistema feito para o seu processo, com as telas, as regras e as integrações que a operação precisa. Faz sentido quando a empresa tem um jeito próprio de trabalhar que faz parte da vantagem dela, quando paga por módulos que não usa ou quando mantém planilhas paralelas porque o sistema pronto não cobre tudo. Saiba mais sobre [sistemas de gestão sob medida](/sistemas-personalizados).',
          },
        ],
      },
      {
        id: 'o-que-um-sistema-resolve',
        heading: 'O que um sistema bem feito resolve',
        blocks: [
          {
            type: 'ul',
            items: [
              '**Uma fonte só da verdade:** todo mundo vê o mesmo dado, atualizado.',
              '**Regras do negócio no sistema:** o que antes dependia de lembrar, como um desconto máximo ou um estoque mínimo, passa a ser automático.',
              '**Permissões e histórico:** cada pessoa acessa o que precisa, e toda alteração fica registrada.',
              '**Relatórios na hora:** os números saem dos próprios dados, sem montagem manual.',
              '**Acesso pelo celular:** quem está na rua consulta e atualiza em tempo real.',
              '**Integrações:** nota fiscal, pagamentos, WhatsApp e outras ferramentas conversando entre si. Um [atendente com IA no WhatsApp](/conteudos/como-funciona-atendente-ia-no-whatsapp), por exemplo, pode registrar pedidos direto no sistema.',
            ],
          },
        ],
      },
      {
        id: 'processos-que-migram-primeiro',
        heading: 'Processos que costumam migrar primeiro',
        blocks: [
          {
            type: 'ul',
            items: [
              '**Orçamentos e vendas:** propostas padronizadas, histórico por cliente e acompanhamento de cada negociação.',
              '**Estoque:** entradas, saídas e alertas de reposição, sem contagem manual.',
              '**Ordens de serviço:** abertura, execução em campo e fechamento com fotos e assinatura.',
              '**Agenda:** horários da equipe, confirmações e remarcações num lugar só.',
              '**Financeiro:** contas a pagar e a receber ligadas às vendas e aos serviços.',
            ],
          },
          { type: 'p', text: 'A ordem certa depende de onde a empresa perde mais tempo hoje.' },
        ],
      },
      {
        id: 'web-ou-instalado',
        heading: 'Sistema web ou instalado no computador?',
        blocks: [
          { type: 'p', text: 'Sistemas web rodam no navegador, funcionam no celular e não exigem instalação em cada máquina. A atualização é feita uma vez e vale para todos. Sistemas instalados ainda fazem sentido em casos específicos, como operações sem internet confiável, mas para a maioria das empresas o sistema web é mais prático de manter e de acessar.' },
        ],
      },
      {
        id: 'como-migrar',
        heading: 'Como migrar sem parar a operação',
        blocks: [
          {
            type: 'ol',
            items: [
              '**Mapeie o processo real**, como ele acontece hoje, incluindo os atalhos que a equipe criou.',
              '**Escolha o primeiro módulo** pelo impacto: geralmente onde os erros ou o retrabalho são maiores.',
              '**Limpe os dados** antes de importar. Migrar uma planilha bagunçada só leva a bagunça para o sistema novo.',
              '**Rode em paralelo** por um período curto, conferindo se o sistema e a planilha batem.',
              '**Treine a equipe** com situações reais do dia a dia, e não só com um manual.',
              '**Evolua em etapas:** com o primeiro módulo em uso, os próximos ficam mais fáceis de definir.',
            ],
          },
        ],
      },
      {
        id: 'custo-e-prazo',
        heading: 'O que influencia custo e prazo',
        blocks: [
          { type: 'p', text: 'Sem conhecer o processo, qualquer número seria chute. O que mais pesa no orçamento de um sistema sob medida:' },
          {
            type: 'ul',
            items: [
              'A quantidade de módulos e telas.',
              'As regras de negócio e as exceções que o sistema precisa tratar.',
              'As integrações com outras ferramentas.',
              'O volume e a qualidade dos dados a migrar.',
              'Os relatórios e painéis necessários.',
              'O acesso pelo celular e a quantidade de perfis de usuário.',
            ],
          },
          {
            type: 'p',
            text: 'Começar por um primeiro módulo bem definido reduz o risco: a empresa investe numa parte, valida no dia a dia e decide os próximos passos com mais segurança.',
          },
        ],
      },
      {
        id: 'perguntas-ao-fornecedor',
        heading: 'Perguntas para fazer ao fornecedor',
        blocks: [
          {
            type: 'ul',
            items: [
              'De quem é o código-fonte e como funciona o acesso a ele?',
              'Onde o sistema fica hospedado e quem paga a hospedagem?',
              'Como são feitas as cópias de segurança e com que frequência?',
              'Como os dados podem ser exportados se a empresa quiser mudar de fornecedor?',
              'Como funcionam o suporte e as melhorias depois da entrega?',
              'Existe documentação do sistema?',
            ],
          },
          {
            type: 'p',
            text: 'Respostas claras, por escrito, são tão importantes quanto o sistema em si. Na E.F Solutions, esses pontos ficam definidos na proposta, antes do início do projeto.',
          },
        ],
      },
    ],
    cta: {
      title: 'A sua planilha já virou gargalo?',
      text: 'Conte como a sua empresa trabalha hoje e receba uma proposta por escrito, começando pelo módulo mais importante.',
    },
  },

  'como-aparecer-no-google-seo-local-empresas': {
    intro: [
      'Quando alguém pesquisa “eletricista perto de mim” ou “clínica odontológica em Campinas”, o Google mostra um mapa com algumas empresas e, logo abaixo, os sites. Aparecer nesses resultados é o objetivo do SEO local, e ele depende de um conjunto de ações que qualquer empresa consegue organizar.',
      'Este guia explica como o Google escolhe os resultados locais, o que fazer no Perfil da Empresa e no site e como medir se está funcionando.',
    ],
    sections: [
      {
        id: 'como-o-google-escolhe',
        heading: 'Como o Google escolhe os resultados locais',
        blocks: [
          { type: 'p', text: 'O próprio Google explica que os resultados locais dependem principalmente de três fatores:' },
          {
            type: 'ul',
            items: [
              '**Relevância:** o quanto o perfil e o site da empresa correspondem ao que a pessoa pesquisou.',
              '**Distância:** a proximidade entre a empresa, ou a área que ela atende, e a pessoa que pesquisa ou o local citado na busca.',
              '**Proeminência:** o quanto a empresa é conhecida, o que inclui avaliações, menções em outros sites e a posição do site nos resultados comuns.',
            ],
          },
          { type: 'p', text: 'A distância você não controla. Relevância e proeminência, sim, e é nelas que o trabalho se concentra.' },
        ],
      },
      {
        id: 'perfil-da-empresa',
        heading: 'Perfil da Empresa no Google: a base de tudo',
        blocks: [
          {
            type: 'p',
            text: 'O Perfil da Empresa (antigo Google Meu Negócio) é o que aparece no mapa e no painel lateral da busca. Para ele trabalhar a seu favor:',
          },
          {
            type: 'ul',
            items: [
              '**Verifique o perfil** com um endereço real. Quem atende no local do cliente pode ocultar o endereço e informar a área de atendimento.',
              '**Escolha a categoria principal certa:** ela pesa muito na relevância. Use categorias adicionais só para o que você realmente faz.',
              '**Use o nome real da empresa.** Acrescentar palavras-chave ao nome viola as diretrizes do Google e pode levar à suspensão do perfil.',
              '**Mantenha horários e contatos atualizados**, inclusive em feriados.',
              '**Publique fotos reais:** fachada, equipe e trabalhos feitos. Imagens genéricas não ajudam.',
              '**Cadastre produtos e serviços** com descrições claras.',
              '**Responda perguntas e avaliações** com regularidade.',
            ],
          },
        ],
      },
      {
        id: 'avaliacoes',
        heading: 'Avaliações: peça, responda e nunca invente',
        blocks: [
          {
            type: 'p',
            text: 'Avaliações fazem parte da proeminência e influenciam a decisão de quem está escolhendo. O caminho certo é simples: pedir a clientes reais, logo depois de um bom atendimento, com o link direto para avaliar.',
          },
          {
            type: 'p',
            text: 'Responda todas, inclusive as negativas, com educação e propondo solução. E nunca compre avaliações, troque avaliação por desconto ou crie avaliações falsas: além de violar as políticas do Google, isso destrói a confiança de quem lê.',
          },
        ],
      },
      {
        id: 'o-site-como-base',
        heading: 'O site como base do SEO local',
        blocks: [
          { type: 'p', text: 'O perfil leva ao site, e o site reforça o perfil. Um site preparado para buscas locais tem:' },
          {
            type: 'ul',
            items: [
              '**Páginas por serviço**, cada uma respondendo a uma busca específica.',
              '**Páginas por cidade ou região atendida**, com conteúdo próprio de verdade. Trocar só o nome da cidade num texto padrão cria páginas que o Google tende a ignorar.',
              '**Nome, endereço (quando houver) e telefone iguais** em todo o site, no perfil e nos diretórios.',
              '**Dados estruturados** de empresa, que ajudam o Google a entender quem é a empresa e onde ela atua.',
              '**Velocidade no celular:** boa parte das buscas locais acontece no celular, muitas vezes na rua.',
              '**Contato fácil:** botão de WhatsApp, telefone clicável e rota no mapa.',
            ],
          },
          {
            type: 'p',
            text: 'Um exemplo prático são as páginas de [criação de sites por cidade](/criacao-de-sites), com o contexto econômico de cada cidade em vez de um texto repetido.',
          },
        ],
      },
      {
        id: 'varias-cidades',
        heading: 'SEO local para quem atende várias cidades',
        blocks: [
          { type: 'p', text: 'Empresas que atendem uma região inteira não precisam de endereço em cada cidade, e nem devem inventar um. O caminho é:' },
          {
            type: 'ul',
            items: [
              'Informar a área de atendimento no Perfil da Empresa.',
              'Criar páginas para as cidades mais importantes, cada uma com conteúdo próprio: o que a empresa faz ali, para quem e como atende.',
              'Citar no site, de forma natural, as cidades onde já existem clientes e projetos.',
              'Acompanhar no Search Console quais cidades geram buscas e priorizar as próximas páginas pelos dados.',
            ],
          },
        ],
      },
      {
        id: 'citacoes-e-links',
        heading: 'Citações e links locais',
        blocks: [
          { type: 'p', text: 'Menções à empresa em outros sites também contam. Algumas fontes que valem a pena:' },
          {
            type: 'ul',
            items: [
              'Diretórios e guias de empresas da sua cidade e do seu setor.',
              'Associações comerciais, sindicatos e entidades do ramo.',
              'Parceiros e fornecedores que podem citar a sua empresa.',
              'Imprensa e blogs locais, quando há uma história relevante para contar.',
            ],
          },
          {
            type: 'p',
            text: 'Mantenha os dados iguais em todos eles. Telefone antigo num diretório e novo no site confundem o Google e o cliente.',
          },
        ],
      },
      {
        id: 'conteudo-local',
        heading: 'Conteúdo que responde dúvidas locais',
        blocks: [
          {
            type: 'p',
            text: 'Artigos que respondem perguntas reais do seu público, como o que considerar ao contratar, quais documentos levar ou como o serviço funciona, atraem visitas de quem ainda está decidindo. Cada conteúdo deve levar para a página do serviço e para o contato.',
          },
        ],
      },
      {
        id: 'checklist-do-perfil',
        heading: 'Checklist rápido do Perfil da Empresa',
        blocks: [
          {
            type: 'ul',
            items: [
              'Perfil verificado e com o nome real da empresa.',
              'Categoria principal e categorias adicionais corretas.',
              'Endereço ou área de atendimento definidos.',
              'Horários atualizados, inclusive em feriados.',
              'Telefone, site e link de WhatsApp corretos.',
              'Fotos reais e recentes.',
              'Serviços ou produtos cadastrados com descrição.',
              'Avaliações respondidas.',
            ],
          },
        ],
      },
      {
        id: 'erros-comuns',
        heading: 'Erros comuns que derrubam o SEO local',
        blocks: [
          {
            type: 'ul',
            items: [
              'Endereço falso ou virtual só para aparecer numa cidade.',
              'Palavras-chave no nome do perfil.',
              'Várias páginas de cidade com o mesmo texto.',
              'Avaliações compradas ou trocadas por benefícios.',
              'Dados de contato diferentes em cada lugar.',
              'Site lento ou que não funciona bem no celular.',
            ],
          },
        ],
      },
      {
        id: 'como-medir',
        heading: 'Como medir os resultados',
        blocks: [
          {
            type: 'ul',
            items: [
              '**Google Search Console:** mostra em quais buscas o site aparece, as impressões, os cliques e a posição média. Buscas com muitas impressões e poucos cliques pedem títulos e descrições melhores.',
              '**Métricas do Perfil da Empresa:** ligações, pedidos de rota, cliques para o site e mensagens.',
              '**Google Analytics 4:** quantas visitas vindas da busca viraram contato, com os eventos de conversão configurados.',
            ],
          },
          {
            type: 'p',
            text: 'Os resultados não aparecem de um dia para o outro. Ajustes no perfil e correções técnicas costumam surtir efeito antes; conteúdo novo e autoridade levam mais tempo, de acordo com a concorrência da sua região.',
          },
        ],
      },
      {
        id: 'por-onde-comecar',
        heading: 'Por onde começar',
        blocks: [
          {
            type: 'p',
            text: 'Se você ainda não tem o Perfil da Empresa, comece por ele. Se já tem, revise categoria, horários, fotos e avaliações, e depois olhe para o site: páginas por serviço, velocidade e dados estruturados.',
          },
          {
            type: 'p',
            text: 'Na E.F Solutions, o trabalho de [SEO técnico e SEO local](/seo-e-divulgacao) começa por um diagnóstico do site, do perfil e das buscas em que a empresa já aparece.',
          },
        ],
      },
    ],
    cta: {
      title: 'Quer aparecer para quem procura o seu serviço?',
      text: 'Conte onde a sua empresa atua e o que ela vende. A mensagem já chega com SEO marcado no orçamento.',
    },
  },
}

/** Texto corrido do artigo (sem marcação), para contar palavras e calcular o tempo de leitura. */
export function articlePlainText(content: ArticleContent): string {
  const parts = [
    ...content.intro,
    ...content.sections.flatMap((section) => [
      section.heading,
      ...section.blocks.flatMap((block) => ('items' in block ? block.items : [block.text])),
    ]),
  ]
  return parts
    .join(' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*/g, '')
}

/** Tempo de leitura em minutos (cerca de 200 palavras por minuto). */
export function readingMinutesOf(content: ArticleContent): number {
  const words = articlePlainText(content).match(/[\p{L}\p{N}]+/gu)?.length ?? 0
  return Math.max(1, Math.ceil(words / 200))
}
