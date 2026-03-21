import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import CreatePromptForm from './CreatePromptForm'

export default async function CreatePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <section className="relative isolate overflow-hidden py-10 sm:py-14">
      <div className="pointer-events-none absolute left-0 top-0 -z-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-24 -z-10 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-cyan-300/75">
              Publicar en la biblioteca
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Crea prompts faciles de encontrar, reutilizar y explorar.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-gray-400">
              Organiza tu prompt por categoria y subcategoria desde el momento
              de publicarlo. Eso hace que la biblioteca sea mas clara para todos.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm font-medium text-white">
                1. Elige una categoria
              </p>
              <p className="mt-2 text-sm leading-7 text-gray-400">
                Ayuda a que otros encuentren el prompt desde el contexto correcto.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm font-medium text-white">
                2. Define la subcategoria
              </p>
              <p className="mt-2 text-sm leading-7 text-gray-400">
                Le da precision a la busqueda sin volverla complicada.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm font-medium text-white">
                3. Publica con buen contexto
              </p>
              <p className="mt-2 text-sm leading-7 text-gray-400">
                Un mejor titulo y una mejor estructura hacen mas reutilizable el prompt.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-neutral-950/85 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-8">
          <CreatePromptForm />
        </div>
      </div>
    </section>
  )
}
