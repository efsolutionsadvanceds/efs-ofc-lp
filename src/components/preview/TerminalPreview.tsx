import { sequenceStep } from '@/lib/stagger'

const MODULES = [
  { name: 'módulo de vendas', status: 'pronto', step: 1 },
  { name: 'controle de estoque', status: 'pronto', step: 1.5 },
  { name: 'agenda da equipe', status: 'pronto', step: 2 },
  { name: 'integração WhatsApp', status: 'conectada', step: 2.5 },
] as const

/**
 * Cena "Sistema": um terminal publicando um sistema de gestão sob medida,
 * módulo a módulo. Linhas sem quebra (`whitespace-nowrap`): a largura da
 * fonte mono de cada sistema operacional nunca muda a altura da cena.
 */
export function TerminalPreview() {
  return (
    <div className="flex h-full flex-col rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-micro whitespace-nowrap">
      <p className="text-muted">~/projetos/sua-empresa</p>

      <p className="seq mt-3" style={sequenceStep(0)}>
        <span className="text-accent">$</span> ef deploy sistema-de-gestao
      </p>

      <ul className="mt-3 flex flex-col gap-2">
        {MODULES.map((module) => (
          <li key={module.name} className="seq flex justify-between gap-4" style={sequenceStep(module.step)}>
            <span>
              <span className="text-accent">✓</span> {module.name}
            </span>
            <span className="text-muted">{module.status}</span>
          </li>
        ))}
      </ul>

      <p className="seq mt-4 whitespace-normal" style={sequenceStep(3.3)}>
        <span className="text-muted">→</span> painel no ar em <span className="text-accent">app.suaempresa.com.br</span>
      </p>

      <p className="seq mt-auto flex items-center gap-1 text-muted" style={sequenceStep(4)}>
        <span className="text-accent">$</span>
        <span aria-hidden="true" className="inline-block h-3.5 w-1.5 animate-[typing_1s_steps(1)_infinite] bg-ink/80 motion-reduce:animate-none"
        />
      </p>
    </div>
  )
}
