import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from '@/components/auth/LogoutButton'

export default async function Navbar() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="group inline-flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold text-cyan-200 transition group-hover:border-cyan-300/40 group-hover:bg-cyan-400/10">
              PB
            </span>
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-white">
                PROMPTBOOK
              </p>
              <p className="text-xs text-gray-500">
                Biblioteca visual de prompts
              </p>
            </div>
          </Link>

          {!user ? (
            <Link
              href="/login"
              className="rounded-full border border-white/10 bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-cyan-100 lg:hidden"
            >
              Entrar
            </Link>
          ) : null}
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1 text-sm text-gray-300">
            <Link
              href="/explore"
              className="rounded-full px-4 py-2 transition hover:bg-white/8 hover:text-white"
            >
              Explorar
            </Link>

            <Link
              href="/create"
              className="rounded-full px-4 py-2 transition hover:bg-white/8 hover:text-white"
            >
              Crear
            </Link>
          </div>

          {user ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300">
                <span className="mr-2 text-xs uppercase tracking-[0.2em] text-gray-500">
                  Sesion
                </span>
                <span className="break-all text-white">{user.email}</span>
              </div>
              <LogoutButton />
            </div>
          ) : (
            <div className="hidden lg:block">
              <Link
                href="/login"
                className="rounded-full border border-white/10 bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-cyan-100"
              >
                Entrar o crear cuenta
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
