import { describe, expect, it } from 'vitest'

import { pages, type PageMeta } from '@/config/pages'

import { buildHeadTags, renderHeadTags, serializeJsonLd } from './head'

function metaContent(tags: ReturnType<typeof buildHeadTags>, name: string) {
  const tag = tags.find((item) => item.type === 'meta' && item.name === name)
  return tag?.type === 'meta' ? tag.content : undefined
}

describe('buildHeadTags', () => {
  it('gera título, description, canonical, Open Graph e Twitter para páginas indexáveis', () => {
    const tags = buildHeadTags(pages.home)
    expect(tags[0]).toEqual({ type: 'title', content: pages.home.title })
    expect(metaContent(tags, 'description')).toBe(pages.home.description)
    expect(metaContent(tags, 'robots')).toContain('index, follow')
    expect(tags).toContainEqual({ type: 'link', rel: 'canonical', href: 'https://www.efsolutions.com.br/' })
    expect(metaContent(tags, 'og:url')).toBe('https://www.efsolutions.com.br/')
    expect(metaContent(tags, 'og:image')).toBe('https://www.efsolutions.com.br/og-image.jpg')
    expect(metaContent(tags, 'og:image:width')).toBe('1200')
    expect(metaContent(tags, 'og:locale')).toBe('pt_BR')
    expect(metaContent(tags, 'twitter:card')).toBe('summary_large_image')
  })

  it('páginas noindex não têm canonical nem og:url', () => {
    for (const page of [pages.obrigado, pages.naoEncontrada]) {
      const tags = buildHeadTags(page)
      expect(metaContent(tags, 'robots')).toBe('noindex, follow')
      expect(tags.some((tag) => tag.type === 'link' && tag.rel === 'canonical')).toBe(false)
      expect(metaContent(tags, 'og:url')).toBeUndefined()
    }
  })
})

describe('renderHeadTags', () => {
  it('escapa atributos e marca as tags gerenciadas com data-head', () => {
    const page: PageMeta = { path: '/x', file: 'x.html', title: 'A & B <c>', description: 'Diga "olá"' }
    const html = renderHeadTags(buildHeadTags(page))
    expect(html).toContain('<title>A &amp; B &lt;c&gt;</title>')
    expect(html).toContain('<meta name="description" content="Diga &quot;olá&quot;" data-head />')
    expect(html).toContain('<link rel="canonical" href="https://www.efsolutions.com.br/x" data-head />')
    expect(html).toContain('<script type="application/ld+json" id="structured-data" data-head>')
  })
})

describe('serializeJsonLd', () => {
  it('impede que um "</script>" no conteúdo feche a tag', () => {
    const json = serializeJsonLd({ text: '</script><script>alert(1)</script>' })
    expect(json).not.toContain('</script>')
    expect(JSON.parse(json)).toEqual({ text: '</script><script>alert(1)</script>' })
  })
})
