import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ensureProfile } from '@/lib/ensure-profile'

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
    await ensureProfile(supabase, user)
  }

  return NextResponse.redirect(new URL(next, origin))
}
