'use client'

import { useState } from 'react'
import { Search, Download, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface ReturnItem {
  id: string
  timestamp: string
  supplier: string
  productName: string
  reason: string
  quantity: number
  status: 'Menunggu' | 'Disetujui' | 'Ditolak'
}

const returnHistoryData: ReturnItem[] = [
  {
    id: 'RET001',
    timestamp: '2024-04-05 14:30',
    supplier: 'PT Maju Jaya',
    productName: 'LCD Display 24"',
    reason: 'Barang Rusak',
    quantity: 3,
    status: 'Disetujui',
  },
  {
    id: 'RET002',
    timestamp: '2024-04-04 10:15',
    supplier: 'CV Industri Indonesia',
    productName: 'Tepung Terigu 25kg',
    reason: 'Salah Spesifikasi',
    quantity: 5,
    status: 'Menunggu',
  },
  {
    id: 'RET003',
    timestamp: '2024-04-03 16:45',
    supplier: 'PT Karya Mitra',
    productName: 'Batang Besi 10mm',
    reason: 'Kekurangan Jumlah',
    quantity: 20,
    status: 'Disetujui',
  },
  {
    id: 'RET004',
    timestamp: '2024-04-02 09:20',
    supplier: 'Supplier Berkah',
    productName: 'Minyak Goreng 5L',
    reason: 'Cacat Produksi',
    quantity: 10,
    status: 'Ditolak',
  },
]

// Tambahkan onAddReturn ke dalam props agar bisa dipicu dari dashboard.tsx
export function ReturnHistory({ onAddReturn }: { onAddReturn: () => void }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'Semua' | 'Menunggu' | 'Disetujui' | 'Ditolak'>('Semua')

  const filteredData = returnHistoryData.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'Semua' || item.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusStyles = (status: 'Menunggu' | 'Disetujui' | 'Ditolak') => {
    switch (status) {
      case 'Menunggu':
        return 'bg-yellow-500/30 text-yellow-300 border border-yellow-500/30'
      case 'Disetujui':
        return 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/30'
      case 'Ditolak':
        return 'bg-red-500/30 text-red-300 border border-red-500/30'
    }
  }

  const getStatusIcon = (status: 'Menunggu' | 'Disetujui' | 'Ditolak') => {
    switch (status) {
      case 'Menunggu':
        return '⏳'
      case 'Disetujui':
        return '✓'
      case 'Ditolak':
        return '✕'
    }
  }

  const stats = {
    total: returnHistoryData.length,
    pending: returnHistoryData.filter((item) => item.status === 'Menunggu').length,
    approved: returnHistoryData.filter((item) => item.status === 'Disetujui').length,
    rejected: returnHistoryData.filter((item) => item.status === 'Ditolak').length,
  }

  return (
    <div className="p-8 space-y-8 w-full"> {/* Gunakan w-full untuk mengatasi ruang kosong */}
      {/* Header Halaman */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Riwayat Retur</h1>
          <p className="text-muted-foreground">Pantau status seluruh pengembalian produk Anda.</p>
        </div>

        {/* Bagian Tombol Aksi */}
        <div className="flex items-center gap-3">
          <button
            onClick={onAddReturn}
            className="bg-primary hover:bg-primary/80 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 font-medium shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Ajukan Retur Baru
          </button>

          <button className="bg-secondary/50 hover:bg-secondary text-foreground px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 font-medium border border-border">
            <Download className="w-5 h-5" />
            Ekspor Laporan
          </button>
        </div>
      </div>

      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6">
          <p className="text-muted-foreground text-sm mb-2">Total Retur</p>
          <h3 className="text-3xl font-bold text-foreground">{stats.total}</h3>
        </div>
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6 border-l-4 border-l-yellow-500">
          <p className="text-muted-foreground text-sm mb-2">Menunggu</p>
          <h3 className="text-3xl font-bold text-yellow-300">{stats.pending}</h3>
        </div>
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6 border-l-4 border-l-emerald-500">
          <p className="text-muted-foreground text-sm mb-2">Disetujui</p>
          <h3 className="text-3xl font-bold text-emerald-300">{stats.approved}</h3>
        </div>
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6 border-l-4 border-l-red-500">
          <p className="text-muted-foreground text-sm mb-2">Ditolak</p>
          <h3 className="text-3xl font-bold text-red-300">{stats.rejected}</h3>
        </div>
      </div>

      {/* Filter Pencarian */}
      <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-2">Cari Retur</label>
            <div className="flex items-center gap-3 bg-secondary/50 backdrop-blur-md border border-border rounded-xl px-4 py-3">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari berdasarkan ID, supplier, atau produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none"
              />
            </div>
          </div>

          <div className="w-full lg:w-64">
            <label className="block text-sm font-medium text-foreground mb-2">Filter Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="w-full bg-secondary/50 backdrop-blur-md border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-accent transition-colors"
            >
              <option value="Semua">Semua Status</option>
              <option value="Menunggu">Menunggu</option>
              <option value="Disetujui">Disetujui</option>
              <option value="Ditolak">Ditolak</option>
            </select>
          </div>
        </div>
      </div>

      {/* Daftar Item Retur */}
      <div className="space-y-4">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6 hover:shadow-xl hover:border-accent/50 transition-all duration-200 hover:backdrop-blur-2xl"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-foreground">{item.productName}</h3>
                        <Badge className="bg-secondary/70 text-muted-foreground border-0 rounded-lg">
                          {item.id}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.supplier}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Alasan Retur</p>
                      <p className="text-sm font-medium text-foreground">{item.reason}</p>
                    </div>
                    <div className="hidden sm:block w-px h-8 bg-border"></div>
                    <div>
                      <p className="text-xs text-muted-foreground">Kuantitas</p>
                      <p className="text-sm font-medium text-foreground">{item.quantity} Unit</p>
                    </div>
                    <div className="hidden sm:block w-px h-8 bg-border"></div>
                    <div>
                      <p className="text-xs text-muted-foreground">Diajukan pada</p>
                      <p className="text-sm font-medium text-foreground">{item.timestamp}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end lg:justify-start">
                  <Badge className={`${getStatusStyles(item.status)} rounded-lg px-4 py-2 text-sm font-semibold flex items-center gap-2 min-w-fit`}>
                    <span>{getStatusIcon(item.status)}</span>
                    <span>{item.status}</span>
                  </Badge>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-12 text-center">
            <p className="text-muted-foreground mb-2">Tidak ada data retur</p>
            <p className="text-sm text-muted-foreground">Coba sesuaikan pencarian atau filter Anda.</p>
          </div>
        )}
      </div>

      <div className="text-sm text-muted-foreground text-center">
        Menampilkan {filteredData.length} dari {returnHistoryData.length} retur
      </div>
    </div>
  )
}