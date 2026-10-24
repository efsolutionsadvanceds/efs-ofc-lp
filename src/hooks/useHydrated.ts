import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

/**
 * `false` durante o pré-render e a hidratação, `true` depois — e `true`
 * desde o início em navegações do lado do cliente. Use para ler dados que
 * só existem no navegador (ex.: `location.state`) sem quebrar a hidratação.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}
