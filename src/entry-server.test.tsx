import { describe, expect, it } from 'vitest'

import { CITY_PAGES, PRERENDERED_PAGES, SERVICE_PAGES } from './config/pages'
import { CITY_INDEX, cityPath } from './content/cityIndex'
import { SERVICE_PAGE_INDEX, servicePath } from './content/serviceIndex'
import { SERVICE_CONTENT } from './content/servicePages'
import { getSolutions } from './content/solutions'
import { TESTIMONIALS } from './content/testimonials'
import { llmsTxt, prerenderTargets, render, sitemapXml } from './entry-server'
import { GENERIC_LEAD_MESSAGE } from './lib/whatsapp'

/**
 * Pré-renderiza cada página como o build faz. Garante que o registro de
 * páginas (src/config/pages.ts) e as rotas de App.tsx não divergem e que o
 * HTML estático já traz o conteúdo real — inclusive das rotas carregadas
 * com React.lazy.
 */

const H1_BY_PATH: Record<string, string> = {
  '/': 'Criação de Sites Profissionais, Sistemas Sob Medida e Atendimento Virtual com IA',
  '/criacao-de-sites': 'Criação de sites para empresas de todo o estado de São Paulo',
  ...Object.fromEntries(CITY_INDEX.map((city) => [cityPath(city.slug), `Criação de sites em ${city.name}`])),
  ...Object.fromEntries(
    SERVICE_PAGE_INDEX.map((service) => [servicePath(service.slug), SERVICE_CONTENT[service.slug].heading.join(' ')]),
  ),
  '/politica-de-privacidade': 'Política de Privacidade',
  '/termos-de-uso': 'Termos de Uso',
  '/politica-de-cookies': 'Política de Cookies',
  '/obrigado': 'Falta só enviar a mensagem.',
  '/404': 'Esta página não existe.',
}

/** Grafo JSON-LD da página (único script application/ld+json do <head>). */
function jsonLdGraph(head: string): Record<string, unknown>[] {
  const json = head.match(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/s)?.[1] ?? '{}'
  return (JSON.parse(json) as { '@graph'?: Record<string, unknown>[] })['@graph'] ?? []
}

/** Conjunto de trechos de 3 palavras do texto, para medir semelhança entre páginas. */
function shingles(text: string): Set<string> {
  const words = text.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []
  const set = new Set<string>()
  for (let i = 0; i + 3 <= words.length; i++) set.add(words.slice(i, i + 3).join(' '))
  return set
}

function jaccard(a: Set<string>, b: Set<string>): number {
  let shared = 0
  for (const item of a) if (b.has(item)) shared++
  return shared / (a.size + b.size - shared)
}

/** Texto do elemento como um leitor (ou buscador) o lê: sem tags e sem comentários do React. */
function textOf(html: string): string {
  return html
    .replace(/<!--.*?-->/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

describe('pré-renderização', () => {
  it('gera um arquivo por página registrada', () => {
    expect(prerenderTargets.map((target) => target.path)).toEqual(PRERENDERED_PAGES.map((page) => page.path))
  })

  it.each(prerenderTargets)('$path renderiza o próprio conteúdo com um único h1', async ({ path }) => {
    const { html, head } = await render(path)
    const h1s = html.match(/<h1\b[^>]*>(.*?)<\/h1>/g) ?? []
    expect(h1s).toHaveLength(1)
    expect(textOf(h1s[0] ?? '')).toBe(H1_BY_PATH[path])
    expect(head).toContain('<title>')
    expect(html.startsWith('<link')).toBe(false)
  })

  it('a home traz os quatro termos de busca principais nos títulos das seções', async () => {
    const { html } = await render('/')
    const headings = (html.match(/<h3\b[^>]*>(.*?)<\/h3>/g) ?? []).map(textOf)
    expect(headings).toEqual(
      expect.arrayContaining([
        'Criação de sites profissionais para empresas',
        'Desenvolvimento de sistemas de gestão sob medida',
        'Atendente virtual e automação de atendimento no WhatsApp',
        'Otimização SEO para ser encontrado no Google',
      ]),
    )
    expect(html).toContain('Google Search Console')
  })

  it('a home traz o seletor de soluções, o FAQ e a barra de conversão no HTML', async () => {
    const { html } = await render('/')
    expect(html.match(/type="checkbox"/g)).toHaveLength(6)
    expect(html.match(/<details\b/g)).toHaveLength(5)
    expect(html).toContain('aria-label="Resumo do seu orçamento"')
    expect(html).toContain('href="https://wa.me/5511967873507?text=')
  })

  it.each(prerenderTargets)('$path entrega o conteúdo dentro do <main>, na ordem (sem limite de Suspense deslocado)', async ({ path }) => {
    const { html } = await render(path)
    // Regressão: o React 19.2 movia o conteúdo para um <div hidden> depois do
    // rodapé, revelado por script (página vazia em conexão lenta, CLS ~0,4).
    expect(html).not.toContain('<template id="B:')
    expect(html).not.toMatch(/hidden id="S:/)
    const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'))
    expect(main).toMatch(/<h1\b/)
  })

  it('páginas internas trazem a trilha de navegação', async () => {
    const { html } = await render('/politica-de-privacidade')
    expect(html).toContain('aria-label="Trilha de navegação"')
    expect(html).toContain('aria-current="page"')
  })
})

/**
 * Vetores animados (src/components/vectors): o HTML estático precisa trazer
 * cada cena pronta, porque é o que aparece sem JavaScript e com movimento
 * reduzido, e as animações dependem de algumas regras do desenho.
 */
describe('vetores animados', () => {
  it('a home traz as cinco cenas prontas, sem estado de animação no HTML', async () => {
    const { html } = await render('/')
    const scenes = html.match(/<div\b[^>]*class="vector\b[^"]*"[^>]*>/g) ?? []
    expect(scenes).toHaveLength(5)
    for (const scene of scenes) expect(scene).not.toMatch(/data-(run|paused|reset)/)
    // As quatro ilustrações dos cartões ficam fora da árvore de acessibilidade; a trilha envolve conteúdo real.
    expect(scenes.filter((scene) => scene.includes('aria-hidden="true"'))).toHaveLength(4)
  })

  it('toda cena termina em até 5 segundos (sem loop infinito)', async () => {
    const { html } = await render('/')
    const durations = [...html.matchAll(/class="v-anim v-clock" style="--t:([\d.]+)s"/g)].map((match) => Number(match[1]))
    expect(durations).toHaveLength(5)
    for (const duration of durations) expect(duration).toBeLessThanOrEqual(5)
    // Nenhum elemento repete mais de 3 vezes.
    for (const [, repeats] of html.matchAll(/--n:(\d+)/g)) expect(Number(repeats)).toBeLessThanOrEqual(3)
  })

  it('traços animados usam pathLength="100" e nenhum elemento animado tem transform no SVG', async () => {
    const { html } = await render('/')
    const strokes = html.match(/<(?:path|circle)\b[^>]*class="[^"]*\bv-(?:draw|pulse)\b[^"]*"[^>]*>/g) ?? []
    expect(strokes.length).toBeGreaterThan(10)
    for (const stroke of strokes) expect(stroke).toContain('pathLength="100"')
    // O transform da animação (CSS) substituiria o atributo transform do SVG.
    const animated = html.match(/<[a-z]+\b[^>]*class="[^"]*\bv-anim\b[^"]*"[^>]*>/g) ?? []
    for (const element of animated) expect(element).not.toMatch(/\stransform="/)
  })
})

describe('páginas por cidade', () => {
  it('há uma página por cidade, mais o hub, no sitemap e no llms.txt', () => {
    expect(CITY_PAGES).toHaveLength(15)
    const sitemap = sitemapXml()
    const llms = llmsTxt()
    for (const path of ['/criacao-de-sites', ...CITY_PAGES.map((page) => page.path)]) {
      expect(sitemap).toContain(`<loc>https://www.efsolutions.com.br${path}</loc>`)
      expect(llms).toContain(`(https://www.efsolutions.com.br${path})`)
    }
  })

  it.each(CITY_PAGES)('$path tem schema Service com a cidade em areaServed e nenhum endereço local', async ({ path, city }) => {
    const { head } = await render(path)
    const graph = jsonLdGraph(head)
    const service = graph.find((node) => node['@type'] === 'Service') as Record<string, any> | undefined
    expect(service?.areaServed).toMatchObject({ '@type': 'City', name: city?.name, containedInPlace: { name: 'São Paulo' } })
    expect(service?.provider).toEqual({ '@id': 'https://www.efsolutions.com.br/#empresa' })
    // Atendimento online: o endereço da empresa continua só com o país.
    const business = graph.find((node) => node['@type'] === 'ProfessionalService') as Record<string, any> | undefined
    expect(business?.address).toEqual({ '@type': 'PostalAddress', addressCountry: 'BR' })
    expect(graph.some((node) => node['@type'] === 'FAQPage')).toBe(false)
    expect(head).toContain(`<link rel="canonical" href="https://www.efsolutions.com.br${path}" data-head />`)
  })

  it('a cidade entra na mensagem do WhatsApp; na home, a mensagem continua a mesma', async () => {
    const campinas = await render('/criacao-de-sites/campinas')
    const message = decodeURIComponent(campinas.html.match(/href="https:\/\/wa\.me\/\d+\?text=([^"]+)"/)?.[1] ?? '')
    expect(message).toContain('pela página de criação de sites em Campinas')

    const home = await render('/')
    const homeMessage = decodeURIComponent(home.html.match(/href="https:\/\/wa\.me\/\d+\?text=([^"]+)"/)?.[1] ?? '')
    expect(homeMessage).toBe(GENERIC_LEAD_MESSAGE)
  })

  it('cidade desconhecida cai na 404 (noindex)', async () => {
    const { html, head } = await render('/criacao-de-sites/cidade-inexistente')
    expect(textOf(html)).toContain('Esta página não existe.')
    expect(head).toContain('noindex')
  })

  it('o texto de cada página de cidade é próprio, não um modelo com o nome trocado', async () => {
    const texts = await Promise.all(
      CITY_PAGES.map(async ({ path, city }) => {
        const { html } = await render(path)
        const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'))
        // Sem o nome da cidade: um modelo com o nome trocado daria semelhança ~1.
        return shingles(textOf(main).replaceAll(city?.name ?? '', 'CIDADE'))
      }),
    )
    let highest = 0
    for (let a = 0; a < texts.length; a++) {
      for (let b = a + 1; b < texts.length; b++) highest = Math.max(highest, jaccard(texts[a]!, texts[b]!))
    }
    // As seções comuns (depoimentos, seletor, processo, fechamento) aproximam as páginas;
    // o texto próprio de cada cidade mantém a semelhança longe de um modelo (que daria 1).
    // Medido em nov/2026: máximo 0,43, média 0,39.
    expect(highest).toBeLessThan(0.5)
  })
})

describe('seção de cidades na home', () => {
  it('a home liga para o hub e para as 15 cidades, antes do fechamento', async () => {
    const { html } = await render('/')
    const start = html.indexOf('id="cidades-atendidas"')
    const section = html.slice(start, html.indexOf('id="contato"'))
    expect(start).toBeGreaterThan(html.indexOf('id="duvidas"'))
    expect(section).toContain('href="/criacao-de-sites"')
    for (const city of CITY_INDEX) expect(section).toContain(`href="${cityPath(city.slug)}"`)
  })
})

describe('páginas de serviço', () => {
  it('os quatro serviços têm página própria, e os cartões da home levam até elas', async () => {
    expect(SERVICE_PAGES.map((page) => page.path)).toEqual([
      '/sistemas-personalizados',
      '/automacao-whatsapp',
      '/seo-e-divulgacao',
      '/landing-pages-e-lojas',
    ])
    const { html } = await render('/')
    const services = html.slice(html.indexOf('id="servicos"'), html.indexOf('id="depoimentos"'))
    for (const path of ['/criacao-de-sites', '/sistemas-personalizados', '/automacao-whatsapp', '/seo-e-divulgacao']) {
      expect(services).toContain(`href="${path}"`)
    }
  })

  it.each(SERVICE_PAGE_INDEX)('/$slug: serviço já marcado no seletor e na mensagem do WhatsApp', async (service) => {
    const { html } = await render(servicePath(service.slug))
    for (const id of service.solutions) {
      const input = html.match(new RegExp(`<input\\b[^>]*value="${id}"[^>]*>`))?.[0] ?? ''
      expect(input, `checkbox de ${id}`).toContain('checked=""')
    }
    const message = decodeURIComponent(html.match(/href="https:\/\/wa\.me\/\d+\?text=([^"]+)"/)?.[1] ?? '')
    expect(message).toContain(`pela página de ${service.messageName}`)
    for (const solution of getSolutions(service.solutions)) expect(message).toContain(solution.messageLabel)
  })

  it.each(SERVICE_PAGE_INDEX)('/$slug: vetor exclusivo que toca na carga, FAQ visível e schema Service', async (service) => {
    const { html, head } = await render(servicePath(service.slug))
    const hero = html.match(/<div\b[^>]*class="vector vector-hero[^"]*"[^>]*>/)?.[0] ?? ''
    expect(hero).toContain('data-run=""')
    const clock = Number(html.match(/class="v-anim v-clock" style="--t:([\d.]+)s"/)?.[1])
    expect(clock).toBeLessThanOrEqual(5)
    expect(html.match(/<details\b/g)).toHaveLength(SERVICE_CONTENT[service.slug].faq.length)
    const graph = jsonLdGraph(head)
    expect(graph.find((node) => node['@type'] === 'Service')).toMatchObject({
      name: service.name,
      serviceType: service.schemaType,
      areaServed: { '@type': 'Country', name: 'Brasil' },
    })
    expect(head).toContain(`<link rel="canonical" href="https://www.efsolutions.com.br/${service.slug}" data-head />`)
  })

  it('o texto de cada página de serviço é próprio', () => {
    const texts = SERVICE_PAGE_INDEX.map((service) => {
      const content = SERVICE_CONTENT[service.slug]
      return shingles(
        [
          content.lead,
          ...content.features.flatMap((item) => [item.title, item.text]),
          ...content.audiences.flatMap((item) => [item.title, item.text]),
          ...content.steps.flatMap((item) => [item.title, item.text]),
          ...content.faq.flatMap((item) => [item.question, item.answer]),
        ].join(' '),
      )
    })
    let highest = 0
    for (let a = 0; a < texts.length; a++) {
      for (let b = a + 1; b < texts.length; b++) highest = Math.max(highest, jaccard(texts[a]!, texts[b]!))
    }
    expect(highest).toBeLessThan(0.1)
  })
})

describe('depoimentos', () => {
  it('a home traz os três depoimentos sem edição, logo depois dos serviços', async () => {
    const { html } = await render('/')
    const text = textOf(html)
    for (const { quote } of TESTIMONIALS) expect(text).toContain(`“${quote}”`)
    const position = html.indexOf('id="depoimentos"')
    expect(position).toBeGreaterThan(html.indexOf('id="servicos"'))
    expect(position).toBeLessThan(html.indexOf('id="solucoes"'))
  })

  it('sites entregues abrem em nova aba; projeto não publicado aparece sem link', async () => {
    const { html } = await render('/')
    const links = html.match(/<a\b[^>]*href="https:\/\/www\.(?:frdlocacoes|markassistencia)\.com\.br"[^>]*>/g) ?? []
    expect(links).toHaveLength(2)
    for (const link of links) {
      expect(link).toContain('target="_blank"')
      expect(link).toContain('rel="noopener noreferrer"')
    }
    expect(html).not.toMatch(/href="[^"]*celebrandoseucasamento/)
    expect(textOf(html)).toContain('Vinícius, Celebrando seu Casamento')
    expect(textOf(html)).toContain('Em desenvolvimento')
  })

  it('não publica schema de avaliação', async () => {
    const { head } = await render('/')
    expect(head).not.toMatch(/"@type":\s*"(?:Review|AggregateRating)"/)
  })
})

/**
 * Regras inegociáveis do projeto (EF-doc-oficial), verificadas no HTML que
 * vai para produção: corpo da página e <head> (título, metas, JSON-LD).
 */
describe('regras do projeto em todas as páginas', () => {
  it.each(prerenderTargets)('$path não usa travessões, emoji, pílulas nem selo de IA', async ({ path }) => {
    const { html, head } = await render(path)
    const output = `${head}\n${html}`

    // Travessão (—) e meia-risca (–) proibidos na copy.
    expect(output.match(/[–—].{0,40}/gu) ?? []).toEqual([])
    // Emoji: caracteres com apresentação de emoji por padrão ou forçada (VS16).
    expect(output.match(/\p{Emoji_Presentation}|️/gu) ?? []).toEqual([])
    // Botões e links em formato pílula.
    expect(output.match(/<(?:a|button)\b[^>]*class="[^"]*\brounded-full\b/g) ?? []).toEqual([])
    // Nenhum selo "Feito com IA".
    expect(output).not.toMatch(/feito com (ia|intelig[eê]ncia artificial)/i)
  })

  it.each(prerenderTargets)('$path: todo link interno aponta para uma página ou âncora que existe', async ({ path }) => {
    const { html } = await render(path)
    const home = path === '/' ? html : (await render('/')).html
    const knownPaths = new Set(PRERENDERED_PAGES.filter((page) => page.path !== '/404').map((page) => page.path))
    const ids = (source: string) => new Set([...source.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]))
    const pageIds = ids(html)
    const homeIds = ids(home)

    for (const [, href] of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
      if (!href || /^(https?:|mailto:|tel:)/.test(href)) continue
      if (href.startsWith('#')) {
        expect(pageIds, `âncora ${href} em ${path}`).toContain(href.slice(1))
        continue
      }
      const [target = '', anchor] = href.split('#')
      expect(knownPaths, `link ${href} em ${path}`).toContain(target)
      if (anchor && target === '/') expect(homeIds, `âncora ${href} em ${path}`).toContain(anchor)
    }
  })

  it.each(prerenderTargets)('$path: títulos sem pular nível (h1 > h2 > h3)', async ({ path }) => {
    const { html } = await render(path)
    const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'))
    const levels = [...main.matchAll(/<h([1-6])\b/g)].map((match) => Number(match[1]))
    expect(levels[0]).toBe(1)
    for (let i = 1; i < levels.length; i++) expect(levels[i]! - levels[i - 1]!).toBeLessThanOrEqual(1)
  })

  it.each(prerenderTargets)('$path: imagens com texto alternativo', async ({ path }) => {
    const { html } = await render(path)
    for (const [image] of html.matchAll(/<img\b[^>]*>/g)) expect(image).toMatch(/\salt="/)
  })

  it.each(prerenderTargets)('$path: todo link em nova aba usa rel="noopener noreferrer"', async ({ path }) => {
    const { html } = await render(path)
    const newTab = html.match(/<a\b[^>]*target="_blank"[^>]*>/g) ?? []
    for (const link of newTab) expect(link).toContain('rel="noopener noreferrer"')
  })
})
