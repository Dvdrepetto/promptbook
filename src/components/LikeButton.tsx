'use client'

import { useState, useTransition } from 'react'
import { toggleLikePrompt } from '@/app/actions/likes'

type LikeButtonProps = {
  promptId: string
  likesCount: number
  likedByUser: boolean
  canLike: boolean
}

export default function LikeButton({
  promptId,
  likesCount,
  likedByUser,
  canLike,
}: LikeButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  return (
    <div className="space-y-2">
      <button
        onClick={() =>
          startTransition(async () => {
            setError('')

            try {
              await toggleLikePrompt(promptId)
            } catch (nextError) {
              setError(
                nextError instanceof Error
                  ? nextError.message
                  : 'No se pudo actualizar el like.'
              )
            }
          })
        }
        disabled={isPending || !canLike}
        className={`rounded-md border px-3 py-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${
          likedByUser
            ? 'border-cyan-300/30 bg-cyan-400/10 text-cyan-100 hover:bg-cyan-400/15'
            : 'border-neutral-700 text-white hover:bg-neutral-900'
        }`}
      >
        {isPending
          ? 'Actualizando...'
          : likedByUser
            ? `💙 ${likesCount}`
            : `❤️ ${likesCount}`}
      </button>

      {!canLike ? (
        <p className="max-w-[12rem] text-xs leading-5 text-gray-500">
          Inicia sesión para dar like.
        </p>
      ) : null}

      {error ? (
        <p className="max-w-[14rem] text-xs leading-5 text-red-300">{error}</p>
      ) : null}
    </div>
  )
}
