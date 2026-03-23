import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

function buildUsername(user: {
  email?: string | null
  user_metadata?: {
    username?: unknown
    preferred_username?: unknown
    user_name?: unknown
    full_name?: unknown
    name?: unknown
  }
}) {
  const candidates = [
    user.user_metadata?.username,
    user.user_metadata?.preferred_username,
    user.user_metadata?.user_name,
    user.user_metadata?.full_name,
    user.user_metadata?.name,
    user.email?.split('@')[0],
  ]

  const found = candidates.find(
    (value): value is string => typeof value === 'string' && value.trim().length > 0
  )

  return found?.trim() || 'usuario'
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/explore'

  if (!code) {
    return NextResponse.redirect(new URL('/login', origin))
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return NextResponse.redirect(new URL('/login', origin))
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const username = buildUsername(user)
    await supabase.from('profiles').upsert({
      id: user.id,
      username,
    })
  }

  return NextResponse.redirect(new URL(next, origin))
}
