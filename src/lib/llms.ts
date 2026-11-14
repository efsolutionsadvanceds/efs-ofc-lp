import { CITY_PAGES, pages } from '@/config/pages'
import { absoluteUrl, site } from '@/config/site'
import { CITY_CONTENT } from '@/content/cities'
import { CITY_INDEX } from '@/content/cityIndex'
import { SERVICES } from '@/content/services'

/**
 * llms.txt (formato de llmstxt.org): um resumo do site em Markdown para
 * assistentes de IA, gerado no build a partir dos mesmos registros do site
 * (serviços, páginas e cidades). Uma cidade nova entra aqui sozinha.
 */
export function buildLlmsTxt(): string {
  const cityLines = CITY_INDEX.map((city, index) => {
    const page = CITY_PAGES[index]
    return `- [Criação de sites em ${city.name}](${absoluteUrl(page?.path ?? '/')}): ${CITY_CONTENT[city.slug].summary}`
  })

  return [
    `# ${site.name}`,
    '',
    `> ${site.description} Atendimento online para empresas de todo o Brasil, com orçamento pelo WhatsApp.`,
    '',
    'Cada projeto é orçado sob medida: o visitante escolhe as soluções no site, a mensagem chega pronta no WhatsApp e a proposta vem por escrito, com escopo, prazo e investimento, antes de qualquer compromisso.',
    '',
    '## Serviços',
    '',
    ...SERVICES.map((service) => `- ${service.title}: ${service.description}`),
    '',
    '## Páginas principais',
    '',
    `- [Início](${absoluteUrl(pages.home.path)}): ${pages.home.description}`,
    `- [Criação de sites por cidade](${absoluteUrl(pages.cidades.path)}): ${pages.cidades.description}`,
    '',
    '## Criação de sites por cidade',
    '',
    ...cityLines,
    '',
    '## Contato',
    '',
    `- WhatsApp: ${site.whatsapp.display} (https://wa.me/${site.whatsapp.digits})`,
    '',
    '## Informações legais',
    '',
    `- [Política de Privacidade](${absoluteUrl(pages.privacidade.path)})`,
    `- [Termos de Uso](${absoluteUrl(pages.termos.path)})`,
    '',
  ].join('\n')
}
