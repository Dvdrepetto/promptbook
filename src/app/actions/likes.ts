'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

function buildFallbackUsername(email?: string | null) {
  return email?.split('@')[0] || 'usuario'
}

export async function toggleLikePrompt(promptId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Debes iniciar sesión para dar like.')
  }

  const username =
    typeof user.user_metadata?.username === 'string' &&
    user.user_metadata.username.trim()
      ? user.user_metadata.username.trim()
      : buildFallbackUsername(user.email)

  const { error: profileError } = await supabase.from('profiles').upsert({
    id: user.id,
    username,
  })

  if (profileError) {
    throw new Error(profileError.message)
  }

  const { data: existingLike, error: existingLikeError } = await supabase
    .from('prompt_likes')
    .select('prompt_id')
    .eq('prompt_id', promptId)
    .eq('user_id', user.id)
    .maybeSingle()

  if (existingLikeError) {
    throw new Error(existingLikeError.message)
  }

  if (existingLike) {
    const { error: deleteError } = await supabase
      .from('prompt_likes')
      .delete()
      .eq('prompt_id', promptId)
      .eq('user_id', user.id)

    if (deleteError) {
      throw new Error(deleteError.message)
    }
  } else {
    const { error: insertError } = await supabase.from('prompt_likes').insert({
      prompt_id: promptId,
      user_id: user.id,
    })

    if (insertError) {
      throw new Error(insertError.message)
    }
  }

  revalidatePath('/explore')
  revalidatePath(`/prompt/${promptId}`)
}
