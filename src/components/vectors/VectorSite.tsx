import { VectorPanel } from './VectorPanel'
import { anim, roundedRect } from './VectorScene'

const BROWSER_CARDS = [20.5, 76.5, 132.5]
const PHONE_CARDS = [74.5, 88.5, 102.5]

/**
 * Criação de sites: a página se monta no navegador e no celular
 * (responsiva), o botão de orçamento recebe um clique e chega um pedido.
 */
export function VectorSite() {
  return (
    <VectorPanel duration={2.4}>
      {/* Navegador */}
      <path d={roundedRect(8.5, 14.5, 184, 115, 6)} className="fill-white/[0.03] stroke-white/10" />
      <path d="M8.5 32.5H192.5" className="stroke-white/10" />
      <circle cx="19" cy="23.5" r="2" className="fill-white/10" />
      <circle cx="27" cy="23.5" r="2" className="fill-white/10" />
      <circle cx="35" cy="23.5" r="2" className="fill-white/10" />
      <path d={roundedRect(48.5, 19.5, 96, 8, 3)} className="stroke-white/10" />
      <rect x="54" y="22.5" width="40" height="2" rx="1" className="v-anim v-grow fill-white/20" style={anim({ t: 0.5, steps: 8 })} />

      {/* Topo da página: título em dois tons, texto e botões */}
      <rect x="20" y="44" width="96" height="7" rx="2" className="v-anim v-grow fill-white/70" style={anim({ d: 0.15 })} />
      <rect x="20" y="55" width="68" height="7" rx="2" className="v-anim v-grow fill-white/40" style={anim({ d: 0.25 })} />
      <rect x="20" y="69" width="84" height="3" rx="1.5" className="v-anim v-grow fill-white/20" style={anim({ d: 0.35 })} />
      <g className="v-anim v-in" style={anim({ d: 0.5, from: 'scale(0.9)' })}>
        <g className="v-anim v-press" style={anim({ d: 1.5, t: 0.3 })}>
          <rect x="20" y="81" width="40" height="13" rx="3" className="fill-accent" />
          <rect x="27" y="86.5" width="26" height="2" rx="1" className="fill-accent-ink/60" />
        </g>
      </g>

      {BROWSER_CARDS.map((x, index) => (
        <g key={x} className="v-anim v-in" style={anim({ d: 0.75 + index * 0.08, from: 'translateY(4px)' })}>
          <path d={roundedRect(x, 104.5, 48, 17, 3)} className="fill-white/[0.03] stroke-white/20" />
          <rect x={x + 5.5} y="110.5" width="5" height="5" rx="1" className="fill-accent/50" />
          <rect x={x + 14.5} y="112" width="24" height="2" rx="1" className="fill-white/20" />
        </g>
      ))}

      {/* Pedido de orçamento recebido */}
      <g className="v-anim v-in" style={anim({ d: 1.75, from: 'translateY(-4px)' })}>
        <path d={roundedRect(118.5, 44.5, 64, 24, 4)} className="fill-raised stroke-accent/50" />
        <circle cx="130.5" cy="56.5" r="6" className="fill-accent/15 stroke-accent" />
        <path
          d="M127.8 56.6l1.9 1.9 3.6-3.8"
          pathLength={100}
          className="v-anim v-draw stroke-accent"
          strokeWidth="1.5"
          style={anim({ d: 1.95, t: 0.4 })}
        />
        <rect x="141" y="51" width="32" height="3" rx="1.5" className="fill-white/70" />
        <rect x="141" y="58" width="22" height="2" rx="1" className="fill-white/20" />
      </g>

      {/* Celular: a mesma página, reorganizada */}
      <path d={roundedRect(208.5, 20.5, 56, 104, 8)} className="fill-white/[0.03] stroke-white/10" />
      <rect x="228" y="25" width="16" height="3" rx="1.5" className="fill-white/10" />
      <rect x="216" y="37" width="36" height="5" rx="1.5" className="v-anim v-grow fill-white/70" style={anim({ d: 1 })} />
      <rect x="216" y="45" width="26" height="5" rx="1.5" className="v-anim v-grow fill-white/40" style={anim({ d: 1.06 })} />
      <rect
        x="216"
        y="57"
        width="40"
        height="9"
        rx="2.5"
        className="v-anim v-in fill-accent"
        style={anim({ d: 1.14, from: 'scale(0.9)' })}
      />
      {PHONE_CARDS.map((y, index) => (
        <path
          key={y}
          d={roundedRect(216.5, y, 40, 10, 2)}
          className="v-anim v-in fill-white/[0.03] stroke-white/20"
          style={anim({ d: 1.22 + index * 0.06, from: 'translateY(3px)' })}
        />
      ))}
    </VectorPanel>
  )
}
