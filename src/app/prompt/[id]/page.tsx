import { supabase } from '@/lib/supabaseClient'
import CopyButton from './CopyButton'
import LikeButton from '../../../components/LikeButton'
import {
  getCategoryBySlug,
  getSubcategoryBySlug,
} from '@/lib/prompt-categories'

type PromptPageProps = {
    params: Promise<{ id: string }>
}

export default async function PromptPage({ params }: PromptPageProps) {
  const { id } = await params

  const { data: prompt, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !prompt) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <p className="text-red-500">Prompt no encontrado.</p>
      </div>
    )
  }

  const category = prompt.category ? getCategoryBySlug(prompt.category) : null
  const subcategory =
    prompt.category && prompt.subcategory
      ? getSubcategoryBySlug(prompt.category, prompt.subcategory)
      : null

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">{prompt.tool || 'Sin herramienta'}</p>
          <h1 className="mt-2 text-4xl font-bold">{prompt.title}</h1>
          {category || subcategory ? (
            <p className="mt-3 text-sm text-gray-400">
              {[category?.name, subcategory?.name].filter(Boolean).join(' / ')}
            </p>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          <LikeButton promptId={prompt.id} likesCount={prompt.likes_count} />
          <CopyButton text={prompt.prompt} />
        </div>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-gray-400">
          Prompt
        </h2>

        <pre className="whitespace-pre-wrap text-sm leading-7 text-gray-100">
          {prompt.prompt}
        </pre>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        Creado: {new Date(prompt.created_at).toLocaleString()}
      </div>
    </div>
  )
}
