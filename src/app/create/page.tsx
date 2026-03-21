import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createPrompt } from '../actions/prompts'

export default async function CreatePage() {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <form action={createPrompt} className="max-w-xl space-y-4">
            <h1 className="text-2xl font-bold">Crear Prompt</h1>

            <input
                name="title"
                placeholder="Título"
                className="w-full rounded border p-2"
                required
            />

            <textarea
                name="prompt"
                placeholder="Escribe tu prompt..."
                className="h-40 w-full rounded border p-2"
                required
            />

            <select name="tool" className="w-full rounded border p-2">
                <option value="">Selecciona herramienta</option>
                <option value="dalle">DALL·E</option>
                <option value="midjourney">Midjourney</option>
                <option value="stable_diffusion">Stable Diffusion</option>
            </select>

            <button className="rounded bg-white px-4 py-2 text-black">
                Publicar
            </button>
        </form>
    )
}