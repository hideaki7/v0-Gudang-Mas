import { createClient } from '@/lib/supabase/client'

export async function getAllStock() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('stock')
    .select(`
      *,
      products (
        product_id,
        product_name,
        sku,
        unit,
        unit_price,
        categories (category_name),
        suppliers (supplier_name)
      )
    `)
    .order('last_updated', { ascending: false })

  if (error) throw error
  return data
}

export async function getLowStock() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('stock')
    .select(`
      *,
      products (product_id, product_name, sku, unit)
    `)
    .filter('quantity', 'lt', 'min_quantity')

  if (error) throw error
  return data
}

export async function updateStock(
  productId: number,
  quantity: number
) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('stock')
    .update({
      quantity,
      last_updated: new Date().toISOString()
    })
    .eq('product_id', productId)
    .select()
    .single()

  if (error) throw error
  return data
}