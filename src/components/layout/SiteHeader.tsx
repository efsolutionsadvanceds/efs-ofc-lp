import { Link } from 'react-router-dom'

import { buttonStyles, textLinkStyles } from '@/components/ui/buttonStyles'
import { Wordmark } from '@/components/ui/Wordmark'
import { SECTION_IDS } from '@/config/sections'
import { site } from '@/config/site'
import { cx } from '@/lib/cx'

/**
 * Barra simples: marca, três âncoras e uma ação. Não é fixa — no celular a
 * ação fica na barra de conversão da base da tela, então a leitura ganha a
 * altura toda. Sem menu hambúrguer: em uma landing page, menos saídas
 * significam mais conversão.
 */
export function SiteHeader() {
  return (
    // No desktop, grade 1fr/auto/1fr: o menu fica centrado na página, sem
    // depender da largura da marca nem do botão.
    <header className="frame flex h-18 items-center justify-between gap-4 md:h-22 lg:grid lg:grid-cols-[1fr_auto_1fr]">
      <Link
        to="/"
        aria-label={`${site.name} — página inicial`}
        className="-m-2 justify-self-start rounded-xl p-2 transition-opacity duration-200 hover:opacity-80 active:opacity-60"
      >
        <Wordmark />
      </Link>

      <nav aria-label="Principal" className="hidden lg:block">
        <ul className="flex items-center gap-9 text-body">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className={textLinkStyles}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Largura mínima maior que o rótulo em qualquer fonte: a troca da fonte não mexe no botão. */}
      <a
        href={`/#${SECTION_IDS.solutions}`}
        className={cx(buttonStyles({ size: 'sm' }), 'justify-self-end sm:min-w-[11rem]')}
      >
        <span className="sm:hidden">Orçamento</span>
        <span className="hidden sm:inline">Solicitar orçamento</span>
      </a>
    </header>
  )
}
