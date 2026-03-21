import Link from 'next/link'
import type { Prompt } from '@/types/prompt'

type PromptCardProps = {
    prompt: Prompt
}

export default function PromptCard({ prompt }: PromptCardProps) {
    return (
        <Link
            href={`/prompt/${prompt.id}`}
            className="rounded-xl border border-neutral-800 p-4 transition hover:bg-neutral-900"
        >
            <h2 className="text-lg font-semibold text-white">{prompt.title}</h2>

            <p className="mt-2 line-clamp-3 text-sm text-gray-400">
                {prompt.prompt}
            </p>

            <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-gray-500">
                    {prompt.tool || 'Sin herramienta'}
                </p>

                <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>❤️ {prompt.likes_count}</span>
                    <span>{new Date(prompt.created_at).toLocaleDateString()}</span>
                </div>
            </div>
        </Link>
    )
}