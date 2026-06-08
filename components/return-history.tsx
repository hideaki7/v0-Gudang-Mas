'use client'

import { useState, useEffect } from 'react'
import { Search, Download, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  getReturns,
  updateReturnStatus
} from '@/lib/services/returns'
import { createClient } from '@/lib/supabase/client'

interface ReturnItem {
  returnId: number
  id: string
  timestamp: string
  supplier: string
  productName: string
  reason: string
  quantity: number
  status: 'Menunggu' | 'Disetujui' | 'Ditolak'
}

const supabase = createClient()

// Tambahkan onAddReturn ke dalam props agar bisa dipicu dari dashboard.tsx
export function ReturnHistory({ onAddReturn }: { onAddReturn: () => void }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'Semua' | 'Menunggu' | 'Disetujui' | 'Ditolak'>('Semua')
  const [returnHistoryData, setReturnHistoryData] = useState<any[]>([])
  const [userEmail, setUserEmail] = useState('')

      useEffect(() => {
    loadUser()
    loadReturns()
  }, [])

    async function loadUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  setUserEmail(user?.email || '')
}

    async function loadReturns() {
      try {
        const data = await getReturns()

        const formatted = data.map((ret: any) => ({
          returnId: ret.return_id,
          id: `RET${String(ret.return_id).padStart(3, '0')}`,
          timestamp: ret.return_date,
          supplier: ret.suppliers?.supplier_name ?? '-',
          productName:
            ret.return_details?.[0]?.products?.product_name ?? '-',
          reason: ret.reason,
          quantity:
            ret.return_details?.reduce(
              (sum: number, d: any) => sum + d.quantity_returned,
              0
            ) ?? 0,
          status:
            ret.status === 'approved'
              ? 'Disetujui'
              : ret.status === 'rejected'
              ? 'Ditolak'
              : 'Menunggu',
        }))

        setReturnHistoryData(formatted)
      } catch (error) {
        console.error(error)
      }
    }

    async function handleApprove(id: number) {
  try {
    await updateReturnStatus(id, 'approved')
    await loadReturns()
  } catch (error) {
    console.error(error)
  }
}

async function handleReject(id: number) {
  try {
    await updateReturnStatus(id, 'rejected')
    await loadReturns()
  } catch (error) {
    console.error(error)
  }
}

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

  const canApprove =
  userEmail === 'supplier@gudangmas.com'

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 w-full">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Riwayat Retur</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Kelola pengajuan retur serta status persetujuannya secara transparan.</p>
        </div>

        {/* Bagian Tombol Aksi */}
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={onAddReturn}
            className="bg-primary hover:bg-primary/80 text-white px-4 sm:px-6 py-3 h-10 sm:h-auto rounded-xl flex items-center gap-2 transition-all duration-200 font-medium shadow-lg w-full sm:w-auto"
          >
            <Plus className="w-5 h-5" />
            Ajukan Retur Baru
          </button>

          <button
            onClick={async () => {
              const { exportReturnsExcel } =
                await import(
                  '@/lib/services/export-excel'
                )

              exportReturnsExcel(filteredData)
            }}
            className="bg-secondary/50 hover:bg-secondary text-foreground px-4 sm:px-6 py-3 h-10 sm:h-auto rounded-xl flex items-center gap-2 transition-all duration-200 font-medium border border-border w-full sm:w-auto"
          >
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
      <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <label
              htmlFor="search-retur"
              className="block text-xs sm:text-sm font-medium text-foreground mb-2"
            >
              Cari Retur
            </label>
            <div
              className="group flex items-center gap-2 sm:gap-3 bg-secondary/50 backdrop-blur-md border border-border rounded-xl px-3 sm:px-4 py-2 sm:py-3 transition-all duration-300 hover:border-white/50 focus-within:border-white/70"
              style={{ boxShadow: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.12), 0 0 18px 2px rgba(255,255,255,0.08)')}
              onMouseLeave={e => { if (!e.currentTarget.matches(':focus-within')) e.currentTarget.style.boxShadow = 'none' }}
              onFocusCapture={e => (e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.18), 0 0 22px 4px rgba(255,255,255,0.12)')}
              onBlurCapture={e => { if (!e.currentTarget.matches(':focus-within')) e.currentTarget.style.boxShadow = 'none' }}
            >
              <Search className="w-5 h-5 text-muted-foreground group-hover:text-white group-focus-within:text-white transition-colors duration-300" />
              <input
                id="search-retur"
                name="search-retur"
                type="text"
                placeholder="Cari disini..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent text-sm sm:text-base text-foreground placeholder-muted-foreground outline-none"
              />
            </div>

          </div>

          <div className="w-full sm:w-64">
            <label
  htmlFor="status-filter"
                  className="block text-xs sm:text-sm font-medium text-foreground mb-2"
                >
                  Filter Status
                </label>

                <select
                  id="status-filter"
                  name="status-filter"
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value as typeof statusFilter
                    )
                  }
              className="w-full bg-secondary/50 backdrop-blur-md border border-border rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-foreground outline-none focus:border-accent transition-colors"
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

                <div className="flex items-center gap-2 justify-end lg:justify-start">
            <Badge
              className={`${getStatusStyles(item.status)} rounded-lg px-4 py-2 text-sm font-semibold flex items-center gap-2 min-w-fit`}
            >
              <span>{getStatusIcon(item.status)}</span>
              <span>{item.status}</span>
            </Badge>

            {item.status === 'Menunggu' && canApprove && (
              <>
                <button
                  onClick={() => handleApprove(item.returnId)}
                  className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(item.returnId)}
                  className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm"
                >
                  Reject
                </button>
              </>
            )}
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
