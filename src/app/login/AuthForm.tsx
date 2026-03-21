'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AuthForm() {
    const supabase = createClient()
    const router = useRouter()

    const [mode, setMode] = useState<'login' | 'signup'>('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        try {
            if (mode === 'signup') {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                })

                if (error) throw error
                setMessage('Cuenta creada. Ya puedes iniciar sesión.')
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })

                if (error) throw error

                router.push('/explore')
                router.refresh()
            }
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Ha ocurrido un error'
            setMessage(message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="rounded-xl border border-neutral-800 p-5">
            <div className="mb-4 flex gap-2">
                <button
                    type="button"
                    onClick={() => setMode('login')}
                    className={`rounded-md px-3 py-2 text-sm ${mode === 'login'
                            ? 'bg-white text-black'
                            : 'border border-neutral-700 text-white'
                        }`}
                >
                    Login
                </button>

                <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className={`rounded-md px-3 py-2 text-sm ${mode === 'signup'
                            ? 'bg-white text-black'
                            : 'border border-neutral-700 text-white'
                        }`}
                >
                    Sign up
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border border-neutral-700 bg-black px-3 py-2"
                    required
                />

                <input
                    type="password"
                    placeholder="Tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border border-neutral-700 bg-black px-3 py-2"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-md bg-white px-4 py-2 font-medium text-black disabled:opacity-50"
                >
                    {loading
                        ? 'Procesando...'
                        : mode === 'login'
                            ? 'Iniciar sesión'
                            : 'Crear cuenta'}
                </button>
            </form>

            {message ? (
                <p className="mt-4 text-sm text-gray-300">{message}</p>
            ) : null}
        </div>
    )
}