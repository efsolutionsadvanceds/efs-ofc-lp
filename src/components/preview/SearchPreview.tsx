import { Check, Search } from 'lucide-react'

import { sequenceStep } from '@/lib/stagger'

const SEARCH_CONSOLE_CHECKS = ['Páginas indexadas', 'Core Web Vitals: bom', 'Sitemap enviado', 'Dados estruturados válidos']

/**
 * Cena "Site + SEO": a busca real de um cliente, o resultado de um site bem
 * otimizado e o acompanhamento no Google Search Console.
 */
export function SearchPreview() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div
        className="seq flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-small"
        style={sequenceStep(0)}
      >
        <Search aria-hidden="true" className="size-4 shrink-0 text-muted" />
        <span className="min-w-0 truncate">criação de sites profissionais para empresas</span>
      </div>

      <div className="seq rounded-xl border border-white/10 bg-white/[0.03] p-4" style={sequenceStep(0.8)}>
        <p className="flex items-center gap-2 text-micro text-muted">
          <span className="grid size-5 place-items-center rounded-full bg-accent/15 font-mono text-[0.625rem] text-accent">
            S
          </span>
          suaempresa.com.br
        </p>
        <p className="mt-1.5 text-body font-medium text-accent">Sua Empresa — Site profissional e rápido</p>
        <p className="mt-1 text-micro text-muted">Atendimento em todo o Brasil. Peça seu orçamento pelo WhatsApp.</p>
      </div>

      <div className="seq" style={sequenceStep(1.6)}>
        <p className="font-mono text-micro text-muted">Google Search Console</p>
        <ul className="mt-2.5 grid gap-2 sm:grid-cols-2">
          {SEARCH_CONSOLE_CHECKS.map((item, index) => (
            <li key={item} className="seq flex items-center gap-2 text-micro" style={sequenceStep(2 + index * 0.4)}>
              <Check aria-hidden="true" className="size-3.5 shrink-0 text-accent" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
