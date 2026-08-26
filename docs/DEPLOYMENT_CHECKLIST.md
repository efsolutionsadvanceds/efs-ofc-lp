# Checklist de Deploy — EFSA Landing Page

Este documento lista tarefas de produção **ainda não resolvidas** e que dependem de
informações reais externas ao código. Nenhum item aqui foi inventado ou assumido —
todos exigem decisão, credencial ou ativo que só o responsável pelo negócio pode
fornecer. "Versão 1 completa" (estrutura da página) **não significa** que o site está
pronto para ir ao ar.

## Pendências antes do lançamento

1. **Confirmar o número comercial oficial do WhatsApp** usado em
   `src/config/contact.ts`.
2. **Fornecer e aprovar os arquivos oficiais de logo** da EFSA.
3. **Criar e aprovar o favicon** oficial.
4. **Criar uma imagem de social-preview compatível de 1200×630** (og:image). Nenhuma
   imagem foi adicionada nesta fase por não haver um ativo aprovado.
5. **Selecionar o provedor de hospedagem**.
6. **Configurar o DNS de www.efsolutions.com.br**.
7. **Habilitar HTTPS**.
8. **Configurar fallback de SPA** apenas se o host escolhido realmente exigir.
9. **Configurar cabeçalhos de segurança de produção** na camada de hospedagem:
   - `Content-Security-Policy`;
   - `Strict-Transport-Security`;
   - `X-Content-Type-Options`;
   - `Referrer-Policy`;
   - `Permissions-Policy`;
   - `frame-ancestors` ou `X-Frame-Options`.
10. **Testar a CSP** com styled-components (estilos injetados em runtime) e a fonte
    autohospedada (Fontsource) **antes** de aplicá-la em modo bloqueante.
11. **Decidir se o Google Analytics será usado**.
12. **Se Analytics for usado:**
    - obter um Measurement ID real;
    - definir o comportamento de consentimento e privacidade;
    - atualizar a divulgação de privacidade no site;
    - nunca usar um ID de produção placeholder.
13. **Decidir se os leads futuros continuarão apenas via WhatsApp ou também serão
    armazenados no Supabase**.
14. **Se o armazenamento de leads for introduzido:**
    - criar um backend seguro ou uma função server-side controlada;
    - aplicar validação, rate limiting, controle de acesso, regras de retenção e
      revisão de LGPD;
    - nunca expor chaves privilegiadas do Supabase no frontend.
15. **Revisar o texto legal/de privacidade final com um profissional adequado**
    antes de produção.
16. **Testar em dispositivos móveis reais**.
17. **Testar nas versões atuais de Chrome, Edge, Firefox e Safari**.
18. **Rodar o Lighthouse manualmente em modo produção**.
19. **Verificar os Core Web Vitals após o deploy**.
20. **Verificar `robots.txt`, `sitemap.xml`, canonical, JSON-LD e o comportamento do
    social-preview** no domínio real.
21. **Confirmar todos os CTAs do WhatsApp no domínio de produção**.
22. **Confirmar que nenhum artefato de desenvolvimento ou source map fica exposto
    sem intenção**, de acordo com a política de deploy escolhida.

## Checklist de segurança — aprovado/reprovado (Fase 6)

Marcar cada item como **Aprovado**, **Reprovado** ou **N/A** somente após a
verificação real em produção. Nenhum item abaixo pode ser marcado como
aprovado sem evidência (captura de tela, saída de comando ou relatório de
ferramenta). Ver [docs/SECURITY.md](SECURITY.md) e
[docs/PRODUCTION_SECURITY_HEADERS.md](PRODUCTION_SECURITY_HEADERS.md) para o
detalhamento de cada controle.

| # | Verificação | Status |
| - | --- | --- |
| 1 | Propriedade do domínio confirmada | ☐ Pendente |
| 2 | DNS configurado e propagado | ☐ Pendente |
| 3 | HTTPS ativo em todas as rotas | ☐ Pendente |
| 4 | HTTP redireciona para HTTPS | ☐ Pendente |
| 5 | Renovação automática de certificado configurada | ☐ Pendente |
| 6 | Cabeçalhos de produção aplicados (ver seção 3 de `PRODUCTION_SECURITY_HEADERS.md`) | ☐ Pendente |
| 7 | CSP validada em modo `Report-Only` antes da aplicação em bloqueio | ☐ Pendente |
| 8 | Varredura de mixed content (nenhum recurso `http://` em página `https://`) | ☐ Pendente |
| 9 | Auditoria de dependências revisada antes do deploy (`yarn audit`) | ☐ Pendente |
| 10 | Varredura de segredos no repositório (nenhum `.env` real commitado) | ☐ Pendente |
| 11 | Decisão explícita sobre gerar source maps de produção | ☐ Pendente |
| 12 | Decisão explícita sobre monitoramento de erros (ferramenta, se houver) | ☐ Pendente |
| 13 | Console do navegador inspecionado em produção (sem erros/warnings inesperados) | ☐ Pendente |
| 14 | Teste do banner de consentimento do Analytics (aceitar/recusar) | ☐ Pendente |
| 15 | Teste de rede antes do consentimento (nenhuma requisição ao Google) | ☐ Pendente |
| 16 | Teste de rede depois do consentimento (requisição ocorre e é mínima) | ☐ Pendente |
| 17 | Confirmação de que nenhum evento de Analytics carrega dado pessoal | ☐ Pendente |
| 18 | Propriedade verificada no Search Console | ☐ Pendente |
| 19 | Sitemap enviado no Search Console | ☐ Pendente |
| 20 | `robots.txt` validado na URL real de produção | ☐ Pendente |
| 21 | JSON-LD validado na ferramenta de Rich Results do Google | ☐ Pendente |
| 22 | Lighthouse executado em produção | ☐ Pendente |
| 23 | Navegação completa por teclado testada | ☐ Pendente |
| 24 | Teste rápido com leitor de tela (smoke test) | ☐ Pendente |
| 25 | Teste em navegador mobile real | ☐ Pendente |
| 26 | Validação funcional do formulário (todos os campos e mensagens de erro) | ☐ Pendente |
| 27 | Validação do fallback de WhatsApp (link visível funciona) | ☐ Pendente |
| 28 | Teste de backup/restauração — **somente se** armazenamento de leads for introduzido | ☐ N/A por enquanto |
| 29 | Responsável definido para resposta a incidentes | ☐ Pendente |
| 30 | Revisão jurídica de privacidade/LGPD concluída | ☐ Pendente |

## Observações

- Nenhum arquivo específico de provedor (Vercel, Netlify, etc.) foi criado nesta
  fase, pois o host ainda não foi selecionado.
- Nenhuma variável de ambiente, segredo, credencial ou domínio adicional foi
  inventado neste projeto.
- Este checklist deve ser atualizado conforme cada item for resolvido.
- Ver também [docs/SECURITY.md](SECURITY.md) (modelo de ameaças e fluxo de
  dados), [docs/PRODUCTION_SECURITY_HEADERS.md](PRODUCTION_SECURITY_HEADERS.md)
  (estratégia de cabeçalhos e CSP) e
  [docs/SEO_AND_DISCOVERY.md](SEO_AND_DISCOVERY.md) (SEO e descoberta).
