'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import {
  getCategoryBySlug,
  getSubcategoryBySlug,
  isValidCategory,
  isValidSubcategory,
} from '@/lib/prompt-categories'

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
