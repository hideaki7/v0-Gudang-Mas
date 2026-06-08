import dynamic from 'next/dynamic'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, ArrowUp, ArrowDown, Package, PackageCheck, RotateCcw, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  getDashboardStats,
  getRecentActivities,
  getTopSuppliers
} from '@/lib/services/dashboard'


const DashboardCharts = dynamic(() => import('./dashboard-charts'), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse bg-secondary/50 rounded-3xl" />
})


// Recent Activity
const recentActivityData = [
  { id: 'IN-2024-001', pemasok: 'PT Maju Jaya', jenis: 'Penerimaan', waktu: '2 jam lalu', status: 'Selesai' },
  { id: 'RET-2024-042', pemasok: 'CV Industri', jenis: 'Retur', waktu: '4 jam lalu', status: 'Diproses' },
  { id: 'IN-2024-002', pemasok: 'PT Global Trade', jenis: 'Penerimaan', waktu: '6 jam lalu', status: 'Selesai' },
  { id: 'RET-2024-043', pemasok: 'UD Ekspor Import', jenis: 'Retur', waktu: '1 hari lalu', status: 'Selesai' },
  { id: 'IN-2024-003', pemasok: 'PT Sejahtera', jenis: 'Penerimaan', waktu: '1 hari lalu', status: 'Selesai' },
]


export function MasterDashboard() {
  const [topSuppliers, setTopSuppliers] = useState<any[]>([])
  const [activities, setActivities] = useState<any[]>([])
  const [stats, setStats] = useState({
  totalStock: 0,
  incomingCount: 0,
  returnCount: 0,
  qualityScore: '0',
})

  useEffect(() => {
    loadDashboard()
  }, [])

  async function loadDashboard() {
  try {
    const statsData = await getDashboardStats()
    setStats(statsData)

    const activitiesData =
      await getRecentActivities()

    setActivities(activitiesData)

    const suppliersData =
      await getTopSuppliers()

    setTopSuppliers(suppliersData)

  } catch (error) {
    console.error(error)
  }
}

  const metricsData = [
    {
      label: 'Total Stok',
      value: stats.totalStock.toLocaleString(),
      subtitle: 'Item di gudang',
      change: '',
      positive: true,
      Icon: Package,
      color: '#38bdf8',
    },
    {
      label: 'Barang Masuk',
      value: stats.incomingCount.toString(),
      subtitle: 'Total transaksi',
      change: '',
      positive: true,
      Icon: PackageCheck,
      color: '#34d399',
    },
    {
      label: 'Total Retur',
      value: stats.returnCount.toString(),
      subtitle: 'Total retur',
      change: '',
      positive: true,
      Icon: RotateCcw,
      color: '#f97316',
    },
    {
    label: 'Skor Kualitas',
    value: `${stats.qualityScore}%`,
    subtitle: 'Berdasarkan retur',
    change: '',
    positive: true,
    Icon: Star,
    color: '#a78bfa',
  },
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Overview</h1>
        <p className="text-muted-foreground">Pantau performa gudang dan manajemen stok Anda.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.map((metric, index) => {
          const Icon = metric.Icon
          return (
            <div key={index} className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6 group hover:border-white/10 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                  <h3 className="text-3xl font-bold text-foreground">{metric.value}</h3>
                </div>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${metric.color}20` }}
                >
                  <Icon className="w-5 h-5" style={{ color: metric.color }} />
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
                <div className="flex items-center gap-1">
                  {metric.positive ? (
                    <ArrowUp className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <ArrowDown className="w-3 h-3 text-destructive" />
                  )}
                  <span className={`text-xs font-semibold ${metric.positive ? 'text-emerald-400' : 'text-destructive'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Section (Lazy Loaded) */}
      <DashboardCharts />


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
                {topSuppliers.map((supplier, idx) => (
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
                {activities.map((activity, idx) => (
                  <TableRow
                    key={idx}
                    className="border-b border-border hover:bg-secondary/50 transition-all duration-200"
                  >
                    <TableCell className="text-primary font-mono text-sm">{activity.id}</TableCell>
                    <TableCell className="text-foreground">{activity.type}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{new Date(activity.date).toLocaleDateString('id-ID')}</TableCell>
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
