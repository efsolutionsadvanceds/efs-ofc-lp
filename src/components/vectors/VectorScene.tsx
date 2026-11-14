import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

import { cx } from '@/lib/cx'

interface VectorSceneProps {
  children: ReactNode
  /** Quando o último elemento da cena termina, em segundos (sempre abaixo de 5s). */
  duration: number
  /** Seletor do ancestral cujo hover (só mouse) ou foco reinicia a cena, ex.: 'article'. */
  replayOn?: string
  /** Ilustração pura (padrão): fica fora da árvore de acessibilidade. */
  decorative?: boolean
  className?: string
}

/** Fração da cena que precisa estar na tela para ela começar a tocar. */
const VISIBLE_RATIO = 0.35
/** Tempo para os acréscimos sumirem antes de a cena recomeçar (hover). */
const RESET_MS = 160

type Status = 'static' | 'armed' | 'playing' | 'done' | 'resetting'

/**
 * Palco dos vetores animados: SVG + CSS puro, sem biblioteca.
 *
 * - O HTML estático traz a cena pronta. Sem JavaScript, com
 *   `prefers-reduced-motion` ou se a cena já estiver na tela quando a
 *   página carrega, ela continua assim: nada pisca.
 * - Fora da tela, a cena é preparada no quadro inicial (os acréscimos
 *   ficam invisíveis, longe dos olhos do visitante) e toca uma única vez
 *   quando aparece. Se sair da tela no meio, pausa.
 * - Termina sempre na cena pronta, em menos de 5s (sem loop infinito).
 * - Com `replayOn`, o hover do mouse ou o foco no cartão recomeça a cena
 *   depois que ela terminou.
 *
 * Os elementos animados usam `v-anim` + o tipo (`v-in`, `v-grow`, `v-draw`,
 * `v-pulse`, `v-halo`, `v-press`, `v-swap`), com o tempo de cada um em
 * `anim()`. As regras ficam em src/styles/app.css.
 */
export function VectorScene({ children, duration, replayOn, decorative = true, className }: VectorSceneProps) {
  const ref = useRef<HTMLDivElement>(null)
  const status = useRef<Status>('static')
  const [running, setRunning] = useState(false)
  const [paused, setPaused] = useState(false)
  const [resetting, setResetting] = useState(false)
  // Remontar (nova `key`) recomeça todas as animações da cena.
  const [replays, setReplays] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let firstReport = true
    let timer: number | undefined

    function handle(entry: IntersectionObserverEntry) {
      if (firstReport) {
        firstReport = false
        if (entry.isIntersecting) {
          status.current = 'done'
        } else {
          status.current = 'armed'
          setPaused(true)
          setRunning(true)
        }
        return
      }
      if (status.current === 'armed' && entry.intersectionRatio >= VISIBLE_RATIO) {
        status.current = 'playing'
        setPaused(false)
      } else if (status.current === 'playing') {
        setPaused(!entry.isIntersecting)
      }
    }

    // Uma chamada pode trazer várias notificações da cena (rolagem rápida,
    // âncora, janela redimensionada): todas, em ordem; a última é o estado atual.
    const observer = new IntersectionObserver((entries) => entries.forEach(handle), {
      threshold: [0, VISIBLE_RATIO],
    })
    observer.observe(node)

    const host = replayOn ? node.closest<HTMLElement>(replayOn) : null
    function replay(event: Event) {
      if (event instanceof PointerEvent && event.pointerType !== 'mouse') return
      if (status.current !== 'done') return
      status.current = 'resetting'
      setRunning(false)
      setResetting(true)
      timer = window.setTimeout(() => {
        status.current = 'playing'
        setReplays((count) => count + 1)
        setResetting(false)
        setPaused(false)
        setRunning(true)
      }, RESET_MS)
    }
    host?.addEventListener('pointerenter', replay)
    host?.addEventListener('focusin', replay)

    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
      host?.removeEventListener('pointerenter', replay)
      host?.removeEventListener('focusin', replay)
    }
  }, [replayOn])

  return (
    <div
      ref={ref}
      aria-hidden={decorative ? true : undefined}
      className={cx('vector', className)}
      data-run={running ? '' : undefined}
      data-paused={paused ? '' : undefined}
      data-reset={resetting ? '' : undefined}
      onAnimationEnd={(event) => {
        if (event.animationName === 'v-clock' && status.current === 'playing') status.current = 'done'
      }}
    >
      <Fragment key={replays}>
        {children}
        <span className="v-anim v-clock" style={anim({ t: duration })} />
      </Fragment>
    </div>
  )
}

interface AnimTiming {
  /** Atraso dentro da cena, em segundos. */
  d?: number
  /** Duração, em segundos (padrão: 0,5s). */
  t?: number
  /** Repetições (padrão: 1). */
  n?: number
  /** Movimento em degraus (ex.: texto sendo digitado). */
  steps?: number
  /** Transform do quadro inicial, ex.: 'translateY(4px)' (padrão de `v-grow`: scaleX(0)). */
  from?: string
  /** Origem do transform, ex.: 'bottom' (padrão: centro; `v-grow`: esquerda). */
  o?: string
  /** Deslocamento vertical do quadro inicial de `v-swap`, em unidades do SVG. */
  dy?: number
  /** Escala final do halo (padrão: 2.4). */
  to?: number
}

/** Tempo e forma de um elemento animado (variáveis CSS lidas em app.css). */
export function anim({ d, t, n, steps, from, o, dy, to }: AnimTiming): CSSProperties {
  const style: Record<string, string> = {}
  if (d !== undefined) style['--d'] = `${d}s`
  if (t !== undefined) style['--t'] = `${t}s`
  if (n !== undefined) style['--n'] = String(n)
  if (steps !== undefined) style['--e'] = `steps(${steps}, end)`
  if (from !== undefined) style['--from'] = from
  if (o !== undefined) style['--o'] = o
  if (dy !== undefined) style['--dy'] = `${dy}px`
  if (to !== undefined) style['--to'] = String(to)
  return style as CSSProperties
}

/** Caminho de um retângulo arredondado: dá para traçar com pathLength, o que nem todo navegador aceita em <rect>. */
export function roundedRect(x: number, y: number, width: number, height: number, radius: number): string {
  const r = radius
  return [
    `M${x + r} ${y}`,
    `H${x + width - r}`,
    `A${r} ${r} 0 0 1 ${x + width} ${y + r}`,
    `V${y + height - r}`,
    `A${r} ${r} 0 0 1 ${x + width - r} ${y + height}`,
    `H${x + r}`,
    `A${r} ${r} 0 0 1 ${x} ${y + height - r}`,
    `V${y + r}`,
    `A${r} ${r} 0 0 1 ${x + r} ${y}`,
    'Z',
  ].join(' ')
}
