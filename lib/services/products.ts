import { supabase } from '../supabase'

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (category_id, category_name),
      suppliers (supplier_id, supplier_name),
      stock (quantity, min_quantity)
    `)
    .order('product_name')

  if (error) throw error
  return data
}

export async function getProductById(id: number) {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (category_id, category_name),
      suppliers (supplier_id, supplier_name),
      stock (quantity, min_quantity)
    `)
    .eq('product_id', id)
    .single()

  if (error) throw error
  return data
}

export async function createProduct(payload: {
  product_name: string
  sku: string
  category_id?: number
  supplier_id?: number
  unit?: string
  unit_price?: number
}) {
  const { data, error } = await supabase
    .from('products')
    .insert(payload)
    .select()
    .single()

  if (error) throw error

  // Otomatis buat stock entry dengan quantity 0
  await supabase
    .from('stock')
    .insert({ product_id: data.product_id, quantity: 0 })

  return data
}

export async function updateProduct(
  id: number,
  payload: {
    product_name?: string
    sku?: string
    category_id?: number
    supplier_id?: number
    unit?: string
    unit_price?: number
  }
) {
  const { data, error } = await supabase
    .from('products')
    .update(payload)
    .eq('product_id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteProduct(id: number) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('product_id', id)

  if (error) throw error
}