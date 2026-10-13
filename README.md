# E.F Solutions — Site institucional

Site da E.F Solutions: criação de sites, sistemas sob medida, automação de WhatsApp e SEO/divulgação digital para empresas.

## Stack

- [Vite](https://vite.dev/) + [React 19](https://react.dev/) + TypeScript (`strict`)
- [React Router DOM v7](https://reactrouter.com/) — 3 rotas de conteúdo (`/`, `/solucoes`, `/contato`) + legais (`/privacidade`, `/termos`)
- [styled-components v6](https://styled-components.com/) — estilização exclusiva da aplicação
- [lucide-react](https://lucide.dev/) — ícones
- Fontes autohospedadas (WOFF2 local em `public/fonts`): JetBrains Mono Variable (fonte principal, monoespaçada) e Poppins Bold (usada só no H1 do hero e no H1 da página de contato)
- [oxlint](https://oxc.rs/) — lint
- [Vitest](https://vitest.dev/) — testes unitários
- Yarn — único gerenciador de pacotes

## Comandos

| Comando           | Descrição                                             |
| ------------------ | ------------------------------------------------------ |
| `yarn`             | Instala as dependências                                 |
| `yarn dev`         | Servidor de desenvolvimento (Vite)                       |
| `yarn build`       | Typecheck + build de produção (`dist/`)                 |
| `yarn preview`     | Serve o build de produção localmente                     |
| `yarn typecheck`   | Apenas checagem de tipos                                 |
| `yarn lint`        | Lint (oxlint)                                            |
| `yarn test`        | Testes unitários (Vitest)                                |

## Contato

Não há formulário — o site é propositalmente direto: o visitante clica em um botão e abre uma conversa no WhatsApp já configurado (`src/config/site.ts`, com fallback via `VITE_WHATSAPP_NUMBER`). O clique dispara o evento padrão "Contact" do Meta Pixel (`src/lib/metaPixel.ts`) para medição de anúncios.

## Deploy

Pensado para a Vercel (`vercel.json` inclui cabeçalhos de segurança, redirect do domínio antigo `efsa.com.br` e redirects 301 das antigas rotas de serviço para `/solucoes`).
