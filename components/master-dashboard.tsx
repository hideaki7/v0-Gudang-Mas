'use client'

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, ArrowUp, ArrowDown } from 'lucide-react'

// Data untuk Incoming vs Returns Trend
const trendData = [
  { bulan: 'Jan', barangMasuk: 450, retur: 24, pengembalian: 221 },
  { bulan: 'Feb', barangMasuk: 380, retur: 22, pengembalian: 229 },
  { bulan: 'Mar', barangMasuk: 520, retur: 29, pengembalian: 200 },
  { bulan: 'Apr', barangMasuk: 480, retur: 21, pengembalian: 208 },
  { bulan: 'Mei', barangMasuk: 610, retur: 25, pengembalian: 250 },
  { bulan: 'Jun', barangMasuk: 550, retur: 28, pengembalian: 210 },
]

// Data untuk Stock Distribution
const stockData = [
  { name: 'Tersedia', value: 65 },
  { name: 'Rendah', value: 20 },
  { name: 'Habis', value: 15 },
]

// Top Suppliers dengan return rate
const topSuppliersData = [
  { name: 'PT Maju Jaya', shipments: 145, returns: 8, returnRate: 5.5 },
  { name: 'CV Industri', shipments: 128, returns: 12, returnRate: 9.4 },
  { name: 'PT Global Trade', shipments: 156, returns: 18, returnRate: 11.5 },
  { name: 'UD Ekspor Import', shipments: 98, returns: 5, returnRate: 5.1 },
  { name: 'PT Sejahtera', shipments: 112, returns: 9, returnRate: 8.0 },
]

// Recent Activity
const recentActivityData = [
  { id: 'IN-2024-001', pemasok: 'PT Maju Jaya', jenis: 'Penerimaan', waktu: '2 jam lalu', status: 'Selesai' },
  { id: 'RET-2024-042', pemasok: 'CV Industri', jenis: 'Retur', waktu: '4 jam lalu', status: 'Diproses' },
  { id: 'IN-2024-002', pemasok: 'PT Global Trade', jenis: 'Penerimaan', waktu: '6 jam lalu', status: 'Selesai' },
  { id: 'RET-2024-043', pemasok: 'UD Ekspor Import', jenis: 'Retur', waktu: '1 hari lalu', status: 'Selesai' },
  { id: 'IN-2024-003', pemasok: 'PT Sejahtera', jenis: 'Penerimaan', waktu: '1 hari lalu', status: 'Selesai' },
]

const metricsData = [
  {
    label: 'Total Stok',
    value: '24,580',
    subtitle: 'items di gudang',
    change: '+5.2%',
    positive: true,
    icon: '📦',
  },
  {
    label: 'Barang Masuk',
    value: '3,240',
    subtitle: 'bulan ini',
    change: '+12.5%',
    positive: true,
    icon: '📥',
  },
  {
    label: 'Total Retur',
    value: '287',
    subtitle: 'tahun ini',
    change: '-3.2%',
    positive: true,
    icon: '↩️',
  },
  {
    label: 'Skor Kualitas',
    value: '94.2%',
    subtitle: 'minggu ini',
    change: '+2.1%',
    positive: true,
    icon: '✨',
  },
]

const COLORS = ['#14b8a6', '#f472b6', '#ef4444']

export function MasterDashboard() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Overview</h1>
        <p className="text-muted-foreground">Pantau performa gudang dan manajemen stok Anda</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.map((metric, index) => (
          <div key={index} className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6 group hover:backdrop-blur-2xl transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                <h3 className="text-3xl font-bold text-foreground">{metric.value}</h3>
              </div>
              <span className="text-4xl opacity-60 group-hover:opacity-100 transition-opacity">{metric.icon}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
              <div className="flex items-center gap-1">
                {metric.positive ? (
                  <ArrowUp className="w-3 h-3 text-accent" />
                ) : (
                  <ArrowDown className="w-3 h-3 text-destructive" />
                )}
                <span className={`text-xs font-semibold ${metric.positive ? 'text-accent' : 'text-destructive'}`}>
                  {metric.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trend Chart */}
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-foreground mb-2">Tren Barang Masuk & Retur</h3>
          <p className="text-sm text-muted-foreground mb-6">Pergerakan penerimaan dan pengembalian 6 bulan terakhir</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={trendData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="bulan" fontSize={12} stroke="#9ca3af" />
              <YAxis fontSize={12} stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(42, 42, 62, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  color: '#e5e7eb',
                  backdropFilter: 'blur(10px)',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="barangMasuk"
                name="Barang Masuk"
                stroke="#14b8a6"
                strokeWidth={3}
                dot={{ fill: '#14b8a6', r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="retur"
                name="Retur"
                stroke="#f472b6"
                strokeWidth={3}
                dot={{ fill: '#f472b6', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stock Distribution Pie Chart */}
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-foreground mb-2">Distribusi Stok</h3>
          <p className="text-sm text-muted-foreground mb-6">Persentase status stok produk</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={stockData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {stockData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(42, 42, 62, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  color: '#e5e7eb',
                  backdropFilter: 'blur(10px)',
                }}
                formatter={(value) => `${value}%`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Suppliers Table */}
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-foreground mb-2">Performa Supplier</h3>
          <p className="text-sm text-muted-foreground mb-6">Daftar supplier dengan tingkat retur tertinggi</p>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border hover:bg-transparent">
                  <TableHead className="text-accent font-semibold">Supplier</TableHead>
                  <TableHead className="text-accent font-semibold text-right">Pengiriman</TableHead>
                  <TableHead className="text-accent font-semibold text-right">Retur</TableHead>
                  <TableHead className="text-accent font-semibold text-right">Tingkat %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topSuppliersData.map((supplier, idx) => (
                  <TableRow
                    key={idx}
                    className="border-b border-border hover:bg-secondary/50 transition-all duration-200"
                  >
                    <TableCell className="text-foreground font-medium">{supplier.name}</TableCell>
                    <TableCell className="text-foreground text-right">{supplier.shipments}</TableCell>
                    <TableCell className="text-foreground text-right">{supplier.returns}</TableCell>
                    <TableCell className="text-right">
                      <Badge className={`${supplier.returnRate > 10 ? 'bg-destructive/30 text-destructive' : 'bg-accent/30 text-accent'} border-0 rounded-lg`}>
                        {supplier.returnRate}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-foreground mb-2">Aktivitas Terbaru</h3>
          <p className="text-sm text-muted-foreground mb-6">Riwayat transaksi gudang terkini</p>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border hover:bg-transparent">
                  <TableHead className="text-accent font-semibold">ID</TableHead>
                  <TableHead className="text-accent font-semibold">Tipe</TableHead>
                  <TableHead className="text-accent font-semibold">Waktu</TableHead>
                  <TableHead className="text-accent font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivityData.map((activity, idx) => (
                  <TableRow
                    key={idx}
                    className="border-b border-border hover:bg-secondary/50 transition-all duration-200"
                  >
                    <TableCell className="text-primary font-mono text-sm">{activity.id}</TableCell>
                    <TableCell className="text-foreground">{activity.jenis}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{activity.waktu}</TableCell>
                    <TableCell>
                      <Badge className={`${activity.status === 'Selesai' ? 'bg-emerald-500/30 text-emerald-300' : 'bg-orange-500/30 text-orange-300'} border-0 rounded-lg`}>
                        {activity.status}
                      </Badge>
                    </TableCell>
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
