# E.F Solutions | Landing Page

Landing page institucional da **E.F Solutions Advanced's** (apresentação pública: **EFSA | Engenharia de Software**), voltada a empresas de alto ticket dos segmentos de reforma, arquitetura, construção e correlatos. O objetivo de conversão principal é direcionar o visitante para o WhatsApp através do CTA "QUERO TER MAIS RESULTADOS".

Consulte [docs/PROJECT_BRIEF.md](docs/PROJECT_BRIEF.md) para o briefing completo de marca, público, copy e diretrizes visuais, [docs/CODEBASE_STATE.md](docs/CODEBASE_STATE.md) para um resumo técnico do estado atual do código (handoff), [docs/DEPLOYMENT_CHECKLIST.md](docs/DEPLOYMENT_CHECKLIST.md) para as pendências reais antes de colocar o site no ar, [docs/SECURITY.md](docs/SECURITY.md) para o modelo de ameaças e o fluxo de dados, [docs/PRODUCTION_SECURITY_HEADERS.md](docs/PRODUCTION_SECURITY_HEADERS.md) para a estratégia de cabeçalhos/CSP, e [docs/SEO_AND_DISCOVERY.md](docs/SEO_AND_DISCOVERY.md) para SEO e descoberta.

## Stack

- [Vite](https://vite.dev/) (build tool)
- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (modo `strict`)
- [styled-components v6](https://styled-components.com/) (estilização exclusiva da aplicação)
- [motion](https://motion.dev/) (animações de entrada, transições e microinterações, via `motion/react`)
- [lucide-react](https://lucide.dev/) (ícones)
- [@fontsource-variable/inter](https://fontsource.org/fonts/inter) (fonte Inter Variable autohospedada, sem CDN externo)
- [oxlint](https://oxc.rs/) (lint)
- [Zod v4](https://zod.dev/) (validação de schema — formulário de conversão e configuração de Analytics)
- [Vitest](https://vitest.dev/) (testes unitários de lógica pura, ambiente `node`)
- [Yarn](https://yarnpkg.com/) (único gerenciador de pacotes)

## Comandos disponíveis

| Comando       | Descrição                                          |
| ------------- | --------------------------------------------------- |
| `yarn`        | Instala as dependências do projeto                  |
| `yarn dev`    | Inicia o servidor de desenvolvimento (Vite)          |
| `yarn lint`   | Executa o lint (oxlint)                              |
| `yarn build`  | Gera o build de produção (`tsc -b && vite build`)    |
| `yarn preview`| Serve localmente o build de produção gerado          |
| `yarn test`   | Executa a suíte de testes unitários uma vez (Vitest) |
| `yarn test:watch` | Executa os testes em modo watch                  |
| `yarn security:headers <url>` | Verifica (somente leitura) cabeçalhos de segurança de uma URL já publicada |

## Status atual do projeto

- ✅ Fundação técnica (Vite + React + TypeScript strict + styled-components) configurada.
- ✅ Sistema de design (tema tipado, tokens de cor/tipografia/espaçamento/raio/sombra/breakpoints e `GlobalStyle`) implementado em [src/styles/](src/styles/).
- ✅ Fonte Inter Variable autohospedada, apenas o eixo de peso (`wght`) necessário.
- ✅ Site Header e Hero (Fase 1) implementados: [src/components/layout/SiteHeader.tsx](src/components/layout/SiteHeader.tsx) e [src/components/sections/HeroSection.tsx](src/components/sections/HeroSection.tsx).
- ✅ `motion` e `lucide-react` adicionados para animações de entrada, microinterações e ícones.
- ✅ EFSA Business Engine ([src/components/visuals/BusinessEngine.tsx](src/components/visuals/BusinessEngine.tsx)) é uma **demonstração conceitual** (rótulo visível "DEMONSTRAÇÃO CONCEITUAL") — não representa dados, métricas ou resultados reais de clientes.
- ✅ WhatsApp é a única integração de conversão implementada até aqui (configuração centralizada em [src/config/contact.ts](src/config/contact.ts), reutilizada em todos os CTAs).
- ✅ Seção de Diagnóstico do Negócio (Fase 2) implementada: [src/components/sections/BusinessDiagnosisSection.tsx](src/components/sections/BusinessDiagnosisSection.tsx) (`#diagnostico`). A interação de diagnóstico é **conteúdo explicativo controlado pelo usuário**, não uma auditoria automatizada da empresa do visitante.
- ✅ Seção de Arquitetura de Soluções (Fase 2) implementada: [src/components/sections/SolutionArchitectureSection.tsx](src/components/sections/SolutionArchitectureSection.tsx) (`#solucoes`), com o portfólio de serviços agrupado por resultado de negócio (aquisição/conversão e eficiência operacional/escala) e um CTA final reaproveitando o mesmo link do WhatsApp.
- ✅ Header atualizado com navegação de desktop (`Diagnóstico`, `Soluções`, `Como atuamos`) usando âncoras nativas e rolagem suave acessível — sem rastreamento de scroll ativo e sem menu hambúrguer.
- ✅ Seção "Como Atuamos" (Fase 3) implementada: [src/components/sections/WorkProcessSection.tsx](src/components/sections/WorkProcessSection.tsx) (`#como-atuamos`), com processo em 4 etapas guiado por scroll e o painel cinematográfico **EFSA Engineering Blueprint** ([src/components/visuals/EngineeringBlueprint.tsx](src/components/visuals/EngineeringBlueprint.tsx)) — sticky apenas em telas amplas (≥1280px), com resumo estático em tablets/mobile e em `prefers-reduced-motion` (rota completa sem animação, nenhuma informação ocultada).
- ✅ Seção de Diferenciais (Fase 3) implementada: [src/components/sections/DifferentialsSection.tsx](src/components/sections/DifferentialsSection.tsx) (`#diferenciais`), em composição editorial (coluna de afirmação + trilho de diferenciais), com a declaração de transparência e um checkpoint de conversão final integrado à seção, reutilizando o mesmo CTA do WhatsApp.
- ✅ Processo e boas práticas técnicas (não prova social) são usados como elementos de credibilidade nas novas seções, conforme [docs/PROJECT_BRIEF.md](docs/PROJECT_BRIEF.md).
- ✅ **Estrutura da versão 1 completa** (Fase 4): FAQ, formulário de conversão, composição cinematográfica final, rodapé e SEO técnico implementados. "Versão 1 completa" refere-se à estrutura da página — **não** significa pronto para produção (ver [docs/DEPLOYMENT_CHECKLIST.md](docs/DEPLOYMENT_CHECKLIST.md)).
- ✅ Seção de Dúvidas (`#duvidas`) implementada com `<details>/<summary>` nativos ([src/components/sections/FaqSection.tsx](src/components/sections/FaqSection.tsx)) — acessível sem depender de JavaScript.
- ✅ Formulário de conversão implementado (`#contato`, [src/components/sections/ConversionSection.tsx](src/components/sections/ConversionSection.tsx)) — **os dados preenchidos não são armazenados por este site**; ao enviar, a mensagem é montada e o WhatsApp é aberto com o texto pronto para o visitante revisar antes de enviar.
- ✅ Composição cinematográfica final "EFSA Signal Convergence" implementada ([src/components/visuals/SignalConvergence.tsx](src/components/visuals/SignalConvergence.tsx)), tocando uma única vez ao entrar no viewport.
- ✅ Rodapé e bloco de privacidade (`#privacidade`) implementados ([src/components/layout/SiteFooter.tsx](src/components/layout/SiteFooter.tsx)).
- ✅ SEO técnico revisado em `index.html` (title, description, canonical, Open Graph, Twitter Card, dado estruturado `Organization` em JSON-LD) e `public/robots.txt` / `public/sitemap.xml` criados.
- ⚠️ Analytics e armazenamento de leads no Supabase permanecem **intencionalmente ausentes** — ver [docs/DEPLOYMENT_CHECKLIST.md](docs/DEPLOYMENT_CHECKLIST.md).
- ⚠️ Favicon oficial e imagem de social-preview (og:image) ainda **não existem** — nenhum substituto foi criado; ver checklist de deploy.
- ⚠️ Nenhum resultado de cliente verificado, prova social, depoimento ou métrica é representado em nenhuma parte da interface.
- ⏳ Vídeo de fundo permanece adiado para uma fase futura de aprimoramento visual.
- ✅ **Fase 5 (consolidação visual e correções de layout)** implementada a partir de uma auditoria de arquitetura visual real:
  - Sistema de design consolidado em `src/styles/theme.ts` (`layout`, `zIndex`, `motion`) e `src/styles/actions.ts` (mixin `goldActionStyles`, usado pelos 6 CTAs dourados do site: Header, Hero, Soluções, Diferenciais, formulário de contato e rodapé).
  - Header agora usa o mesmo `ContentWrapper` de 1280px das seções e do rodapé — alinhamento horizontal corrigido em telas largas.
  - Conflito exato de breakpoint em 1280px na seção "Como Atuamos" corrigido (`min-width` e `max-width` não se sobrepõem mais); apenas **uma** instância do `EngineeringBlueprint` fica montada por vez, via o novo hook `useMediaQuery`.
  - Foco do painel do Business Engine trocado de `:focus` para `:focus-visible`.
  - Seção de Contato reformulada: grid de duas colunas em desktop (`EFSA Signal Convergence` à esquerda, sticky, + formulário à direita, agora dentro de um `FormShell`).
  - Seção de Diferenciais reformulada: grid editorial 4/8 colunas e checkpoint de conversão em faixa de largura total.
  - Rodapé reformulado: três colunas (marca, navegação, contato com CTA "FALAR COM A EFSA"), linha de horizonte dourado-marinho e marca d'água "EFSA" decorativas (`aria-hidden`).
  - Rótulos pequenos dentro dos SVGs do Blueprint e da Signal Convergence ocultos em telas muito estreitas (≤480px) para evitar texto microscópico — o significado permanece disponível em texto HTML real.
  - Nenhuma dependência nova; nenhum copy aprovado foi alterado; nenhum vídeo foi adicionado.
- ✅ **Fase 6 (segurança, dados e descoberta)** implementada:
  - Validação do formulário de conversão migrada para **Zod v4**, fonte única de verdade em [src/schemas/conversionFormSchema.ts](src/schemas/conversionFormSchema.ts) — reaproveita os mesmos valores de segmento/prioridade já existentes, sem duplicar enums.
  - **39 → 51 testes unitários** (Vitest, ambiente `node`, sem jsdom) cobrindo validação do formulário, geração/encoding da mensagem e URL do WhatsApp, configuração de Analytics e consistência de SEO/JSON-LD.
  - Fundação de **Google Analytics 4 opt-in e sem dependência de terceiros** ([src/analytics/](src/analytics/)): desativado por padrão, só ativa com um `VITE_GA_MEASUREMENT_ID` real e válido **e** consentimento explícito do visitante; nunca envia dados do formulário; `page_location` sanitizado para origem + caminho.
  - Banner de consentimento acessível em pt-BR ([src/components/analytics/ConsentBanner.tsx](src/components/analytics/ConsentBanner.tsx)), com "Aceitar"/"Recusar" com o mesmo peso visual; controle "Preferências de privacidade" no rodapé para reabrir a escolha.
  - `.gitignore` agora ignora `.env*` reais; `.env.example` documentado (apenas `VITE_GA_MEASUREMENT_ID`, sem valores).
  - Documentação de segurança criada: [docs/SECURITY.md](docs/SECURITY.md) (modelo de ameaças e fluxo de dados), [docs/PRODUCTION_SECURITY_HEADERS.md](docs/PRODUCTION_SECURITY_HEADERS.md) (estratégia de CSP/cabeçalhos em etapas) e script somente leitura `yarn security:headers`.
  - Turnstile/CAPTCHA **não foi ativado** — não existe endpoint de servidor para proteger nesta fase (decisão documentada em `docs/SECURITY.md`).
  - `og:site_name` (ausente) adicionado ao `index.html`; demais metadados de SEO auditados e confirmados corretos.
  - Nenhuma dependência de segurança desnecessária foi adicionada (sem DOMPurify, Helmet, bibliotecas de criptografia); nenhum chatbot de IA; nenhuma credencial real criada.
