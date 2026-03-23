import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden py-16 sm:py-20">
      <div className="pointer-events-none absolute left-0 top-0 -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-20 -z-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-cyan-300/75">
          404
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Esta pagina no existe.
        </h1>
        <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
          Puede que el enlace este roto o que el contenido haya cambiado de
          lugar.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-cyan-100"
          >
            Volver al inicio
          </Link>
          <Link
            href="/explore"
            className="rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white transition hover:bg-white/[0.08]"
          >
            Ir a explorar
          </Link>
        </div>
      </div>
    </section>
  )
}
