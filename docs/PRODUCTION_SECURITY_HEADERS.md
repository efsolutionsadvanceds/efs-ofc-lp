# Cabeçalhos de Segurança de Produção — EFSA Landing Page

Este documento é **agnóstico de provedor**. Nenhum arquivo de configuração
específico de hospedagem (`_headers` do Cloudflare, `vercel.json`,
`netlify.toml` etc.) foi criado, porque o provedor de hospedagem ainda não
foi selecionado. Criar esse arquivo antes da escolha do host arriscaria
configurar a sintaxe errada ou presumir um provedor que não será usado.

**HTTPS não pode ser implementado dentro do React.** É responsabilidade da
camada de hospedagem/CDN e da configuração de DNS/certificado. Este código
não contém nem finge conter uma implementação de HTTPS.

## 1. Checklist de HTTPS (responsabilidade da hospedagem/CDN)

- [ ] Redirecionar toda requisição HTTP para HTTPS.
- [ ] Nenhum recurso "mixed content" (script, imagem ou fonte carregado via
      `http://` em uma página `https://`).
- [ ] Certificado TLS válido e configurado para renovação automática.
- [ ] `Strict-Transport-Security` habilitado **somente depois** de confirmar
      que 100% do tráfego funciona corretamente em HTTPS.

**Não habilitar `preload` nem `includeSubDomains` no HSTS até que todos os
subdomínios relevantes estejam confirmados como compatíveis com HTTPS** — um
subdomínio esquecido sem HTTPS ficaria inacessível para sempre em navegadores
que já aplicaram o preload.

## 2. Estratégia de Content-Security-Policy (CSP) em etapas

**Nunca aplicar uma CSP restritiva diretamente em modo bloqueante.** A
sequência recomendada:

1. Implantar com `Content-Security-Policy-Report-Only` primeiro.
2. Coletar violações reportadas por um período representativo de tráfego
   real (inclui todas as seções da landing page, o formulário e, se
   habilitado, o Analytics).
3. Ajustar a política com base nas violações reais observadas — nunca supor
   a política final sem essa etapa.
4. Testar o site inteiro manualmente (todas as seções, o formulário, o
   fallback de WhatsApp e, se aplicável, o banner de consentimento).
5. Só então aplicar a CSP em modo de bloqueio (`Content-Security-Policy`,
   sem `-Report-Only`).

### Particularidades técnicas desta aplicação que a CSP precisa considerar

- **styled-components** injeta `<style>` em runtime no `<head>`. Isso exige
  permitir estilos inline de alguma forma (`style-src 'unsafe-inline'` é o
  caminho mais simples e é uma prática amplamente aceita para CSS — o risco
  real de CSP está em `script-src`, não em `style-src`). Não é necessário
  nem recomendado usar `unsafe-inline` para `script-src`.
- **JSON-LD inline** (`<script type="application/ld+json">` em `index.html`)
  precisa ser explicitamente permitido. Como é um bloco estático definido no
  próprio código-fonte (não gerado dinamicamente a partir de dados do
  usuário), a estratégia de produção recomendada é usar um **hash SHA-256**
  do conteúdo exato do script (`script-src 'sha256-<hash>'`) ou um **nonce**
  gerado pelo servidor a cada requisição, dependendo da capacidade da
  hospedagem escolhida de injetar um nonce dinâmico. **Documentar a escolha
  exata (hash ou nonce) somente quando a hospedagem for definida** — algumas
  hospedagens estáticas não suportam nonce por requisição, o que torna o
  hash a opção mais viável para um site puramente estático.
- **Google Analytics (GA4)**, somente quando `VITE_GA_MEASUREMENT_ID` for
  configurado e habilitado, exige liberar os domínios
  `https://www.googletagmanager.com` e `https://www.google-analytics.com`
  (script e conexão). Antes disso, **nenhum domínio do Google deve constar
  na CSP**, e nenhum `preconnect`/`dns-prefetch` para esses domínios deve ser
  adicionado antes do consentimento do visitante.
- **Turnstile**, se e quando for implementado (ver
  [docs/SECURITY.md](SECURITY.md)), exigirá liberar
  `https://challenges.cloudflare.com` — não incluir esse domínio antes de o
  Turnstile realmente existir no projeto.
- **Fonte autohospedada** (`@fontsource-variable/inter`) já é servida pelo
  próprio domínio, então não exige nenhuma exceção de `font-src` para
  domínios externos.

### Diretivas recomendadas (a validar em Report-Only antes de aplicar)

```
default-src 'self';
script-src 'self' [hash-ou-nonce-do-json-ld] [dominios-ga4-somente-se-habilitado];
style-src 'self' 'unsafe-inline';
img-src 'self' data:;
font-src 'self';
connect-src 'self' [dominios-ga4-somente-se-habilitado];
frame-ancestors 'none';
object-src 'none';
base-uri 'self';
form-action 'self' https://wa.me;
```

Notas:

- **Nunca usar `unsafe-eval`.**
- **Evitar `unsafe-inline` em `script-src`** — o JSON-LD deve usar
  hash/nonce, nunca abrir mão de toda a política de scripts por causa de um
  único bloco estático.
- `form-action` inclui `https://wa.me` porque, embora o formulário não faça
  um `submit` HTML tradicional (o envio é via `window.open` em JavaScript, não
  via `action` do `<form>`), manter essa diretiva alinhada ao destino real da
  navegação evita bloqueios inesperados caso o comportamento mude no futuro.

## 3. Outros cabeçalhos recomendados

| Cabeçalho | Valor recomendado | Observação |
| --- | --- | --- |
| `X-Content-Type-Options` | `nosniff` | Sem efeitos colaterais conhecidos nesta aplicação |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Compatível com o link do WhatsApp e com o Analytics (que já sanitiza a página para origem + caminho) |
| `Permissions-Policy` | Restritiva (ex.: negar `camera`, `microphone`, `geolocation`, `payment` — nenhum é usado pelo site) | Ajustar conforme necessidade real, nunca copiar uma lista genérica sem revisar |
| `X-Frame-Options` | `DENY` | Defesa em profundidade; `frame-ancestors 'none'` na CSP já cobre a maioria dos navegadores modernos |
| Cabeçalhos de identificação de servidor (`Server`, `X-Powered-By` etc.) | Remover ou reduzir quando possível | Depende da hospedagem escolhida |

### Isolamento de origem cruzada (`Cross-Origin-*`)

Avaliar `Cross-Origin-Opener-Policy` e `Cross-Origin-Embedder-Policy` **com
cautela**: políticas muito restritivas podem quebrar o carregamento do script
do Google Analytics ou a abertura de `wa.me` em nova aba. Qualquer decisão
aqui deve ser testada manualmente após a implementação, nunca presumida.

## 4. Script de verificação (somente leitura)

`scripts/check-security-headers.mjs` — sem dependências externas — aceita uma
URL já publicada e informa quais cabeçalhos esperados estão presentes ou
ausentes, e se o HTTP redireciona para HTTPS.

```
node scripts/check-security-headers.mjs https://exemplo-de-producao.com.br
```

ou, via script do `package.json`:

```
yarn security:headers https://exemplo-de-producao.com.br
```

O script:

- é somente leitura (não altera nada, não faz deploy, não configura nada);
- exige uma URL explícita como argumento — **nunca roda automaticamente**
  nem contra produção real durante este projeto;
- reporta em pt-BR quais cabeçalhos esperados faltam;
- **não afirma que a presença dos cabeçalhos prova segurança completa** —
  apenas confirma que estão presentes na resposta observada.

## 5. Ordem recomendada de implementação

1. Selecionar a hospedagem.
2. Configurar HTTPS e redirecionamento HTTP → HTTPS.
3. Aplicar os cabeçalhos "simples" (`X-Content-Type-Options`,
   `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`) — baixo risco
   de quebrar algo.
4. Aplicar `Content-Security-Policy-Report-Only` e observar violações reais
   por um período.
5. Ajustar a política com base nos dados reais coletados.
6. Aplicar a CSP em modo de bloqueio.
7. Só então habilitar `Strict-Transport-Security` (e, mais tarde, considerar
   `preload`/`includeSubDomains` apenas com todos os subdomínios validados).
