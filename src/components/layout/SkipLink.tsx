/** Atalho de teclado para pular o cabeçalho — visível só ao receber foco. */
export function SkipLink() {
  return (
    <a
      href="#conteudo"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-medium focus:text-accent-ink"
    >
      Pular para o conteúdo
    </a>
  )
}
