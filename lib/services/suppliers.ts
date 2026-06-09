import { createClient } from '@/lib/supabase/client'

export async function getSuppliers() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('suppliers')
    .select(`
      *,
      categories (
        category_id,
        category_name
      ),
      incoming_goods (incoming_id),
      returns (return_id)
    `)
    .order('supplier_name')

  if (error) throw error
  return data
}

export async function getSupplierById(id: number) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('suppliers')
    .select(`
      *,
      categories (
        category_id,
        category_name
      )
    `)
    .eq('supplier_id', id)
    .single()

  if (error) throw error
  return data
}

export async function createSupplier(payload: {
  supplier_name: string
  contact_name?: string
  phone?: string
  email?: string
  address?: string
  category_id?: number
}) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('suppliers')
    .insert(payload)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateSupplier(
  id: number,
  payload: {
    supplier_name?: string
    contact_name?: string
    phone?: string
    email?: string
    address?: string
    category_id?: number
  }
) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('suppliers')
    .update(payload)
    .eq('supplier_id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteSupplier(id: number) {
  const supabase = createClient()
  const { error } = await supabase
    .from('suppliers')
    .delete()
    .eq('supplier_id', id)

  if (error) throw error
}