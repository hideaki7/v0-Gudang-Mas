'use client'

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Download } from 'lucide-react'

// Data Performa Supplier
const supplierPerformanceData = [
  { name: 'PT Maju Jaya', retur: 12, tepatWaktu: 95, kualitas: 88 },
  { name: 'CV Industri Indonesia', retur: 8, tepatWaktu: 98, kualitas: 92 },
  { name: 'Bersama Utama', retur: 15, tepatWaktu: 92, kualitas: 85 },
  { name: 'Global Supplies Ltd', retur: 5, tepatWaktu: 99, kualitas: 95 },
  { name: 'Tech Components Asia', retur: 18, tepatWaktu: 88, kualitas: 82 },
]

// Data Tren Retur Bulanan
const monthlyReturnTrendData = [
  { month: 'Jan', total: 34, disetujui: 28, ditolak: 6 },
  { month: 'Feb', total: 28, disetujui: 24, ditolak: 4 },
  { month: 'Mar', total: 42, disetujui: 35, ditolak: 7 },
  { month: 'Apr', total: 38, disetujui: 31, ditolak: 7 },
  { month: 'Mei', total: 45, disetujui: 38, ditolak: 7 },
  { month: 'Jun', total: 52, disetujui: 43, ditolak: 9 },
]

// Daftar Supplier dengan Retur Terbanyak
const topReturnSuppliers = [
  { supplier: 'Tech Components Asia', returns: 18, returnRate: '8.2%', reason: 'Barang Rusak' },
  { supplier: 'Bersama Utama', returns: 15, returnRate: '7.1%', reason: 'Salah Spesifikasi' },
  { supplier: 'PT Maju Jaya', returns: 12, returnRate: '5.5%', reason: 'Masalah Kualitas' },
  { supplier: 'CV Industri Indonesia', returns: 8, returnRate: '3.8%', reason: 'Kekurangan Stok' },
  { supplier: 'Global Supplies Ltd', returns: 5, returnRate: '2.2%', reason: 'Kesalahan Dokumen' },
]

export function ReportsPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">Analisis & Laporan</h1>
          <p className="text-xs md:text-sm lg:text-base text-muted-foreground">Ringkasan data statistik dan tren operasional gudang.</p>
        </div>
        <button className="flex items-center justify-center sm:justify-start gap-2 bg-primary hover:bg-primary/80 text-primary-foreground px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-semibold text-sm md:text-base transition-all duration-200 shadow-lg whitespace-nowrap">
          <Download className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
          <span className="hidden sm:inline">Ekspor Laporan</span>
          <span className="sm:hidden">Ekspor</span>
        </button>
      </div>

      {/* Grid Grafik */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        {/* Grafik Performa Supplier */}
        <div className="bg-card backdrop-blur-xl border border-border rounded-2xl md:rounded-3xl shadow-lg p-4 md:p-6">
          <h2 className="text-base md:text-lg font-bold text-foreground mb-1 md:mb-2">Performa Supplier</h2>
          <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-6">Perbandingan tingkat retur dan kualitas per supplier</p>
          <ResponsiveContainer width="100%" height={200} style={{ minHeight: '200px' }}>
            <BarChart data={supplierPerformanceData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="name" fontSize={10} stroke="#9ca3af" angle={-45} textAnchor="end" height={80} />
              <YAxis fontSize={11} stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '12px' }} />
              <Legend />
              <Bar dataKey="retur" name="Total Retur" fill="#14b8a6" radius={[12, 12, 0, 0]} />
              <Bar dataKey="tepatWaktu" name="Tepat Waktu %" fill="#0ea5e9" radius={[12, 12, 0, 0]} />
              <Bar dataKey="kualitas" name="Kualitas %" fill="#f59e0b" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Grafik Tren Retur Bulanan */}
        <div className="bg-card backdrop-blur-xl border border-border rounded-2xl md:rounded-3xl shadow-lg p-4 md:p-6">
          <h2 className="text-base md:text-lg font-bold text-foreground mb-1 md:mb-2">Tren Retur Bulanan</h2>
          <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-6">Data pengembalian selama 6 bulan terakhir</p>
          <ResponsiveContainer width="100%" height={200} style={{ minHeight: '200px' }}>
            <LineChart data={monthlyReturnTrendData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="month" fontSize={12} stroke="#9ca3af" />
              <YAxis fontSize={12} stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '12px' }} />
              <Legend />
              <Line type="monotone" dataKey="total" name="Total Retur" stroke="#ff8c42" strokeWidth={3} dot={{ r: 5 }} />
              <Line type="monotone" dataKey="disetujui" name="Disetujui" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="ditolak" name="Ditolak" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Kartu Ringkasan Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <div className="bg-card backdrop-blur-xl border border-border rounded-2xl md:rounded-3xl shadow-lg p-4 md:p-6">
          <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">Total Retur (Bulan Ini)</p>
          <h3 className="text-xl md:text-3xl font-bold text-orange-400">52</h3>
          <p className="text-xs text-orange-300 mt-1 md:mt-2">+15% dari bulan lalu</p>
        </div>
        <div className="bg-card backdrop-blur-xl border border-border rounded-2xl md:rounded-3xl shadow-lg p-4 md:p-6">
          <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">Tingkat Persetujuan</p>
          <h3 className="text-xl md:text-3xl font-bold text-emerald-400">82.7%</h3>
          <p className="text-xs text-emerald-300 mt-1 md:mt-2">43 dari 52 retur disetujui</p>
        </div>
        <div className="bg-card backdrop-blur-xl border border-border rounded-2xl md:rounded-3xl shadow-lg p-4 md:p-6">
          <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">Rata-rata Resolusi</p>
          <h3 className="text-xl md:text-3xl font-bold text-blue-400">3.2 Hari</h3>
          <p className="text-xs text-blue-300 mt-1 md:mt-2">Waktu proses pengerjaan</p>
        </div>
        <div className="bg-card backdrop-blur-xl border border-border rounded-2xl md:rounded-3xl shadow-lg p-4 md:p-6">
          <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">Supplier Aktif</p>
          <h3 className="text-xl md:text-3xl font-bold text-accent">5</h3>
          <p className="text-xs text-accent mt-1 md:mt-2">Supplier dengan retur bulan ini</p>
        </div>
      </div>

      {/* Tabel Supplier dengan Retur Terbanyak */}
      <div className="bg-card backdrop-blur-xl border border-border rounded-2xl md:rounded-3xl shadow-lg p-4 md:p-6">
        <h2 className="text-base md:text-lg font-bold text-foreground mb-4 md:mb-6">Supplier dengan Retur Terbanyak</h2>
        <div className="overflow-x-auto">
          <Table className="text-xs md:text-sm">
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="text-accent font-semibold text-xs md:text-sm">Supplier</TableHead>
                <TableHead className="text-accent font-semibold text-xs md:text-sm">Jumlah Retur</TableHead>
                <TableHead className="text-accent font-semibold text-xs md:text-sm hidden md:table-cell">Tingkat Retur</TableHead>
                <TableHead className="text-accent font-semibold text-xs md:text-sm">Alasan Utama</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topReturnSuppliers.map((item, idx) => (
                <TableRow key={idx} className="border-b border-border hover:bg-secondary/50 transition-all duration-200">
                  <TableCell className="text-foreground font-medium text-xs md:text-sm">{item.supplier}</TableCell>
                  <TableCell className="text-foreground font-bold text-sm md:text-lg">{item.returns}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <div className="w-12 md:w-16 h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-destructive to-orange-500"
                          style={{ width: `${Math.min(parseFloat(item.returnRate) * 12.5, 100)}%` }}
                        />
                      </div>
                      <span className="text-destructive font-semibold text-xs md:text-sm">{item.returnRate}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs md:text-sm">{item.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
