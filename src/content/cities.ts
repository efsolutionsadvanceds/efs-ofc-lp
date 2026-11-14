import type { CitySlug } from './cityIndex'
import type { FaqItem } from './faq'

/**
 * Conteúdo das páginas de criação de sites por cidade. Cada página tem
 * texto próprio, escrito a partir da economia real da cidade: nada de
 * trocar só o nome da cidade num texto padrão (o que o Google trata como
 * página de entrada e ignora). O teste de similaridade em
 * src/content/cities.test.ts garante isso.
 *
 * Regras: só fatos conhecidos e verificáveis (universidades, rodovias,
 * polos econômicos); nenhum número, endereço ou cliente inventado; o
 * atendimento é sempre descrito como online.
 *
 * Carregado só com as rotas de cidade (fora do bundle inicial da home).
 */

export interface CitySector {
  name: string
  text: string
}

export interface CityContent {
  /** Abertura do hero, logo abaixo do H1. */
  intro: string
  /** Frase curta para o hub e o llms.txt. */
  summary: string
  /** Dois parágrafos: a economia local e o que ela pede de um site. */
  context: readonly [string, string]
  sectors: readonly [CitySector, CitySector, CitySector]
  faq: readonly [FaqItem, FaqItem, FaqItem]
  /** Outras cidades atendidas, das mais próximas para as mais distantes. */
  nearby: readonly CitySlug[]
}

export const CITY_CONTENT: Record<CitySlug, CityContent> = {
  'sao-paulo': {
    intro:
      'Na maior cidade do país, o site precisa abrir rápido, explicar o que você faz em segundos e aparecer quando alguém procura o seu serviço perto de onde está.',
    summary: 'Sites e SEO local por bairro e especialidade para o mercado mais disputado do país, da Paulista ao Brás.',
    context: [
      'São Paulo concentra sedes de empresas na Paulista e na Faria Lima, polos de moda no Brás e no Bom Retiro e um comércio popular que atrai compradores de todo o Brasil na 25 de Março. Em qualquer um desses mercados, o cliente compara opções no celular antes de entrar em contato.',
      'Por isso o trabalho começa pela busca local: páginas por serviço e por região, Perfil da Empresa no Google bem preenchido e um site leve, que abre rápido até no 4G do metrô. O contato vai direto para o WhatsApp, sem formulário.',
    ],
    sectors: [
      {
        name: 'Moda e atacado',
        text: 'Catálogo online ou loja virtual para vender no atacado e no varejo, com pedidos que chegam organizados pelo WhatsApp.',
      },
      {
        name: 'Clínicas e consultórios',
        text: 'Especialidades, convênios e localização claros, agendamento pelo WhatsApp e páginas pensadas para buscas como “dentista em Moema”.',
      },
      {
        name: 'Escritórios e serviços profissionais',
        text: 'Advocacia, contabilidade e consultorias com site sóbrio, conteúdo que responde as dúvidas dos clientes e um sistema para organizar a rotina.',
      },
    ],
    faq: [
      {
        question: 'Vale a pena investir em SEO numa cidade tão concorrida como São Paulo?',
        answer:
          'Vale, desde que a estratégia seja específica. Em vez de disputar termos genéricos, o site trabalha o seu serviço junto com o bairro ou a região que você atende, combinado com o Perfil da Empresa no Google. É assim que negócios locais aparecem para quem está perto e pronto para contratar.',
      },
      {
        question: 'Dá para ter uma página para cada região da cidade que eu atendo?',
        answer:
          'Dá. Quando faz sentido para o negócio, criamos páginas para as regiões atendidas, cada uma com conteúdo próprio (serviços, perguntas comuns e formas de contato), em vez de repetir o mesmo texto trocando o nome do bairro, o que o Google tende a ignorar.',
      },
      {
        question: 'Vocês fazem loja virtual para quem vende no atacado?',
        answer:
          'Fazemos. A loja pode ter preços de atacado e varejo, pedido mínimo e catálogo por coleção. Se preferir começar com algo mais simples, um catálogo online com pedido pelo WhatsApp já resolve boa parte das vendas.',
      },
    ],
    nearby: ['guarulhos', 'osasco', 'santo-andre', 'sao-bernardo-do-campo', 'barueri'],
  },

  campinas: {
    intro:
      'Do comércio dos bairros às empresas de tecnologia que cresceram em torno da Unicamp, Campinas tem clientes exigentes, que pesquisam no Google e comparam antes de chamar.',
    summary: 'Sites para o polo de tecnologia, a logística de Viracopos e a rede de saúde da região.',
    context: [
      'Campinas reúne universidades e centros de pesquisa como a Unicamp, o CPqD e o Sirius, além do aeroporto de Viracopos, forte em cargas, e do eixo das rodovias Anhanguera e Bandeirantes. É uma economia em que muita venda acontece entre empresas e começa com uma busca.',
      'Para esse público, o site precisa transmitir competência técnica: o que a empresa faz, para quem e como contratar, em páginas leves e bem estruturadas para o Google. Sistemas sob medida entram quando a operação já não cabe em planilhas.',
    ],
    sectors: [
      {
        name: 'Tecnologia e startups',
        text: 'Site institucional e landing pages por produto, com textos claros para quem decide a compra e integração com as ferramentas que o time já usa.',
      },
      {
        name: 'Logística e comércio exterior',
        text: 'Páginas que explicam rotas, modais e prazos, além de sistemas para cotação e acompanhamento de cargas no lugar de e-mails e planilhas.',
      },
      {
        name: 'Saúde',
        text: 'Clínicas e consultórios com site organizado por especialidade, agendamento pelo WhatsApp e um atendente virtual para as dúvidas fora do horário.',
      },
    ],
    faq: [
      {
        question: 'O site ajuda empresas que vendem para outras empresas (B2B)?',
        answer:
          'Ajuda, e é um dos casos em que ele mais pesa. Quem compra para uma empresa pesquisa, compara e leva a decisão para outras pessoas. Um site claro, com o que a empresa faz, para quais casos e um contato fácil, encurta esse caminho.',
      },
      {
        question: 'Dá para integrar o site com o sistema que a empresa já usa?',
        answer:
          'Na maioria dos casos, sim. Formulários, catálogos e pedidos podem conversar com o seu ERP, CRM ou planilha por meio de integrações. Avaliamos o que o seu sistema permite antes de fechar o escopo.',
      },
      {
        question: 'Vocês atendem empresas de toda a Região Metropolitana de Campinas?',
        answer:
          'Atendemos. Como o atendimento é online, empresas de Valinhos, Vinhedo, Hortolândia, Sumaré, Paulínia e de toda a região são atendidas do mesmo jeito que as de Campinas.',
      },
    ],
    nearby: ['jundiai', 'piracicaba', 'sorocaba', 'sao-paulo'],
  },

  guarulhos: {
    intro:
      'Com o aeroporto mais movimentado do país e um parque industrial forte, Guarulhos tem empresas que vendem para todo o Brasil e precisam ser encontradas por quem nunca passou por lá.',
    summary: 'Sites para indústria, logística e serviços que giram em torno do aeroporto mais movimentado do país.',
    context: [
      'Segunda cidade mais populosa do estado, Guarulhos combina o Aeroporto Internacional, um parque industrial diversificado e a ligação com a Via Dutra e a Fernão Dias. Isso atrai transportadoras, centros de distribuição, hotéis e uma rede grande de comércio e serviços.',
      'Boa parte desses negócios vende para fora da cidade, para clientes que chegam pelo Google. O site precisa deixar claro o que a empresa faz, onde atua e como pedir uma cotação, sem obrigar ninguém a ligar para descobrir o básico.',
    ],
    sectors: [
      {
        name: 'Logística e transporte',
        text: 'Site com serviços, regiões atendidas e pedido de cotação pelo WhatsApp, além de sistemas para controlar coletas, entregas e frota.',
      },
      {
        name: 'Indústria',
        text: 'Catálogo técnico de produtos com fichas e aplicações, para o comprador encontrar a peça certa e pedir orçamento sem depender de um vendedor.',
      },
      {
        name: 'Hotelaria e serviços para viajantes',
        text: 'Páginas rápidas para quem pesquisa no celular a caminho do aeroporto, com localização, tarifas e reserva ou contato em poucos toques.',
      },
    ],
    faq: [
      {
        question: 'Vocês fazem catálogo online para indústria?',
        answer:
          'Fazemos. O catálogo organiza produtos por linha e aplicação, com fichas técnicas e pedido de orçamento por item. Ele pode ser atualizado pela sua equipe, sem depender de nós a cada mudança.',
      },
      {
        question: 'Dá para criar um sistema de controle de entregas sob medida?',
        answer:
          'Dá. Um sistema web pode registrar coletas, rotas, entregas e comprovantes, com acesso pelo celular para os motoristas e relatórios para o escritório. O escopo é definido a partir da sua operação.',
      },
      {
        question: 'Meus clientes são de outras cidades. O SEO ainda ajuda?',
        answer:
          'Ajuda. O SEO não precisa ficar restrito a Guarulhos: as páginas são escritas para os serviços e as regiões que você atende, o que inclui clientes de outras cidades e estados que pesquisam pelo que você vende.',
      },
    ],
    nearby: ['sao-paulo', 'mogi-das-cruzes', 'sao-jose-dos-campos'],
  },

  'sao-bernardo-do-campo': {
    intro:
      'Berço da indústria automobilística no Brasil, São Bernardo do Campo tem uma cadeia de fornecedores, oficinas e lojas que vende melhor quando é fácil de achar no Google.',
    summary: 'Sites para a cadeia automotiva, a indústria e o comércio de móveis do ABC.',
    context: [
      'A cidade cresceu com as montadoras instaladas ao longo da Via Anchieta e até hoje reúne fábricas, fornecedores de autopeças, metalúrgicas e prestadores de serviço industrial. Ao lado disso, tem um comércio forte, com tradição em lojas de móveis.',
      'Nesse mercado, a compra costuma começar com uma pesquisa por especificação ou por proximidade. Um site com produtos e serviços bem descritos, fotos reais e contato rápido pelo WhatsApp coloca a empresa na lista de quem vai pedir orçamento.',
    ],
    sectors: [
      {
        name: 'Autopeças e metalurgia',
        text: 'Catálogo de produtos e capacidades da fábrica (processos, materiais, certificações) para compradores que procuram um novo fornecedor.',
      },
      {
        name: 'Lojas de móveis e planejados',
        text: 'Site com ambientes, materiais e projetos já entregues, além de agendamento de visita técnica pelo WhatsApp.',
      },
      {
        name: 'Oficinas e serviços automotivos',
        text: 'Página com serviços, marcas atendidas e localização, pensada para buscas como “oficina perto de mim” e ligada ao Perfil da Empresa no Google.',
      },
    ],
    faq: [
      {
        question: 'Um site ajuda uma metalúrgica a conseguir novos clientes?',
        answer:
          'Ajuda, principalmente quando descreve em detalhe o que a fábrica faz: processos, materiais, tolerâncias e setores atendidos. Compradores pesquisam por esses termos, e um site técnico e claro facilita entrar na lista de fornecedores.',
      },
      {
        question: 'Vocês fazem site para loja de móveis planejados?',
        answer:
          'Fazemos. O site mostra ambientes e projetos com fotos reais da loja, explica o processo do projeto à instalação e leva o visitante para o WhatsApp para agendar a visita técnica.',
      },
      {
        question: 'Vocês atendem as outras cidades do ABC?',
        answer:
          'Atendemos. Como o atendimento é online, empresas de Santo André, São Caetano do Sul, Diadema e Mauá são atendidas da mesma forma que as de São Bernardo do Campo.',
      },
    ],
    nearby: ['santo-andre', 'sao-paulo', 'santos'],
  },

  'santo-andre': {
    intro:
      'Do comércio do centro às pousadas de Paranapiacaba, Santo André tem negócios muito diferentes entre si, e cada um precisa de um site que fale com o próprio cliente.',
    summary: 'Sites para o comércio do centro e dos bairros, a indústria química e o turismo de Paranapiacaba.',
    context: [
      'Santo André é o A do ABC: tem um centro comercial movimentado, bairros com comércio próprio, a UFABC e parte do Polo Petroquímico de Capuava. No distrito de Paranapiacaba, a vila ferroviária na Serra do Mar recebe visitantes o ano todo.',
      'Essa variedade pede sites com propósitos claros: para a loja do bairro, aparecer no Google Maps e receber pedidos pelo WhatsApp; para a indústria, explicar capacidades técnicas; para o turismo, mostrar o lugar e facilitar a reserva.',
    ],
    sectors: [
      {
        name: 'Comércio e serviços de bairro',
        text: 'Site leve e Perfil da Empresa bem preenchido para aparecer nas buscas locais, com horário, localização e contato pelo WhatsApp.',
      },
      {
        name: 'Indústria química e fornecedores',
        text: 'Páginas técnicas com produtos, normas e segmentos atendidos, para quem compra pesquisando especificações.',
      },
      {
        name: 'Turismo em Paranapiacaba',
        text: 'Site para pousadas, restaurantes e guias, com fotos, roteiros e reserva pelo WhatsApp, pensado para quem planeja a visita pelo celular.',
      },
    ],
    faq: [
      {
        question: 'Vocês fazem site para pousada ou restaurante em Paranapiacaba?',
        answer:
          'Fazemos. O site reúne fotos, como chegar, horários e o que o visitante encontra por lá, com reserva ou contato pelo WhatsApp. Também cuidamos do Perfil da Empresa no Google, que aparece para quem pesquisa a vila.',
      },
      {
        question: 'Como aparecer no Google Maps para quem procura comércio no meu bairro?',
        answer:
          'O primeiro passo é o Perfil da Empresa no Google, com a categoria certa, horário, fotos e endereço consistentes. O site complementa com páginas sobre os seus serviços e a sua região, o que reforça a relevância local.',
      },
      {
        question: 'Um negócio pequeno precisa mesmo de site se já tem Instagram?',
        answer:
          'O Instagram ajuda quem já conhece a marca. O site é o que aparece para quem pesquisa no Google sem conhecer você, e é onde ficam as informações que convencem: serviços, faixas de preço, localização e contato.',
      },
    ],
    nearby: ['sao-bernardo-do-campo', 'sao-paulo', 'santos'],
  },

  osasco: {
    intro:
      'Do movimento do Calçadão às grandes empresas instaladas na cidade, Osasco tem clientes que pesquisam no celular antes de comprar ou contratar e escolhem quem aparece primeiro.',
    summary: 'Sites para o comércio do Calçadão, os serviços financeiros e as empresas da Castello Branco.',
    context: [
      'Osasco abriga a sede de um dos maiores bancos do país, na Cidade de Deus, um centro comercial forte no Calçadão e empresas ao longo da Castello Branco, da Anhanguera e do Rodoanel. Isso movimenta escritórios de contabilidade, corretoras, lojas e prestadores de serviço.',
      'Para quem vende para moradores e para empresas da região, o site é a vitrine que trabalha fora do horário comercial: mostra o que você oferece, tira as dúvidas mais comuns e manda o contato pronto para o WhatsApp.',
    ],
    sectors: [
      {
        name: 'Varejo e comércio de rua',
        text: 'Catálogo ou loja virtual com retirada na loja e pedidos pelo WhatsApp, para vender também para quem não passa pelo centro.',
      },
      {
        name: 'Contabilidade, corretoras e serviços financeiros',
        text: 'Site institucional que transmite confiança, com serviços explicados em linguagem simples e um atendente virtual para as dúvidas recorrentes.',
      },
      {
        name: 'Logística e serviços para empresas',
        text: 'Páginas de serviço com área de atuação, diferenciais e pedido de cotação, prontas para quem pesquisa fornecedores no Google.',
      },
    ],
    faq: [
      {
        question: 'Um escritório de contabilidade em Osasco precisa de site?',
        answer:
          'Precisa, porque é no Google que muita empresa procura um novo contador. Um site com os serviços explicados em linguagem simples, perguntas frequentes e contato pelo WhatsApp gera confiança antes da primeira conversa.',
      },
      {
        question: 'O atendente virtual com IA responde dúvidas sobre serviços financeiros?',
        answer:
          'Responde as dúvidas recorrentes, como documentos necessários, prazos e como funciona cada serviço, sempre a partir das informações que você aprova. Casos específicos são passados para a sua equipe.',
      },
      {
        question: 'Dá para vender online e manter a retirada na loja física?',
        answer:
          'Dá. A loja virtual pode oferecer retirada no endereço da loja, entrega na região ou as duas opções, e os pedidos chegam organizados para a sua equipe separar.',
      },
    ],
    nearby: ['barueri', 'sao-paulo', 'sorocaba'],
  },

  sorocaba: {
    intro:
      'Polo industrial do interior paulista, Sorocaba tem fábricas, fornecedores e um comércio que atende toda a região, e boa parte dos clientes chega pesquisando no Google.',
    summary: 'Sites para o polo industrial, os fornecedores e o comércio que atende toda a região.',
    context: [
      'Conhecida no passado como a Manchester Paulista pela indústria têxtil, Sorocaba se tornou um polo industrial diversificado, com montadoras, metalmecânica e fornecedores, servido pela Castello Branco e pela Raposo Tavares. A cidade também é referência de comércio e serviços para os municípios vizinhos.',
      'Para fornecedores industriais, o site funciona como um catálogo técnico aberto 24 horas. Para o comércio, é o que garante presença nas buscas de quem mora em cidades próximas e vem a Sorocaba para comprar.',
    ],
    sectors: [
      {
        name: 'Indústria e fornecedores',
        text: 'Site com capacidades produtivas, certificações e setores atendidos, para entrar no radar de compradores de outras fábricas.',
      },
      {
        name: 'Serviços industriais',
        text: 'Manutenção, automação e engenharia com páginas por serviço e pedido de visita técnica pelo WhatsApp.',
      },
      {
        name: 'Comércio regional',
        text: 'Loja virtual ou catálogo com entrega na região, para vender também para quem mora fora de Sorocaba.',
      },
    ],
    faq: [
      {
        question: 'Vocês fazem site para empresas de manutenção industrial?',
        answer:
          'Fazemos. O site organiza os serviços (manutenção preventiva, corretiva, automação), os setores atendidos e a forma de contratação, com pedido de visita técnica direto pelo WhatsApp.',
      },
      {
        question: 'Um sistema sob medida ajuda a controlar ordens de serviço?',
        answer:
          'Ajuda. Um sistema web pode registrar ordens de serviço, técnicos, peças e prazos, com acesso pelo celular em campo e relatórios para a gestão, no lugar de papel e planilhas espalhadas.',
      },
      {
        question: 'Consigo aparecer no Google para clientes de cidades vizinhas?',
        answer:
          'Consegue. As páginas do site podem citar as cidades e regiões que você atende de fato, e o Perfil da Empresa no Google define a área de atendimento. Assim o site aparece para quem pesquisa nesses lugares.',
      },
    ],
    nearby: ['jundiai', 'campinas', 'piracicaba', 'barueri'],
  },

  'ribeirao-preto': {
    intro:
      'Conhecida como capital do agronegócio e sede da Agrishow, Ribeirão Preto tem empresas que vendem para produtores de todo o país e precisam ser encontradas muito além da cidade.',
    summary: 'Sites para revendas e serviços do agronegócio, a rede de saúde e o comércio regional.',
    context: [
      'A economia de Ribeirão Preto gira em torno do agronegócio, com usinas, revendas de máquinas e insumos e empresas de serviços para o campo. A cidade também é um polo de saúde e ensino, com o campus da USP e o Hospital das Clínicas, e de comércio para toda a região.',
      'Quem vende para o produtor rural compete com fornecedores de outros estados, e a pesquisa começa no celular. Um site com produtos, condições e contato rápido pelo WhatsApp encurta a negociação, e sistemas sob medida ajudam a organizar pedidos e entregas.',
    ],
    sectors: [
      {
        name: 'Revendas e serviços do agronegócio',
        text: 'Catálogo de máquinas, peças e insumos com pedido de orçamento pelo WhatsApp, pensado para o produtor que pesquisa no campo.',
      },
      {
        name: 'Saúde',
        text: 'Site para clínicas e laboratórios com especialidades, exames e convênios, além de agendamento e respostas automáticas fora do horário.',
      },
      {
        name: 'Comércio e serviços regionais',
        text: 'Presença no Google para quem vem de cidades vizinhas, com localização, horários e catálogo sempre atualizados.',
      },
    ],
    faq: [
      {
        question: 'Vocês fazem catálogo online para revenda de máquinas agrícolas?',
        answer:
          'Fazemos. O catálogo organiza máquinas, peças e implementos por marca e aplicação, com fotos, fichas técnicas e pedido de orçamento por item, direto para o WhatsApp do vendedor certo.',
      },
      {
        question: 'O atendente virtual ajuda a agendar exames em clínica?',
        answer:
          'Ajuda. Ele responde dúvidas sobre exames, preparo e convênios e coleta os dados do agendamento para a sua equipe confirmar, 24 horas por dia.',
      },
      {
        question: 'Meus clientes são produtores de outras regiões. O site ajuda a alcançá-los?',
        answer:
          'Ajuda. O conteúdo é escrito para os produtos e as culturas que você atende, e não só para Ribeirão Preto, então o site aparece para produtores que pesquisam esses termos em qualquer região.',
      },
    ],
    nearby: ['sao-jose-do-rio-preto', 'piracicaba', 'campinas'],
  },

  'sao-jose-dos-campos': {
    intro:
      'Sede da Embraer, do ITA e do INPE, São José dos Campos é um polo de tecnologia, e quem compra lá costuma avaliar o site com olhar técnico antes de fazer contato.',
    summary: 'Sites para o polo aeroespacial, as empresas do Parque Tecnológico e os serviços do Vale do Paraíba.',
    context: [
      'A cidade concentra a indústria aeroespacial e de defesa, centros de pesquisa como o DCTA e o INPE e o Parque Tecnológico, além de ser o principal centro de comércio e serviços do Vale do Paraíba, às margens da Via Dutra.',
      'Nesse ambiente, um site lento ou genérico passa uma impressão ruim. O que funciona é clareza técnica: o que a empresa entrega, com quais padrões e para quem, em páginas rápidas e bem estruturadas para o Google.',
    ],
    sectors: [
      {
        name: 'Fornecedores da indústria aeroespacial',
        text: 'Site com capacidades, certificações e processos, escrito para compradores técnicos e equipes de qualidade.',
      },
      {
        name: 'Empresas de tecnologia',
        text: 'Landing pages por produto, documentação clara e integração com as ferramentas de vendas do time.',
      },
      {
        name: 'Comércio e serviços do Vale',
        text: 'Presença no Google para clientes de Jacareí, Taubaté e cidades vizinhas, com catálogo e contato pelo WhatsApp.',
      },
    ],
    faq: [
      {
        question: 'Vocês fazem site para empresas com certificações de qualidade?',
        answer:
          'Fazemos. O site apresenta as certificações, os processos e os setores atendidos de forma organizada, o que facilita o trabalho de quem avalia fornecedores e precisa dessas informações antes do primeiro contato.',
      },
      {
        question: 'Dá para criar uma landing page para cada produto ou serviço?',
        answer:
          'Dá, e costuma funcionar bem. Cada página fala com um público e uma busca específica, com uma chamada para ação própria. Isso também ajuda a medir quais produtos geram mais contatos.',
      },
      {
        question: 'Vocês atendem outras cidades do Vale do Paraíba?',
        answer:
          'Atendemos. Como o atendimento é online, empresas de Jacareí, Taubaté, Caçapava e de todo o Vale são atendidas do mesmo jeito que as de São José dos Campos.',
      },
    ],
    nearby: ['mogi-das-cruzes', 'guarulhos', 'sao-paulo'],
  },

  barueri: {
    intro:
      'Com Alphaville e Tamboré concentrando sedes de empresas e condomínios, Barueri tem um público exigente, que espera de um site a mesma qualidade que espera do serviço.',
    summary: 'Sites para as empresas de Alphaville e Tamboré, serviços de alto padrão e logística.',
    context: [
      'Barueri reúne centros empresariais em Alphaville e Tamboré, áreas residenciais de alto padrão e galpões logísticos ao longo da Castello Branco. A cidade tem uma economia de serviços forte, que atende tanto empresas quanto moradores.',
      'Para esse público, o site faz parte da primeira impressão: precisa ser rápido, bem escrito e fácil de usar no celular, com o contato a um toque. Para empresas de serviço, um atendente virtual ajuda a responder rápido sem sobrecarregar a equipe.',
    ],
    sectors: [
      {
        name: 'Empresas e sedes corporativas',
        text: 'Site institucional com posicionamento claro, páginas de serviço e área para clientes ou parceiros, quando necessário.',
      },
      {
        name: 'Serviços de alto padrão',
        text: 'Clínicas de estética, escolas, academias e serviços residenciais com site elegante, agenda pelo WhatsApp e avaliações reais em destaque.',
      },
      {
        name: 'Logística e galpões',
        text: 'Páginas com estrutura, localização e serviços, mais sistemas para controle de estoque e expedição.',
      },
    ],
    faq: [
      {
        question: 'Vocês fazem site para clínica de estética em Alphaville?',
        answer:
          'Fazemos. O site apresenta tratamentos, equipe e estrutura com fotos reais, responde as dúvidas mais comuns e leva para o agendamento pelo WhatsApp. O atendente virtual pode tirar dúvidas fora do horário.',
      },
      {
        question: 'Um site rápido faz diferença para quem acessa pelo celular?',
        answer:
          'Faz muita diferença. Quanto mais o site demora para abrir, mais gente desiste antes de ver o conteúdo. Por isso usamos páginas leves, imagens otimizadas e código enxuto, medidos com as ferramentas do próprio Google.',
      },
      {
        question: 'Dá para ter uma área restrita para clientes no site?',
        answer:
          'Dá. Uma área com login pode reunir documentos, pedidos, relatórios ou agendamentos de cada cliente. Ela é desenvolvida sob medida, de acordo com o que a sua empresa precisa entregar.',
      },
    ],
    nearby: ['osasco', 'sao-paulo', 'sorocaba'],
  },

  santos: {
    intro:
      'Com o maior porto da América Latina e uma orla que recebe visitantes o ano todo, Santos tem negócios que atendem do importador ao turista, e todos começam a ser escolhidos no Google.',
    summary: 'Sites para o comércio exterior e a logística portuária, o turismo na orla e as imobiliárias.',
    context: [
      'O Porto de Santos movimenta despachantes aduaneiros, agentes de carga, transportadoras e armazéns. A cidade também vive do turismo e da gastronomia na orla, do jardim de praia reconhecido como o maior do mundo e de um mercado imobiliário ativo.',
      'Para empresas ligadas ao porto, o site precisa explicar serviços complexos de forma simples e, muitas vezes, em mais de um idioma. Para turismo e imóveis, contam fotos reais, localização e contato rápido pelo WhatsApp.',
    ],
    sectors: [
      {
        name: 'Comércio exterior e logística portuária',
        text: 'Serviços aduaneiros e logísticos explicados com clareza, versão em inglês quando necessário e pedido de cotação.',
      },
      {
        name: 'Turismo e gastronomia',
        text: 'Hotéis, pousadas e restaurantes com cardápio, fotos, localização e reservas pelo WhatsApp, prontos para quem pesquisa no celular.',
      },
      {
        name: 'Imobiliárias',
        text: 'Vitrine de imóveis com filtros, fotos e contato direto com o corretor, além de páginas por bairro para as buscas locais.',
      },
    ],
    faq: [
      {
        question: 'Vocês fazem site bilíngue para empresas de comércio exterior?',
        answer:
          'Fazemos. O site pode ter versão em inglês, ou em outros idiomas, com a mesma estrutura e configurado para que o Google mostre a versão certa para cada público.',
      },
      {
        question: 'Dá para fazer um site de imobiliária com busca de imóveis?',
        answer:
          'Dá. O site pode ter busca por bairro, tipo, faixa de preço e número de quartos, com uma página para cada imóvel e contato direto com o corretor pelo WhatsApp.',
      },
      {
        question: 'O site ajuda a atrair turistas para hotel ou restaurante na orla?',
        answer:
          'Ajuda, junto com o Perfil da Empresa no Google. Fotos reais, cardápio ou acomodações, localização e avaliações respondidas fazem diferença para quem está escolhendo onde ficar ou comer.',
      },
    ],
    nearby: ['sao-bernardo-do-campo', 'santo-andre', 'sao-paulo'],
  },

  jundiai: {
    intro:
      'Entre São Paulo e Campinas, às margens da Anhanguera e da Bandeirantes, Jundiaí une centros de distribuição, indústrias e o agroturismo das adegas e da Festa da Uva.',
    summary: 'Sites para centros de distribuição, indústria e o agroturismo das adegas e da Festa da Uva.',
    context: [
      'A localização fez de Jundiaí um polo logístico e industrial, com centros de distribuição e fábricas que atendem a capital e o interior. Ao mesmo tempo, a cidade mantém a tradição da uva e do vinho, a Serra do Japi e roteiros de agroturismo que atraem visitantes nos fins de semana.',
      'São públicos bem diferentes: empresas que contratam serviços logísticos e famílias que procuram um passeio. Em comum, todos pesquisam no Google e decidem rápido, e o site precisa responder o essencial logo na primeira tela.',
    ],
    sectors: [
      {
        name: 'Logística e centros de distribuição',
        text: 'Site com estrutura, localização estratégica e serviços, mais sistemas para controle de armazenagem e expedição.',
      },
      {
        name: 'Indústria',
        text: 'Catálogo técnico e páginas de capacidades para compradores de outras empresas, com pedido de orçamento direto.',
      },
      {
        name: 'Adegas e agroturismo',
        text: 'Site com produtos, visitas, eventos e venda online ou pelo WhatsApp, para quem planeja o passeio pelo celular.',
      },
    ],
    faq: [
      {
        question: 'Vocês fazem loja virtual para adega ou produtor de vinho?',
        answer:
          'Fazemos. A loja pode vender vinhos, sucos e produtos da propriedade, com regras de entrega por região, e o site também divulga visitas e eventos, com reserva pelo WhatsApp.',
      },
      {
        question: 'Um sistema sob medida ajuda a gerenciar um armazém?',
        answer:
          'Ajuda. Um sistema web pode controlar entradas, saídas, endereçamento e expedição, com leitura pelo celular e relatórios para os clientes, adaptado ao jeito que o seu armazém já trabalha.',
      },
      {
        question: 'Vocês atendem empresas de Itupeva, Louveira e Várzea Paulista?',
        answer:
          'Atendemos. Como o atendimento é online, empresas de toda a região de Jundiaí são atendidas do mesmo jeito que as da cidade.',
      },
    ],
    nearby: ['campinas', 'sao-paulo', 'sorocaba'],
  },

  'sao-jose-do-rio-preto': {
    intro:
      'Polo de saúde, comércio e serviços do noroeste paulista, São José do Rio Preto atende gente de dezenas de cidades vizinhas, e é no Google que esse público decide aonde ir.',
    summary: 'Sites para a rede de saúde, o comércio e os serviços que atendem todo o noroeste paulista.',
    context: [
      'Com hospitais de referência como o Hospital de Base, a Famerp e uma rede grande de clínicas e laboratórios, Rio Preto recebe pacientes de toda a região. O comércio e os serviços seguem o mesmo movimento e atendem moradores de muitos municípios do entorno.',
      'Para quem viaja para ser atendido, a pesquisa vem antes da viagem: localização, especialidades, horários e como agendar. Um site claro, com agendamento pelo WhatsApp, faz o paciente ou o cliente escolher com segurança.',
    ],
    sectors: [
      {
        name: 'Clínicas, hospitais e laboratórios',
        text: 'Site por especialidade, com corpo clínico, convênios e agendamento pelo WhatsApp, mais um atendente virtual para as dúvidas fora do horário.',
      },
      {
        name: 'Comércio regional',
        text: 'Loja virtual ou catálogo com entrega para as cidades da região, para vender também para quem não pode ir até a loja.',
      },
      {
        name: 'Serviços profissionais',
        text: 'Escritórios, escolas e prestadores de serviço com site institucional e conteúdo que responde as perguntas que os clientes fazem.',
      },
    ],
    faq: [
      {
        question: 'Vocês fazem site para clínica médica em Rio Preto?',
        answer:
          'Fazemos. O site apresenta especialidades, médicos, convênios e localização, com agendamento pelo WhatsApp e conteúdo pensado para as buscas que os pacientes fazem.',
      },
      {
        question: 'O atendente virtual ajuda a atender pacientes de outras cidades?',
        answer:
          'Ajuda. Ele responde a qualquer hora sobre localização, preparo, documentos e convênios e encaminha o agendamento para a sua equipe, o que facilita muito para quem vem de outra cidade.',
      },
      {
        question: 'Consigo vender pela internet para clientes de cidades da região?',
        answer:
          'Consegue. A loja virtual pode calcular a entrega por cidade ou oferecer retirada, e as páginas do site podem citar as cidades que você atende para aparecer nas buscas de quem mora lá.',
      },
    ],
    nearby: ['ribeirao-preto', 'campinas', 'sao-paulo'],
  },

  piracicaba: {
    intro:
      'Da Esalq à Rua do Porto, Piracicaba junta ciência agrícola, indústria e turismo, e tem empresas que vendem para o Brasil inteiro a partir do interior.',
    summary: 'Sites para a agroindústria, os fornecedores da indústria automotiva e o turismo da Rua do Porto.',
    context: [
      'Piracicaba é referência em ciências agrárias, com a Esalq/USP, e tem um setor sucroenergético forte, com usinas e fabricantes de equipamentos. A cidade também recebeu fábricas como as da Hyundai e da Caterpillar, que movimentam uma rede de fornecedores.',
      'Ao longo do rio, a Rua do Porto concentra restaurantes e passeios que atraem visitantes. Seja para vender equipamentos ou servir um almoço de domingo, o caminho do cliente começa numa busca, e o site precisa estar lá.',
    ],
    sectors: [
      {
        name: 'Agroindústria e setor sucroenergético',
        text: 'Site técnico com equipamentos, serviços e projetos já entregues, para compradores de usinas e produtores.',
      },
      {
        name: 'Fornecedores da indústria automotiva',
        text: 'Páginas de capacidades, certificações e processos, escritas para equipes de compras e de qualidade.',
      },
      {
        name: 'Restaurantes e turismo na Rua do Porto',
        text: 'Site com cardápio, fotos, localização e reservas pelo WhatsApp, ligado ao Perfil da Empresa no Google.',
      },
    ],
    faq: [
      {
        question: 'Vocês fazem site para fabricante de equipamentos para usinas?',
        answer:
          'Fazemos. O site organiza equipamentos e serviços por aplicação, com fichas técnicas, fotos reais e pedido de orçamento, pensado para engenheiros e compradores que pesquisam antes de falar com o vendedor.',
      },
      {
        question: 'Dá para fazer um site para restaurante com cardápio e reservas?',
        answer:
          'Dá. O cardápio fica fácil de atualizar, as reservas chegam pelo WhatsApp e o site é ligado ao Perfil da Empresa no Google, onde muita gente escolhe onde comer.',
      },
      {
        question: 'Vocês atendem empresas de Limeira, Americana e região?',
        answer:
          'Atendemos. Como o atendimento é online, empresas de Limeira, Americana, Rio Claro e de toda a região são atendidas do mesmo jeito que as de Piracicaba.',
      },
    ],
    nearby: ['campinas', 'sorocaba', 'jundiai', 'ribeirao-preto'],
  },

  'mogi-das-cruzes': {
    intro:
      'Maior cidade do Alto Tietê, Mogi das Cruzes combina o cinturão verde que abastece a Grande São Paulo com um comércio e uma rede de serviços que atendem toda a região.',
    summary: 'Sites para produtores do cinturão verde, o comércio e os serviços do Alto Tietê.',
    context: [
      'Mogi das Cruzes faz parte do cinturão verde, com produção de hortaliças, frutas como o caqui, flores e cogumelos, muito ligada à imigração japonesa, que também aparece no Akimatsuri. No centro e nos bairros, o comércio e os serviços atendem as cidades vizinhas do Alto Tietê.',
      'Para o produtor, o site e o catálogo online abrem vendas diretas para restaurantes, mercados e consumidores. Para o comércio e os serviços, a presença no Google garante que a empresa apareça para quem pesquisa na região.',
    ],
    sectors: [
      {
        name: 'Produtores e distribuidores de hortifrúti',
        text: 'Catálogo online com os produtos da época e pedidos pelo WhatsApp para restaurantes, mercados e consumidores.',
      },
      {
        name: 'Comércio e serviços',
        text: 'Site leve e Perfil da Empresa no Google para aparecer nas buscas locais, com horários, localização e contato rápido.',
      },
      {
        name: 'Escolas e cursos',
        text: 'Site com cursos, estrutura e matrículas, com respostas automáticas para as dúvidas que chegam no período de matrícula.',
      },
    ],
    faq: [
      {
        question: 'Um produtor rural consegue vender pela internet com um catálogo online?',
        answer:
          'Consegue. O catálogo mostra os produtos disponíveis na semana, com fotos e unidades de venda, e os pedidos chegam pelo WhatsApp já organizados. É um começo simples, que pode virar loja virtual quando o volume crescer.',
      },
      {
        question: 'O atendente virtual ajuda no período de matrículas?',
        answer:
          'Ajuda bastante. Ele responde a qualquer hora sobre cursos, valores, documentos e prazos, a partir das informações que você aprova, e passa para a secretaria os casos que precisam de atenção.',
      },
      {
        question: 'Vocês atendem Suzano, Itaquaquecetuba e outras cidades do Alto Tietê?',
        answer:
          'Atendemos. Como o atendimento é online, empresas de Suzano, Itaquaquecetuba, Poá, Biritiba Mirim e de todo o Alto Tietê são atendidas do mesmo jeito que as de Mogi das Cruzes.',
      },
    ],
    nearby: ['guarulhos', 'sao-jose-dos-campos', 'sao-paulo'],
  },
}
