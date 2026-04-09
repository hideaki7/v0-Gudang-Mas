'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2 } from 'lucide-react'

const recentShipments = [
  { id: 'SHP-001', supplier: 'PT Maju Jaya', items: 5, date: '2024-04-05', status: 'Diterima', totalQty: 250 },
  { id: 'SHP-002', supplier: 'CV Industri Indonesia', items: 3, date: '2024-04-04', status: 'Dalam Perjalanan', totalQty: 180 },
  { id: 'SHP-003', supplier: 'Bersama Utama', items: 7, date: '2024-04-03', status: 'Diproses', totalQty: 420 },
  { id: 'SHP-004', supplier: 'Global Supplies Ltd', items: 4, date: '2024-04-02', status: 'Diterima', totalQty: 340 },
  { id: 'SHP-005', supplier: 'Tech Components Asia', items: 6, date: '2024-04-01', status: 'Dalam Perjalanan', totalQty: 510 },
]

const suppliers = [
  'PT Maju Jaya',
  'CV Industri Indonesia',
  'Bersama Utama',
  'Global Supplies Ltd',
  'Tech Components Asia',
]

interface ProductRow {
  id: string
  name: string
  quantity: number
}

// Cukup gunakan satu export di sini
export function IncomingGoodsPage() {
  const [selectedShipment, setSelectedShipment] = useState<string | null>('SHP-001')
  const [formData, setFormData] = useState({
    supplier: suppliers[0],
    date: new Date().toISOString().split('T')[0],
  })
  const [productRows, setProductRows] = useState<ProductRow[]>([
    { id: '1', name: '', quantity: 0 },
  ])
  const [successMessage, setSuccessMessage] = useState('')

  const handleAddProductRow = () => {
    setProductRows([...productRows, { id: Date.now().toString(), name: '', quantity: 0 }])
  }

  const handleRemoveProductRow = (id: string) => {
    if (productRows.length > 1) {
      setProductRows(productRows.filter((row) => row.id !== id))
    }
  }

  const handleProductChange = (id: string, field: string, value: string | number) => {
    setProductRows(productRows.map((row) => (row.id === id ? { ...row, [field]: value } : row)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const hasEmptyFields = productRows.some((row) => !row.name || row.quantity === 0)
    if (!formData.supplier || !formData.date || hasEmptyFields) {
      return
    }
    setSuccessMessage('Data barang masuk berhasil ditambahkan!')
    setTimeout(() => {
      setFormData({ supplier: suppliers[0], date: new Date().toISOString().split('T')[0] })
      setProductRows([{ id: '1', name: '', quantity: 0 }])
      setSuccessMessage('')
    }, 2000)
  }

  const selectedShipmentData = recentShipments.find((s) => s.id === selectedShipment)

  return (
    <div className="p-8 space-y-8 w-full">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Manajemen Barang Masuk</h1>
        <p className="text-muted-foreground">Catat dan lacak setiap kiriman masuk untuk memastikan jumlah serta kualitas barang sesuai pesanan.</p>
      </div>

      {/* Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sisi Kiri: Riwayat Pengiriman */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Riwayat Pengiriman</h2>
          <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg overflow-hidden">
            <div className="overflow-y-auto max-h-[500px]">
              {recentShipments.map((shipment) => (
                <div
                  key={shipment.id}
                  onClick={() => setSelectedShipment(shipment.id)}
                  className={`p-5 border-b border-border cursor-pointer transition-all duration-200 hover:bg-secondary/50 ${selectedShipment === shipment.id ? 'bg-secondary border-l-4 border-l-primary' : ''
                    }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-foreground text-sm">{shipment.id}</p>
                      <p className="text-muted-foreground text-xs">{shipment.supplier}</p>
                    </div>
                    <Badge
                      className={`border-0 rounded-lg text-[10px] px-2 py-0.5 ${shipment.status === 'Diterima'
                          ? 'bg-emerald-500/30 text-emerald-300'
                          : shipment.status === 'Dalam Perjalanan'
                            ? 'bg-blue-500/30 text-blue-300'
                            : 'bg-orange-500/30 text-orange-300'
                        }`}
                    >
                      {shipment.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{shipment.items} item • {shipment.totalQty} total unit</span>
                    <span>{shipment.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail Pengiriman Terpilih */}
          {selectedShipmentData && (
            <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6 space-y-4">
              <h3 className="font-bold text-foreground border-b border-border pb-2 flex items-center gap-2">
                <div className="w-1.5 h-4 bg-primary rounded-full"></div>
                Detail Pengiriman: {selectedShipmentData.id}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <span className="text-muted-foreground block text-xs">Supplier</span>
                  <span className="text-foreground font-medium">{selectedShipmentData.supplier}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground block text-xs">Tanggal Masuk</span>
                  <span className="text-foreground font-medium">{selectedShipmentData.date}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground block text-xs">Jumlah Item</span>
                  <span className="text-foreground font-bold">{selectedShipmentData.items} Produk</span>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground block text-xs">Total Kuantitas</span>
                  <span className="text-foreground font-bold">{selectedShipmentData.totalQty} Unit</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sisi Kanan: Form Input */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground text-accent">Input Barang Baru</h2>
          <form onSubmit={handleSubmit} className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-8 space-y-6">
            {successMessage && (
              <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-xl p-4 text-emerald-300 text-sm font-medium">
                {successMessage}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-foreground mb-2">Supplier</label>
                <select
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                >
                  {suppliers.map((supplier) => (
                    <option key={supplier} value={supplier} className="bg-card text-foreground">
                      {supplier}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-foreground mb-2">Tanggal Masuk</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-foreground">Daftar Produk</label>
              <div className="space-y-3 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
                {productRows.map((row) => (
                  <div key={row.id} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Nama Produk"
                      value={row.name}
                      onChange={(e) => handleProductChange(row.id, 'name', e.target.value)}
                      className="flex-1 bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                    <input
                      type="number"
                      placeholder="Jml"
                      value={row.quantity || ''}
                      onChange={(e) => handleProductChange(row.id, 'quantity', parseInt(e.target.value) || 0)}
                      className="w-24 bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                    {productRows.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveProductRow(row.id)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-xl transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddProductRow}
                className="w-full py-3 px-4 border border-dashed border-border rounded-xl text-muted-foreground hover:text-accent hover:bg-secondary/30 transition-all flex items-center justify-center gap-2 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Tambah Baris Barang
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
            >
              Simpan Ke Inventori
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}