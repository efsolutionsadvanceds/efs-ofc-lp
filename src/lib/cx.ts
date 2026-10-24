/** Junta classes condicionais — equivalente mínimo ao `clsx`, sem dependência extra. */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}
