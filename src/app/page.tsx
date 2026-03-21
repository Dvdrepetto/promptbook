import Link from 'next/link'

export default function HomePage() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="mb-4 text-sm uppercase tracking-[0.2em] text-gray-500">
        Biblioteca abierta de prompts
      </p>

      <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-white md:text-6xl">
        Descubre, guarda y reutiliza prompts de imagen
      </h1>

      <p className="mt-6 max-w-2xl text-base text-gray-400 md:text-lg">
        Explora prompts listos para usar, publica los tuyos y construye tu
        propia colección.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/explore"
          className="rounded-md bg-white px-5 py-3 text-sm font-medium text-black transition hover:opacity-90"
        >
          Explorar prompts
        </Link>

        <Link
          href="/create"
          className="rounded-md border border-neutral-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-900"
        >
          Crear prompt
        </Link>
      </div>
    </section>
  )
}