import { useEffect, useRef } from 'react'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

interface UseFocusTrapOptions {
  isActive: boolean
  onClose: () => void
}

/**
 * Contém o foco dentro do painel enquanto `isActive` for verdadeiro (menu
 * mobile, diálogos). Suporta Tab/Shift+Tab cíclico e fecha com Escape,
 * devolvendo o foco ao elemento que abriu o painel.
 */
export function useFocusTrap<T extends HTMLElement>({ isActive, onClose }: UseFocusTrapOptions) {
  const containerRef = useRef<T | null>(null)
  const triggerElementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isActive) return

    triggerElementRef.current = document.activeElement as HTMLElement | null
    const container = containerRef.current

    const focusFirst = () => {
      const focusable = container?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      focusable?.[0]?.focus()
    }
    focusFirst()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !container) return

      const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      triggerElementRef.current?.focus()
    }
  }, [isActive, onClose])

  return containerRef
}
