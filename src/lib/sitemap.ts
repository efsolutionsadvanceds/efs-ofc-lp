import type { PageMeta } from '@/config/pages'
import { absoluteUrl } from '@/config/site'

/**
 * sitemap.xml e robots.txt gerados no build a partir do registro de páginas
 * (src/config/pages.ts) — uma página nova entra no sitemap automaticamente
 * quando tem `sitemap` configurado, e páginas `noindex` ficam sempre de fora.
 */

export function buildSitemapXml(pageList: readonly PageMeta[]): string {
  const urls = pageList
    .filter((page) => page.sitemap && !page.noindex)
    .map((page) => {
      const { lastmod, changefreq, priority } = page.sitemap!
      return [
        '  <url>',
        `    <loc>${absoluteUrl(page.path)}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority.toFixed(1)}</priority>`,
        '  </url>',
      ].join('\n')
    })

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')
}

export function buildRobotsTxt(): string {
  return ['User-agent: *', 'Allow: /', '', `Sitemap: ${absoluteUrl('/sitemap.xml')}`, ''].join('\n')
}
