import { supabase } from '../supabase'

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('category_name')

  if (error) throw error
  return data
}

export async function getCategoryById(id: number) {
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
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('category_id', id)

  if (error) throw error
}