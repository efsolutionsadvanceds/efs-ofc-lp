import type { ReactNode } from 'react'

import { anim, roundedRect, VectorScene } from './VectorScene'

/** Quando cada passo acende, em segundos. */
const LIT_AT = [0.1, 1.15, 2.3]
/** A conexão até o próximo passo se preenche logo depois de o passo acender. */
const LINK = { delay: 0.45, duration: 0.6 }

interface VectorProcessProps {
  /** A lista de passos (conteúdo real, que continua acessível). */
  children: ReactNode
  className?: string
}

/**
 * Trilha "Do clique à proposta": os passos acendem em sequência e a
 * conexão entre eles se preenche (vertical no celular, horizontal no
 * desktop). Envolve a lista de passos; só os nós e as conexões animam.
 */
export function VectorProcess({ children, className }: VectorProcessProps) {
  return (
    <VectorScene duration={3.75} decorative={false} className={className}>
      {children}
    </VectorScene>
  )
}

interface StepNodeProps {
  index: number
  last: boolean
}

/**
 * Nó de um passo e a conexão até o próximo. O <li> define `--pad` (o seu
 * padding), usado para a conexão começar na borda do nó e terminar na
 * borda do nó seguinte.
 */
export function StepNode({ index, last }: StepNodeProps) {
  const litAt = LIT_AT[index] ?? 0
  return (
    <>
      <span
        aria-hidden="true"
        className="relative z-10 grid size-10 place-items-center rounded-md border border-white/10 bg-ground"
      >
        <span
          className="v-anim v-in absolute -inset-px rounded-md border border-accent/60 bg-accent/10"
          style={anim({ d: litAt, t: 0.35 })}
        />
        {last ? (
          <span
            className="v-anim v-halo absolute -inset-px rounded-md border border-accent"
            style={anim({ d: litAt + 0.5, t: 0.9, to: 1.35 })}
          />
        ) : null}
        <svg
          viewBox="0 0 20 20"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative size-5"
        >
          <StepIcon index={index} litAt={litAt} />
        </svg>
      </span>

      {last ? null : (
        <span
          aria-hidden="true"
          className={[
            'absolute bg-white/10',
            'top-[calc(var(--pad)+2.5rem)] -bottom-[calc(var(--pad)+1px)] left-[calc(var(--pad)+1.25rem-0.5px)] w-px',
            'md:top-[calc(var(--pad)+1.25rem-0.5px)] md:bottom-auto md:left-[calc(var(--pad)+2.5rem)] md:-right-[calc(var(--pad)+1px)] md:h-px md:w-auto',
          ].join(' ')}
        >
          <span
            className="v-anim v-grow v-glide absolute inset-0 bg-accent/60 [--from:scaleY(0)] [--o:top_left] md:[--from:scaleX(0)]"
            style={anim({ d: litAt + LINK.delay, t: LINK.duration })}
          />
        </span>
      )}
    </>
  )
}

/** Ícones: seleção (check), conversa (digitando) e proposta (documento aprovado). */
function StepIcon({ index, litAt }: { index: number; litAt: number }) {
  if (index === 0) {
    return (
      <>
        <path d={roundedRect(3.5, 3.5, 13, 13, 3)} className="stroke-white/40" />
        <path
          d="M6.8 10.2l2.2 2.2 4.4-4.8"
          pathLength={100}
          className="v-anim v-draw stroke-accent"
          strokeWidth="1.5"
          style={anim({ d: litAt + 0.15, t: 0.35 })}
        />
      </>
    )
  }
  if (index === 1) {
    return (
      <>
        <path
          d="M5.5 3.5h9a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-5l-3.5 3v-3a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z"
          className="stroke-white/40"
        />
        {[7, 10, 13].map((cx, dot) => (
          <circle
            key={cx}
            cx={cx}
            cy="8.5"
            r="1"
            className="v-anim v-in fill-accent"
            style={anim({ d: litAt + 0.1 + dot * 0.1, t: 0.25, from: 'scale(0.5)' })}
          />
        ))}
      </>
    )
  }
  return (
    <>
      <path
        d="M5.5 2.5h6l3.5 3.5v10.5a1 1 0 0 1-1 1h-8.5a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1z"
        className="stroke-white/40"
      />
      <path d="M11.5 2.5V6H15" className="stroke-white/40" />
      <path
        d="M7.3 12.3l1.8 1.8 3.6-3.8"
        pathLength={100}
        className="v-anim v-draw stroke-accent"
        strokeWidth="1.5"
        style={anim({ d: litAt + 0.15, t: 0.35 })}
      />
    </>
  )
}
