# Segurança — EFSA Landing Page

Este documento descreve o modelo de ameaças, o fluxo de dados real e a
arquitetura recomendada para funcionalidades futuras. Ele **não é uma
certificação de conformidade** — nenhuma aplicação é "100% segura",
"inquebrável" ou "totalmente criptografada", e este documento não faz esse
tipo de afirmação em nenhum momento.

## 1. Modelo de ameaças

### Ativos

- Código-fonte e configuração pública do site (não sensível por natureza).
- Disponibilidade e integridade visual do site (marca EFSA).
- Confiança do visitante ao preencher o formulário de contato.
- Futuramente (se introduzido): dados de leads armazenados em backend.

### Fronteiras de confiança

- **Navegador do visitante** — não confiável; qualquer validação nele é apenas
  UX, nunca uma fronteira de segurança.
- **Site estático (Vite/React)** — hoje não possui backend, banco de dados ou
  API própria. Todo o "processamento" acontece no navegador do visitante.
- **WhatsApp (Meta)** — serviço de terceiros para onde o visitante é
  direcionado voluntariamente; a EFSA não controla a segurança do WhatsApp.
- **Google Analytics (quando configurado)** — serviço de terceiros que só
  recebe dados após consentimento explícito, e apenas eventos não pessoais.
- **Hospedagem/CDN (a definir)** — responsável por HTTPS, cabeçalhos de
  segurança e disponibilidade da entrega estática.

### Dados públicos

Todo o conteúdo do site é público por natureza (copy institucional, número de
WhatsApp — que já é público por aparecer no link gerado —, metadados de SEO).

### Dados pessoais

- **Hoje:** os dados preenchidos no formulário (nome, empresa, segmento,
  prioridade, contexto) **passam apenas pelo navegador do visitante** — são
  usados só para montar uma mensagem de WhatsApp e **não são enviados a
  nenhum servidor da EFSA nem armazenados por este site**.
- **Se o Analytics estiver habilitado e o visitante consentir:** apenas a
  escolha de consentimento (aceitar/recusar) é salva no `localStorage` do
  navegador do próprio visitante. Nenhum dado do formulário é enviado ao
  Google Analytics em nenhuma hipótese.

### Serviços de terceiros

| Serviço | Uso atual | Dados recebidos |
| --- | --- | --- |
| WhatsApp (`wa.me`) | Canal de conversão | A mensagem que o próprio visitante decide enviar, dentro do app do WhatsApp |
| Google Analytics (GA4) | Desativado até `VITE_GA_MEASUREMENT_ID` real ser configurado e o visitante consentir | Eventos não pessoais (cliques em CTA com identificador fixo, início de preenchimento do formulário, contagem de erros de validação, abertura de FAQ) e a página visitada (só origem + caminho, sem query string) |

### Ameaças realistas

- Uso indevido do link do WhatsApp fora do site (mitigação: fora do escopo do
  frontend — o número já é público de qualquer forma).
- Injeção de conteúdo malicioso via campos do formulário sendo refletido como
  HTML (mitigação: o site nunca usa `dangerouslySetInnerHTML` nem injeta
  valores do formulário como HTML; tudo é renderizado como texto).
- Extensões de navegador ou scripts de terceiros interferindo na página
  (mitigação parcial via cabeçalhos de segurança na hospedagem — ver
  [docs/PRODUCTION_SECURITY_HEADERS.md](PRODUCTION_SECURITY_HEADERS.md)).
- Dependências de terceiros (`npm`/`yarn`) com vulnerabilidades conhecidas
  (mitigação: auditoria de dependências regular — ver seção 4).
- Ataques de negação de serviço, sequestro de DNS ou interceptação de tráfego
  sem HTTPS (mitigação: responsabilidade da hospedagem/CDN e do DNS, não do
  código React).

### Mitigações atuais

- Nenhum `dangerouslySetInnerHTML`, `.innerHTML`, `eval` ou `document.write`
  em nenhum componente.
- Nenhuma persistência de dados do formulário (sem `localStorage`,
  `sessionStorage`, cookies ou requisição de rede para os valores digitados).
- Validação com Zod (`src/schemas/conversionFormSchema.ts`) rejeita valores
  fora do conjunto de opções permitido antes de compor a mensagem do
  WhatsApp.
- Todos os links externos usam `rel="noopener noreferrer"`.
- `window.open` para o WhatsApp usa a mesma proteção via `windowFeatures`.
- `.gitignore` bloqueia arquivos `.env*` reais; apenas `.env.example` (sem
  valores) é versionado.
- Analytics desativado por padrão; só ativa após Measurement ID válido **e**
  consentimento explícito.

### Riscos residuais (não eliminados pelo frontend)

- HTTPS, HSTS e cabeçalhos de resposta dependem inteiramente da hospedagem
  escolhida — não podem ser implementados dentro do React.
- Ataques de engenharia social que ocorrem inteiramente dentro do WhatsApp
  (fora do controle do site).
- Bots preenchendo o formulário localmente — hoje isso apenas gera uma URL de
  WhatsApp no navegador do próprio bot; não há endpoint de servidor para
  proteger com CAPTCHA (ver seção 3).

### Divisão de responsabilidades

| Controle | Dono |
| --- | --- |
| Validação de formato, limites de tamanho, enums | Frontend (Zod) |
| Sanitização/validação definitiva antes de persistir dados | Backend futuro (nunca só o frontend) |
| HTTPS, redirecionamento, certificados, HSTS | Hospedagem/CDN/DNS |
| Cabeçalhos de resposta (CSP, X-Frame-Options etc.) | Hospedagem/CDN |
| CAPTCHA/Turnstile | Backend futuro (validação via Siteverify) |
| Consentimento de Analytics, granularidade de eventos | Frontend |
| Revisão jurídica de LGPD | Profissional jurídico (fora do escopo técnico) |

## 2. Fluxo de dados

### Fluxo atual (real, implementado)

```
Visitante preenche os campos localmente
        ↓
Navegador valida com Zod (formato, limites, enums)
        ↓
Navegador monta a mensagem e codifica a URL do WhatsApp (URLSearchParams)
        ↓
Visitante escolhe continuar → wa.me abre em nova aba
        ↓
O visitante revisa e decide enviar a mensagem dentro do próprio WhatsApp
```

**Este site não persiste, não registra em log e não envia a nenhum servidor
os valores preenchidos no formulário.** Não existe banco de dados, backend ou
API própria nesta fase do projeto.

### Fluxo futuro opcional (armazenamento de leads) — NÃO IMPLEMENTADO

Este fluxo é apenas uma recomendação de arquitetura para uma decisão futura
da EFSA. Nenhuma parte dele existe hoje no código.

```
Navegador
   → Endpoint de intake server-side (ex.: Supabase Edge Function)
      → Validação do token Turnstile via Siteverify (server-side)
      → Validação Zod no servidor (nunca confiar só na validação do navegador)
      → Rate limiting
      → Inserção no banco de dados (com Row Level Security)
```

Controles obrigatórios para este fluxo futuro, caso seja aprovado:

- Aceitar apenas `POST`.
- Exigir HTTPS.
- Lista restrita de origens permitidas (produção e staging).
- Validar `Content-Type` da requisição.
- Limite pequeno de tamanho do corpo da requisição.
- Validação Zod no servidor (independente da validação do navegador).
- Validação do token Turnstile via Siteverify no servidor.
- Expiração e uso único do token Turnstile.
- Rate limiting no servidor ou na borda (edge).
- Respostas de erro genéricas (sem detalhes internos).
- Nunca registrar em log o corpo completo da requisição com dados pessoais.
- Nunca enviar valores de formulário para Analytics.
- Acesso ao banco de dados com privilégio mínimo.
- Credenciais `service-role` apenas no cofre de segredos do provedor
  server-side — nunca no frontend, nunca em `VITE_*`.
- Row Level Security habilitada.
- Nenhum acesso anônimo do navegador para ler, atualizar ou excluir leads
  diretamente.
- Nenhum uso de chave `service-role` no navegador.
- Política explícita de retenção e exclusão de dados.
- Minimização de dados (coletar só o necessário).
- Procedimento de resposta a incidentes definido.
- Trilha de auditoria sem PII desnecessária.
- Backups com teste de restauração.
- Revisão periódica de quem tem acesso aos dados.
- Revisão jurídica de LGPD antes de ativar.

## 3. Por que o Turnstile (CAPTCHA) não foi ativado nesta fase

O formulário atual **não envia dados a nenhum endpoint de servidor** — ele
apenas monta uma mensagem e abre o WhatsApp no navegador do próprio
visitante. Não existe, portanto, nenhum recurso de servidor para um CAPTCHA
proteger. Um CAPTCHA verificado somente no navegador **não é uma fronteira de
segurança válida** (pode ser contornado trivialmente) e adicionaria atrito de
conversão sem benefício real de segurança. O Turnstile deve ser introduzido
**apenas quando** um endpoint server-side de fato existir, com validação via
Siteverify feita no servidor — nunca só no cliente.

## 4. Auditoria de dependências

Execução mais recente:

```
yarn audit --groups dependencies   → 0 vulnerabilidades (20 pacotes)
yarn audit (completo)              → 0 vulnerabilidades (115 pacotes)
yarn outdated                      → apenas @types/node e typescript com majors mais novos disponíveis (informativo, nenhuma ação automática realizada)
```

Nenhuma correção automática (`audit fix`), resolução forçada ou major upgrade
foi executada. A contagem de "0 vulnerabilidades" **não é uma prova de que a
aplicação é segura** — é apenas o resultado desta auditoria pontual, para
este conjunto de dependências, nesta data.
