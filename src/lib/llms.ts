import { ARTICLE_PAGES, CITY_PAGES, pages, SERVICE_PAGES } from '@/config/pages'
import { absoluteUrl, confirmedSocialProfiles, site } from '@/config/site'
import { ARTICLE_INDEX } from '@/content/articleIndex'
import { CITY_CONTENT } from '@/content/cities'
import { CITY_INDEX } from '@/content/cityIndex'
import { SERVICE_PAGE_INDEX } from '@/content/serviceIndex'

/**
 * llms.txt (formato de llmstxt.org): um resumo do site em Markdown para
 * assistentes de IA, gerado no build a partir dos mesmos registros do site
 * (serviços, páginas, cidades e artigos). Uma página nova entra aqui sozinha.
 */
export function buildLlmsTxt(): string {
  const link = (name: string, path: string, note?: string) => `- [${name}](${absoluteUrl(path)})${note ? `: ${note}` : ''}`

  const serviceLines = SERVICE_PAGE_INDEX.map((service, index) =>
    link(service.name, SERVICE_PAGES[index]?.path ?? '/', service.description),
  )
  const cityLines = CITY_INDEX.map((city, index) =>
    link(`Criação de sites em ${city.name}`, CITY_PAGES[index]?.path ?? '/', CITY_CONTENT[city.slug].summary),
  )
  const articleLines = ARTICLE_INDEX.map((article, index) =>
    link(article.headline, ARTICLE_PAGES[index]?.path ?? '/', article.description),
  )
  const profiles = confirmedSocialProfiles()

  return [
    `# ${site.name}`,
    '',
    `> ${site.description} Atendimento online para empresas de todo o Brasil, com orçamento pelo WhatsApp.`,
    '',
    'Cada projeto é orçado sob medida: o visitante escolhe as soluções no site, a mensagem chega pronta no WhatsApp e a proposta vem por escrito, com escopo, prazo e investimento, antes de qualquer compromisso.',
    '',
    '## Serviços',
    '',
    link('Criação de sites', pages.cidades.path, pages.cidades.description),
    ...serviceLines,
    '',
    '## Empresa',
    '',
    link('Início', pages.home.path, pages.home.description),
    link('Sobre a E.F Solutions', pages.sobre.path, pages.sobre.description),
    link('Projetos entregues', pages.projetos.path, pages.projetos.description),
    '',
    '## Conteúdos',
    '',
    link('Todos os conteúdos', pages.conteudos.path, pages.conteudos.description),
    ...articleLines,
    '',
    '## Criação de sites por cidade',
    '',
    ...cityLines,
    '',
    '## Contato',
    '',
    `- WhatsApp: ${site.whatsapp.display} (https://wa.me/${site.whatsapp.digits})`,
    ...profiles.map((profile) => `- ${profile.label}: ${profile.href}`),
    '',
    '## Informações legais',
    '',
    link('Política de Privacidade', pages.privacidade.path),
    link('Política de Cookies', pages.cookies.path),
    link('Termos de Uso', pages.termos.path),
    '',
  ].join('\n')
}
