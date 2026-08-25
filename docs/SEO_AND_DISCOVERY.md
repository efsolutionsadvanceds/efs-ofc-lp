# SEO Técnico e Descoberta — EFSA Landing Page

## 1. Status técnico atual

Verificado diretamente no código (`index.html`, `public/robots.txt`,
`public/sitemap.xml`) e coberto por testes automatizados
(`src/seo/structuredData.test.ts`):

- ✅ `lang="pt-BR"` no `<html>`.
- ✅ Título único e específico: "EFSA | Engenharia de Software para Reforma,
  Arquitetura e Construção".
- ✅ Meta description precisa e alinhada ao conteúdo real da página.
- ✅ `<link rel="canonical" href="https://efsa.com.br/">` (uma única tag).
- ✅ `<meta name="robots" content="index, follow">` — nenhum `noindex`
  acidental.
- ✅ Open Graph completo: `og:type`, `og:locale`, `og:title`,
  `og:description`, `og:url` e **`og:site_name`** (adicionado nesta fase —
  estava ausente).
- ✅ Twitter Card (`summary`) com título e descrição.
- ✅ `theme-color` consistente com o fundo da marca (`#05070B`).
- ✅ `public/robots.txt` permite rastreamento geral e referencia o sitemap.
- ✅ `public/sitemap.xml` contém apenas `https://efsa.com.br/` — nenhuma URL
  de desenvolvimento, nenhum `lastmod` inventado.
- ✅ Dado estruturado `Organization` em JSON-LD válido, com apenas fatos
  verificados (`name`, `alternateName`, `url`, `description`, `areaServed`) —
  sem endereço, telefone, avaliações, prêmios ou `sameAs` inventados.
- ✅ Apenas um `<h1>` em toda a página (na Hero).
- ✅ Hierarquia de headings lógica (`h2` por seção, `h3` para subitens).
- ✅ Nenhuma regra em `robots.txt` bloqueia JS, CSS ou fontes necessários.
- ✅ Nenhuma URL de produção em `http://`.

Nenhuma duplicação de tag ou schema foi criada nesta fase — apenas o
`og:site_name` ausente foi adicionado.

## 2. Bloqueadores de lançamento restantes

Estes itens **não são responsabilidade do código React** e continuam
pendentes (ver também [docs/DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)):

- Nenhuma imagem de social-preview (`og:image` 1200×630) existe — não foi
  criada nesta fase por não haver um ativo aprovado.
- Nenhum favicon oficial existe.
- Nenhum logo oficial existe.
- Nenhum token de verificação do Google Search Console foi adicionado —
  adicionar um token falso ou de exemplo seria pior do que não ter nenhum.
- O domínio `efsa.com.br` ainda não está hospedado/publicado.

## 3. Google Search Console — passos de configuração (a executar após o deploy)

1. Acessar https://search.google.com/search-console e adicionar a
   propriedade `https://efsa.com.br/`.
2. Verificar a propriedade (via meta tag, arquivo HTML ou registro DNS —
   escolher conforme o provedor de hospedagem/DNS real).
3. Após a verificação, confirmar que a propriedade aparece como verificada
   no painel.

## 4. Envio do sitemap

1. Dentro do Search Console, ir em "Sitemaps".
2. Enviar `https://efsa.com.br/sitemap.xml`.
3. Confirmar status "Êxito" (sem erros de leitura).

## 5. Inspeção de URL e indexação

1. Usar a ferramenta "Inspeção de URL" no Search Console para
   `https://efsa.com.br/`.
2. Solicitar indexação manual após o primeiro deploy.
3. Repetir a inspeção alguns dias depois para confirmar que o Google
   rastreou e indexou a página.

## 6. Verificação de Core Web Vitals

1. Aguardar dados reais de campo se acumularem no relatório "Core Web
   Vitals" do Search Console (pode levar semanas após o tráfego começar).
2. Complementar com o Lighthouse (`yarn build && yarn preview`, depois rodar
   o Lighthouse do Chrome DevTools localmente) para um diagnóstico de
   laboratório imediato.
3. Não tratar a pontuação do Lighthouse isoladamente como prova de
   performance real em produção — os dados de campo do Search Console são a
   referência final.

## 7. Validação de Rich Results e dados estruturados

1. Usar https://search.google.com/test/rich-results com a URL de produção
   publicada.
2. Confirmar que o bloco `Organization` é reconhecido sem erros.
3. Repetir a validação sempre que o JSON-LD for alterado (o teste automatizado
   em `src/seo/structuredData.test.ts` já garante que o JSON é sintaticamente
   válido e contém só os campos esperados, mas não substitui a validação
   externa do Google).

## 8. Bing Webmaster Tools (canal secundário opcional)

1. Acessar https://www.bing.com/webmasters.
2. Adicionar `https://efsa.com.br/` (o Bing permite importar a verificação
   já feita no Google Search Console em alguns casos, o que simplifica o
   processo).
3. Enviar o mesmo `sitemap.xml`.

## 9. Roteiro de conteúdo "people-first" (baseado nos serviços reais da EFSA)

Conteúdo futuro deve continuar respondendo perguntas reais do público-alvo
(donos e gestores de empresas de reforma, arquitetura, construção,
vidraçaria, marmoraria, reforma residencial, interiores e limpeza), na mesma
linha da seção de Diagnóstico e do FAQ já existentes — nunca conteúdo
genérico criado só para "ranquear palavras-chave".

## 10. Páginas de serviço propostas (futuras) e intenção de busca

| Página proposta | Intenção de busca provável |
| --- | --- |
| Landing pages de alta conversão para reforma/construção | Comercial/informacional: "como converter mais leads no site da minha construtora" |
| Sistemas sob medida para gestão operacional | Comercial: "sistema para gestão de obras/reformas" |
| Agentes de IA para atendimento no WhatsApp | Informacional/comercial: "automatizar atendimento no WhatsApp para empresas de reforma" |
| Tráfego pago para o segmento de construção/reforma | Comercial: "tráfego pago para construtora/arquitetura" |

Estas são propostas — **nenhuma dessas páginas deve ser criada sem dados
reais de palavra-chave e sem conteúdo/evidência técnica genuína da EFSA para
sustentá-la** (ver regras nas seções 12 e 13).

## 11. Recomendações de linkagem interna

- Cada futura página de serviço deve linkar de volta para a seção de
  Diagnóstico e para o CTA de contato já existentes na landing page
  principal.
- A landing page principal deve linkar para as páginas de serviço futuras a
  partir da seção de Arquitetura de Soluções, quando essas páginas
  existirem.
- Evitar links órfãos: toda nova página precisa ser alcançável a partir de
  pelo menos um link interno rastreável.

## 12. Evidências e conteúdo técnico necessários antes de publicar cada página

Antes de publicar qualquer página de serviço nova, ela precisa ter:

- Explicação técnica real do que é entregue (sem jargão vazio).
- Demonstração ou exemplo concreto do processo de trabalho (como o
  Diagnóstico e o Engineering Blueprint já fazem na página principal).
- Nenhuma alegação de resultado, métrica ou prova social que a EFSA não
  possa comprovar (ver [docs/PROJECT_BRIEF.md](PROJECT_BRIEF.md)).

## 13. Regra contra dados fabricados

**Proibido em qualquer documento, código ou conteúdo deste projeto:**
volume de busca inventado, previsão de ranking, número de "primeira posição
garantida" ou qualquer estimativa de tráfego/conversão que não venha de uma
ferramenta real de dados (Google Search Console, Google Keyword Planner,
Google Trends etc.) usada e citada explicitamente. Qualquer priorização de
conteúdo futuro deve esperar por dados reais de palavra-chave antes de
decidir o que publicar primeiro.

## 14. IA e busca — não existe arquivo especial exigido

O Google **não exige** um arquivo especial de "marcação para IA" (como um
`llms.txt`) nem qualquer "requisito oficial de SEO para IA" para que o
conteúdo apareça em recursos de busca com IA. A orientação oficial do Google
(referenciada em
`https://developers.google.com/search/docs/fundamentals/ai-optimization-guide`)
é a mesma prática de SEO fundamental já seguida aqui: conteúdo original,
correto, bem estruturado semanticamente e tecnicamente rastreável. Este
projeto **não criou** nenhum arquivo `llms.txt` nem qualquer marcação
apresentada como "requisito oficial de IA", porque isso não existe como tal.

## 15. Consistência de entidade

Ao publicar o site e outros perfis da EFSA (redes sociais, Google Business
Profile etc.), manter exatamente o mesmo nome, domínio e descrição usados no
JSON-LD (`E.F Solutions Advanced's` / `EFSA | Engenharia de Software` /
`efsa.com.br`) em todos os canais, para reforçar a consistência de entidade
que mecanismos de busca usam para associar as fontes à mesma empresa.

## 16. Ativos obrigatórios pendentes

- Logo oficial (arquivo vetorial ou PNG de alta resolução aprovado).
- Favicon oficial (derivado do logo aprovado).
- Imagem de social-preview de 1200×630px (para `og:image`), também derivada
  de identidade visual aprovada — **nenhuma dessas imagens foi criada nesta
  fase**, conforme já registrado em
  [docs/DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md).

## 17. Pré-renderização/SSR — decisão futura baseada em evidência

Hoje o site é uma SPA client-side-rendered (Vite + React, sem SSR). Isso é
aceitável para o estágio atual porque o conteúdo é relativamente pequeno e
os motores de busca modernos (Googlebot) executam JavaScript. **Uma decisão
de migrar para pré-renderização ou SSR só deve ser tomada com base em
evidência real de indexação/rastreamento** (por exemplo, se o Search Console
mostrar problemas de renderização ou indexação incompleta após o site estar
no ar por tempo suficiente) — nunca de forma especulativa antes de haver
dados reais de produção.
