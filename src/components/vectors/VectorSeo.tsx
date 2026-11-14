import { VectorPanel } from './VectorPanel'
import { anim, roundedRect } from './VectorScene'

interface ResultRow {
  /** Posição final (topo da linha). */
  y: number
  /** Deslocamento até a posição em que a linha aparece antes da troca. */
  dy: number
  title: number
  url: number
  snippet: readonly [number, number]
  own?: boolean
}

/**
 * O seu resultado começa em 3º e termina em 1º; os outros dois descem uma
 * posição. Ele vem por último no SVG para passar por cima dos outros.
 */
const RESULTS: readonly ResultRow[] = [
  { y: 76, dy: -32, title: 88, url: 48, snippet: [144, 104] },
  { y: 108, dy: -32, title: 80, url: 60, snippet: [150, 96] },
  { y: 44, dy: 64, title: 96, url: 56, snippet: [150, 118], own: true },
]

const CLICKS = 'M196.5 114.5C208 113 214 108 222 104S236 92 244 84S256 58 263.5 48.5'
const IMPRESSIONS = 'M196.5 108.5C210 106 216 98 226 96S244 86 252 78S260 70 263.5 66.5'

/**
 * SEO: a busca é digitada, o seu site sobe para o primeiro resultado e a
 * curva de cliques do Google Search Console acompanha.
 */
export function VectorSeo() {
  return (
    <VectorPanel duration={4.6}>
      {/* Busca */}
      <path d={roundedRect(8.5, 12.5, 168, 20, 5)} className="fill-white/[0.03] stroke-white/20" />
      <circle cx="20.5" cy="22.5" r="4" className="stroke-white/40" />
      <path d="M23.5 25.5L26.5 28.5" className="stroke-white/40" />
      <rect x="32" y="21" width="72" height="3" rx="1.5" className="v-anim v-grow fill-white/70" style={anim({ d: 0.1, t: 0.7, steps: 9 })} />

      {/* Resultados */}
      {RESULTS.map((row) => (
        <g key={row.y} className="v-anim v-swap" style={anim({ d: 0.75, t: 1.9, dy: row.dy })}>
          <path
            d={roundedRect(8.5, row.y + 0.5, 10, 10, 2.5)}
            className={row.own ? 'fill-accent/15 stroke-accent' : 'fill-white/10 stroke-white/20'}
          />
          <rect x="24" y={row.y + 2} width={row.title} height="4" rx="1.5" className={row.own ? 'fill-accent' : 'fill-white/40'} />
          <rect x="24" y={row.y + 9} width={row.url} height="2" rx="1" className={row.own ? 'fill-accent/50' : 'fill-white/20'} />
          <rect x="8" y={row.y + 16} width={row.snippet[0]} height="2" rx="1" className={row.own ? 'fill-white/20' : 'fill-white/10'} />
          <rect x="8" y={row.y + 21} width={row.snippet[1]} height="2" rx="1" className={row.own ? 'fill-white/20' : 'fill-white/10'} />
        </g>
      ))}
      <path
        d={roundedRect(8.5, 44.5, 10, 10, 2.5)}
        className="v-anim v-halo stroke-accent"
        style={anim({ d: 2.65, t: 0.8, to: 1.8 })}
      />

      {/* Google Search Console: impressões e cliques em alta */}
      <path d={roundedRect(188.5, 12.5, 83, 119, 6)} className="fill-white/[0.03] stroke-white/10" />
      <rect x="196" y="21" width="5" height="5" rx="1" className="fill-accent" />
      <rect x="204" y="22.5" width="18" height="2" rx="1" className="fill-white/40" />
      <rect x="230" y="21" width="5" height="5" rx="1" className="fill-white/20" />
      <rect x="238" y="22.5" width="18" height="2" rx="1" className="fill-white/20" />
      <path d="M196.5 121.5H263.5" className="stroke-white/10" />
      <path d={`${CLICKS}V121.5H196.5Z`} className="v-anim v-in fill-accent/[0.08]" style={anim({ d: 2.4, t: 0.6 })} />
      <path
        d={IMPRESSIONS}
        pathLength={100}
        className="v-anim v-draw v-glide stroke-white/20"
        style={anim({ d: 1.5, t: 1.1 })}
      />
      <path
        d={CLICKS}
        pathLength={100}
        className="v-anim v-draw v-glide stroke-accent"
        strokeWidth="1.5"
        style={anim({ d: 1.6, t: 1.1 })}
      />
      <circle cx="263.5" cy="48.5" r="3" className="v-anim v-halo stroke-accent" style={anim({ d: 2.75, t: 0.9, n: 2 })} />
      <circle
        cx="263.5"
        cy="48.5"
        r="3"
        className="v-anim v-in fill-ground stroke-accent"
        strokeWidth="1.5"
        style={anim({ d: 2.65, t: 0.4, from: 'scale(0.5)' })}
      />
    </VectorPanel>
  )
}
