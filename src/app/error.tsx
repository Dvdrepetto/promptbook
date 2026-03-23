'use client'

type GlobalErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <section className="relative isolate overflow-hidden py-16 sm:py-20">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-red-500/10 blur-3xl" />

      <div className="mx-auto max-w-2xl rounded-[2rem] border border-red-400/20 bg-red-500/10 p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-red-200/80">
          Error inesperado
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Algo salio mal en Promptbook.
        </h1>
        <p className="mt-4 text-sm leading-7 text-red-100/85 sm:text-base">
          Ocurrio un problema inesperado. Puedes intentar nuevamente o volver a
          cargar la pagina.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-red-50"
          >
            Reintentar
          </button>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white transition hover:bg-white/[0.08]"
          >
            Recargar pagina
          </button>
        </div>
      </div>
    </section>
  )
}
