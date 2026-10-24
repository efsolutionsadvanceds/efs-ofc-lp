# E.F Solutions — Landing Page

Landing page da E.F Solutions: criação de sites profissionais, sistemas de gestão sob medida, atendente virtual com IA no WhatsApp e otimização SEO. Sem formulários: o visitante marca as soluções de interesse e envia uma mensagem pronta pelo WhatsApp.

## Stack

- [Vite 7](https://vite.dev/) + [React 19](https://react.dev/) + TypeScript (`strict`)
- [Tailwind CSS v4](https://tailwindcss.com/) — configuração CSS-first em `src/styles/app.css` (sem `tailwind.config.js`)
- [React Router 7](https://reactrouter.com/) — rotas `/`, `/obrigado`, `/privacidade`, `/termos` e 404
- Pré-renderização estática (SSG) própria, sem framework extra — `src/entry-server.tsx` + `scripts/prerender.mjs`
- Geist (OFL), autohospedada, com fallbacks de métricas calibradas; mono do sistema para etiquetas e terminal
- [lucide-react](https://lucide.dev/) (ícones), [oxlint](https://oxc.rs/) (lint), [Vitest](https://vitest.dev/) (testes)
- Yarn — único gerenciador de pacotes

## Comandos

| Comando          | Descrição                                                                 |
| ---------------- | ------------------------------------------------------------------------- |
| `yarn`           | Instala as dependências                                                   |
| `yarn dev`       | Servidor de desenvolvimento (renderização só no cliente)                  |
| `yarn build`     | Typecheck + build do cliente + build SSR + pré-renderização → `dist/`     |
| `yarn preview`   | Serve o `dist/` localmente                                                |
| `yarn typecheck` | Apenas checagem de tipos                                                  |
| `yarn lint`      | Lint (oxlint)                                                             |
| `yarn test`      | Testes (Vitest) — inclui a pré-renderização de todas as páginas           |
| `yarn assets`    | Regenera símbolo da logo, favicons e imagem Open Graph a partir da logo   |

## Como funciona

### Conversão (sem formulário)

- `src/content/solutions.ts` — catálogo das soluções (título, descrição, rótulo curto e texto da mensagem).
- `src/components/conversion/` — estado da seleção (`SelectionProvider`), seletor de checkboxes nativos (`SolutionPicker`), barra fixa de conversão (`ConversionBar`: barra de largura total no celular, cartão flutuante no desktop) e o link de conversão (`WhatsAppCta`).
- `src/lib/whatsapp.ts` — monta a mensagem pré-formatada (com `*negrito*` do WhatsApp, sem emoji) e a URL `https://wa.me/...`.
- O clique abre o WhatsApp direto do gesto do usuário (`<a target="_blank">`, sem risco de bloqueio de pop-up), registra a conversão e leva a aba atual para `/obrigado`, que lembra o passo que falta (tocar em “enviar”) e permite reabrir a conversa.

O número fica em `src/config/site.ts` (fallback verificado) e pode ser trocado sem editar código com `VITE_WHATSAPP_NUMBER`.

### Conteúdo e intenção de busca

- **H1** (hero): “Criação de Sites Profissionais, Sistemas Sob Medida e Atendimento Virtual com IA”.
- **Serviços** (`src/content/services.ts`): os quatro títulos `<h3>` são os termos que donos de empresa pesquisam — criação de sites profissionais para empresas, desenvolvimento de sistemas de gestão sob medida, atendente virtual e automação de atendimento no WhatsApp, otimização SEO para ser encontrado no Google (com Google Search Console). O mesmo arquivo alimenta o catálogo do schema `LocalBusiness`.
- **FAQ** (`src/content/faq.ts`): cinco perguntas no formato em que as pessoas buscam (“quanto custa…”, “quanto tempo leva…”, “como funciona…”), exibidas na página e marcadas como `FAQPage`.
- O catálogo do seletor (`src/content/solutions.ts`) é separado de propósito: mudar textos de SEO nunca altera a mensagem enviada ao WhatsApp.

### SEO

- **Registro de páginas** (`src/config/pages.ts`): fonte única de título, description, robots, breadcrumbs, FAQ e entrada de sitemap de cada rota. Um teste garante títulos únicos (≤ 60 caracteres) e descriptions entre 70 e 160 caracteres.
- **HTML estático por rota**: no build, cada página é renderizada no servidor e gravada em `dist/<rota>.html` com o conteúdo real e as tags certas no `<head>` — rastreadores que não executam JavaScript (prévias do WhatsApp e do LinkedIn, Bing, buscadores de IA) leem tudo. No navegador, o React hidrata esse HTML; nas navegações internas, `useSeo` atualiza o `<head>` a partir do mesmo registro.
- **Open Graph / Twitter**: `og:*` completos com imagem 1200×630 (`public/og-image.jpg`).
- **Dados estruturados** (`src/lib/structuredData.ts`): um `@graph` JSON-LD por página com `LocalBusiness`, `WebSite`, `WebPage`, `FAQPage` (as 5 perguntas exibidas na página) e `BreadcrumbList` nas páginas internas.
- **Breadcrumbs** (`src/components/ui/Breadcrumbs.tsx`): trilha visível e acessível, gerada dos mesmos itens do schema.
- **404 real**: `dist/404.html` é servido pelo Vercel com status HTTP 404 (sem “soft 404”). `/obrigado` e a 404 são `noindex` e ficam fora do sitemap.
- **sitemap.xml e robots.txt** são gerados no build a partir do registro de páginas — uma página nova entra no sitemap automaticamente.

> Para o painel de empresa local do Google, o schema `LocalBusiness` precisa do endereço completo. Hoje só o país é declarado — preencha `ADDRESS` em `src/config/site.ts` com os dados reais.

### Analytics

- **Google Analytics 4**: defina `VITE_GA_MEASUREMENT_ID` (`G-XXXXXXXXXX`) nas variáveis de ambiente do Vercel. O `gtag.js` só é incluído no build de produção e só com um ID válido (`vite.config.ts`). O primeiro carregamento envia `page_view`; navegações internas são capturadas pela Medição otimizada do GA4 (ativa por padrão).
- **Conversão**: cada clique de WhatsApp envia o evento recomendado `generate_lead` com `cta_location`, `selected_services` e `services_count`. No GA4, marque `generate_lead` como evento-chave e registre esses parâmetros como dimensões personalizadas para vê-los nos relatórios.
- **Meta Pixel**: `PageView` no carregamento (`index.html`) e `Contact` a cada clique de WhatsApp (`src/lib/metaPixel.ts`).

### Design e desempenho

- Linguagem visual de interface de desenvolvedor em modo escuro (referência: tasteskill.dev): títulos em dois tons (`SectionHeader`), cartões com borda de 1px (`border-white/10`), grade técnica de fundo (`GridBackdrop`), etiquetas em fonte mono (`Badge`) e brilho turquesa nas ações.
- **Prévia interativa do hero** (`src/components/preview/`): três cenas em abas acessíveis (padrão WAI-ARIA) — atendente com IA, terminal publicando um sistema e resultado de busca com Google Search Console. As cenas são animações CSS em sequência; a troca automática pausa com ponteiro/foco, para quando o visitante interage e é desligada com `prefers-reduced-motion`.
- **Micro-interações**: brilho que segue o ponteiro nos cartões de serviço (`useSpotlight`, sem re-render), brilho no hover dos botões primários, compressão ao clicar e realce turquesa no item selecionado do orçamento.
- CLS zero: fallbacks da fonte com métricas calibradas por peso (Arial e Roboto), larguras em `em` (não em `ch`, que muda com a fonte), grades com `grid-cols-1` (uma faixa `auto` cresceria com o conteúdo mais largo), painel da prévia com altura fixa, barra fixa sem efeito no layout e dimensões explícitas nas imagens.
- O título e o texto principal do hero são pintados já no primeiro quadro (são os candidatos a LCP); o CSS é embutido no HTML para dispensar uma requisição antes da primeira pintura. O Tailwind só varre `src/` (`source('..')`), para textos de outros arquivos não virarem classes.

## Deploy

Vercel (`vercel.json`): `cleanUrls`, 404 real, cache imutável para `/assets/*`, cabeçalhos de segurança, redirect do domínio antigo `efsa.com.br` e redirects 301 das rotas antigas (`/solucoes`, `/contato` e páginas de serviço) para as seções da landing page.
