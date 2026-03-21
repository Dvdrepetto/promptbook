'use server'

import { supabase } from '@/lib/supabaseClient'

export async function createPrompt(formData: FormData) {
    const title = formData.get('title') as string
    const prompt = formData.get('prompt') as string
    const tool = formData.get('tool') as string

    if (!title || !prompt) {
        throw new Error('Missing fields')
    }

    const { error } = await supabase.from('prompts').insert({
        title,
        prompt,
        tool,
    })

    if (error) {
        console.error(error)
        throw new Error('Error inserting prompt')
    }
}