import type { User } from '@supabase/supabase-js'

function buildFallbackUsername(email?: string | null) {
  return email?.split('@')[0] || 'usuario'
}

export function getUserDisplayName(user: User) {
  const candidates = [
    user.user_metadata?.username,
    user.user_metadata?.preferred_username,
    user.user_metadata?.user_name,
    user.user_metadata?.full_name,
    user.user_metadata?.name,
    buildFallbackUsername(user.email),
  ]

  const found = candidates.find(
    (value): value is string => typeof value === 'string' && value.trim().length > 0
  )

  return found?.trim() || 'usuario'
}

export async function ensureProfile(
  supabase: {
    from: (table: 'profiles') => {
      upsert: (values: { id: string; username: string }) => {
        select: () => Promise<{ error: { message: string } | null }>
      }
    }
  },
  user: User
) {
  const username = getUserDisplayName(user)
  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      username,
    })
    .select()

  if (error) {
    throw new Error(error.message)
  }
}
