'use client'

import { useState } from 'react'

type CopyButtonProps = {
    text: string
}

export default function CopyButton({ text }: CopyButtonProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)

            setTimeout(() => {
                setCopied(false)
            }, 1500)
        } catch (error) {
            console.error('Copy failed:', error)
        }
    }

    return (
        <button
            onClick={handleCopy}
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black transition hover:opacity-90"
        >
            {copied ? 'Copiado' : 'Copiar prompt'}
        </button>
    )
}