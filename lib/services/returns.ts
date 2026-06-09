import { createClient } from '@/lib/supabase/client'

export async function getReturns() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('returns')
    .select(`
      *,
      suppliers (supplier_id, supplier_name),
      incoming_goods (incoming_id, received_date),
      return_details (
        return_detail_id,
        quantity_returned,
        notes,
        photo_url,
        products (product_id, product_name, sku)
      )
    `)
    .order('return_date', { ascending: false })

  if (error) throw error
  return data
}

export async function getReturnById(id: number) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('returns')
    .select(`
      *,
      suppliers (supplier_id, supplier_name),
      incoming_goods (incoming_id, received_date),
      return_details (
        return_detail_id,
        quantity_returned,
        notes,
        photo_url,
        products (product_id, product_name, sku)
      )
    `)
    .eq('return_id', id)
    .single()

  if (error) throw error
  return data
}

export async function createReturn(
  header: {
    supplier_id: number
    incoming_id: number
    return_date: string
    reason: string
  },
  details: {
    product_id: number
    quantity_returned: number
    notes?: string
    photo_url?: string | null
  }[]
) {
  const supabase = createClient()
  // 1. Insert header retur
  const { data: ret, error: headerError } = await supabase
    .from('returns')
    .insert({ ...header, status: 'pending' })
    .select()
    .single()

  if (headerError) throw headerError

  // 2. Insert detail retur
  const detailRows = details.map(d => ({
    ...d,
    return_id: ret.return_id,
  }))

  const { error: detailError } = await supabase
    .from('return_details')
    .insert(detailRows)

  if (detailError) throw detailError

  return ret
}

export async function updateReturnStatus(
  id: number,
  status: 'pending' | 'approved' | 'rejected'
) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('returns')
    .update({ status })
    .eq('return_id', id)
    .select()
    .single()

  if (error) throw error

  // Kalau disetujui, kurangi stok otomatis
  if (status === 'approved') {
    const { data: returnData } = await supabase
      .from('return_details')
      .select('product_id, quantity_returned')
      .eq('return_id', id)

    for (const detail of returnData ?? []) {
      const { data: currentStock } = await supabase
        .from('stock')
        .select('quantity')
        .eq('product_id', detail.product_id)
        .single()

      const newQty = Math.max(
        0,
        (currentStock?.quantity ?? 0) - detail.quantity_returned
      )

      await supabase
        .from('stock')
        .update({
          quantity: newQty,
          last_updated: new Date().toISOString()
        })
        .eq('product_id', detail.product_id)
    }
  }

  return data
}

export async function getSupplierReturnStats() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('returns')
    .select(`
  supplier_id,
  status,
  reason,
  suppliers (supplier_name),
  return_details (quantity_returned)
`)

  if (error) throw error

  const stats = data?.reduce(
    (acc: Record<number, any>, ret) => {
      const id = ret.supplier_id

      if (!acc[id]) {
        acc[id] = {
  supplier_id: id,
  supplier_name: (ret.suppliers as any)?.supplier_name,
  total_returns: 0,
  total_qty_returned: 0,
  reasons: [],
}
      }

      acc[id].total_returns += 1
      acc[id].reasons.push(ret.reason)
      acc[id].total_qty_returned +=
        (ret.return_details as any[])?.reduce(
          (sum: number, d: any) => sum + d.quantity_returned,
          0
        ) ?? 0

      return acc
    },
    {}
  )

  return Object.values(stats ?? {})
  .map((supplier:any) => {

    const reasonCount: Record<string, number> = {}

    supplier.reasons.forEach((r:string) => {
      reasonCount[r] =
        (reasonCount[r] || 0) + 1
    })

    const mainReason =
      Object.entries(reasonCount)
        .sort((a,b) => b[1] - a[1])[0]?.[0]
      || '-'

    return {
      ...supplier,
      mainReason,
    }
  })
  .sort(
    (a:any,b:any) =>
      b.total_returns - a.total_returns
  )
}

  export async function getMonthlyReturnStats() {
  const supabase = createClient()
  const { data } = await supabase
    .from('returns')
    .select(`
      return_date,
      status
    `)

  const months = [
    'Jan','Feb','Mar','Apr',
    'Mei','Jun','Jul','Agu',
    'Sep','Okt','Nov','Des'
  ]

  return months.map((month,index) => {
    const monthReturns =
      data?.filter(
        r =>
          new Date(r.return_date).getMonth()
          === index
      ) || []

    return {
      month,
      total: monthReturns.length,

      disetujui:
        monthReturns.filter(
          r => r.status === 'approved'
        ).length,

      ditolak:
        monthReturns.filter(
          r => r.status === 'rejected'
        ).length,
    }
  })
}