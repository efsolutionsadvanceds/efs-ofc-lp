# Briefing do Projeto — E.F Solutions

## Identidade de marca

- **Marca oficial:** E.F Solutions Advanced's
- **Apresentação pública:** EFSA | Engenharia de Software
- **Domínio:** efsa.com.br
- **Idioma:** Português do Brasil (pt-BR)
- **Estilo visual:** premium, tecnológico, sofisticado, metálico, confiante e clean

## Público-alvo

Empresas de alto ticket (*high-ticket*) dos segmentos de reforma, arquitetura, construção, vidraçaria, marmoraria, reforma residencial, interiores, limpeza e áreas correlatas, com tomada de decisão por sócios e gestores não técnicos.

## Posicionamento estratégico

- A landing page **não** deve apresentar a EFSA como uma empresa genérica que "faz qualquer coisa para qualquer um".
- A promessa comercial central deve conectar tecnologia a três resultados concretos: **atrair mais oportunidades**, **melhorar o atendimento** e **reduzir trabalho manual**.
- Os serviços devem ser apresentados **agrupados por resultado de negócio**, nunca como uma lista solta e desconexa.

## Serviços

Os serviços da EFSA são organizados em duas frentes de resultado de negócio.

### Aquisição e conversão

- Landing pages de alta conversão
- Sites institucionais e sob medida
- E-commerce
- Tráfego pago estratégico
- Criativos publicitários curtos assistidos por IA

### Eficiência operacional e escala

- Sistemas sob medida de alta performance
- Agentes de IA para atendimento, qualificação de leads e tarefas operacionais, sempre com regras e supervisão humana

## Objetivo de conversão

- **Canal principal de conversão:** WhatsApp
- **CTA principal:** "QUERO TER MAIS RESULTADOS"

## Direção visual

### Cores da marca

| Token             | Valor                       | Uso pretendido                    |
| ------------------ | ---------------------------- | ---------------------------------- |
| Background          | `#05070B`                    | Fundo principal                    |
| Preto absoluto       | `#000000`                    | Contrastes profundos                |
| Superfície escura    | `#11161D`                    | Cartões e blocos                    |
| Superfície elevada   | `#1A2029`                    | Elementos em destaque               |
| Cinza metálico       | `#7F8996`                    | Texto secundário / detalhes         |
| Azul escuro          | `#001F5B`                    | Acentos frios                       |
| Dourado primário     | `#FDCF45`                    | Cor de destaque / CTA               |
| Branco               | `#FFFFFF`                    | Texto principal                     |
| Texto neutro         | `#AAB2BF`                    | Texto de apoio                      |
| Bordas sutis         | `rgba(255, 255, 255, 0.12)`  | Divisores e bordas discretas        |

### Tipografia

- **Fonte:** Inter Variable
- **Hospedagem:** autohospedada via `@fontsource-variable/inter` (eixo de peso `wght` apenas)
- Não utilizar Google Fonts ou qualquer CDN externa de fontes.

## Restrições de copy

- Copy sempre em português do Brasil, concisa e compreensível por donos de negócio não técnicos.
- **Nunca fabricar** clientes, depoimentos, estudos de caso, prêmios ou métricas de resultado.
- **Não prometer** geração garantida de leads diários.
- **Não usar** vídeo em autoplay na hero.

## Prova social e credibilidade

A EFSA **ainda não possui resultados de clientes verificados**. Enquanto isso for verdade:

- Não criar nem sugerir prova social de qualquer tipo.
- Não fabricar depoimentos, logos de clientes, estudos de caso, métricas, prêmios ou alegações de sucesso.
- Usar como elementos de credibilidade apenas: **processo de trabalho, capacidade técnica, transparência, demonstrações e entregáveis claros**.

Esta seção deve ser revisada assim que a EFSA tiver resultados de clientes verificados e autorizados para divulgação.

## Princípios de segurança e privacidade

- Nenhum segredo ou variável de ambiente deve ser criado sem necessidade real e aprovação explícita.
- Nenhuma credencial, chave de API ou dado sensível deve ser versionado no repositório.
- Formulários e integrações futuras devem coletar apenas os dados estritamente necessários à conversão via WhatsApp.

## Integrações futuras conhecidas

- **WhatsApp** — canal principal de conversão (CTA "QUERO TER MAIS RESULTADOS").
- **Supabase** — uso futuro previsto; ainda não implementado nesta fase.
- **Google Analytics** — uso futuro previsto; ainda não implementado nesta fase.

Nenhuma dessas integrações está implementada nesta etapa do projeto, que cobre apenas a fundação técnica e o sistema de design.

## Status de implementação — Fase 1 (Header e Hero)

- **Site Header** e **Hero completa** implementados (`src/components/layout/SiteHeader.tsx`, `src/components/sections/HeroSection.tsx`).
- **Dependências adicionadas:** `motion` (animações e microinterações, via `motion/react`) e `lucide-react` (ícones). Nenhuma outra biblioteca de animação, partículas, 3D, formulário, UI ou analytics foi instalada.
- **EFSA Business Engine** (`src/components/visuals/BusinessEngine.tsx`) é uma **demonstração conceitual interativa**, sinalizada visivelmente com o rótulo "DEMONSTRAÇÃO CONCEITUAL". Ela não representa dados reais, métricas, contadores ou resultados de clientes.
- **Nenhum resultado de cliente verificado é representado** em nenhuma parte da interface implementada até aqui — reforça o princípio já documentado em "Prova social e credibilidade".
- **WhatsApp é a única integração de conversão** implementada nesta fase, centralizada em `src/config/contact.ts`. Não há Supabase, backend, analytics, cookies ou coleta de dados nesta etapa.
- **Vídeo de fundo na Hero** permanece como possível **melhoria futura opcional**, não implementado nesta fase (a Hero atual usa apenas animação nativa em código: React, styled-components, Motion, CSS e um SVG inline).

## Status de implementação — Fase 2 (Diagnóstico e Arquitetura de Soluções)

- **Seção de Diagnóstico do Negócio** implementada (`src/components/sections/BusinessDiagnosisSection.tsx`, `#diagnostico`): três cartões de diagnóstico controlados pelo usuário (sem rotação automática) que atualizam um painel "Como a EFSA atua". **A interação é conteúdo explicativo, não uma análise ou auditoria automatizada da empresa do visitante** — nenhum dado do visitante é coletado ou processado.
- **Seção de Arquitetura de Soluções** implementada (`src/components/sections/SolutionArchitectureSection.tsx`, `#solucoes`): dois pilares de solução com o portfólio de serviços permanece **agrupado por resultado de negócio** (Aquisição e conversão / Eficiência operacional e escala), conectados por um visual conceitual nativo em código (CSS + SVG inline, sem Canvas/WebGL, sem dados falsos ou "ao vivo").
- **CTA do WhatsApp reutilizado**: o bloco de CTA final da Arquitetura de Soluções consome a mesma configuração central (`src/config/contact.ts`) já usada no Header e na Hero — nenhuma URL ou lógica de contato foi duplicada.
- **Nenhuma prova social, depoimento, métrica, logotipo de cliente ou resultado fabricado** foi adicionado nesta fase, reforçando "Prova social e credibilidade".
- **Nenhuma nova dependência foi instalada** — reutiliza exclusivamente `motion` e `lucide-react` já presentes desde a Fase 1.
- **Header** ganhou navegação de desktop (`Diagnóstico`, `Soluções`) por âncoras nativas com rolagem suave acessível (`scroll-behavior: smooth` + `scroll-margin-top` nas seções-alvo); oculta em telas estreitas, sem menu hambúrguer e sem rastreamento de scroll ativo.
- **Vídeo de fundo** continua adiado até a estrutura completa da página estar pronta.
