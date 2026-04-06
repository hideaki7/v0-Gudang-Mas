'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, ArrowUp, ArrowDown, RotateCcw } from 'lucide-react'

const supplierReturnData = [
  { name: 'PT Maju Jaya', returnRate: 8.5 },
  { name: 'CV Industri Indonesia', returnRate: 6.2 },
  { name: 'PT Global Supplier', returnRate: 9.1 },
  { name: 'UD Terpadu Utama', returnRate: 5.8 },
  { name: 'PT Energi Maju', returnRate: 7.3 },
]

const incomingGoodsData = [
  {
    id: 'IGD-001',
    supplier: 'PT Maju Jaya',
    items: 'Electronic Components',
    quantity: 500,
    date: '2024-04-05',
    status: 'In Transit',
  },
  {
    id: 'IGD-002',
    supplier: 'CV Industri Indonesia',
    items: 'Metal Brackets',
    quantity: 1200,
    date: '2024-04-04',
    status: 'Received',
  },
  {
    id: 'IGD-003',
    supplier: 'PT Global Supplier',
    items: 'Rubber Seals',
    quantity: 800,
    date: '2024-04-03',
    status: 'Received',
  },
  {
    id: 'IGD-004',
    supplier: 'UD Terpadu Utama',
    items: 'Plastic Components',
    quantity: 2000,
    date: '2024-04-02',
    status: 'Processing',
  },
  {
    id: 'IGD-005',
    supplier: 'PT Energi Maju',
    items: 'Steel Rods',
    quantity: 350,
    date: '2024-04-01',
    status: 'Received',
  },
]

const qualityTrendData = [
  { day: 'Mon', percentage: 92 },
  { day: 'Tue', percentage: 88 },
  { day: 'Wed', percentage: 95 },
  { day: 'Thu', percentage: 91 },
  { day: 'Fri', percentage: 94 },
  { day: 'Sat', percentage: 89 },
  { day: 'Sun', percentage: 93 },
]

const statsCards = [
  {
    title: 'Total Stock',
    value: '24,580',
    subtitle: 'items in warehouse',
    change: '+5.2%',
    positive: true,
    icon: '📦',
  },
  {
    title: 'Active Suppliers',
    value: '42',
    subtitle: 'suppliers on contract',
    change: '+2',
    positive: true,
    icon: '🏢',
  },
  {
    title: 'Pending Returns',
    value: '18',
    subtitle: 'items awaiting inspection',
    change: '-3',
    positive: true,
    icon: '↩️',
  },
  {
    title: 'Quality Score',
    value: '91.4%',
    subtitle: 'weekly average',
    change: '+1.2%',
    positive: true,
    icon: '✨',
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case 'Received':
      return 'bg-emerald-500/30 text-emerald-300'
    case 'In Transit':
      return 'bg-blue-500/30 text-blue-300'
    case 'Processing':
      return 'bg-orange-500/30 text-orange-300'
    default:
      return 'bg-gray-500/30 text-gray-300'
  }
}

export function DashboardContent({ activeNav, onNavigate }: { activeNav: string; onNavigate?: (page: string) => void }) {
  return (
    <div className="p-8 space-y-8">
      {/* Header with CTA */}
      {activeNav === 'inventory' && (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Overview of your warehouse management system</p>
          </div>
          <button
            onClick={() => onNavigate?.('returns')}
            className="bg-primary hover:bg-primary/80 text-primary-foreground px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 font-medium shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            New Return Request
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6 group hover:backdrop-blur-2xl transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-foreground">{stat.value}</h3>
              </div>
              <span className="text-4xl opacity-60 group-hover:opacity-100 transition-opacity">{stat.icon}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
              <div className="flex items-center gap-1">
                {stat.positive ? (
                  <ArrowUp className="w-3 h-3 text-accent" />
                ) : (
                  <ArrowDown className="w-3 h-3 text-destructive" />
                )}
                <span className={`text-xs font-semibold ${stat.positive ? 'text-accent' : 'text-destructive'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Supplier Return Rate Chart */}
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-foreground mb-2">Top Suppliers with Highest Return Rate</h3>
          <p className="text-sm text-muted-foreground mb-6">Percentage of returned items by supplier</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={supplierReturnData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="name" fontSize={12} stroke="#9ca3af" tick={{ fontSize: 11 }} />
              <YAxis fontSize={12} stroke="#9ca3af" />
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
              <Bar
                dataKey="returnRate"
                name="Return Rate (%)"
                fill="#14b8a6"
                radius={[12, 12, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quality Trend Chart */}
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-foreground mb-2">Weekly Quality Trend</h3>
          <p className="text-sm text-muted-foreground mb-6">Quality score percentage</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={qualityTrendData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="day" fontSize={12} stroke="#9ca3af" />
              <YAxis fontSize={12} stroke="#9ca3af" domain={[80, 100]} />
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
              <Line
                type="monotone"
                dataKey="percentage"
                name="Quality %"
                stroke="#0ea5e9"
                strokeWidth={3}
                dot={{ fill: '#0ea5e9', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Incoming Goods Table */}
      <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-foreground mb-2">Recent Incoming Goods</h3>
        <p className="text-sm text-muted-foreground mb-6">Latest shipments received and processed</p>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="text-accent font-semibold">ID</TableHead>
                <TableHead className="text-accent font-semibold">Supplier</TableHead>
                <TableHead className="text-accent font-semibold">Items</TableHead>
                <TableHead className="text-accent font-semibold">Quantity</TableHead>
                <TableHead className="text-accent font-semibold">Date</TableHead>
                <TableHead className="text-accent font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incomingGoodsData.map((item) => (
                <TableRow
                  key={item.id}
                  className="border-b border-border hover:bg-secondary/50 transition-all duration-200 hover:backdrop-blur-xl"
                >
                  <TableCell className="font-mono text-sm text-primary">{item.id}</TableCell>
                  <TableCell className="text-foreground">{item.supplier}</TableCell>
                  <TableCell className="text-foreground">{item.items}</TableCell>
                  <TableCell className="font-semibold text-foreground">{item.quantity}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{item.date}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(item.status)} border-0 rounded-lg`}>
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
