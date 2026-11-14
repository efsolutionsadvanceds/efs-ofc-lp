/**
 * Esqueleto das rotas carregadas sob demanda (páginas de cidade, hub e
 * páginas legais), exibido só numa navegação interna enquanto o código da
 * página chega. Nunca aparece no carregamento direto: o HTML pré-renderizado
 * já traz a página pronta e a hidratação o mantém até o código chegar.
 *
 * Entra com 150ms de atraso (conexões rápidas nem chegam a vê-lo) e é
 * estático: nenhum brilho em loop.
 */
export function RouteSkeleton() {
  return (
    <div
      role="status"
      aria-label="Carregando a página"
      className="frame min-h-[70vh] pt-8 pb-24 animate-[fade_200ms_150ms_both] md:pt-12"
    >
      <div className="h-4 w-48 rounded-md bg-white/[0.06]" />
      <div className="mt-14 h-5 w-32 rounded-md bg-white/[0.06] md:mt-20" />
      <div className="mt-6 h-12 w-[min(36rem,90%)] rounded-md bg-white/[0.07] md:h-16" />
      <div className="mt-3 h-12 w-[min(26rem,70%)] rounded-md bg-white/[0.04] md:h-16" />
      <div className="mt-10 flex max-w-[34rem] flex-col gap-3">
        <div className="h-4 rounded-md bg-white/[0.05]" />
        <div className="h-4 w-11/12 rounded-md bg-white/[0.05]" />
        <div className="h-4 w-3/4 rounded-md bg-white/[0.05]" />
      </div>
      <div className="mt-10 flex gap-3">
        <div className="h-13 w-52 rounded-md bg-white/[0.07]" />
        <div className="h-13 w-44 rounded-md bg-white/[0.04]" />
      </div>
    </div>
  )
}
