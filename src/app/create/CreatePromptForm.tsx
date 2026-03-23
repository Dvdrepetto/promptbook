'use client'

import { useMemo, useState } from 'react'
import { PROMPT_CATEGORIES } from '@/lib/prompt-categories'
import { createPrompt } from '../actions/prompts'

const TOOLS = [
  { value: '', label: 'Selecciona herramienta' },
  { value: 'chatgpt', label: 'ChatGPT' },
  { value: 'claude', label: 'Claude' },
  { value: 'gemini', label: 'Gemini' },
  { value: 'dalle', label: 'DALL·E' },
  { value: 'midjourney', label: 'Midjourney' },
  { value: 'stable_diffusion', label: 'Stable Diffusion' },
]
const MIN_TITLE_LENGTH = 4
const MAX_TITLE_LENGTH = 120
const MIN_PROMPT_LENGTH = 20
const MAX_PROMPT_LENGTH = 5000

export default function CreatePromptForm() {
  const [category, setCategory] = useState<string>(
    PROMPT_CATEGORIES[0]?.slug ?? ''
  )
  const [subcategory, setSubcategory] = useState<string>(
    PROMPT_CATEGORIES[0]?.subcategories[0]?.slug ?? ''
  )

  const selectedCategory = useMemo(
    () => PROMPT_CATEGORIES.find((item) => item.slug === category),
    [category]
  )

  const availableSubcategories = selectedCategory?.subcategories ?? []

  return (
    <form action={createPrompt} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-200">
            Titulo
          </label>
          <input
            id="title"
            name="title"
            placeholder="Ej: Prompt para explicar un concepto dificil"
            className="w-full rounded-2xl border border-white/10 bg-white/3 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-300/60"
            minLength={MIN_TITLE_LENGTH}
            maxLength={MAX_TITLE_LENGTH}
            required
          />
          <p className="text-sm text-gray-500">
            Entre {MIN_TITLE_LENGTH} y {MAX_TITLE_LENGTH} caracteres.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="tool" className="text-sm font-medium text-gray-200">
            Herramienta IA
          </label>
          <select
            id="tool"
            name="tool"
            defaultValue=""
            className="w-full rounded-2xl border border-white/10 bg-white/3 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60"
          >
            {TOOLS.map((tool) => (
              <option key={tool.value} value={tool.value} className="bg-black">
                {tool.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="category"
            className="text-sm font-medium text-gray-200"
          >
            Categoria
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => {
              const nextCategory = e.target.value
              const nextSubcategory =
                PROMPT_CATEGORIES.find((item) => item.slug === nextCategory)
                  ?.subcategories[0]?.slug ?? ''

              setCategory(nextCategory)
              setSubcategory(nextSubcategory)
            }}
            className="w-full rounded-2xl border border-white/10 bg-white/3 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60"
            required
          >
            {PROMPT_CATEGORIES.map((item) => (
              <option key={item.slug} value={item.slug} className="bg-black">
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="subcategory"
            className="text-sm font-medium text-gray-200"
          >
            Subcategoria
          </label>
          <select
            id="subcategory"
            name="subcategory"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/3 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60"
            required
          >
            {availableSubcategories.map((item) => (
              <option key={item.slug} value={item.slug} className="bg-black">
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/3 p-4 text-sm leading-7 text-gray-400">
        {selectedCategory ? selectedCategory.description : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="prompt" className="text-sm font-medium text-gray-200">
          Prompt
        </label>
        <textarea
          id="prompt"
          name="prompt"
          placeholder="Escribe tu prompt con el mayor contexto posible..."
          className="h-56 w-full rounded-[1.75rem] border border-white/10 bg-white/3 px-4 py-4 text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-300/60"
          minLength={MIN_PROMPT_LENGTH}
          maxLength={MAX_PROMPT_LENGTH}
          required
        />
        <p className="text-sm text-gray-500">
          Entre {MIN_PROMPT_LENGTH} y {MAX_PROMPT_LENGTH} caracteres.
        </p>
      </div>

      <button className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-cyan-100">
        Publicar prompt
      </button>
    </form>
  )
}
