export const EASE = [0.16, 1, 0.3, 1] as const

interface RevealOptions {
  delay?: number
  reduceMotion: boolean
}

export function buildViewportRevealProps({ delay = 0, reduceMotion }: RevealOptions) {
  if (reduceMotion) {
    return { initial: false as const }
  }

  return {
    initial: { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.5, delay, ease: EASE },
  }
}
