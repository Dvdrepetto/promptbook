'use client'

import { useTransition } from 'react'
import { likePrompt } from '@/app/actions/likes'

type LikeButtonProps = {
    promptId: string
    likesCount: number
}

export default function LikeButton({
    promptId,
    likesCount,
}: LikeButtonProps) {
    const [isPending, startTransition] = useTransition()

    return (
        <button
            onClick={() =>
                startTransition(async () => {
                    await likePrompt(promptId)
                })
            }
            disabled={isPending}
            className="rounded-md border border-neutral-700 px-3 py-2 text-sm text-white transition hover:bg-neutral-900 disabled:opacity-50"
        >
            {isPending ? 'Liking...' : `❤️ ${likesCount}`}
        </button>
    )
}