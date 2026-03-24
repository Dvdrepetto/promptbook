export type Prompt = {
  id: string
  title: string
  prompt: string
  tool: string | null
  user_id: string | null
  category: string | null
  subcategory: string | null
  created_at: string
  likes_count: number
}
