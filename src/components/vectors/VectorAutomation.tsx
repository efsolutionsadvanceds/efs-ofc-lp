import { VectorPanel } from './VectorPanel'
import { anim, roundedRect } from './VectorScene'

const INPUT = 'M74.5 72.5H112.5'

/**
 * Saídas do atendente: resposta na hora, horário agendado e passagem para
 * a equipe. `arrives`: quando o pulso chega (a saída acende nesse momento).
 */
const OUTPUTS = [
  { y: 32.5, path: 'M152.5 72.5C174.5 72.5 174.5 32.5 196.5 32.5', title: 40, arrives: 2.3 },
  { y: 72.5, path: 'M152.5 72.5H196.5', title: 34, arrives: 3.1 },
  { y: 112.5, path: 'M152.5 72.5C174.5 72.5 174.5 112.5 196.5 112.5', title: 38, arrives: 3.9 },
]

/** Um pulso leva 0,4s até o atendente e 0,45s até a saída; um a cada 0,8s. */
const ROUNDS = [1.4, 2.2, 3]

/**
 * Atendente virtual com IA: a mensagem do cliente chega, passa pelo
 * atendente e segue para a saída certa (responder, agendar ou chamar
 * alguém da equipe), em três rodadas.
 */
export function VectorAutomation() {
  return (
    <VectorPanel duration={4.25}>
      {/* Mensagem do cliente */}
      <g className="v-anim v-in" style={anim({ t: 0.45, from: 'translateY(4px)' })}>
        <circle cx="16.5" cy="72.5" r="6" className="stroke-white/40" />
        <path d={roundedRect(28.5, 59.5, 46, 26, 7)} className="fill-white/[0.03] stroke-white/20" />
        <rect x="36" y="67" width="30" height="3" rx="1.5" className="fill-white/70" />
        <rect x="36" y="74" width="20" height="3" rx="1.5" className="fill-white/20" />
      </g>

      {/* Conexões: base fixa e o traço que se desenha por cima */}
      <path d={INPUT} className="stroke-white/10" />
      <path d={INPUT} pathLength={100} className="v-anim v-draw stroke-white/20" style={anim({ d: 0.25, t: 0.35 })} />
      {OUTPUTS.map(({ path }, index) => (
        <g key={path}>
          <path d={path} className="stroke-white/10" />
          <path
            d={path}
            pathLength={100}
            className="v-anim v-draw stroke-white/20"
            style={anim({ d: 0.75 + index * 0.05, t: 0.45 })}
          />
        </g>
      ))}

      {/* Atendente (chip) */}
      <path d={roundedRect(112.5, 52.5, 40, 40, 9)} className="fill-white/[0.03] stroke-white/20" />
      <path d="M124.5 48.5V52.5M132.5 48.5V52.5M140.5 48.5V52.5M124.5 92.5V96.5M132.5 92.5V96.5M140.5 92.5V96.5" className="stroke-white/20" />
      <path
        d={roundedRect(122.5, 62.5, 20, 20, 5)}
        className="v-anim v-halo stroke-accent"
        style={anim({ d: 1.8, t: 0.8, n: ROUNDS.length, to: 1.5 })}
      />
      <path
        d={roundedRect(122.5, 62.5, 20, 20, 5)}
        className="v-anim v-in fill-accent/15 stroke-accent/50"
        style={anim({ d: 0.45, t: 0.45, from: 'scale(0.85)' })}
      />
      <circle cx="132.5" cy="72.5" r="3" className="v-anim v-in fill-accent" style={anim({ d: 0.6, from: 'scale(0.5)' })} />

      {/* Saídas */}
      {OUTPUTS.map(({ y, title, arrives }, index) => (
        <g key={y}>
          <path d={roundedRect(196.5, y - 12, 74, 24, 5)} className="fill-white/[0.03] stroke-white/10" />
          <path
            d={roundedRect(196.5, y - 12, 74, 24, 5)}
            className="v-anim v-in stroke-accent/50"
            style={anim({ d: arrives, t: 0.3 })}
          />
          <g className="v-anim v-in" style={anim({ d: 1 + index * 0.08, from: 'translateX(4px)' })}>
            <OutputIcon index={index} y={y} />
            <rect x="220" y={y - 3.5} width={title} height="3" rx="1.5" className="fill-white/70" />
            <rect x="220" y={y + 2.5} width={title - 14} height="2" rx="1" className="fill-white/20" />
          </g>
        </g>
      ))}

      {/* Pulsos: um por rodada até o atendente, depois para cada saída */}
      {ROUNDS.map((start, index) => (
        <g key={start}>
          <path d={INPUT} pathLength={100} className="v-anim v-pulse stroke-accent" strokeWidth="2" style={anim({ d: start, t: 0.4 })} />
          <path
            d={OUTPUTS[index]?.path}
            pathLength={100}
            className="v-anim v-pulse stroke-accent"
            strokeWidth="2"
            style={anim({ d: start + 0.45, t: 0.45 })}
          />
        </g>
      ))}
    </VectorPanel>
  )
}

/** Ícones das saídas: confirmação (com o check desenhado quando o pulso chega), agenda e pessoa. */
function OutputIcon({ index, y }: { index: number; y: number }) {
  if (index === 0) {
    return (
      <>
        <circle cx="208.5" cy={y} r="5.5" className="stroke-accent" />
        <path
          d={`M206 ${y}l1.8 1.8 3.4-3.6`}
          pathLength={100}
          className="v-anim v-draw stroke-accent"
          strokeWidth="1.5"
          style={anim({ d: OUTPUTS[0]?.arrives, t: 0.35 })}
        />
      </>
    )
  }
  if (index === 1) {
    return (
      <>
        <path d={roundedRect(203, y - 5.5, 11, 11, 2)} className="stroke-white/40" />
        <path d={`M203 ${y - 1.5}H214M206 ${y - 7.5}V${y - 4.5}M211 ${y - 7.5}V${y - 4.5}`} className="stroke-white/40" />
      </>
    )
  }
  return (
    <>
      <circle cx="208.5" cy={y - 3} r="2.5" className="stroke-white/40" />
      <path d={`M203.5 ${y + 5}a5 5 0 0 1 10 0`} className="stroke-white/40" />
    </>
  )
}
