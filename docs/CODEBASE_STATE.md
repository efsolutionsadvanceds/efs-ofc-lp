# Estado do Código — EFSA Landing Page

Documento técnico de handoff, sanitizado (sem segredos), para permitir que outro
engenheiro ou assistente de IA entenda o projeto rapidamente. Este documento
**não substitui a leitura do código-fonte** — é um resumo factual do estado atual.

## 1. Última atualização

2026-08-24 (Fase 4 — FAQ, formulário de conversão, composição cinematográfica final,
rodapé e SEO técnico). **Estrutura da versão 1 completa** — isso não significa que o
projeto está pronto para produção; ver [docs/DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md).

## 2. Objetivo do projeto

Landing page institucional da **E.F Solutions Advanced's** (marca pública **EFSA |
Engenharia de Software**), em português do Brasil, para empresas de alto ticket dos
segmentos de reforma, arquitetura, construção, vidraçaria, marmoraria, reforma
residencial, interiores e limpeza. Objetivo de conversão único: levar o visitante a
uma conversa no WhatsApp. Ver [docs/PROJECT_BRIEF.md](PROJECT_BRIEF.md) para o
briefing completo de marca e posicionamento.

## 3. Git

- **Branch atual:** `main`
- **Último checkpoint committado:** `57e6041933f1136cfdabd7e82ddb1ce1716ef627` —
  `feat: add cinematic process and technical differentiators` (Fase 3)
- A Fase 4 (FAQ, formulário, composição final, rodapé, SEO) está implementada no
  working tree **sem commit** no momento em que este documento foi escrito (ver
  seção 19).

## 4. Dependências de produção exatas

**dependencies:**

```
@fontsource-variable/inter  ^5.3.0
lucide-react                ^1.34.0
motion                      ^13.1.1
react                       ^19.2.8
react-dom                   ^19.2.8
styled-components           6
```

**devDependencies:**

```
@types/node          ^24.13.3
@types/react          ^19.2.18
@types/react-dom      ^19.2.4
@vitejs/plugin-react   ^6.1.0
oxlint                ^1.79.0
typescript            ~6.0.2
vite                  ^8.2.2
```

Nenhuma dependência nova foi instalada em nenhuma das quatro fases além das listadas
acima. Sem Tailwind, GSAP, Three.js, bibliotecas de partícula, kits de UI,
formulário, validação, roteamento, analytics ou Supabase.

## 5. Ordem final da página (versão 1)

1. Site Header (`#topo`)
2. Hero
3. Diagnóstico do Negócio (`#diagnostico`)
4. Arquitetura de Soluções (`#solucoes`)
5. Como Atuamos (`#como-atuamos`)
6. Diferenciais + checkpoint de conversão (`#diferenciais`)
7. Dúvidas / FAQ (`#duvidas`)
8. Contato / formulário de conversão (`#contato`)
9. Rodapé (com bloco de privacidade `#privacidade`)

## 6. IDs de seção e alvos de âncora (Header e Footer)

| Alvo               | id                 | Header | Footer |
| -------------------- | ------------------ | :----: | :----: |
| Topo da página        | `topo`             | —      | ✅     |
| Diagnóstico            | `diagnostico`      | ✅     | ✅     |
| Soluções                | `solucoes`         | ✅     | ✅     |
| Como Atuamos             | `como-atuamos`     | ✅     | ✅     |
| Diferenciais              | `diferenciais`     | —      | —      |
| Dúvidas                    | `duvidas`          | —      | ✅     |
| Contato                     | `contato`          | —      | ✅     |
| Privacidade (dentro do rodapé) | `privacidade`  | —      | —      |
| Painel Business Engine (Hero) | `business-engine` | —   | —      |
| Landmark principal            | `conteudo-principal` | (skip link) | — |

"Diferenciais" foi deliberadamente omitido do Header para preservar o equilíbrio
visual da navegação (decisão da Fase 3, mantida). O link de skip ("Pular para o
conteúdo") é o primeiro elemento focável da página e leva a `#conteudo-principal`.

## 7. Arquitetura da FAQ

`src/components/sections/FaqSection.tsx` + `src/data/faq.ts` (7 perguntas/respostas
estáticas e tipadas). Usa `<details>/<summary>` nativos — funciona sem JavaScript
para abrir/fechar; nenhum item é forçado a ficar sozinho aberto (apenas o primeiro
vem aberto por padrão). O indicador visual (chevron) gira via seletor CSS
`details[open] > & svg`, sem JavaScript. Título de cada pergunta é um `h3` real
dentro do `<summary>`.

## 8. Arquitetura do formulário de conversão

`src/components/sections/ConversionSection.tsx`. Estado local via `useState`
(`values`, `errors`, `isSubmitting`, `fallbackUrl`) — nenhuma persistência. Campos:
nome (texto, obrigatório, máx. 80), empresa (texto, obrigatório, máx. 100), segmento
(select nativo, obrigatório), prioridade (`fieldset`/`legend` com rádios nativos,
obrigatório), contexto (textarea, opcional, máx. 500, com contador de caracteres
sem `aria-live`). Validação própria em `validate()` (não depende de bibliotecas);
erros em português, associados via `aria-describedby` + `role="alert"`; foco move
para o primeiro campo inválido após tentativa de envio.

## 9. Geração da mensagem do WhatsApp

`buildWhatsAppFormMessage()` monta o texto (valores `trim()`, campo opcional vira
"Não informado"); `contact.buildWhatsAppUrl(message)` (extensão da configuração já
existente em `src/config/contact.ts`, reutilizando o mesmo número/URL usados em
todos os outros CTAs) constrói a URL com `URLSearchParams`. `window.open(url,
'_blank', 'noopener,noreferrer')` abre o WhatsApp; a URL gerada é sempre exibida
como link de fallback visível após a tentativa de envio (`rel="noopener
noreferrer"`), já que a detecção de bloqueio de pop-up é inerentemente pouco
confiável entre navegadores — o fallback fica sempre disponível, não apenas quando
um bloqueio é "detectado".

## 10. Comportamento de privacidade

Nenhum dado do formulário é armazenado pelo site (sem rede, sem `localStorage`,
`sessionStorage`, cookies ou IndexedDB). Microcopy exibida no formulário: "Este
site não armazena os dados preenchidos neste formulário." Bloco de privacidade
completo no rodapé (`#privacidade`) reforça que o tratamento posterior ocorre pelos
canais de atendimento da EFSA e pela plataforma do WhatsApp.

## 11. Comportamento da composição cinematográfica final

"EFSA Signal Convergence" (`src/components/visuals/SignalConvergence.tsx`),
integrada à seção de contato. Três traçados SVG (Aquisição, Atendimento, Operação)
convergem para um nó central "EFSA"; um traçado restrito segue em direção ao
formulário com um sinal dourado percorrendo-o uma única vez. Toca uma vez ao entrar
no viewport (`whileInView` + `viewport:{once:true}`), nunca em loop. Sob
`prefers-reduced-motion`, todos os traços/nós são renderizados imediatamente no
estado final, sem desenho nem sinal em movimento.

## 12. Arquivos de SEO

- `index.html`: `lang="pt-BR"`, `title`, `meta description`, `canonical`,
  `robots` (index, follow), Open Graph (type/locale/title/description/url), Twitter
  Card (summary). **Nenhum `og:image`** foi adicionado — não existe ativo aprovado
  de social-preview (ver checklist de deploy).
- **Dado estruturado:** um bloco `Organization` em JSON-LD estático, escrito
  diretamente no `<head>` do `index.html` (sem `dangerouslySetInnerHTML`, sem React).
  Contém apenas `name`, `alternateName`, `url`, `description` e `areaServed: "BR"` —
  nenhum dado não verificado (sem endereço, telefone, e-mail, `sameAs`, avaliações
  ou prêmios).
- `public/robots.txt`: permite rastreamento geral e referencia
  `https://efsa.com.br/sitemap.xml`.
- `public/sitemap.xml`: contém apenas `https://efsa.com.br/` (sem `lastmod`
  inventado, sem rotas de desenvolvimento).

## 13. Decisões de acessibilidade (acumuladas)

- Um único `h1` (Hero); títulos de seção `h2`; subtítulos `h3` em hierarquia lógica.
- Skip link funcional, landmark principal com `id="conteudo-principal"` e
  `tabIndex={-1}` para garantir o foco ao ativar o link.
- Todo SVG decorativo é `aria-hidden`; textos com significado próprio (rótulos do
  Blueprint, da Convergência, categorias) permanecem fora do `aria-hidden`.
- Nenhum `aria-live` em conteúdo que muda automaticamente; erros de formulário
  usam `role="alert"` porque são resultado direto de uma ação explícita do usuário.
- Controles nativos em todo o formulário (`select`, rádios com `accent-color`, sem
  nenhum primitivo customizado inacessível).
- `scroll-margin-top` em todas as seções-alvo de âncora.
- Alvos de toque em torno de 44px em todos os controles interativos.

## 14. Decisões de redução de movimento

Base global em `GlobalStyle.ts` (`prefers-reduced-motion`) + `useReducedMotion()`
do Motion consultado individualmente em cada componente animado (Hero, Business
Engine, Engineering Blueprint, Signal Convergence, revelações de seção). Nenhuma
lógica de reduced-motion duplicada — todas as seções pós-Hero compartilham o mesmo
helper `buildViewportRevealProps` de `src/utils/motionPresets.ts`.

## 15. Decisões de segurança

Sem `dangerouslySetInnerHTML` em nenhum componente React (o único HTML estático
fora do React é o JSON-LD, escrito diretamente no `index.html`). Sem scripts
externos, CDNs, segredos, variáveis de ambiente, analytics ou coleta de dados. Sem
requisição de rede partindo do site. Todos os links externos usam `rel="noopener
noreferrer"`; `window.open` usa a mesma proteção via `windowFeatures`. Campos do
formulário têm `maxLength` nativo. Nenhuma alegação de segurança absoluta ou "total"
em nenhum texto do site.

## 16. Comandos de verificação

```
yarn install   # instala dependências
yarn dev       # servidor de desenvolvimento (Vite)
yarn lint      # oxlint
yarn build     # tsc -b && vite build
yarn preview   # serve o build de produção localmente
```

## 17. Status atual de teste, lint e build

- **Testes:** nenhum runner de testes automatizados está configurado no projeto até
  o momento.
- **Lint:** `yarn lint` (oxlint) — sem erros ou avisos ao final da Fase 4.
- **Build:** `yarn build` — sucesso, TypeScript `strict` sem erros.

## 18. Bloqueadores conhecidos de lançamento

Ver [docs/DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) para a lista completa.
Resumo dos principais bloqueadores:

- Confirmação do número comercial oficial do WhatsApp em produção.
- Logo oficial, favicon e imagem de social-preview (1200×630) ainda não existem.
- Hospedagem, DNS de `efsa.com.br` e HTTPS ainda não configurados.
- Cabeçalhos de segurança de produção (CSP etc.) ainda não configurados nem
  testados contra styled-components e a fonte autohospedada.
- Decisão pendente sobre Google Analytics e sobre armazenamento de leads no
  Supabase.
- Nenhum teste em dispositivos/navegadores reais nem Lighthouse em produção foi
  executado.

## 19. Resumo dos arquivos não commitados da Fase 4 (no momento da escrita)

**Criados:**
`src/data/faq.ts`, `src/data/conversionForm.ts`,
`src/components/sections/FaqSection.tsx`,
`src/components/sections/ConversionSection.tsx`,
`src/components/visuals/SignalConvergence.tsx`,
`src/components/layout/SiteFooter.tsx`,
`public/robots.txt`, `public/sitemap.xml`,
`docs/DEPLOYMENT_CHECKLIST.md`,
`docs/CODEBASE_STATE.md` (este arquivo, reescrito).

**Modificados:**
`src/App.tsx` (skip link, landmark principal, composição final de todas as seções e
o rodapé), `src/components/layout/SiteHeader.tsx` (`id="topo"`),
`src/config/contact.ts` (extensão limpa: `buildWhatsAppUrl` agora aceita apenas a
mensagem e é exportado para reuso pelo formulário), `src/styles/theme.ts` (token
`colors.danger` adicionado, único token novo desta fase, usado nos estados de erro
do formulário), `index.html` (SEO técnico completo + JSON-LD), `README.md`,
`docs/PROJECT_BRIEF.md`.

Nenhuma dependência nova foi adicionada; `package.json` permanece inalterado desde
o checkpoint da Fase 3.
