'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import {
  getCategoryBySlug,
  getSubcategoryBySlug,
  isValidCategory,
  isValidSubcategory,
} from '@/lib/prompt-categories'
import { validateCleanText } from '@/lib/content-moderation'

const MIN_TITLE_LENGTH = 4
const MAX_TITLE_LENGTH = 120
const MIN_PROMPT_LENGTH = 20
const MAX_PROMPT_LENGTH = 5000
const ALLOWED_TOOLS = new Set([
  'chatgpt',
  'claude',
  'gemini',
  'dalle',
  'midjourney',
  'stable_diffusion',
])

export async function createPrompt(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const title = (formData.get('title') as string)?.trim()
  const prompt = (formData.get('prompt') as string)?.trim()
  const tool = ((formData.get('tool') as string) || null)?.trim() || null
  const category = (formData.get('category') as string)?.trim()
  const subcategory = (formData.get('subcategory') as string)?.trim()

  if (!title || !prompt || !category || !subcategory) {
    throw new Error('Faltan campos obligatorios.')
  }

  if (title.length < MIN_TITLE_LENGTH || title.length > MAX_TITLE_LENGTH) {
    throw new Error(
      `El titulo debe tener entre ${MIN_TITLE_LENGTH} y ${MAX_TITLE_LENGTH} caracteres.`
    )
  }

  if (prompt.length < MIN_PROMPT_LENGTH || prompt.length > MAX_PROMPT_LENGTH) {
    throw new Error(
      `El prompt debe tener entre ${MIN_PROMPT_LENGTH} y ${MAX_PROMPT_LENGTH} caracteres.`
    )
  }

  if (tool && !ALLOWED_TOOLS.has(tool)) {
    throw new Error('La herramienta seleccionada no es valida.')
  }

  validateCleanText(title, 'titulo')
  validateCleanText(prompt, 'prompt')

  if (!isValidCategory(category)) {
    throw new Error('La categoria seleccionada no es valida.')
  }

  if (!isValidSubcategory(category, subcategory)) {
    throw new Error('La subcategoria seleccionada no es valida.')
  }

  const { error } = await supabase.from('prompts').insert({
    title,
    prompt,
    tool,
    category,
    subcategory,
  })

  if (error) {
    throw new Error(error.message)
  }

  const categoryData = getCategoryBySlug(category)
  const subcategoryData = getSubcategoryBySlug(category, subcategory)

  redirect(
    `/explore?category=${categoryData?.slug}&subcategory=${subcategoryData?.slug}`
  )
}
