'use server'

import { supabase } from '@/lib/supabaseClient'
import { revalidatePath } from 'next/cache'

export async function likePrompt(promptId: string) {
    const { data: prompt, error: fetchError } = await supabase
        .from('prompts')
        .select('likes_count')
        .eq('id', promptId)
        .single()

    if (fetchError || !prompt) {
        console.error('Error fetching prompt likes:', fetchError)
        throw new Error('Could not fetch prompt likes')
    }

    const { error: updateError } = await supabase
        .from('prompts')
        .update({ likes_count: prompt.likes_count + 1 })
        .eq('id', promptId)

    if (updateError) {
        console.error('Error updating likes:', updateError)
        throw new Error('Could not update likes')
    }

    revalidatePath('/explore')
    revalidatePath(`/prompt/${promptId}`)
}