# E.F Solutions: Landing Page

Site da E.F Solutions (https://www.efsolutions.com.br): criação de sites profissionais, sistemas de gestão sob medida, atendente virtual com IA no WhatsApp e otimização SEO. Sem formulários: o visitante marca as soluções de interesse e envia uma mensagem pronta pelo WhatsApp.

## Stack

- [Vite 7](https://vite.dev/) + [React 19](https://react.dev/) + TypeScript (`strict`)
- [Tailwind CSS v4](https://tailwindcss.com/), configuração CSS-first em `src/styles/app.css` (sem `tailwind.config.js`; paleta padrão desligada)
- [React Router 7](https://reactrouter.com/)
- Pré-renderização estática (SSG) própria, sem framework extra: `src/entry-server.tsx` + `scripts/prerender.mjs`
- Geist (OFL), autohospedada, com fallbacks de métricas calibradas; mono do sistema para etiquetas e terminal
- [lucide-react](https://lucide.dev/) (ícones), [oxlint](https://oxc.rs/) (lint), [Vitest](https://vitest.dev/) (testes)
- Yarn, único gerenciador de pacotes

## Comandos

| Comando          | Descrição                                                                    |
| ---------------- | ---------------------------------------------------------------------------- |
| `yarn`           | Instala as dependências                                                      |
| `yarn dev`       | Servidor de desenvolvimento (renderização só no cliente)                     |
| `yarn build`     | Typecheck + build do cliente + build SSR + pré-renderização → `dist/`        |
| `yarn preview`   | Serve o `dist/` localmente                                                   |
| `yarn typecheck` | Apenas checagem de tipos                                                     |
| `yarn lint`      | Lint (oxlint)                                                                |
| `yarn test`      | Testes (Vitest), incluindo a pré-renderização de todas as páginas            |
| `yarn assets`    | Regenera símbolo da logo, favicons e imagem Open Graph a partir da logo      |

## Páginas

| Rota                         | Conteúdo                                                                 |
| ---------------------------- | ------------------------------------------------------------------------ |
| `/`                          | Landing page (hero, serviços, depoimentos, orçamento, processo, dúvidas) |
| `/criacao-de-sites`          | Hub das cidades atendidas, agrupadas por capital, interior e litoral     |
| `/criacao-de-sites/<cidade>` | 15 páginas de cidade de SP, com texto próprio                            |
| `/politica-de-privacidade`   | Política de Privacidade (antes `/privacidade`, redirect 301)             |
| `/politica-de-cookies`       | Política de Cookies, com botão para reabrir as preferências              |
| `/termos-de-uso`             | Termos de Uso (antes `/termos`, redirect 301)                            |
| `/obrigado`                  | Depois do clique no WhatsApp (`noindex`)                                 |
| qualquer outra               | 404 real, com "404" em matriz de pontos (`noindex`)                      |

Toda página nasce no registro `src/config/pages.ts` (título, description, breadcrumbs, schema, sitemap) e numa rota em `src/App.tsx`. Um teste falha se os dois divergirem.

## Como funciona

### Conversão (sem formulário)

- `src/content/solutions.ts`: catálogo das soluções do seletor (título, descrição, rótulo curto e texto da mensagem).
- `src/components/conversion/`: estado da seleção (`SelectionProvider`), seletor de checkboxes nativos (`SolutionPicker`), barra fixa de conversão (`ConversionBar`) e o link de conversão (`WhatsAppCta`).
- `src/lib/whatsapp.ts`: monta a mensagem pré-formatada (com `*negrito*` do WhatsApp, sem emoji) e a URL `https://wa.me/...`. Nas páginas de cidade, a mensagem diz de qual página o contato veio (`LeadOriginContext`, definido pelo layout a partir do registro); na home, a mensagem é a de sempre.
- O clique abre o WhatsApp direto do gesto do usuário (`<a target="_blank">`), registra a conversão e leva a aba atual para `/obrigado`, que lembra o passo que falta e permite reabrir a conversa com a mesma mensagem.

O número fica em `src/config/site.ts` (fallback verificado) e pode ser trocado sem editar código com `VITE_WHATSAPP_NUMBER`.

### Conteúdo e intenção de busca

- **H1** (hero): “Criação de Sites Profissionais, Sistemas Sob Medida e Atendimento Virtual com IA”.
- **Serviços** (`src/content/services.ts`): os quatro `<h3>` são os termos que donos de empresa pesquisam. O mesmo arquivo alimenta o catálogo do schema `LocalBusiness`.
- **Depoimentos** (`src/content/testimonials.ts`): três clientes reais, autorizados, com as falas transcritas sem edição. Sites entregues como link externo (`rel="noopener noreferrer"`); projeto ainda não publicado aparece sem link, com a etiqueta “Em desenvolvimento”. Sem schema de avaliação.
- **FAQ** (`src/content/faq.ts`): cinco perguntas no formato em que as pessoas buscam, exibidas na página e marcadas como `FAQPage`.
- **Cidades** (`src/content/cityIndex.ts` + `src/content/cities.ts`): o índice leve (nome, região, description) entra no bundle para o `<head>`, o sitemap e os links; o texto de cada cidade (abertura, economia local, setores, perguntas, cidades próximas) é um chunk separado, carregado só nessas rotas. Só fatos verificáveis, atendimento sempre descrito como online, nenhum endereço inventado.

### SEO

- **HTML estático por rota**: no build, cada página é renderizada no servidor e gravada em `dist/<rota>.html` com o conteúdo real e as tags certas no `<head>`. No navegador, o React hidrata esse HTML; nas navegações internas, `useSeo` atualiza o `<head>` a partir do mesmo registro.
- **Dados estruturados** (`src/lib/structuredData.ts`): um `@graph` JSON-LD por página com `LocalBusiness`, `WebSite`, `WebPage`, `BreadcrumbList`, `FAQPage` (home) e `Service` com `areaServed` (hub e cidades: a cidade atendida, contida no estado de SP, com a empresa como `provider`).
- **sitemap.xml, robots.txt e llms.txt** são gerados no build a partir dos mesmos registros (20 URLs no sitemap). Uma página ou cidade nova entra sozinha.
- **Open Graph / Twitter**: `og:*` completos com imagem 1200×630 (`public/og-image.jpg`).
- **404 real**: `dist/404.html` é servido pelo Vercel com status HTTP 404. `/obrigado` e a 404 são `noindex` e ficam fora do sitemap.
- **Search Console**: defina `VITE_GOOGLE_SITE_VERIFICATION` (valor do atributo `content` da tag HTML) para incluir a meta de verificação em todas as páginas.

> Para o painel de empresa local do Google, o schema `LocalBusiness` precisa do endereço completo. Hoje só o país é declarado: preencha `ADDRESS` em `src/config/site.ts` com os dados reais.

### Cookies, consentimento e medição

Nada de rastreamento carrega antes da escolha do visitante (`src/lib/tracking.ts` e `src/components/consent/`):

- **Aviso de cookies** com Aceitar e Recusar (mesmo peso visual) e Preferências por categoria (necessários, medição, marketing) num `<dialog>` nativo. Reabre pelo rodapé (“Preferências de cookies”) e pela Política de Cookies. A escolha fica no `localStorage` por 12 meses.
- **Google Analytics 4** com Consent Mode v2 no modo básico: o `gtag.js` só é baixado depois do aceite de medição, com o padrão negado antes de aplicar a escolha. Defina `VITE_GA_MEASUREMENT_ID` (`G-XXXXXXXXXX`) nas variáveis de ambiente do Vercel.
- **Meta Pixel**: o `fbevents.js` só é baixado depois do aceite de marketing; `PageView` no carregamento e nas navegações internas, `Contact` a cada clique de WhatsApp. `VITE_META_PIXEL_ID` troca o ID sem editar código.
- **Revogar** desliga a ferramenta (opt-out oficial do GA4 e `consent revoke` do Pixel) e apaga os cookies dela (`_ga`, `_fbp`).
- **Conversão**: cada clique de WhatsApp envia `generate_lead` com `cta_location`, `selected_services`, `services_count` e, nas páginas de cidade, `page_city`. No GA4, marque `generate_lead` como evento-chave e registre esses parâmetros como dimensões personalizadas.

### Design e movimento

- Linguagem visual de interface de desenvolvedor em modo escuro: títulos em dois tons (`SectionHeader`), cartões com borda de 1px, grade técnica de fundo (`GridBackdrop`), etiquetas em fonte mono (`Badge`) e acento turquesa. Cantos de 6px em botões e etiquetas (nada de pílula).
- **Prévia do hero** (`src/components/preview/`): três cenas em abas acessíveis (padrão WAI-ARIA). As abas só mudam quando o visitante escolhe.
- **Vetores animados** (`src/components/vectors/`): ilustrações em SVG + CSS puro nos cartões de serviço, na trilha do processo e na 404. O HTML estático traz a cena pronta; fora da tela ela é preparada, toca uma única vez ao aparecer (até 4,6s), pausa se sair da tela e recomeça no hover. Com `prefers-reduced-motion`, fica parada.
- **Micro-interações** com as curvas de Emil Kowalski (`--ease-out`, `--ease-in-out`): `scale(0.97)` ao clicar, cartões que sobem 2px no hover (só com mouse), respostas do FAQ com entrada curta. Nada aparece com fade ao rolar e nada segue o cursor.
- **Esqueleto** só nas rotas carregadas sob demanda, numa navegação interna lenta; nunca no carregamento direto.
- **CLS zero**: fallbacks da fonte com métricas calibradas, larguras em `em`, painéis com altura fixa, barras e avisos fixos sem efeito no layout, imagens com dimensões explícitas. O título e o texto do hero são pintados já no primeiro quadro; o CSS é embutido no HTML.

### Regras do projeto, verificadas por testes

Em todas as páginas pré-renderizadas: nenhum travessão na copy, nenhum emoji, nenhum link ou botão em pílula, nenhum selo “Feito com IA”, todo link em nova aba com `rel="noopener noreferrer"`, links internos que existem, títulos sem pular nível e imagens com `alt`. No código-fonte: nenhuma cor roxa e nenhum rastreamento no HTML-base. Nas cidades: teste de similaridade garante texto próprio em cada página.

## Deploy

Vercel (`vercel.json`): `cleanUrls`, 404 real, cache imutável para `/assets/*` (arquivos com hash), cabeçalhos de segurança, redirect do domínio antigo `efsa.com.br` e redirects 301 das rotas antigas para as atuais.

Variáveis de ambiente (todas opcionais, ver `.env.example`): `VITE_WHATSAPP_NUMBER`, `VITE_GA_MEASUREMENT_ID`, `VITE_META_PIXEL_ID`, `VITE_GOOGLE_SITE_VERIFICATION`.

## Documentação antiga

Os arquivos em `docs/` descrevem uma fase anterior do projeto e não refletem o código atual. Este README é a referência técnica atualizada.
