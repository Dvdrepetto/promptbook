import { supabase } from '@/lib/supabaseClient'
import PromptCard from '@/components/prompts/PromptCard'
import type { Prompt } from '@/types/prompt'

export default async function ExplorePage() {
    const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        return (
            <div>
                <p className="text-red-500">Error loading prompts: {error.message}</p>
            </div>
        )
    }

    const prompts = (data ?? []) as Prompt[]

    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Explore Prompts</h1>
                <p className="mt-2 text-sm text-gray-400">
                    Descubre prompts publicados por la comunidad.
                </p>
            </div>

            {!prompts.length ? (
                <p className="text-gray-400">Aún no hay prompts.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {prompts.map((prompt) => (
                        <PromptCard key={prompt.id} prompt={prompt} />
                    ))}
                </div>
            )}
        </section>
    )
}