import { VectorPanel } from './VectorPanel'
import { anim, roundedRect } from './VectorScene'

/** Módulos do menu lateral (Vendas, Estoque, Agenda, Financeiro): centro vertical e largura do rótulo. */
const MODULES = [
  { y: 32, label: 24 },
  { y: 50, label: 20 },
  { y: 68, label: 22 },
  { y: 86, label: 26 },
]

/** Indicadores do topo: posição e largura do valor. */
const KPIS = [
  { x: 78.5, value: 30 },
  { x: 142.5, value: 24 },
  { x: 206.5, value: 34 },
]

/** Alturas das barras do gráfico (a linha passa 8 unidades acima de cada topo). */
const BARS = [18, 26, 22, 34, 30, 42, 38, 52]
const BASELINE = 121

const TREND = BARS.map((height, index) => `${index === 0 ? 'M' : 'L'}${89 + index * 22} ${BASELINE - height - 8}`).join('')
const LAST_POINT = { x: 89 + (BARS.length - 1) * 22, y: BASELINE - (BARS.at(-1) ?? 0) - 8 }

/**
 * Sistema de gestão sob medida: o painel se monta (menu de módulos,
 * indicadores, barras) e a linha de resultado sobe até o ponto mais alto.
 */
export function VectorSystem() {
  return (
    <VectorPanel duration={4}>
      <path d={roundedRect(8.5, 12.5, 263, 119, 6)} className="fill-white/[0.03] stroke-white/10" />
      <path d="M68.5 12.5V131.5" className="stroke-white/10" />

      {/* Menu de módulos, com o primeiro ativo */}
      {MODULES.map(({ y, label }, index) => (
        <g key={y} className="v-anim v-in" style={anim({ d: index * 0.06, from: 'translateX(-3px)' })}>
          {index === 0 ? <path d={roundedRect(14.5, y - 7.5, 48, 15, 3)} className="fill-white/[0.03] stroke-white/10" /> : null}
          <rect x="20" y={y - 4} width="8" height="8" rx="2" className={index === 0 ? 'fill-accent' : 'fill-white/20'} />
          <rect x="33" y={y - 1.5} width={label} height="3" rx="1.5" className={index === 0 ? 'fill-white/70' : 'fill-white/20'} />
        </g>
      ))}

      {/* Indicadores */}
      {KPIS.map(({ x, value }, index) => (
        <g key={x}>
          <path d={roundedRect(x, 22.5, 56, 26, 4)} className="fill-white/[0.03] stroke-white/10" />
          <rect x={x + 6.5} y="29" width="20" height="2" rx="1" className="fill-white/20" />
          <rect
            x={x + 6.5}
            y="36"
            width={value}
            height="5"
            rx="1.5"
            className="v-anim v-grow fill-white/70"
            style={anim({ d: 0.3 + index * 0.06 })}
          />
        </g>
      ))}
      <path d="M122 40.5l3-3 3 3" className="v-anim v-in stroke-accent" strokeWidth="1.5" style={anim({ d: 0.5, from: 'translateY(2px)' })} />

      {/* Gráfico */}
      <path d="M78.5 79.5H262.5M78.5 100.5H262.5" className="stroke-white/10" strokeDasharray="2 4" />
      <path d={`M78.5 ${BASELINE + 0.5}H262.5`} className="stroke-white/10" />
      {BARS.map((height, index) => (
        <rect
          key={index}
          x={84 + index * 22}
          y={BASELINE - height}
          width="10"
          height={height}
          rx="2"
          className={index === BARS.length - 1 ? 'v-anim v-grow fill-accent/15' : 'v-anim v-grow fill-white/10'}
          style={anim({ d: 0.5 + index * 0.05, from: 'scaleY(0)', o: 'bottom' })}
        />
      ))}
      <path
        d={TREND}
        pathLength={100}
        className="v-anim v-draw v-glide stroke-accent"
        strokeWidth="1.5"
        style={anim({ d: 1, t: 0.9 })}
      />
      <circle
        cx={LAST_POINT.x}
        cy={LAST_POINT.y}
        r="3"
        className="v-anim v-halo stroke-accent"
        style={anim({ d: 1.95, t: 1, n: 2 })}
      />
      <circle
        cx={LAST_POINT.x}
        cy={LAST_POINT.y}
        r="3"
        className="v-anim v-in fill-ground stroke-accent"
        strokeWidth="1.5"
        style={anim({ d: 1.85, t: 0.4, from: 'scale(0.5)' })}
      />
    </VectorPanel>
  )
}
