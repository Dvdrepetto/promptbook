import { createPrompt } from '../actions/prompts'

export default function CreatePage() {
    return (
        <form action={createPrompt} className="max-w-xl mx-auto p-4 space-y-4">
            <h1 className="text-2xl font-bold">Crear Prompt</h1>

            <input
                name="title"
                placeholder="Título"
                className="w-full border p-2 rounded"
                required
            />

            <textarea
                name="prompt"
                placeholder="Escribe tu prompt..."
                className="w-full border p-2 rounded h-40"
                required
            />

            <select name="tool" className="w-full border p-2 rounded">
                <option value="">Selecciona herramienta</option>
                <option value="dalle">DALL·E</option>
                <option value="midjourney">Midjourney</option>
                <option value="stable_diffusion">Stable Diffusion</option>
            </select>

            <button className="bg-black text-white px-4 py-2 rounded">
                Publicar
            </button>
        </form>
    )
}