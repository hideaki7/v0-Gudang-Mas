import { supabase } from '../supabase'

export async function getDashboardStats() {
  const { data: stock } = await supabase
    .from('stock')
    .select('quantity')

  const { count: incomingCount } = await supabase
  .from('incoming_goods')
  .select('*', { count: 'exact', head: true })

const { count: returnCount } = await supabase
  .from('returns')
  .select('*', { count: 'exact', head: true })

const { data: incomingDetails } = await supabase
  .from('incoming_good_details')
  .select('quantity')

const { data: returnDetails } = await supabase
  .from('return_details')
  .select('quantity_returned')

const totalIncomingQty =
  incomingDetails?.reduce(
    (sum, item) => sum + item.quantity,
    0
  ) || 0

const totalReturnQty =
  returnDetails?.reduce(
    (sum, item) => sum + item.quantity_returned,
    0
  ) || 0

const qualityScore =
  totalIncomingQty > 0
    ? (
        (1 - totalReturnQty / totalIncomingQty) *
        100
      ).toFixed(1)
    : '100'

  const totalStock =
    stock?.reduce((sum, item) => sum + item.quantity, 0) || 0

  return {
  totalStock,
  incomingCount: incomingCount || 0,
  returnCount: returnCount || 0,
  qualityScore,
}
}

export async function getRecentActivities() {
  const { data: incoming } = await supabase
    .from('incoming_goods')
    .select('*')
    .order('received_date', { ascending: false })
    .limit(5)

  const { data: returns } = await supabase
  .from('returns')
  .select('*')
  .order('return_date', { ascending: false })
  .limit(5)

  const activities = [
    ...(incoming || []).map(item => ({
      id: `IN-${item.incoming_id}`,
      type: 'Penerimaan',
      date: item.received_date,
      status: 'Selesai',
    })),
    ...(returns || []).map(item => ({
    id: `RET-${item.return_id}`,
    type: 'Retur',
    date: item.return_date,
    status: item.status,
    })),
  ]

  return activities
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )
    .slice(0, 5)
}

    export async function getTopSuppliers() {
  const { data: suppliers } = await supabase
    .from('suppliers')
    .select(`
      supplier_id,
      supplier_name
    `)

  const { data: incoming } = await supabase
    .from('incoming_goods')
    .select(`
      supplier_id
    `)

  const { data: returns } = await supabase
    .from('returns')
    .select(`
      supplier_id
    `)

  return (suppliers || []).map((supplier) => {
    const shipmentCount =
      incoming?.filter(
        (i) => i.supplier_id === supplier.supplier_id
      ).length || 0

    const returnCount =
      returns?.filter(
        (r) => r.supplier_id === supplier.supplier_id
      ).length || 0

    const returnRate =
      shipmentCount > 0
        ? Number(
            ((returnCount / shipmentCount) * 100).toFixed(1)
          )
        : 0

    return {
      name: supplier.supplier_name,
      shipments: shipmentCount,
      returns: returnCount,
      returnRate,
    }
  })
}

    export async function getStockDistribution() {
  const { data } = await supabase
    .from('stock')
    .select(`
      quantity,
      min_quantity
    `)

  let tersedia = 0
  let rendah = 0
  let habis = 0

  data?.forEach((item) => {
    if (item.quantity === 0) {
      habis++
    } else if (item.quantity <= item.min_quantity) {
      rendah++
    } else {
      tersedia++
    }
  })

  const total = tersedia + rendah + habis

  return [
    {
      name: 'Tersedia',
      value: total ? Math.round((tersedia / total) * 100) : 0,
      color: '#34d399',
    },
    {
      name: 'Rendah',
      value: total ? Math.round((rendah / total) * 100) : 0,
      color: '#f97316',
    },
    {
      name: 'Habis',
      value: total ? Math.round((habis / total) * 100) : 0,
      color: '#f87171',
    },
  ]
}
    export async function getTrendData() {
  const { data: incoming } = await supabase
    .from('incoming_goods')
    .select('received_date')

  const { data: returns } = await supabase
    .from('returns')
    .select('return_date')

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', ]

  return months.map((month, index) => {
    const incomingCount =
      incoming?.filter(item =>
        new Date(item.received_date).getMonth() === index
      ).length || 0

    const returnCount =
      returns?.filter(item =>
        new Date(item.return_date).getMonth() === index
      ).length || 0

    return {
      bulan: month,
      barangMasuk: incomingCount,
      retur: returnCount,
    }
  })
}
    export async function getActiveSuppliersCount() {
  const { data } = await supabase
    .from('incoming_goods')
    .select('supplier_id')

  const uniqueSuppliers = [
    ...new Set(
      data?.map(item => item.supplier_id) || []
    )
  ]

  return uniqueSuppliers.length
}