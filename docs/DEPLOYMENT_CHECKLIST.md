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
6. **Configurar o DNS de efsa.com.br**.
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

## Observações

- Nenhum arquivo específico de provedor (Vercel, Netlify, etc.) foi criado nesta
  fase, pois o host ainda não foi selecionado.
- Nenhuma variável de ambiente, segredo, credencial ou domínio adicional foi
  inventado neste projeto.
- Este checklist deve ser atualizado conforme cada item for resolvido.
