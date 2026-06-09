import { createClient } from '@/lib/supabase/client'

export async function getCategories() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('category_name')

  if (error) throw error
  return data
}

export async function getCategoryById(id: number) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('category_id', id)
    .single()

  if (error) throw error
  return data
}

export async function createCategory(payload: {
  category_name: string
  description?: string
}) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('categories')
    .insert(payload)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateCategory(
  id: number,
  payload: {
    category_name?: string
    description?: string
  }
) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('categories')
    .update(payload)
    .eq('category_id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteCategory(id: number) {
  const supabase = createClient()
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('category_id', id)

  if (error) throw error
}