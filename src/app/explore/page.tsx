import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import PromptCard from '@/components/prompts/PromptCard'
import type { Prompt } from '@/types/prompt'
import {
  getCategoryBySlug,
  getSubcategoryBySlug,
  PROMPT_CATEGORIES,
} from '@/lib/prompt-categories'

type ExplorePageProps = {
  searchParams?: Promise<{
    category?: string
    subcategory?: string
  }>
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const resolvedSearchParams = await searchParams
  const activeCategorySlug = resolvedSearchParams?.category ?? ''
  const activeSubcategorySlug = resolvedSearchParams?.subcategory ?? ''
  const activeCategory = activeCategorySlug
    ? getCategoryBySlug(activeCategorySlug)
    : null
  const activeSubcategory =
    activeCategory && activeSubcategorySlug
      ? getSubcategoryBySlug(activeCategory.slug, activeSubcategorySlug)
      : null

  let query = supabase.from('prompts').select('*')

  if (activeCategory) {
    query = query.eq('category', activeCategory.slug)
  }

  if (activeCategory && activeSubcategory) {
    query = query.eq('subcategory', activeSubcategory.slug)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    return (
      <section className="relative isolate overflow-hidden py-10 sm:py-14">
        <div className="pointer-events-none absolute left-0 top-0 -z-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="rounded-[2rem] border border-red-400/20 bg-red-500/10 p-6 text-red-100">
          <p className="text-sm uppercase tracking-[0.2em] text-red-200/80">
            Error al cargar
          </p>
          <p className="mt-3 text-base leading-7">
            No pudimos obtener los prompts. {error.message}
          </p>
        </div>
      </section>
    )
  }

  const prompts = (data ?? []) as Prompt[]
  const totalSubcategories = PROMPT_CATEGORIES.reduce(
    (total, category) => total + category.subcategories.length,
    0
  )

  return (
    <section className="relative isolate overflow-hidden py-10 sm:py-14">
      <div className="pointer-events-none absolute left-0 top-0 -z-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-28 -z-10 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="space-y-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.35em] text-cyan-300/75">
              Explorar biblioteca
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Encuentra prompts por categoria y entra mas rapido a lo que
              realmente necesitas.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-400">
              La idea de Promptbook es que puedas recorrer una biblioteca amplia
              y util, con categorias claras y subcategorias concretas para
              trabajo, estudio, programacion, contenido, automatizacion y mas.
            </p>
            {activeCategory ? (
              <p className="mt-4 text-sm leading-7 text-cyan-100">
                Viendo: {activeCategory.name}
                {activeSubcategory ? ` / ${activeSubcategory.name}` : ''}
              </p>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[2rem] leading-none font-semibold text-white">
                {PROMPT_CATEGORIES.length}
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                categorias principales sugeridas
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[2rem] leading-none font-semibold text-white">
                {totalSubcategories}
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                subcategorias para orientarte rapido
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[2rem] leading-none font-semibold text-white">
                {prompts.length}
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                prompts publicados en la biblioteca
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
                Categorias base
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Una estructura pensada para descubrir mejor.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-gray-400">
              Estas categorias funcionan como punto de partida para que la
              biblioteca sea intuitiva desde el primer vistazo.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {PROMPT_CATEGORIES.map((category) => (
              <article
                key={category.slug}
                className="rounded-[1.75rem] border border-white/10 bg-black/30 p-5"
              >
                <h3 className="text-xl font-semibold tracking-tight text-white">
                  {category.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-gray-400">
                  {category.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.slug}
                      href={`/explore?category=${category.slug}&subcategory=${subcategory.slug}`}
                      className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                        activeCategorySlug === category.slug &&
                        activeSubcategorySlug === subcategory.slug
                          ? 'border-cyan-200/40 bg-cyan-300/20 text-white'
                          : 'border-cyan-300/15 bg-cyan-400/10 text-cyan-100 hover:border-cyan-200/30 hover:bg-cyan-300/15'
                      }`}
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/explore"
            className={`rounded-full border px-4 py-2 text-sm transition ${
              !activeCategory
                ? 'border-white/20 bg-white/10 text-white'
                : 'border-white/10 bg-white/[0.03] text-gray-300 hover:bg-white/[0.08]'
            }`}
          >
            Ver todo
          </Link>
          {activeCategory ? (
            <Link
              href={`/explore?category=${activeCategory.slug}`}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                activeCategory && !activeSubcategory
                  ? 'border-white/20 bg-white/10 text-white'
                  : 'border-white/10 bg-white/[0.03] text-gray-300 hover:bg-white/[0.08]'
              }`}
            >
              {activeCategory.name}
            </Link>
          ) : null}
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
              Como pensarlo
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Categoria primero, prompt despues.
            </h2>
            <p className="mt-4 text-sm leading-7 text-gray-400">
              En vez de buscar entre prompts mezclados, la experiencia puede
              empezar por contexto: que tipo de tarea quieres resolver y dentro
              de esa categoria que subarea te interesa.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
              Ejemplos de uso
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.25rem] border border-white/10 bg-black/25 p-4 text-sm leading-7 text-gray-300">
                Quiero un prompt para estudiar un tema dificil.
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-black/25 p-4 text-sm leading-7 text-gray-300">
                Necesito un prompt para depurar una API.
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-black/25 p-4 text-sm leading-7 text-gray-300">
                Busco un prompt para crear una campaña de marketing.
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-black/25 p-4 text-sm leading-7 text-gray-300">
                Quiero uno para generar ideas visuales o branding.
              </div>
            </div>
          </div>
        </div>

        {!prompts.length ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
              Biblioteca vacia
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Aun no hay prompts publicados.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-400">
              {activeSubcategory
                ? `Todavia no hay prompts para ${activeSubcategory.name}.`
                : activeCategory
                  ? `Todavia no hay prompts para ${activeCategory.name}.`
                  : 'Cuando aparezcan, vas a verlos aqui con la misma vista visual del resto del producto.'}
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
                  Ultimos prompts
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Contenido reciente de la biblioteca
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-gray-400">
                Mientras definimos el sistema completo de filtros, aqui se ven
                los prompts publicados mas recientes.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {prompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
