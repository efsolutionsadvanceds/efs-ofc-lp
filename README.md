# E.F Solutions | Landing Page

Landing page institucional da **E.F Solutions Advanced's** (apresentação pública: **EFSA | Engenharia de Software**), voltada a empresas de alto ticket dos segmentos de reforma, arquitetura, construção e correlatos. O objetivo de conversão principal é direcionar o visitante para o WhatsApp através do CTA "QUERO TER MAIS RESULTADOS".

Consulte [docs/PROJECT_BRIEF.md](docs/PROJECT_BRIEF.md) para o briefing completo de marca, público, copy e diretrizes visuais.

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
- ✅ WhatsApp é a única integração de conversão implementada nesta fase (configuração centralizada em [src/config/contact.ts](src/config/contact.ts)).
- ⚠️ Nenhum resultado de cliente verificado é representado em nenhuma parte da interface.
- ⏳ Vídeo de fundo na Hero permanece como possível melhoria futura opcional — não implementado nesta fase.
- ⏳ Demais seções finais da landing page (serviços, processo, diferenciais e demonstrações, CTA final, etc.) ainda não implementadas.
- ⏳ Integrações futuras (Supabase, Google Analytics) ainda não implementadas.
