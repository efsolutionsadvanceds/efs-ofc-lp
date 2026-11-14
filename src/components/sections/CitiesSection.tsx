import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { textLinkStyles } from '@/components/ui/buttonStyles'
import { CITIES_HUB_PATH, CITY_GROUPS, CITY_INDEX, cityPath } from '@/content/cityIndex'

/**
 * Cidades atendidas, na home: links diretos da página mais forte do site
 * para o hub e para cada página de cidade (passa autoridade para elas e
 * ajuda o Google a descobri-las). Só links e nomes: compacto, sem repetir
 * o conteúdo das páginas de cidade.
 */
export function CitiesSection() {
  return (
    <section id="cidades-atendidas" aria-labelledby="cidades-atendidas-titulo" className="frame section-space">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <h2 id="cidades-atendidas-titulo" className="text-title">
            Criação de sites em São Paulo <span className="block text-muted">da capital ao interior.</span>
          </h2>
          <p className="mt-6 max-w-[24em] text-body text-muted">
            Atendimento online para empresas de todo o estado, com uma página para cada cidade: o que os negócios de
            lá precisam e como trabalhamos com eles.
          </p>
          <Link to={CITIES_HUB_PATH} className={`${textLinkStyles} mt-8 text-small`}>
            Ver criação de sites por cidade
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div className="flex flex-col gap-8 lg:col-span-8">
          {CITY_GROUPS.map((group) => (
            <div key={group.id}>
              <h3 className="font-mono text-micro text-muted">{group.label}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {CITY_INDEX.filter((city) => city.group === group.id).map((city) => (
                  <li key={city.slug}>
                    <Link
                      to={cityPath(city.slug)}
                      className="inline-flex h-11 items-center rounded-md border border-white/10 bg-white/[0.03] px-4 text-small transition-[border-color,scale] duration-150 ease-out hover:border-white/25 active:scale-[0.97]"
                    >
                      {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
