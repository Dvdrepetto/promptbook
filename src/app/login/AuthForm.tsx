'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

function getEmailError(email: string) {
  if (!email) return 'El email es obligatorio.'

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return 'Introduce un email valido.'

  return ''
}

function getPasswordError(password: string, mode: 'login' | 'signup') {
  if (!password) return 'La contraseña es obligatoria.'
  if (mode === 'signup' && password.length < 6) {
    return 'Usa al menos 6 caracteres para crear tu cuenta.'
  }

  return ''
}

export default function AuthForm() {
  const supabase = createClient()
  const router = useRouter()

  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [loading, setLoading] = useState(false)
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  })

  const isLogin = mode === 'login'
  const emailError = getEmailError(email)
  const passwordError = getPasswordError(password, mode)
  const formIsValid = !emailError && !passwordError

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ email: true, password: true })

    if (!formIsValid) {
      setStatus('error')
      setMessage('Revisa los campos marcados antes de continuar.')
      return
    }

    setLoading(true)
    setMessage('')
    setStatus('idle')

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })

        if (error) throw error

        setStatus('success')
        setMessage('Cuenta creada correctamente. Ya puedes iniciar sesión.')
        setMode('login')
        setPassword('')
        setTouched({ email: true, password: false })
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
      const nextMessage =
        error instanceof Error ? error.message : 'Ha ocurrido un error'
      setStatus('error')
      setMessage(nextMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur xl:p-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="pointer-events-none absolute -right-16 top-8 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="mb-8">
        <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1 text-sm text-gray-300">
          <button
            type="button"
            onClick={() => {
              setMode('login')
              setMessage('')
              setStatus('idle')
            }}
            className={`rounded-full px-4 py-2 transition ${
              isLogin
                ? 'bg-white text-black shadow-sm'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Entrar
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('signup')
              setMessage('')
              setStatus('idle')
            }}
            className={`rounded-full px-4 py-2 transition ${
              !isLogin
                ? 'bg-white text-black shadow-sm'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Crear cuenta
          </button>
        </div>
      </div>

      <div className="mb-6 space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          {isLogin ? 'Bienvenido de vuelta' : 'Crea tu cuenta en Promptbook'}
        </h2>
        <p className="max-w-md text-sm leading-6 text-gray-400">
          {isLogin
            ? 'Entra para publicar prompts, guardar tus ideas y seguir construyendo tu biblioteca.'
            : 'Empieza a publicar, organizar y reutilizar prompts desde una sola cuenta.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-200">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onBlur={() => setTouched((current) => ({ ...current, email: true }))}
            onChange={(e) => {
              setEmail(e.target.value)
              if (message) {
                setMessage('')
                setStatus('idle')
              }
            }}
            aria-invalid={touched.email && !!emailError}
            aria-describedby="email-help"
            className={`w-full rounded-2xl border px-4 py-3 text-white outline-none transition placeholder:text-gray-500 ${
              touched.email && emailError
                ? 'border-red-400/40 bg-red-500/10 focus:border-red-300'
                : 'border-white/10 bg-white/5 focus:border-cyan-300/70 focus:bg-white/8'
            }`}
            required
          />
          <p
            id="email-help"
            className={`text-sm ${
              touched.email && emailError ? 'text-red-200' : 'text-gray-500'
            }`}
          >
            {touched.email && emailError
              ? emailError
              : 'Usa el email con el que quieres acceder a Promptbook.'}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-200"
            >
              Contraseña
            </label>
            <span className="text-xs text-gray-500">
              Minimo recomendado: 6 caracteres
            </span>
          </div>
          <input
            id="password"
            type="password"
            placeholder={isLogin ? 'Tu contraseña' : 'Crea una contraseña segura'}
            value={password}
            onBlur={() =>
              setTouched((current) => ({ ...current, password: true }))
            }
            onChange={(e) => {
              setPassword(e.target.value)
              if (message) {
                setMessage('')
                setStatus('idle')
              }
            }}
            aria-invalid={touched.password && !!passwordError}
            aria-describedby="password-help"
            className={`w-full rounded-2xl border px-4 py-3 text-white outline-none transition placeholder:text-gray-500 ${
              touched.password && passwordError
                ? 'border-red-400/40 bg-red-500/10 focus:border-red-300'
                : 'border-white/10 bg-white/5 focus:border-cyan-300/70 focus:bg-white/8'
            }`}
            required
          />
          <div className="flex items-center justify-between gap-4">
            <p
              id="password-help"
              className={`text-sm ${
                touched.password && passwordError
                  ? 'text-red-200'
                  : 'text-gray-500'
              }`}
            >
              {touched.password && passwordError
                ? passwordError
                : isLogin
                  ? 'Introduce tu contraseña para continuar.'
                  : 'Una contraseña mas larga suele ser mas segura.'}
            </p>
            {!isLogin ? (
              <span className="text-xs text-cyan-200/80">
                {password.length}/6 minimo
              </span>
            ) : null}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !formIsValid}
          className="w-full rounded-2xl bg-white px-4 py-3 font-medium text-black transition hover:scale-[0.99] hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? 'Procesando...'
            : isLogin
              ? 'Iniciar sesion'
              : 'Crear cuenta'}
        </button>
      </form>

      {message ? (
        <p
          className={`mt-5 rounded-2xl border px-4 py-3 text-sm leading-6 ${
            status === 'error'
              ? 'border-red-400/20 bg-red-500/10 text-red-100'
              : 'border-emerald-400/20 bg-emerald-500/10 text-emerald-100'
          }`}
        >
          {message}
        </p>
      ) : null}

      <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 text-sm text-gray-400 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          Publica prompts y compártelos rápido.
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          Descubre ideas listas para reutilizar.
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          Gestiona tu colección desde un solo lugar.
        </div>
      </div>
    </div>
  )
}
