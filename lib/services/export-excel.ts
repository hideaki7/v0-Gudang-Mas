import * as XLSX from 'xlsx'

export function exportReturnsExcel(data: any[]) {
  const worksheet = XLSX.utils.json_to_sheet(
    data.map(item => ({
      ID: item.id,
      Supplier: item.supplier,
      Produk: item.productName,
      Alasan: item.reason,
      Qty: item.quantity,
      Status: item.status,
      Tanggal: item.timestamp,
    }))
  )

  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    'Retur'
  )

  XLSX.writeFile(
    workbook,
    'laporan-retur.xlsx'
  )
}

    export function exportDashboardExcel(
  statsCards: any[],
  suppliers: any[]
) {
  const workbook = XLSX.utils.book_new()

  const statsSheet =
    XLSX.utils.json_to_sheet(
      statsCards.map(item => ({
        Metrik: item.label,
        Nilai: item.value,
      }))
    )

  XLSX.utils.book_append_sheet(
    workbook,
    statsSheet,
    'Ringkasan'
  )

  const supplierSheet =
    XLSX.utils.json_to_sheet(
      suppliers.map(item => ({
        Supplier: item.supplier,
        JumlahRetur: item.returns,
        TingkatRetur: item.returnRate,
        Alasan: item.reason,
      }))
    )

  XLSX.utils.book_append_sheet(
    workbook,
    supplierSheet,
    'Supplier'
  )

  XLSX.writeFile(
    workbook,
    'laporan-gudang.xlsx'
  )
}