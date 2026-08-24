# E.F Solutions | Landing Page

Landing page institucional da **E.F Solutions Advanced's** (apresentação pública: **EFSA | Engenharia de Software**), voltada a empresas de alto ticket dos segmentos de reforma, arquitetura, construção e correlatos. O objetivo de conversão principal é direcionar o visitante para o WhatsApp através do CTA "QUERO TER MAIS RESULTADOS".

Consulte [docs/PROJECT_BRIEF.md](docs/PROJECT_BRIEF.md) para o briefing completo de marca, público, copy e diretrizes visuais.

## Stack

- [Vite](https://vite.dev/) (build tool)
- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (modo `strict`)
- [styled-components v6](https://styled-components.com/) (estilização exclusiva da aplicação)
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
- ✅ Prévia visual mínima da marca em [src/App.tsx](src/App.tsx) (não é a hero final).
- ⏳ Seções finais da landing page (hero, serviços, processo, diferenciais e demonstrações, CTA, etc.) ainda não implementadas.
- ⏳ Integrações futuras (WhatsApp, Supabase, Google Analytics) ainda não implementadas.
