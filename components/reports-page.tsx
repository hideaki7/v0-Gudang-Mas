'use client'

import {
  BarChart, Bar,
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Download, TrendingUp, TrendingDown, Clock, Users } from 'lucide-react'

// Data Performa Supplier
const supplierPerformanceData = [
  { name: 'PT Maju Jaya', retur: 12, tepatWaktu: 95, kualitas: 88 },
  { name: 'CV Industri', retur: 8, tepatWaktu: 98, kualitas: 92 },
  { name: 'Bersama Utama', retur: 15, tepatWaktu: 92, kualitas: 85 },
  { name: 'Global Supplies', retur: 5, tepatWaktu: 99, kualitas: 95 },
  { name: 'Tech Components', retur: 18, tepatWaktu: 88, kualitas: 82 },
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

// Custom Tooltip Bar Chart
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'rgba(15,15,25,0.92)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '10px 14px', backdropFilter: 'blur(12px)' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#e5e7eb', marginBottom: 6 }}>{label}</p>
        {payload.map((entry: { name: string; value: number; color: string }, i: number) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, marginBottom: 3 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: entry.color, display: 'inline-block' }} />
            <span style={{ color: '#9ca3af' }}>{entry.name}:</span>
            <span style={{ fontWeight: 700, color: '#f3f4f6' }}>{entry.value}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

// Custom Tooltip Area Chart
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AreaTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'rgba(15,15,25,0.92)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '10px 14px', backdropFilter: 'blur(12px)' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#e5e7eb', marginBottom: 6 }}>{label}</p>
        {payload.map((entry: { name: string; value: number; color: string }, i: number) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, marginBottom: 3 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: entry.color, display: 'inline-block' }} />
            <span style={{ color: '#9ca3af' }}>{entry.name}:</span>
            <span style={{ fontWeight: 700, color: '#f3f4f6' }}>{entry.value}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

const statsCards = [
  { label: 'Total Retur (Bulan Ini)', value: '52', sub: '+15% dari bulan lalu', color: '#f97316', subColor: '#fdba74', Icon: TrendingUp },
  { label: 'Tingkat Persetujuan', value: '82.7%', sub: '43 dari 52 retur disetujui', color: '#34d399', subColor: '#6ee7b7', Icon: TrendingUp },
  { label: 'Rata-rata Resolusi', value: '3.2 Hari', sub: 'Waktu proses pengerjaan', color: '#60a5fa', subColor: '#93c5fd', Icon: Clock },
  { label: 'Supplier Aktif', value: '5', sub: 'Supplier dengan retur bulan ini', color: '#a78bfa', subColor: '#c4b5fd', Icon: Users },
]

export function ReportsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Analisis &amp; Laporan</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Ringkasan data statistik dan tren operasional gudang.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-primary-foreground px-4 sm:px-6 py-3 h-10 sm:h-auto rounded-xl font-semibold transition-all duration-200 shadow-lg w-full sm:w-auto">
          <Download className="w-5 h-5" />
          Ekspor Laporan
        </button>
      </div>

      {/* Grid Grafik */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">

        {/* Grafik Performa Supplier — Bar Chart Modern */}
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-5 sm:p-6 min-w-0 overflow-hidden">
          <h2 className="text-base sm:text-lg font-bold text-foreground mb-1">Performa Supplier</h2>
          <p className="text-xs text-muted-foreground mb-5">Perbandingan tingkat retur dan kualitas per supplier</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={supplierPerformanceData} margin={{ top: 4, right: 8, left: -24, bottom: 0 }} barCategoryGap="32%">
              <defs>
                <linearGradient id="gRetur" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#f97316" stopOpacity={0.5} />
                </linearGradient>
                <linearGradient id="gTepat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.5} />
                </linearGradient>
                <linearGradient id="gKualitas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#34d399" stopOpacity={0.5} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<BarTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)', radius: 6 }} />
              <Legend
                iconType="circle"
                iconSize={7}
                wrapperStyle={{ fontSize: '11px', paddingTop: '10px', color: '#9ca3af' }}
              />
              <Bar dataKey="retur" name="Total Retur" fill="url(#gRetur)" radius={[5, 5, 0, 0]} maxBarSize={14} />
              <Bar dataKey="tepatWaktu" name="Tepat Waktu %" fill="url(#gTepat)" radius={[5, 5, 0, 0]} maxBarSize={14} />
              <Bar dataKey="kualitas" name="Kualitas %" fill="url(#gKualitas)" radius={[5, 5, 0, 0]} maxBarSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Grafik Tren Retur Bulanan — Area Chart Modern */}
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-5 sm:p-6 min-w-0 overflow-hidden">
          <h2 className="text-base sm:text-lg font-bold text-foreground mb-1">Tren Retur Bulanan</h2>
          <p className="text-xs text-muted-foreground mb-5">Data pengembalian selama 6 bulan terakhir</p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={monthlyReturnTrendData} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
              <defs>
                <linearGradient id="aTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.22} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="aDisetujui" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="aDitolak" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<AreaTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.08)', strokeWidth: 1 }} />
              <Legend
                iconType="circle"
                iconSize={7}
                wrapperStyle={{ fontSize: '11px', paddingTop: '10px', color: '#9ca3af' }}
              />
              <Area
                type="monotone"
                dataKey="total"
                name="Total Retur"
                stroke="#f97316"
                strokeWidth={2.5}
                fill="url(#aTotal)"
                dot={{ r: 4, fill: '#f97316', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6, fill: '#f97316', stroke: '#fff', strokeWidth: 2 }}
              />
              <Area
                type="monotone"
                dataKey="disetujui"
                name="Disetujui"
                stroke="#34d399"
                strokeWidth={2}
                fill="url(#aDisetujui)"
                dot={{ r: 3.5, fill: '#34d399', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 5, fill: '#34d399', stroke: '#fff', strokeWidth: 2 }}
              />
              <Area
                type="monotone"
                dataKey="ditolak"
                name="Ditolak"
                stroke="#f87171"
                strokeWidth={2}
                fill="url(#aDitolak)"
                dot={{ r: 3.5, fill: '#f87171', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 5, fill: '#f87171', stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Kartu Ringkasan Statistik — Modern Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {statsCards.map(({ label, value, sub, color, subColor, Icon }) => (
          <div key={label} className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-4 sm:p-5 group hover:border-white/10 transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs sm:text-sm text-muted-foreground">{label}</p>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}18` }}>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-1" style={{ color }}>{value}</h3>
            <p className="text-xs" style={{ color: subColor }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Tabel Supplier dengan Retur Terbanyak */}
      <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-bold text-foreground mb-4 sm:mb-6">Supplier dengan Retur Terbanyak</h2>
        <div className="overflow-x-auto">
          <Table className="min-w-[580px]">
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="text-accent font-semibold">Supplier</TableHead>
                <TableHead className="text-accent font-semibold">Jumlah Retur</TableHead>
                <TableHead className="text-accent font-semibold">Tingkat Retur</TableHead>
                <TableHead className="text-accent font-semibold">Alasan Utama</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topReturnSuppliers.map((item, idx) => (
                <TableRow key={idx} className="border-b border-border hover:bg-secondary/50 transition-all duration-200">
                  <TableCell className="text-foreground font-medium">{item.supplier}</TableCell>
                  <TableCell className="text-foreground font-bold text-lg">{item.returns}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.min(parseFloat(item.returnRate) * 12.5, 100)}%`,
                            background: 'linear-gradient(90deg, #ef4444, #f97316)'
                          }}
                        />
                      </div>
                      <span className="text-destructive font-semibold text-sm">{item.returnRate}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{item.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
