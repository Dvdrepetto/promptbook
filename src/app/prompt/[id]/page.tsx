import { createClient } from '@/lib/supabase/server'
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
  const supabase = await createClient()
  const { id } = await params
  const {
    data: { user },
  } = await supabase.auth.getUser()

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
  const { data: likes } = await supabase
    .from('prompt_likes')
    .select('user_id, profiles!prompt_likes_user_id_fkey(username)')
    .eq('prompt_id', prompt.id)
    .order('created_at', { ascending: false })

  const likedByUser = Boolean(
    likes?.some((like) => like.user_id === user?.id)
  )
  const likesCount = likes?.length ?? 0
  const likedUsers =
    likes
      ?.map((like) => {
        const profile = Array.isArray(like.profiles) ? like.profiles[0] : like.profiles
        return profile?.username || null
      })
      .filter(Boolean)
      .slice(0, 6) ?? []

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
          <LikeButton
            promptId={prompt.id}
            likesCount={likesCount}
            likedByUser={likedByUser}
            canLike={Boolean(user)}
          />
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

      <div className="mt-6 rounded-xl border border-white/10 bg-white/3 p-5">
        <h2 className="text-sm font-medium uppercase tracking-wide text-gray-400">
          Likes
        </h2>
        <p className="mt-3 text-sm leading-7 text-gray-300">
          {likedUsers.length
            ? `Usuarios a los que les gustó este prompt: ${likedUsers.join(', ')}. Ya son: ${likesCount}`
            : 'Todavia nadie dio like a este prompt.'}
        </p>
      </div>
    </div>
  )
}
