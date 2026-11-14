import type { ComponentType, ReactNode } from 'react'

import type { ServiceSlug } from '@/content/serviceIndex'

import { anim, roundedRect, VectorScene } from './VectorScene'

/**
 * Ilustrações exclusivas do topo de cada página de serviço (SVG + CSS puro,
 * em 400 × 300). Como estão na tela desde o carregamento, tocam já na
 * primeira pintura (`autoplay`), uma vez, e terminam na cena pronta; o
 * hover recomeça. Proporção fixa: nenhum deslocamento de layout.
 */
function HeroPanel({ duration, children }: { duration: number; children: ReactNode }) {
  return (
    <VectorScene
      duration={duration}
      autoplay
      replayOn=".vector-hero"
      className="vector-hero aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-surface"
    >
      <div className="bg-grid absolute inset-0 [--grid-size:20px] [mask-image:radial-gradient(ellipse_at_center,#000,transparent_80%)]" />
      <svg viewBox="0 0 400 300" fill="none" strokeLinecap="round" strokeLinejoin="round" className="absolute inset-0 size-full">
        {children}
      </svg>
    </VectorScene>
  )
}

/* -------------------------------------------------------------------------- */
/* Sistemas sob medida: os módulos sincronizam com a base de dados central.   */
/* -------------------------------------------------------------------------- */

const MODULES = [
  { x: 24.5, y: 28.5, side: 'left', inbound: 'M128.5 58.5C150 58.5 146 136 164 136', outbound: 'M164 136C146 136 150 58.5 128.5 58.5' },
  { x: 271.5, y: 28.5, side: 'right', inbound: 'M271.5 58.5C250 58.5 254 136 236 136', outbound: 'M236 136C254 136 250 58.5 271.5 58.5' },
  { x: 24.5, y: 211.5, side: 'left', inbound: 'M128.5 241.5C150 241.5 146 168 164 168', outbound: 'M164 168C146 168 150 241.5 128.5 241.5' },
  { x: 271.5, y: 211.5, side: 'right', inbound: 'M271.5 241.5C250 241.5 254 168 236 168', outbound: 'M236 168C254 168 250 241.5 271.5 241.5' },
] as const

/** Ícones dos módulos (vendas, estoque, agenda, financeiro), em 16 × 16 a partir de (x, y). */
function ModuleIcon({ index, x, y }: { index: number; x: number; y: number }) {
  const icons = [
    // Vendas: carrinho.
    <g key="vendas">
      <path d={`M${x} ${y + 2}h2.5l2 8h8.5l1.5-6h-11`} />
      <circle cx={x + 6} cy={y + 13.5} r="1.2" />
      <circle cx={x + 12} cy={y + 13.5} r="1.2" />
    </g>,
    // Estoque: caixa.
    <g key="estoque">
      <path d={roundedRect(x + 1, y + 4, 14, 11, 1.5)} />
      <path d={`M${x + 1} ${y + 8}h14M${x + 6} ${y + 4}v4M${x + 10} ${y + 4}v4`} />
    </g>,
    // Agenda: calendário.
    <g key="agenda">
      <path d={roundedRect(x + 1, y + 2.5, 14, 12.5, 2)} />
      <path d={`M${x + 1} ${y + 6.5}h14M${x + 5} ${y + 0.5}v4M${x + 11} ${y + 0.5}v4`} />
    </g>,
    // Financeiro: barras subindo.
    <g key="financeiro">
      <path d={`M${x + 2} ${y + 15}v-5M${x + 7} ${y + 15}v-8M${x + 12} ${y + 15}v-12`} />
      <path d={`M${x} ${y + 15.5}h16`} />
    </g>,
  ]
  return icons[index] ?? null
}

function VectorErp() {
  return (
    <HeroPanel duration={3.5}>
      {/* Conexões: base fixa, traço desenhado e pulsos de ida e volta. */}
      {MODULES.map((module, index) => (
        <g key={module.inbound}>
          <path d={module.inbound} className="stroke-white/10" />
          <path d={module.inbound} pathLength={100} className="v-anim v-draw stroke-white/25" style={anim({ d: 0.6 + index * 0.05, t: 0.5 })} />
          <path d={module.inbound} pathLength={100} className="v-anim v-pulse stroke-accent" strokeWidth="2" style={anim({ d: 1.2 + index * 0.15, t: 0.5 })} />
          <path d={module.outbound} pathLength={100} className="v-anim v-pulse stroke-accent" strokeWidth="2" style={anim({ d: 2.3 + index * 0.1, t: 0.5 })} />
        </g>
      ))}

      {/* Base de dados central. */}
      <g className="v-anim v-in" style={anim({ d: 0.1, from: 'translateY(6px)' })}>
        <path d="M164 122V178A36 10 0 0 0 236 178V122" className="fill-raised stroke-white/25" />
        <path d="M164 150A36 10 0 0 0 236 150" className="stroke-white/15" />
        <ellipse cx="200" cy="122" rx="36" ry="10" className="fill-raised stroke-white/25" />
      </g>
      <ellipse cx="200" cy="122" rx="36" ry="10" className="v-anim v-halo stroke-accent" style={anim({ d: 2, t: 0.8, to: 1.4 })} />
      <ellipse cx="200" cy="122" rx="36" ry="10" className="v-anim v-in stroke-accent" strokeWidth="1.5" style={anim({ d: 2, t: 0.3 })} />

      {/* Módulos: vendas, estoque, agenda e financeiro. */}
      {MODULES.map((module, index) => (
        <g key={module.x + module.y}>
          <g className="v-anim v-in" style={anim({ d: index * 0.08, from: `translateX(${module.side === 'left' ? -6 : 6}px)` })}>
            <path d={roundedRect(module.x, module.y, 104, 60, 8)} className="fill-white/[0.03] stroke-white/15" />
            <g className="stroke-white/50" strokeWidth="1.2">
              <ModuleIcon index={index} x={module.x + 11.5} y={module.y + 11.5} />
            </g>
            <rect x={module.x + 36} y={module.y + 14} width="52" height="4" rx="1.5" className="fill-white/70" />
            <rect x={module.x + 36} y={module.y + 23} width="34" height="3" rx="1.5" className="fill-white/25" />
            <rect x={module.x + 12} y={module.y + 42} width="80" height="4" rx="2" className="fill-white/10" />
          </g>
          <rect
            x={module.x + 12}
            y={module.y + 42}
            width="80"
            height="4"
            rx="2"
            className="v-anim v-grow fill-accent/70"
            style={anim({ d: 2.8 + index * 0.1, t: 0.4 })}
          />
          <path
            d={roundedRect(module.x, module.y, 104, 60, 8)}
            className="v-anim v-in stroke-accent/50"
            style={anim({ d: 2.8 + index * 0.1, t: 0.3 })}
          />
        </g>
      ))}
    </HeroPanel>
  )
}

/* -------------------------------------------------------------------------- */
/* Atendente com IA: a conversa no WhatsApp, da dúvida ao agendamento.         */
/* -------------------------------------------------------------------------- */

function VectorWhatsapp() {
  return (
    <HeroPanel duration={4.7}>
      {/* Base de conhecimento (as informações do negócio que a IA consulta). */}
      <g className="v-anim v-in" style={anim({ d: 0.2, from: 'translateX(-4px)' })}>
        <path d={roundedRect(14.5, 96.5, 92, 108, 8)} className="fill-white/[0.02] stroke-white/10" />
        {[110, 140, 170].map((y) => (
          <g key={y}>
            <path d={roundedRect(24.5, y + 0.5, 10, 13, 2)} className="stroke-white/40" />
            <rect x="42" y={y + 3} width="52" height="3" rx="1.5" className="fill-white/50" />
            <rect x="42" y={y + 9} width="34" height="2" rx="1" className="fill-white/20" />
          </g>
        ))}
      </g>
      <path d="M106.5 150.5H124.5" className="stroke-white/10" />
      <path d="M106.5 150.5H124.5" pathLength={100} className="v-anim v-pulse stroke-accent" strokeWidth="2" style={anim({ d: 1.4, t: 0.35 })} />

      {/* Celular com a conversa. */}
      <path d={roundedRect(124.5, 12.5, 152, 276, 22)} className="fill-raised stroke-white/20" />
      <circle cx="148" cy="36" r="8" className="fill-accent/15 stroke-accent/50" />
      <rect x="162" y="31" width="46" height="4" rx="1.5" className="fill-white/70" />
      <rect x="162" y="39" width="28" height="3" rx="1.5" className="fill-accent/70" />
      <path d="M124.5 52.5H276.5" className="stroke-white/10" />

      {/* Cliente pergunta. */}
      <g className="v-anim v-in" style={anim({ d: 0.3, from: 'translateY(4px)' })}>
        <path d={roundedRect(134.5, 64.5, 92, 30, 8)} className="fill-white/[0.06] stroke-white/10" />
        <rect x="142" y="73" width="70" height="3" rx="1.5" className="fill-white/60" />
        <rect x="142" y="81" width="48" height="3" rx="1.5" className="fill-white/30" />
      </g>

      {/* IA digitando e respondendo com base nas informações do negócio. */}
      <g className="v-anim v-flash" style={anim({ d: 0.9, t: 0.9 })}>
        <path d={roundedRect(228.5, 102.5, 40, 20, 8)} className="fill-accent/15 stroke-accent/40" />
        {[240, 248, 256].map((cx) => (
          <circle key={cx} cx={cx} cy="112.5" r="2" className="fill-white/60" />
        ))}
      </g>
      <g className="v-anim v-in" style={anim({ d: 1.8, from: 'translateY(4px)' })}>
        <path d={roundedRect(170.5, 102.5, 98, 40, 8)} className="fill-accent/15 stroke-accent/40" />
        <rect x="178" y="111" width="80" height="3" rx="1.5" className="fill-white/70" />
        <rect x="178" y="119" width="70" height="3" rx="1.5" className="fill-white/50" />
        <rect x="178" y="127" width="52" height="3" rx="1.5" className="fill-white/30" />
      </g>

      {/* Cliente pede o agendamento. */}
      <g className="v-anim v-in" style={anim({ d: 2.5, from: 'translateY(4px)' })}>
        <path d={roundedRect(134.5, 152.5, 84, 22, 8)} className="fill-white/[0.06] stroke-white/10" />
        <rect x="142" y="161" width="60" height="3" rx="1.5" className="fill-white/60" />
      </g>

      {/* Agendamento confirmado. */}
      <g className="v-anim v-in" style={anim({ d: 3, from: 'translateY(4px)' })}>
        <path d={roundedRect(160.5, 184.5, 108, 46, 10)} className="fill-raised stroke-accent/50" />
        <path d={roundedRect(170.5, 194.5, 16, 16, 3)} className="stroke-accent" />
        <path d="M170.5 199.5H186.5M175 192v4M182 192v4" className="stroke-accent" />
        <rect x="194" y="197" width="60" height="3" rx="1.5" className="fill-white/70" />
        <rect x="194" y="205" width="42" height="3" rx="1.5" className="fill-white/30" />
        <rect x="186" y="219" width="50" height="3" rx="1.5" className="fill-accent/60" />
      </g>
      <path d="M171 220.5l3 3 6-6" pathLength={100} className="v-anim v-draw stroke-accent" strokeWidth="1.5" style={anim({ d: 3.3, t: 0.35 })} />

      <path d={roundedRect(134.5, 250.5, 132, 22, 6)} className="stroke-white/10" />

      {/* A equipe recebe o agendamento. */}
      <path d="M276.5 207C300 207 304 230 328 230" className="stroke-white/10" />
      <path
        d="M276.5 207C300 207 304 230 328 230"
        pathLength={100}
        className="v-anim v-pulse stroke-accent"
        strokeWidth="2"
        style={anim({ d: 3.5, t: 0.45 })}
      />
      <circle cx="346" cy="230" r="18" className="fill-white/[0.02] stroke-white/20" />
      <circle cx="346" cy="225" r="4" className="stroke-white/50" />
      <path d="M338 239a8 8 0 0 1 16 0" className="stroke-white/50" />
      <circle cx="346" cy="230" r="18" className="v-anim v-halo stroke-accent" style={anim({ d: 3.9, t: 0.7, to: 1.6 })} />
      <circle cx="346" cy="230" r="18" className="v-anim v-in stroke-accent" strokeWidth="1.5" style={anim({ d: 3.9, t: 0.3 })} />
    </HeroPanel>
  )
}

/* -------------------------------------------------------------------------- */
/* SEO local: a empresa aparece no mapa e sobe para o primeiro resultado.     */
/* -------------------------------------------------------------------------- */

/** Marcador de mapa (gota) com a ponta em (x, y + 24). */
function pin(x: number, y: number): string {
  return `M${x} ${y}c-5.5 0-10 4.3-10 9.6C${x - 10} ${y + 16.8} ${x} ${y + 24} ${x} ${y + 24}s10-7.2 10-14.4C${x + 10} ${y + 4.3} ${x + 5.5} ${y} ${x} ${y}z`
}

const LOCAL_RESULTS = [
  { y: 140, dy: -72, title: 88, own: false },
  { y: 212, dy: -72, title: 76, own: false },
  { y: 68, dy: 144, title: 96, own: true },
] as const

function VectorLocalSeo() {
  return (
    <HeroPanel duration={4}>
      {/* Busca sendo digitada. */}
      <path d={roundedRect(20.5, 16.5, 360, 30, 8)} className="fill-white/[0.03] stroke-white/20" />
      <circle cx="38" cy="31.5" r="6" className="stroke-white/40" />
      <path d="M42.5 36l4 4" className="stroke-white/40" />
      <rect x="56" y="29.5" width="140" height="4" rx="2" className="v-anim v-grow fill-white/70" style={anim({ d: 0.1, t: 0.8, steps: 10 })} />

      {/* Mapa. */}
      <path d={roundedRect(20.5, 60.5, 176, 224, 10)} className="fill-white/[0.02] stroke-white/10" />
      <path d="M21 140C80 130 120 160 196 150M90 61C100 120 80 200 110 284M21 222H196" className="stroke-white/[0.06]" strokeWidth="7" />
      <path d={roundedRect(36.5, 76.5, 40, 44, 4)} className="fill-white/[0.03]" />
      <path d={roundedRect(132.5, 172.5, 52, 34, 4)} className="fill-white/[0.03]" />
      <path d={roundedRect(36.5, 236.5, 42, 36, 4)} className="fill-white/[0.03]" />
      <path d={pin(60, 160)} className="fill-white/15" />
      <path d={pin(160, 96)} className="fill-white/15" />
      <circle cx="112" cy="220" r="6" className="v-anim v-halo stroke-accent" style={anim({ d: 1.6, t: 0.8, to: 2.6 })} />
      <g className="v-anim v-in" style={anim({ d: 1.2, t: 0.5, from: 'translateY(-10px)' })}>
        <path d={pin(112, 196)} className="fill-accent" />
        <circle cx="112" cy="205.6" r="3.5" className="fill-ground" />
      </g>

      {/* Resultados locais: o seu começa em 3º e termina em 1º. */}
      {LOCAL_RESULTS.map((row) => (
        <g key={row.y} className="v-anim v-swap" style={anim({ d: 1.6, t: 2, dy: row.dy })}>
          <path
            d={roundedRect(212.5, row.y + 0.5, 168, 62, 8)}
            className={row.own ? 'fill-raised stroke-accent/40' : 'fill-white/[0.02] stroke-white/10'}
          />
          <circle cx="228" cy={row.y + 18} r="6" className={row.own ? 'fill-accent/15 stroke-accent' : 'fill-white/10 stroke-white/20'} />
          <rect x="242" y={row.y + 14} width={row.title} height="4" rx="1.5" className={row.own ? 'fill-accent' : 'fill-white/40'} />
          <rect x="242" y={row.y + 24} width="110" height="3" rx="1.5" className="fill-white/20" />
          <rect x="242" y={row.y + 32} width="80" height="3" rx="1.5" className="fill-white/15" />
          {row.own ? (
            <>
              <path d={roundedRect(242.5, row.y + 42.5, 44, 12, 3)} className="stroke-accent/60" />
              <path d={roundedRect(292.5, row.y + 42.5, 44, 12, 3)} className="stroke-white/20" />
            </>
          ) : null}
        </g>
      ))}
      <path d={roundedRect(212.5, 68.5, 168, 62, 8)} className="v-anim v-in stroke-accent" style={anim({ d: 3.6, t: 0.3 })} />
    </HeroPanel>
  )
}

/* -------------------------------------------------------------------------- */
/* Landing pages e lojas: da página de campanha ao pedido confirmado.         */
/* -------------------------------------------------------------------------- */

const PRODUCTS = [32.5, 148.5, 264.5]
const CHECKOUT = [120, 200, 280]

function VectorStore() {
  return (
    <HeroPanel duration={3.6}>
      <path d={roundedRect(16.5, 14.5, 367, 271, 10)} className="fill-white/[0.02] stroke-white/10" />
      <path d="M16.5 38.5H383.5" className="stroke-white/10" />
      {[30, 40, 50].map((cx) => (
        <circle key={cx} cx={cx} cy="26.5" r="2.5" className="fill-white/10" />
      ))}
      <path d={roundedRect(68.5, 20.5, 180, 12, 4)} className="stroke-white/10" />

      {/* Cabeçalho da loja, com o carrinho. */}
      <g className="v-anim v-in" style={anim({ d: 0 })}>
        <rect x="32" y="54" width="36" height="10" rx="2" className="fill-white/40" />
        {[200, 240, 280].map((x) => (
          <rect key={x} x={x} y="57" width="30" height="3" rx="1.5" className="fill-white/20" />
        ))}
        <g className="stroke-white/50" strokeWidth="1.2">
          <path d="M335 53h3l3 10h12l3-7h-16" />
          <circle cx="343" cy="67" r="1.5" />
          <circle cx="352" cy="67" r="1.5" />
        </g>
      </g>
      <circle cx="357" cy="52" r="4" className="v-anim v-in fill-accent" style={anim({ d: 1.9, t: 0.3, from: 'scale(0.4)' })} />

      {/* Landing page: título em dois tons, texto e botão de ação. */}
      <rect x="32" y="88" width="150" height="8" rx="2" className="v-anim v-grow fill-white/70" style={anim({ d: 0.2 })} />
      <rect x="32" y="102" width="110" height="8" rx="2" className="v-anim v-grow fill-white/40" style={anim({ d: 0.3 })} />
      <rect x="32" y="118" width="130" height="3" rx="1.5" className="v-anim v-grow fill-white/20" style={anim({ d: 0.4 })} />
      <rect x="32" y="128" width="60" height="16" rx="4" className="v-anim v-in fill-accent" style={anim({ d: 0.5, from: 'scale(0.9)' })} />
      <g className="v-anim v-in" style={anim({ d: 0.35 })}>
        <path d={roundedRect(220.5, 84.5, 148, 62, 6)} className="fill-white/[0.03] stroke-white/10" />
        <circle cx="246" cy="104" r="6" className="stroke-white/20" />
        <path d="M230 138l30-22 18 12 22-18 36 28" className="stroke-white/20" />
      </g>

      {/* Produtos: o primeiro vai para o carrinho. */}
      {PRODUCTS.map((x, index) => (
        <g key={x} className="v-anim v-in" style={anim({ d: 0.7 + index * 0.1, from: 'translateY(6px)' })}>
          <path d={roundedRect(x, 160.5, 104, 72, 6)} className="fill-white/[0.02] stroke-white/15" />
          <rect x={x + 6} y="166.5" width="92" height="32" rx="3" className="fill-white/[0.05]" />
          <rect x={x + 8} y="206" width="60" height="3" rx="1.5" className="fill-white/50" />
          <rect x={x + 8} y="214" width="30" height="4" rx="1.5" className="fill-white/70" />
          <g className={index === 0 ? 'v-anim v-press' : undefined} style={index === 0 ? anim({ d: 1.5, t: 0.3 }) : undefined}>
            <path d={roundedRect(x + 70, 210.5, 26, 14, 3)} className="stroke-accent/60" />
            <path d={`M${x + 83} 213.5v8M${x + 79} 217.5h8`} className="stroke-accent" />
          </g>
        </g>
      ))}

      {/* Checkout: carrinho, pagamento e pedido confirmado. */}
      <path d="M128 260.5H192M208 260.5H272" className="stroke-white/10" />
      <rect x="128" y="260" width="64" height="1" className="v-anim v-grow fill-accent" style={anim({ d: 2.3, t: 0.3 })} />
      <rect x="208" y="260" width="64" height="1" className="v-anim v-grow fill-accent" style={anim({ d: 2.8, t: 0.3 })} />
      {CHECKOUT.map((cx, index) => (
        <g key={cx}>
          <circle cx={cx} cy="260.5" r="8" className="fill-raised stroke-white/20" />
          <circle cx={cx} cy="260.5" r="8" className="v-anim v-in fill-accent/15 stroke-accent" style={anim({ d: 2.1 + index * 0.5, t: 0.3 })} />
        </g>
      ))}
      <path d="M116 257h1.5l1.2 4.5h4.5l1-3h-6" className="stroke-white/50" strokeWidth="1" />
      <path d={roundedRect(195.5, 256.5, 9, 7, 1.2)} className="stroke-white/50" strokeWidth="1" />
      <path d="M276.5 260.7l2.3 2.3 4.6-4.8" pathLength={100} className="v-anim v-draw stroke-accent" strokeWidth="1.5" style={anim({ d: 3.2, t: 0.35 })} />
    </HeroPanel>
  )
}

export const SERVICE_HERO_VECTORS: Record<ServiceSlug, ComponentType> = {
  'sistemas-personalizados': VectorErp,
  'automacao-whatsapp': VectorWhatsapp,
  'seo-e-divulgacao': VectorLocalSeo,
  'landing-pages-e-lojas': VectorStore,
}
