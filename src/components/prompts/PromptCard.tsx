import Link from 'next/link'
import type { Prompt } from '@/types/prompt'
import {
  getCategoryBySlug,
  getSubcategoryBySlug,
} from '@/lib/prompt-categories'

type PromptCardProps = {
  prompt: Prompt
}

export default function PromptCard({ prompt }: PromptCardProps) {
  const category = prompt.category ? getCategoryBySlug(prompt.category) : null
  const subcategory =
    prompt.category && prompt.subcategory
      ? getSubcategoryBySlug(prompt.category, prompt.subcategory)
      : null

  return (
    <Link
      href={`/prompt/${prompt.id}`}
      className="group flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-white/[0.05]"
    >
      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-100">
            {prompt.tool || 'Sin herramienta'}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(prompt.created_at).toLocaleDateString()}
          </span>
        </div>

        <h2 className="text-xl font-semibold tracking-tight text-white transition group-hover:text-cyan-50">
          {prompt.title}
        </h2>

        {category || subcategory ? (
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-gray-500">
            {[category?.name, subcategory?.name].filter(Boolean).join(' / ')}
          </p>
        ) : null}

        <p className="mt-3 line-clamp-4 text-sm leading-7 text-gray-400">
          {prompt.prompt}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <span>❤️</span>
          <span>{prompt.likes_count}</span>
        </div>

        <span className="text-sm text-gray-500 transition group-hover:text-gray-300">
          Ver prompt
        </span>
      </div>
    </Link>
  )
}
