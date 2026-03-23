export default function GlobalLoading() {
  return (
    <section className="relative isolate overflow-hidden py-16 sm:py-20">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-white/15 border-t-cyan-200" />
        <p className="mt-6 text-xs font-medium uppercase tracking-[0.35em] text-cyan-300/75">
          Cargando
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          Preparando la biblioteca
        </h1>
        <p className="mt-3 text-sm leading-7 text-gray-400 sm:text-base">
          Estamos cargando la informacion para que puedas seguir explorando
          Promptbook.
        </p>
      </div>
    </section>
  )
}
