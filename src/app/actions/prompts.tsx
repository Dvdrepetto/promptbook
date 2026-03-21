'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createPrompt(formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

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
        throw new Error(error.message)
    }

    redirect('/explore')
}