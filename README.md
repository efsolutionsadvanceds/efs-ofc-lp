# E.F Solutions | Landing Page

Landing page institucional da **E.F Solutions Advanced's** (apresentação pública: **EFSA | Engenharia de Software**), voltada a empresas de alto ticket dos segmentos de reforma, arquitetura, construção e correlatos. O objetivo de conversão principal é direcionar o visitante para o WhatsApp através do CTA "QUERO TER MAIS RESULTADOS".

Consulte [docs/PROJECT_BRIEF.md](docs/PROJECT_BRIEF.md) para o briefing completo de marca, público, copy e diretrizes visuais, e [docs/CODEBASE_STATE.md](docs/CODEBASE_STATE.md) para um resumo técnico do estado atual do código (handoff).

## Stack

- [Vite](https://vite.dev/) (build tool)
- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (modo `strict`)
- [styled-components v6](https://styled-components.com/) (estilização exclusiva da aplicação)
- [motion](https://motion.dev/) (animações de entrada, transições e microinterações, via `motion/react`)
- [lucide-react](https://lucide.dev/) (ícones)
- [@fontsource-variable/inter](https://fontsource.org/fonts/inter) (fonte Inter Variable autohospedada, sem CDN externo)
- [oxlint](https://oxc.rs/) (lint)
- [Yarn](https://yarnpkg.com/) (único gerenciador de pacotes)

## Comandos disponíveis

| Comando       | Descrição                                          |
| ------------- | --------------------------------------------------- |
| `yarn`        | Instala as dependências do projeto                  |
| `yarn dev`    | Inicia o servidor de desenvolvimento (Vite)          |
| `yarn lint`   | Executa o lint (oxlint)                              |
| `yarn build`  | Gera o build de produção (`tsc -b && vite build`)    |
| `yarn preview`| Serve localmente o build de produção gerado          |

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
- ⚠️ Nenhum resultado de cliente verificado, prova social, depoimento ou métrica é representado em nenhuma parte da interface.
- ⏳ Vídeo de fundo permanece adiado até a estrutura completa da página estar pronta.
- ⏳ Próxima fase planejada: objeções, FAQ, formulário de lead, política de privacidade e rodapé.
- ⏳ Integrações futuras (Supabase, Google Analytics) ainda não implementadas.
