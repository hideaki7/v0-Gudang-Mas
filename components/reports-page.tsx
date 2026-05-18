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
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Analisis & Laporan</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Ringkasan data statistik dan tren operasional gudang.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-primary-foreground px-4 sm:px-6 py-3 h-10 sm:h-auto rounded-xl font-semibold transition-all duration-200 shadow-lg w-full sm:w-auto">
          <Download className="w-5 h-5" />
          Ekspor Laporan
        </button>
      </div>

      {/* Grid Grafik */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Grafik Performa Supplier */}
        <div className="group rounded-3xl overflow-hidden min-w-0 transition-all duration-300 hover:shadow-xl hover:shadow-[#F98513]/10">
          <div className="absolute inset-0 bg-[#111144]/70 backdrop-blur-2xl border border-[#9BACD8]/20 rounded-3xl" />
          <div className="relative p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-bold text-[#F4F1EC] mb-2">Performa Supplier</h2>
            <p className="text-xs sm:text-sm text-[#9BACD8] mb-4 sm:mb-6">Perbandingan tingkat retur dan kualitas per supplier</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={supplierPerformanceData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(155, 172, 216, 0.1)" strokeOpacity={0.1} />
                <XAxis dataKey="name" fontSize={11} stroke="#9BACD8" angle={-45} textAnchor="end" height={100} />
                <YAxis fontSize={12} stroke="#9BACD8" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(17, 17, 68, 0.9)', border: '1px solid rgba(155, 172, 216, 0.3)', borderRadius: '12px', color: '#F4F1EC', backdropFilter: 'blur(10px)' }} />
                <Legend wrapperStyle={{ color: '#9BACD8' }} />
                <Bar dataKey="retur" name="Total Retur" fill="#F98513" radius={[12, 12, 0, 0]} />
                <Bar dataKey="tepatWaktu" name="Tepat Waktu %" fill="#9BACD8" radius={[12, 12, 0, 0]} />
                <Bar dataKey="kualitas" name="Kualitas %" fill="#223382" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grafik Tren Retur Bulanan */}
        <div className="group rounded-3xl overflow-hidden min-w-0 transition-all duration-300 hover:shadow-xl hover:shadow-[#F98513]/10">
          <div className="absolute inset-0 bg-[#111144]/70 backdrop-blur-2xl border border-[#9BACD8]/20 rounded-3xl" />
          <div className="relative p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-bold text-[#F4F1EC] mb-2">Tren Retur Bulanan</h2>
            <p className="text-xs sm:text-sm text-[#9BACD8] mb-4 sm:mb-6">Data pengembalian selama 6 bulan terakhir</p>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyReturnTrendData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(155, 172, 216, 0.1)" strokeOpacity={0.1} />
                <XAxis dataKey="month" fontSize={12} stroke="#9BACD8" />
                <YAxis fontSize={12} stroke="#9BACD8" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(17, 17, 68, 0.9)', border: '1px solid rgba(155, 172, 216, 0.3)', borderRadius: '12px', color: '#F4F1EC', backdropFilter: 'blur(10px)' }} />
                <Legend wrapperStyle={{ color: '#9BACD8' }} />
                <Line type="monotone" dataKey="total" name="Total Retur" stroke="#F98513" strokeWidth={3} dot={{ fill: '#F98513', r: 5 }} activeDot={{ r: 7 }} />
                <Line type="monotone" dataKey="disetujui" name="Disetujui" stroke="#9BACD8" strokeWidth={2} dot={{ fill: '#9BACD8', r: 4 }} />
                <Line type="monotone" dataKey="ditolak" name="Ditolak" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Kartu Ringkasan Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <div className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#F98513]/20">
          <div className="absolute inset-0 bg-[#111144]/70 backdrop-blur-2xl border border-[#9BACD8]/20 rounded-3xl" />
          <div className="relative p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-[#9BACD8] font-medium mb-2">Total Retur (Bulan Ini)</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#F98513]">52</h3>
            <p className="text-xs text-[#F98513]/80 mt-2">+15% dari bulan lalu</p>
          </div>
        </div>
        <div className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#F98513]/20">
          <div className="absolute inset-0 bg-[#111144]/70 backdrop-blur-2xl border border-[#9BACD8]/20 rounded-3xl" />
          <div className="relative p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-[#9BACD8] font-medium mb-2">Tingkat Persetujuan</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-emerald-400">82.7%</h3>
            <p className="text-xs text-emerald-300 mt-2">43 dari 52 retur disetujui</p>
          </div>
        </div>
        <div className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#F98513]/20">
          <div className="absolute inset-0 bg-[#111144]/70 backdrop-blur-2xl border border-[#9BACD8]/20 rounded-3xl" />
          <div className="relative p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-[#9BACD8] font-medium mb-2">Rata-rata Resolusi</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-400">3.2 Hari</h3>
            <p className="text-xs text-blue-300 mt-2">Waktu proses pengerjaan</p>
          </div>
        </div>
        <div className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#F98513]/20">
          <div className="absolute inset-0 bg-[#111144]/70 backdrop-blur-2xl border border-[#9BACD8]/20 rounded-3xl" />
          <div className="relative p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-[#9BACD8] font-medium mb-2">Supplier Aktif</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#9BACD8]">5</h3>
            <p className="text-xs text-[#9BACD8]/80 mt-2">Supplier dengan retur bulan ini</p>
          </div>
        </div>
      </div>

      {/* Tabel Supplier dengan Retur Terbanyak */}
      <div className="group rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#F98513]/10">
        <div className="absolute inset-0 bg-[#111144]/70 backdrop-blur-2xl border border-[#9BACD8]/20 rounded-3xl" />
        <div className="relative p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-bold text-[#F4F1EC] mb-4 sm:mb-6">Supplier dengan Retur Terbanyak</h2>
          <div className="overflow-x-auto">
            <Table className="min-w-[580px]">
              <TableHeader>
                <TableRow className="border-b border-[#9BACD8]/20 hover:bg-transparent">
                  <TableHead className="text-[#9BACD8] font-semibold">Supplier</TableHead>
                  <TableHead className="text-[#9BACD8] font-semibold">Jumlah Retur</TableHead>
                  <TableHead className="text-[#9BACD8] font-semibold">Tingkat Retur</TableHead>
                  <TableHead className="text-[#9BACD8] font-semibold">Alasan Utama</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topReturnSuppliers.map((item, idx) => (
                  <TableRow key={idx} className="border-b border-[#9BACD8]/10 hover:bg-[#223382]/20 transition-all duration-200">
                    <TableCell className="text-[#F4F1EC] font-medium">{item.supplier}</TableCell>
                    <TableCell className="text-[#F4F1EC] font-bold text-lg">{item.returns}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-[#223382]/30 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#F98513] to-[#F98513]/60"
                            style={{ width: `${Math.min(parseFloat(item.returnRate) * 12.5, 100)}%` }}
                          />
                        </div>
                        <span className="text-[#F98513] font-semibold text-sm">{item.returnRate}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-[#DAD1C8] text-sm">{item.reason}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
