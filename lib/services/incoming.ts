import { supabase } from '../supabase'

export async function getIncomingGoods() {
  const { data, error } = await supabase
    .from('incoming_goods')
    .select(`
      *,
      suppliers (supplier_id, supplier_name),
      incoming_good_details (
        detail_id,
        quantity,
        unit_price,
        subtotal,
        products (product_id, product_name, sku, unit)
      )
    `)
    .order('received_date', { ascending: false })

  if (error) throw error
  return data
}

export async function getIncomingById(id: number) {
  const { data, error } = await supabase
    .from('incoming_goods')
    .select(`
      *,
      suppliers (supplier_id, supplier_name),
      incoming_good_details (
        detail_id,
        quantity,
        unit_price,
        subtotal,
        products (product_id, product_name, sku, unit)
      )
    `)
    .eq('incoming_id', id)
    .single()

  if (error) throw error
  return data
}

export async function createIncomingGoods(
  header: {
    supplier_id: number
    received_date: string
    received_by: string
    notes?: string
  },
  details: {
    product_id: number
    quantity: number
    unit_price: number
  }[]
) {
  // 1. Insert header dulu
  const { data: incoming, error: headerError } = await supabase
    .from('incoming_goods')
    .insert(header)
    .select()
    .single()

  if (headerError) throw headerError

  // 2. Insert semua detail
  const detailRows = details.map(d => ({
    ...d,
    incoming_id: incoming.incoming_id,
  }))

  const { error: detailError } = await supabase
    .from('incoming_good_details')
    .insert(detailRows)

  if (detailError) throw detailError

  // 3. Update stock untuk setiap produk
  for (const d of details) {
    const { data: currentStock } = await supabase
      .from('stock')
      .select('quantity')
      .eq('product_id', d.product_id)
      .single()

    const newQty = (currentStock?.quantity ?? 0) + d.quantity

    await supabase
      .from('stock')
      .update({
        quantity: newQty,
        last_updated: new Date().toISOString()
      })
      .eq('product_id', d.product_id)
  }

  return incoming
}