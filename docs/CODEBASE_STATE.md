# Estado do Código — EFSA Landing Page

Documento técnico de handoff, sanitizado (sem segredos), para permitir que outro
engenheiro ou assistente de IA entenda o projeto rapidamente. Este documento
**não substitui a leitura do código-fonte** — é um resumo factual do estado atual.

## 1. Última atualização

2026-08-25 (Fase 6 — segurança de aplicação, fundação de dados/privacidade,
Analytics opt-in, validação com Zod, testes automatizados e descoberta
técnica/SEO). Nenhuma seção visual foi adicionada, removida, reordenada ou
teve copy alterado nesta fase — apenas lógica de validação, infraestrutura de
consentimento/Analytics e documentação. **Isso não significa que o projeto
está pronto para produção**; ver
[docs/DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md).

## 2. Objetivo do projeto

Landing page institucional da **E.F Solutions Advanced's** (marca pública **EFSA |
Engenharia de Software**), em português do Brasil, para empresas de alto ticket dos
segmentos de reforma, arquitetura, construção, vidraçaria, marmoraria, reforma
residencial, interiores e limpeza. Objetivo de conversão único: levar o visitante a
uma conversa no WhatsApp. Ver [docs/PROJECT_BRIEF.md](PROJECT_BRIEF.md) para o
briefing completo de marca e posicionamento.

## 3. Git

- **Branch atual:** `main`
- **Último checkpoint committado:** `e45d5a935393621af50c8cd4316d0403ddee2ac1` —
  `refactor: consolidate EFSA visual system and responsive layout` (Fase 5)
- A Fase 6 (segurança, dados e descoberta) está implementada no working tree
  **sem commit** no momento em que este documento foi escrito (ver seção 24).

## 4. Dependências de produção exatas

**dependencies:**

```
@fontsource-variable/inter  ^5.3.0
lucide-react                ^1.34.0
motion                      ^13.1.1
react                       ^19.2.8
react-dom                   ^19.2.8
styled-components           6
zod                         4 (resolvido: 4.4.3)
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
vitest                ^4.1.11
```

`zod` (validação de schema, runtime) e `vitest` (dev, testes) foram
adicionadas na Fase 6 — compatibilidade verificada previamente (Vitest 4.1.11
exige Node `^20 || ^22 || >=24` e Vite `^6 || ^7 || ^8`; este projeto usa Node
22.17.0 e Vite 8.2.2). Nenhuma outra dependência foi instalada em nenhuma das
seis fases. Sem Tailwind, GSAP, Three.js, bibliotecas de partícula, kits de
UI, biblioteca de formulário/validação além do Zod, roteamento, SDK de
analytics, CAPTCHA, DOMPurify, Helmet, criptografia ou Supabase.

## 5. Sistema de design consolidado (Fase 5)

`src/styles/theme.ts` agora inclui, além dos tokens já existentes
(`colors`, `typography`, `spacing`, `radii`, `shadows`, `breakpoints`):

- **`layout`**: `maxWidth` (1280px, fonte única reutilizada por Header, Hero,
  `sectionPrimitives` e Rodapé), `readableWidth` (640px), `gutterDesktop`
  (= `spacing.xl`) e `gutterMobile` (= `spacing.md`).
- **`zIndex`**: `base`, `decorative` (0), `content` (1), `sticky` (20), `header`
  (40), `skipLink` (100) — aplicados em todos os usos de `z-index` do projeto
  (Header, skip link, fundo ambiente da Hero, destaque de linha do Business
  Engine, colunas sticky do Processo e do Contato).
- **`motion`**: `duration.fast/standard/deliberate` (0.2/0.35/0.6s) e `easing`
  (`cubic-bezier(0.16, 1, 0.3, 1)`, equivalente em CSS à curva `EASE` do Motion).

`src/utils/motionPresets.ts` continua sendo a **fonte única** da curva `EASE`
usada pelo Motion (`[0.16, 1, 0.3, 1]`) — a duplicata local que existia em
`HeroSection.tsx` foi removida; o arquivo agora importa `EASE` de
`motionPresets.ts`.

`src/styles/actions.ts` exporta o mixin `goldActionStyles` (via `css` do
styled-components) com o tratamento visual completo do CTA dourado (fundo,
texto, altura mínima, padding, raio, hover/active/disabled, sombra restrita,
duração/easing). É consumido por `styled.a`/`styled.button` em **6 lugares**:
Header, Hero, Arquitetura de Soluções, Diferenciais, botão de envio do
formulário de Contato e CTA do rodapé — cada um preservando seu elemento
semântico e comportamento próprios. `white-space: nowrap` **não** faz parte do
mixin (ficaria arriscado para os CTAs com texto mais longo em telas estreitas);
é aplicado localmente apenas no CTA do Header, que já tem um rótulo curto
alternativo para telas pequenas.

`src/hooks/useMediaQuery.ts` é um novo hook reutilizável (`window.matchMedia`,
evento `change`, valor inicial síncrono via `useState(() => ...)`, sem listener
duplicado) usado para decidir, em `WorkProcessSection.tsx`, qual variante do
`EngineeringBlueprint` montar.

## 6. Ordem final da página (inalterada desde a Fase 4)

1. Site Header (`#topo`)
2. Hero
3. Diagnóstico do Negócio (`#diagnostico`)
4. Arquitetura de Soluções (`#solucoes`)
5. Como Atuamos (`#como-atuamos`)
6. Diferenciais + checkpoint de conversão (`#diferenciais`)
7. Dúvidas / FAQ (`#duvidas`)
8. Contato / formulário de conversão (`#contato`)
9. Rodapé (com bloco de privacidade `#privacidade`)

## 7. IDs de seção e alvos de âncora (Header e Footer)

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

"Diferenciais" continua deliberadamente fora do Header para preservar o
equilíbrio visual da navegação. O link de skip ("Pular para o conteúdo") é o
primeiro elemento focável da página e leva a `#conteudo-principal`.

## 8. Header — alinhamento (Fase 5)

O fundo do `<header>` continua ocupando 100% da largura da viewport (sticky,
`z-index: theme.zIndex.header`), mas o conteúdo interno (`HeaderInner`) agora é
o mesmo `ContentWrapper` de 1280px reutilizado pelas seções e pelo rodapé —
wordmark, navegação e CTA alinham horizontalmente com o resto da página em
qualquer largura de tela. Comportamento de scroll, navegação oculta em
`max-width: md`, troca de rótulo do CTA em `max-width: sm` e o skip link foram
todos preservados sem alteração funcional.

## 9. Correção do breakpoint de 1280px no Processo de Trabalho

`WorkProcessSection.tsx` e `EngineeringBlueprint.tsx` usavam `max-width: xl` e
`min-width: xl` com o mesmo valor (1280px), que se sobrepunham exatamente nesse
limite. Corrigido para:

- desktop (sticky + Blueprint interativo): `min-width: ${theme.breakpoints.xl}`;
- mobile/tablet (resumo estático): `max-width: calc(${theme.breakpoints.xl} - 1px)`.

As duas condições nunca são verdadeiras ao mesmo tempo. Uma consulta adicional
`(min-width: xl) and (max-height: 760px)` reduz a altura mínima das etapas
(`StepBlock`) em telas desktop mais baixas (ex.: 1280×720), evitando restaurar
regras de largura conflitantes para resolver o problema de altura.

## 10. Montagem única do Engineering Blueprint

`WorkProcessSection.tsx` usa `useMediaQuery('(min-width: 1280px)')` (mesmo valor
do breakpoint corrigido acima) para decidir, em JavaScript, qual variante
renderizar — **nunca as duas ao mesmo tempo**. Antes, ambas as variantes
(`static` e `interactive`) ficavam sempre montadas e eram apenas ocultadas por
CSS (`display: none`), cada uma rodando seus próprios `useScroll`/`useSpring`
mesmo invisível. A ordem de leitura do DOM continua consistente com a ordem
visual em cada largura de tela.

## 11. Foco do Business Engine

`BusinessEngine.tsx`: o painel usava `:focus` com `outline-offset: 4px`,
diferente do padrão global. Corrigido para `:focus-visible` com
`outline-offset: 2px`, igual ao restante do site — cliques de mouse não exibem
mais o anel de foco de teclado.

## 12. Diferenciais — recomposição

`DifferentialsSection.tsx`: a grade editorial (afirmação de transparência +
trilho de diferenciais) passou de uma proporção `0.8fr/1.2fr` para uma proporção
explícita `4fr/8fr` (4 de 12 / 8 de 12 colunas conceituais). O checkpoint de
conversão, antes alinhado à esquerda e ocupando parte da largura, agora é uma
faixa de largura total (`grid-template-columns: minmax(0,1fr) auto`) com
título/texto à esquerda e CTA/linha de apoio à direita (centralizados
verticalmente) em desktop, empilhando em `max-width: lg`. Usa uma superfície
elevada com uma única borda superior dourada — sem brilho ou cartão gigante.

## 13. Contato — composição estratégica de desktop

`ConversionSection.tsx`: em `min-width: 1024px`, a seção usa um grid de duas
colunas (`minmax(320px, 0.8fr) minmax(0, 1.2fr)`, gap responsivo via `clamp()`)
— "EFSA Signal Convergence" à esquerda (`VisualColumn`, sticky em desktop,
`top: theme.spacing['4xl']` para compensar o Header, `z-index:
theme.zIndex.sticky`) e o formulário à direita (`FormColumn`). Abaixo de
1024px, as colunas empilham (visual acima, formulário abaixo), sem sticky,
centralizadas em uma largura máxima de leitura (`theme.layout.readableWidth`).
O eyebrow/heading/parágrafo da seção permanecem em largura total, acima do
grid (mantendo o mesmo padrão das demais seções).

O formulário agora vive dentro de um `FormShell` — superfície escura elevada
(gradiente `surfaceElevated → surfaceDark`), uma borda sutil, um destaque fino
no topo (gradiente horizontal de 1px) e `theme.shadows.sm` como profundidade
restrita. O colapso de "Nome"/"Empresa" para uma coluna passou de
`max-width: sm` (480px) para `max-width: md` (768px), mais coerente com a
largura real do formulário nesse intervalo.

## 14. Signal Convergence — refinamento

`SignalConvergence.tsx` ganhou um "scanner" dourado de passagem única
(`ScanBand`, `transform`/`opacity`, `whileInView` + `viewport:{once:true}`) que
executa **depois** da convergência original terminar (delay 1.9s) e não se
repete. A convergência original (três traçados + nó central + sinal em direção
ao formulário) foi preservada sem alteração de comportamento.

## 15. Legibilidade móvel dos SVGs

`EngineeringBlueprint.tsx` e `SignalConvergence.tsx`: os rótulos pequenos
dentro dos SVGs decorativos (`aria-hidden`) — números dos nós e nomes das
frentes ("Aquisição", "Atendimento", "Operação", "EFSA") — ficam ocultos em
`max-width: sm` (480px), faixa que cobre os três celulares de validação
(430×932, 390×844, 360×800). O significado permanece disponível em texto HTML
real já existente (indicador "ETAPA 0X/04", status do Blueprint, legenda da
Signal Convergence) — nenhuma informação foi duplicada nem removida da árvore
de acessibilidade.

## 16. Rodapé — arquitetura visual (Fase 5)

`SiteFooter.tsx` foi recomposto em três áreas (`grid-template-areas`): marca,
navegação e contato (CTA "FALAR COM A EFSA", reutilizando
`contact.whatsappUrl`). Em telas médias (`md`–`lg`) a marca ocupa a linha
inteira e navegação/contato dividem a linha seguinte; em mobile tudo empilha e
a lista de navegação vira 2 colunas para ficar compacta. Assinatura visual:
uma linha de horizonte dourado-marinho no topo, uma marca d'água "EFSA" grande
e de baixíssima opacidade, e um grid técnico estático — todos `aria-hidden` e
sem nenhuma animação em loop. A linha inferior de privacidade/copyright usa
`id="privacidade"` (preservado) com o texto de privacidade à esquerda e o
copyright à direita em desktop, empilhando em mobile.

## 17. Arquitetura da FAQ

`src/components/sections/FaqSection.tsx` + `src/data/faq.ts` (7 perguntas/
respostas estáticas e tipadas). Usa `<details>/<summary>` nativos — funciona
sem JavaScript para abrir/fechar; apenas o primeiro item vem aberto por padrão.
O indicador visual (chevron) gira via seletor CSS `details[open] > & svg`, sem
JavaScript. Título de cada pergunta é um `h3` real dentro do `<summary>`.

## 18. Arquitetura do formulário de conversão

Estado local via `useState` (`values`, `errors`, `isSubmitting`, `fallbackUrl`)
— nenhuma persistência. Campos: nome (texto, obrigatório, máx. 80), empresa
(texto, obrigatório, máx. 100), segmento (select nativo, obrigatório),
prioridade (`fieldset`/`legend` com rádios nativos, obrigatório), contexto
(textarea, opcional, máx. 500, com contador de caracteres sem `aria-live`).

**Validação (Fase 6):** migrada para **Zod v4**, fonte única de verdade em
`src/schemas/conversionFormSchema.ts`. `parseConversionForm()` faz
`safeParse`, nunca lança, e devolve `{ success: true, data }` ou
`{ success: false, errors }` no mesmo formato que a UI já esperava. `segmento`
e `prioridade` usam `z.enum(segmentOptions)`/`z.enum(priorityOptions)`
(reexportados de `src/data/conversionForm.ts`, sem duplicar os valores) — um
valor fora do conjunto permitido é rejeitado mesmo que a UI seja contornada.
`nome`/`empresa`/`contexto` usam `.trim()` + `.min()`/`.max()`; nenhuma
sanitização agressiva (escaping de HTML não é tratado como validação — o
valor nunca é renderizado como HTML). Erros em português, associados via
`aria-describedby` + `role="alert"`; foco move para o primeiro campo inválido
após tentativa de envio.

`buildWhatsAppFormMessage()` (agora em `src/utils/whatsappMessage.ts`, extraído
do componente para ser testável) monta o texto a partir do `data` já validado
pelo Zod; `contact.buildWhatsAppUrl(message)` (extensão da configuração
central em `src/config/contact.ts`, assinatura simplificada para receber só a
mensagem) constrói a URL com `URLSearchParams`. `window.open` abre o
WhatsApp; a URL gerada é sempre exibida como link de fallback visível após a
tentativa de envio, já que a detecção de bloqueio de pop-up é inerentemente
pouco confiável entre navegadores. **A validação do Zod é uma melhoria de
correção e UX — não é uma fronteira de segurança**; se um backend for
introduzido no futuro, a mesma validação precisa rodar também no servidor
(ver `docs/SECURITY.md`).

## 19. Decisões de acessibilidade, redução de movimento e segurança (acumuladas)

- Um único `h1` (Hero); títulos de seção `h2`; subtítulos `h3` em hierarquia
  lógica.
- Skip link funcional, landmark principal com `id="conteudo-principal"` e
  `tabIndex={-1}`.
- Todo SVG decorativo é `aria-hidden`; textos com significado próprio ficam
  fora do `aria-hidden`.
- Nenhum `aria-live` em conteúdo que muda automaticamente; erros de formulário
  usam `role="alert"` (resultado direto de ação explícita do usuário).
- Foco visível padronizado em `:focus-visible` em todo o site, incluindo o
  painel do Business Engine (corrigido na Fase 5) e os 6 CTAs dourados.
- `scroll-margin-top` em todas as seções-alvo de âncora; offset sticky do
  Header considerado também pelas colunas sticky do Processo e do Contato.
- Reduced-motion: base global em `GlobalStyle.ts` + `useReducedMotion()` por
  componente; `buildViewportRevealProps` centraliza a lógica para todas as
  seções pós-Hero — nenhuma duplicação.
- Segurança: sem `dangerouslySetInnerHTML` em React (o único HTML estático
  fora do React é o JSON-LD no `index.html`); sem scripts externos, CDNs,
  segredos, variáveis de ambiente, analytics ou coleta de dados; sem
  requisição de rede partindo do site; links externos com `rel="noopener
  noreferrer"`; `maxLength` nativo nos campos de texto; nenhuma alegação de
  segurança absoluta.

## 20. Comandos de verificação

```
yarn install   # instala dependências
yarn dev       # servidor de desenvolvimento (Vite)
yarn lint      # oxlint
yarn build     # tsc -b && vite build
yarn preview   # serve o build de produção localmente
```

## 21. Status atual de teste, lint e build

- **Testes:** nenhum runner de testes automatizados está configurado no
  projeto até o momento.
- **Lint:** `yarn lint` (oxlint) — sem erros ou avisos ao final da Fase 5.
- **Build:** `yarn build` — sucesso, TypeScript `strict` sem erros.

## 22. Bloqueadores conhecidos de lançamento

Ver [docs/DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) para a lista
completa — nenhum item foi marcado como resolvido nesta fase. Resumo:

- Confirmação do número comercial oficial do WhatsApp em produção.
- Logo oficial, favicon e imagem de social-preview (1200×630) ainda não
  existem.
- Hospedagem, DNS de `www.efsolutions.com.br` e HTTPS ainda não configurados.
- Cabeçalhos de segurança de produção (CSP etc.) ainda não configurados nem
  testados contra styled-components e a fonte autohospedada.
- Decisão pendente sobre Google Analytics e sobre armazenamento de leads no
  Supabase.
- Nenhum teste em dispositivos/navegadores reais nem Lighthouse em produção
  foi executado.
- Validação visual real (capturas de tela/gravações) dos ajustes da Fase 5
  ainda não foi feita neste ambiente — apenas revisão de código, lint e build.

## 23. Resumo dos arquivos não commitados da Fase 5 (no momento da escrita)

**Criados:**
`src/styles/actions.ts` (mixin `goldActionStyles`),
`src/hooks/useMediaQuery.ts`.

**Modificados:**
`src/styles/theme.ts` (`layout`, `zIndex`, `motion`),
`src/components/sections/sectionPrimitives.tsx` (`ContentWrapper`/`SectionIntro`
usando os novos tokens),
`src/components/sections/HeroSection.tsx` (remoção do `EASE` local, largura
compartilhada, `PrimaryCta` via mixin, `z-index` tokenizado),
`src/components/layout/SiteHeader.tsx` (Header alinhado ao `ContentWrapper`,
CTA via mixin, `z-index` tokenizado),
`src/components/visuals/AmbientHeroBackground.tsx` (`z-index` tokenizado),
`src/components/visuals/BusinessEngine.tsx` (foco `:focus-visible`, `z-index`
tokenizado),
`src/components/sections/WorkProcessSection.tsx` (breakpoint de 1280px
corrigido, montagem única do Blueprint via `useMediaQuery`, `z-index`
tokenizado),
`src/components/visuals/EngineeringBlueprint.tsx` (rótulos SVG ocultos em
telas estreitas),
`src/components/sections/SolutionArchitectureSection.tsx` (CTA via mixin),
`src/components/sections/DifferentialsSection.tsx` (grid 4/8, checkpoint em
faixa de largura total, CTA via mixin),
`src/components/sections/ConversionSection.tsx` (grid de duas colunas,
`FormShell`, CTA via mixin, breakpoint de campos ajustado),
`src/components/visuals/SignalConvergence.tsx` (scanner pós-convergência,
rótulos SVG ocultos em telas estreitas),
`src/components/layout/SiteFooter.tsx` (recomposição em três colunas + camada
decorativa + CTA via mixin),
`src/App.tsx` (`z-index` do skip link tokenizado),
`README.md`, `docs/PROJECT_BRIEF.md`, `docs/CODEBASE_STATE.md` (este arquivo).

Nenhuma dependência nova foi adicionada; `package.json` permanece inalterado
desde o checkpoint da Fase 4.
