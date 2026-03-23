'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { containsBlockedWords } from '@/lib/content-moderation'

function getEmailError(email: string) {
  if (!email) return 'El email es obligatorio.'

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return 'Introduce un email valido.'

  return ''
}

function getUsernameError(username: string, mode: 'login' | 'signup') {
  if (mode === 'login') return ''
  if (!username.trim()) return 'El nombre de usuario es obligatorio.'
  if (username.trim().length < 3) {
    return 'Usa al menos 3 caracteres para tu nombre de usuario.'
  }
  if (containsBlockedWords(username)) {
    return 'El nombre de usuario incluye lenguaje no permitido.'
  }

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
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [loading, setLoading] = useState(false)
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
  })

  const isLogin = mode === 'login'
  const usernameError = getUsernameError(username, mode)
  const emailError = getEmailError(email)
  const passwordError = getPasswordError(password, mode)
  const formIsValid = !usernameError && !emailError && !passwordError

  const handleOAuthSignIn = async (provider: 'github') => {
    setLoading(true)
    setMessage('')
    setStatus('idle')

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/explore`,
        },
      })

      if (error) throw error
    } catch (error) {
      const nextMessage =
        error instanceof Error ? error.message : 'No se pudo iniciar con OAuth.'
      setStatus('error')
      setMessage(nextMessage)
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ username: true, email: true, password: true })

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
          options: {
            data: {
              username: username.trim(),
            },
          },
        })

        if (error) throw error

        setStatus('success')
        setMessage('Cuenta creada correctamente. Ya puedes iniciar sesión.')
        setMode('login')
        setUsername('')
        setPassword('')
        setTouched({ username: false, email: true, password: false })
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
    <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-neutral-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur xl:p-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
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
              isLogin ? 'bg-white text-black shadow-sm' : 'text-gray-300 hover:text-white'
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
              !isLogin ? 'bg-white text-black shadow-sm' : 'text-gray-300 hover:text-white'
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

      <div className="space-y-3">
        <button
          type="button"
          onClick={() => void handleOAuthSignIn('github')}
          disabled={loading}
          className="flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Continuar con GitHub
        </button>
      </div>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs uppercase tracking-[0.25em] text-gray-500">
          o
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLogin ? (
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-gray-200">
              Nombre de usuario
            </label>
            <input
              id="username"
              type="text"
              placeholder="Ej: davidprompt"
              value={username}
              onBlur={() =>
                setTouched((current) => ({ ...current, username: true }))
              }
              onChange={(e) => {
                setUsername(e.target.value)
                if (message) {
                  setMessage('')
                  setStatus('idle')
                }
              }}
              aria-invalid={touched.username && !!usernameError}
              aria-describedby="username-help"
              className={`w-full rounded-2xl border px-4 py-3 text-white outline-none transition placeholder:text-gray-500 ${
                touched.username && usernameError
                  ? 'border-red-400/40 bg-red-500/10 focus:border-red-300'
                  : 'border-white/10 bg-white/5 focus:border-cyan-300/70 focus:bg-white/8'
              }`}
              required={!isLogin}
            />
            <p
              id="username-help"
              className={`text-sm ${
                touched.username && usernameError ? 'text-red-200' : 'text-gray-500'
              }`}
            >
              {touched.username && usernameError
                ? usernameError
                : 'Este nombre se mostrara en tu sesion y mas adelante en tu perfil.'}
            </p>
          </div>
        ) : null}

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
            <label htmlFor="password" className="text-sm font-medium text-gray-200">
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
                touched.password && passwordError ? 'text-red-200' : 'text-gray-500'
              }`}
            >
              {touched.password && passwordError
                ? passwordError
                : isLogin
                  ? 'Introduce tu contraseña para continuar.'
                  : 'Una contraseña mas larga suele ser mas segura.'}
            </p>
            {!isLogin ? (
              <span className="text-xs text-cyan-200/80">{password.length}/6 minimo</span>
            ) : null}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !formIsValid}
          className="w-full rounded-2xl bg-white px-4 py-3 font-medium text-black transition hover:scale-[0.99] hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Procesando...' : isLogin ? 'Iniciar sesion' : 'Crear cuenta'}
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

      <p className="mt-5 text-xs leading-6 text-gray-500">
        Al continuar, aceptas que la autenticacion se gestiona con Supabase y,
        si eliges GitHub, tambien con ese proveedor. No almacenamos
        contraseñas en texto plano en Promptbook. Lee nuestra{' '}
        <Link href="/privacy" className="text-cyan-200 transition hover:text-white">
          politica de privacidad
        </Link>
        .
      </p>

      <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 text-sm text-gray-400 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/3 p-3">
          Publica prompts y compártelos rápido.
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/3 p-3">
          Descubre ideas listas para reutilizar.
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/3 p-3">
          Gestiona tu colección desde un solo lugar.
        </div>
      </div>
    </div>
  )
}
