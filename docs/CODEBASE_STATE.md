# Estado do Código — EFSA Landing Page

Documento técnico de handoff, sanitizado (sem segredos), para permitir que outro
engenheiro ou assistente de IA entenda o projeto rapidamente. Este documento
**não substitui a leitura do código-fonte** — é um resumo factual do estado atual.

## 1. Última atualização

2026-08-24 (Fase 3 — Processo de Trabalho, Diferenciais e checkpoint de conversão).

## 2. Objetivo do projeto

Landing page institucional da **E.F Solutions Advanced's** (marca pública **EFSA |
Engenharia de Software**), em português do Brasil, para empresas de alto ticket dos
segmentos de reforma, arquitetura, construção, vidraçaria, marmoraria, reforma
residencial, interiores e limpeza. Objetivo de conversão único: levar o visitante a
uma conversa no WhatsApp (CTA "QUERO TER MAIS RESULTADOS"). Ver
[docs/PROJECT_BRIEF.md](PROJECT_BRIEF.md) para o briefing completo de marca e
posicionamento.

## 3. Git

- **Branch atual:** `main`
- **Último checkpoint committado:** `0e83ee28b867570e4e18c14cb96d1e29fd40ec3d` —
  `feat: add business diagnosis and solution architecture` (Fase 2)
- A Fase 3 (Processo de Trabalho, Diferenciais, checkpoint de conversão) está
  implementada no working tree **sem commit** no momento em que este documento foi
  escrito (ver seção 19).

## 4. Dependências exatas

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

Nenhuma outra dependência foi instalada até o momento (sem Tailwind, GSAP, Three.js,
bibliotecas de partícula, kits de UI, formulários, analytics ou Supabase).

## 5. Mapa de diretórios relevante

```
src/
├── App.tsx                              # Composição da página (Header + main + seções)
├── main.tsx                             # Entry point: ThemeProvider + GlobalStyle + fonte
├── components/
│   ├── layout/
│   │   └── SiteHeader.tsx               # Header sticky, wordmark, nav, CTA WhatsApp
│   ├── sections/
│   │   ├── sectionPrimitives.tsx        # Primitivos compartilhados (Section/Eyebrow/H2/...)
│   │   ├── HeroSection.tsx              # Hero (Fase 1)
│   │   ├── BusinessDiagnosisSection.tsx # #diagnostico (Fase 2)
│   │   ├── SolutionArchitectureSection.tsx # #solucoes (Fase 2)
│   │   ├── WorkProcessSection.tsx       # #como-atuamos (Fase 3)
│   │   └── DifferentialsSection.tsx     # #diferenciais + checkpoint (Fase 3)
│   └── visuals/
│       ├── AmbientHeroBackground.tsx    # Fundo ambiente da Hero (SVG + Motion)
│       ├── BusinessEngine.tsx           # Painel conceitual da Hero ("DEMONSTRAÇÃO CONCEITUAL")
│       ├── AnimatedCheck.tsx            # Checkmark SVG animado (reutilizado)
│       └── EngineeringBlueprint.tsx     # Painel "EFSA ENGINEERING BLUEPRINT" (Fase 3)
├── data/                                 # Conteúdo estático tipado (sem lógica)
│   ├── heroStages.ts
│   ├── businessDiagnosis.ts
│   ├── solutionPillars.ts
│   ├── processSteps.ts
│   └── differentiators.ts
├── config/
│   └── contact.ts                       # Configuração central do WhatsApp
├── hooks/
│   └── usePageVisibility.ts             # Page Visibility API compartilhada
├── utils/
│   └── motionPresets.ts                 # Helper de revelação por viewport (Motion)
└── styles/
    ├── theme.ts                          # Tema tipado (tokens)
    ├── GlobalStyle.ts                    # Reset + acessibilidade + scroll suave
    └── styled.d.ts                       # Augmentação de tipos do DefaultTheme
```

## 6. Seções implementadas (ordem visual)

1. **Hero** (`HeroSection.tsx`) — copy principal, CTAs, EFSA Business Engine.
2. **Diagnóstico do Negócio** (`BusinessDiagnosisSection.tsx`, `#diagnostico`).
3. **Arquitetura de Soluções** (`SolutionArchitectureSection.tsx`, `#solucoes`).
4. **Como Atuamos** (`WorkProcessSection.tsx`, `#como-atuamos`) — processo em 4 etapas
   com painel cinematográfico "EFSA Engineering Blueprint".
5. **Diferenciais** (`DifferentialsSection.tsx`, `#diferenciais`) — composição
   editorial + declaração de transparência + checkpoint de conversão final.

## 7. IDs de seção e alvos de âncora do Header

| Seção                    | id             | No menu do Header? |
| ------------------------- | -------------- | ------------------- |
| Diagnóstico do Negócio     | `diagnostico`  | Sim (`#diagnostico`) |
| Arquitetura de Soluções    | `solucoes`     | Sim (`#solucoes`)    |
| Como Atuamos               | `como-atuamos` | Sim (`#como-atuamos`)|
| Diferenciais                | `diferenciais` | Não (mantém o Header equilibrado) |
| Painel Business Engine (Hero) | `business-engine` | Não (alvo de foco/scroll do CTA secundário da Hero, não é link do menu) |

## 8. Responsabilidades dos principais componentes

- **`SiteHeader`** — header sticky; muda de aparência após ~24px de scroll
  (`useScroll`/`useMotionValueEvent`, sem listener manual); navegação secundária por
  âncoras nativas; CTA único do WhatsApp.
- **`BusinessEngine`** — demonstração conceitual da Hero (rótulo obrigatório
  "DEMONSTRAÇÃO CONCEITUAL"); tablist acessível com rotação automática pausável.
- **`EngineeringBlueprint`** — painel "FLUXO DE ENGENHARIA" do Processo de Trabalho;
  aceita `activeIndex`/`status`/`variant` (`interactive` no desktop sticky,
  `static` no resumo mobile e em `prefers-reduced-motion`).
- **`WorkProcessSection`** — layout de duas colunas com painel sticky (≥1280px) e
  detecção de etapa ativa via `useInView` (IntersectionObserver) por etapa.
- **`DifferentialsSection`** — composição editorial (coluna de afirmação + trilho de
  diferenciais) + checkpoint de conversão integrado ao final da seção.
- **`sectionPrimitives.tsx`** — `SectionContainer` (com `scroll-margin-top`),
  `ContentWrapper`, `SectionIntro`, `Eyebrow`, `SectionHeading` (h2), `SectionParagraph`,
  reutilizados por todas as seções pós-Hero para continuidade visual.

## 9. Tema e tokens de design (resumo)

`src/styles/theme.ts` exporta `theme` tipado (`AppTheme`) com:

- **colors:** `background`, `black`, `surfaceDark`, `surfaceElevated`, `metallicGray`,
  `darkBlue`, `gold`, `white`, `textMuted`, `borderSubtle`.
- **typography:** `fontFamily` (Inter Variable), `fontFamilyMono` (stack de sistema),
  `weights` (regular/medium/semibold/bold), `sizes` (xs → 4xl).
- **spacing:** escala xs → 4xl (rem).
- **radii:** sm/md/lg/full.
- **shadows:** sm/md/lg.
- **breakpoints:** sm (480px) / md (768px) / lg (1024px) / xl (1280px).

Nenhum novo token foi adicionado na Fase 3 além do já existente `fontFamilyMono`
(Fase 1); todos os novos componentes reutilizam os tokens acima.

## 10. Arquitetura de Motion e interação

- **Entrada ao montar (Hero):** helper local `buildEntranceProps` em `HeroSection.tsx`.
- **Revelação ao entrar no viewport (seções pós-Hero):** `buildViewportRevealProps`
  em `src/utils/motionPresets.ts`, usa `whileInView` + `viewport:{once:true}`.
- **Etapa ativa por scroll (Processo de Trabalho):** `useInView` do Motion (uma
  instância por etapa, via IntersectionObserver interno, `margin: '-42% 0px -42%
  0px'`) reporta mudanças discretas a um `useCallback` que atualiza um único
  `useState<number>` (`activeIndex`) — nenhum listener de scroll manual, nenhum
  `setState` por frame.
- **Transformações contínuas:** `useScroll` + `useTransform` (paralaxe restrita do
  Blueprint) e `useSpring` (progresso do traçado dourado) — sempre como *Motion
  values*, nunca como estado React por frame.
- **Cabeçalho com estado discreto:** mesmo padrão desde a Fase 1 (`useMotionValueEvent`
  só dispara `setState` ao cruzar um limiar, não a cada pixel).

## 11. Comportamento de `prefers-reduced-motion`

- Base global em `GlobalStyle.ts`: reduz durações de animação/transição a ~0 e força
  `scroll-behavior: auto`.
- Cada componente animado também consulta `useReducedMotion()` do Motion e
  desliga individualmente: rotação automática (Business Engine), paralaxe/scan/mola
  (Engineering Blueprint — passa a renderizar o traçado já completo, sem Motion),
  stagger de entrada (todas as seções), movimento do ponteiro (Hero).
- Nenhuma informação é ocultada sob `prefers-reduced-motion` — apenas o movimento é
  removido.

## 12. Integração com WhatsApp

Centralizada em `src/config/contact.ts`: um número de telefone (formato somente
dígitos, com código do país e DDD) e uma mensagem padrão, combinados em uma URL
`https://wa.me/...` construída com `URLSearchParams`. Todos os CTAs do site (Header,
Hero, Arquitetura de Soluções, Diferenciais) importam `contact.whatsappUrl` do mesmo
arquivo — nenhuma URL ou número é duplicado em componentes. Os detalhes exatos do
número/mensagem não são repetidos aqui; consulte o arquivo de configuração
diretamente.

## 13. Decisões de acessibilidade

- Apenas um `h1` na página inteira (Hero); títulos de seção são `h2`; títulos de
  cartão/etapa/diferencial são `h3`.
- Semântica de `header`, `main`, `section`, listas e botões nativos.
- `tablist`/`tab`/`tabpanel` no Business Engine; disclosure (`aria-expanded`/
  `aria-controls`) no Diagnóstico.
- Todo SVG decorativo é `aria-hidden="true"`.
- Nenhum `aria-live` em conteúdo que muda automaticamente (rotação do Business
  Engine, etapa ativa do Blueprint); o único `aria-live="polite"` existente reage a
  uma ação explícita do usuário (painel de resposta do Diagnóstico).
- Foco visível herdado do `GlobalStyle` (`:focus-visible` dourado), reforçado
  localmente onde necessário.
- Alvos de toque em torno de 44px nos CTAs e controles interativos.
- Seções-alvo de âncora usam `scroll-margin-top` para compensar o Header sticky.
- Nenhuma seleção de texto desabilitada; nenhum cursor customizado inacessível.

## 14. Base de segurança e privacidade

- Sem `dangerouslySetInnerHTML`, scripts externos ou CDNs.
- Sem segredos ou variáveis de ambiente no projeto.
- Sem coleta de dados do usuário, formulários, cookies ou analytics nesta fase.
- Conteúdo do Business Engine e do Engineering Blueprint é estático e tipado —
  nenhum dado "ao vivo", nenhuma execução de código exibido.
- Links externos sempre com `target="_blank" rel="noopener noreferrer"`.
- Nenhuma alegação de segurança absoluta ou "total" em nenhum texto do site.

## 15. Comandos de verificação

```
yarn install   # instala dependências
yarn dev       # servidor de desenvolvimento (Vite)
yarn lint      # oxlint
yarn build     # tsc -b && vite build
yarn preview   # serve o build de produção localmente
```

## 16. Status atual de teste, lint e build

- **Testes:** nenhum runner de testes automatizados está configurado no projeto até
  o momento (sem Jest/Vitest/Playwright instalado).
- **Lint:** `yarn lint` (oxlint) — sem erros ou avisos ao final da Fase 3.
- **Build:** `yarn build` — sucesso, TypeScript `strict` sem erros.

## 17. Limitações conhecidas

- Nenhum vídeo de fundo foi implementado (adiado deliberadamente).
- Nenhum formulário, FAQ, seção de objeções, política de privacidade ou rodapé
  existe ainda.
- Nenhuma integração com Supabase, backend ou analytics existe ainda.
- A EFSA não possui resultados de clientes verificados; nenhuma prova social,
  depoimento, métrica ou estudo de caso é exibido em nenhuma parte do site.
- A validação visual em navegador real (breakpoints, paralaxe, sticky, contraste)
  não foi realizada neste ambiente — apenas revisão de código, lint e build.
- O favicon de marca ainda não foi definido (nenhum arquivo foi fornecido).

## 18. Próximas fases planejadas

Objeções, FAQ, formulário de lead, política de privacidade e rodapé.

## 19. Resumo dos arquivos não commitados da Fase 3 (no momento da escrita)

**Criados:**
`src/data/processSteps.ts`, `src/data/differentiators.ts`,
`src/components/visuals/EngineeringBlueprint.tsx`,
`src/components/sections/WorkProcessSection.tsx`,
`src/components/sections/DifferentialsSection.tsx`,
`docs/CODEBASE_STATE.md` (este arquivo).

**Modificados:**
`src/App.tsx` (compõe as duas novas seções),
`src/components/layout/SiteHeader.tsx` (link "Como atuamos"),
`README.md`, `docs/PROJECT_BRIEF.md` (status da Fase 3).

Nenhuma dependência nova foi adicionada; `package.json` permanece inalterado desde o
checkpoint da Fase 2.
