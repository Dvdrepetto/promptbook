'use client'

import { useState, useTransition } from 'react'
import { deletePrompt } from '@/app/actions/prompts'

type DeletePromptButtonProps = {
  promptId: string
}

export default function DeletePromptButton({
  promptId,
}: DeletePromptButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => {
          const confirmed = window.confirm(
            'Esta seguro que quiere eliminar este prompt? Esta accion no se puede deshacer.'
          )

          if (!confirmed) return

          startTransition(async () => {
            setError('')

            try {
              await deletePrompt(promptId)
            } catch (nextError) {
              setError(
                nextError instanceof Error
                  ? nextError.message
                  : 'No se pudo eliminar el prompt.'
              )
            }
          })
        }}
        disabled={isPending}
        className="rounded-md border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-100 transition hover:bg-red-500/15 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? 'Eliminando...' : 'Eliminar prompt'}
      </button>

      {error ? <p className="text-xs text-red-300">{error}</p> : null}
    </div>
  )
}
