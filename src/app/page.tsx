import Link from 'next/link'

export default function HomePage() {
  return (
    <section className="relative isolate overflow-hidden py-10 sm:py-14">
      <div className="pointer-events-none absolute left-0 top-0 -z-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-24 -z-10 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.35em] text-cyan-300/75">
            Biblioteca abierta de prompts
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-6xl">
            Encuentra prompts por categoria de forma simple, intuitiva y rapida.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-gray-400 md:text-lg">
            Promptbook esta pensado como una biblioteca abierta donde puedas
            buscar, guardar y reutilizar prompts de cualquier categoria, desde
            programacion y estudio hasta marketing, automatizacion o imagen.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/explore"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-cyan-100"
            >
              Explorar prompts
            </Link>

            <Link
              href="/create"
              className="rounded-full border border-white/12 bg-white/3 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/8"
            >
              Publicar un prompt
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/3 p-5">
              <p className="text-[2rem] leading-none font-semibold text-white">
                + ideas
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Encuentra formatos, estructuras y estilos que ya funcionan.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/3 p-5">
              <p className="text-[2rem] leading-none font-semibold text-white">
                + orden
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Guarda tus mejores prompts en un espacio mas facil de revisar.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/3 p-5">
              <p className="text-[1.7rem] leading-none font-semibold tracking-tight text-white sm:text-[1.9rem]">
                + comunidad
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Aprende viendo como otros escriben y refinan sus prompts.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-4xl bg-linear-to-br from-cyan-400/10 via-transparent to-emerald-400/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-neutral-950/85 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                  Prompt destacado
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Arquitectura de biblioteca inteligente
                </h2>
              </div>
              <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-100">
                Multicategoria
              </span>
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-black/40 p-5 text-sm leading-7 text-gray-300">
              Explora prompts por categorias, entra en subcategorias utiles y
              encuentra rapidamente lo que necesitas sin depender de recordar en
              que chat, nota o documento lo habias guardado.
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.25rem] border border-white/10 bg-white/3 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                  Ideal para
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Personas que trabajan con varios tipos de prompts en su dia a
                  dia.
                </p>
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-white/3 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                  Valor
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Orden, descubrimiento rapido y mejor reutilizacion del
                  contenido.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
