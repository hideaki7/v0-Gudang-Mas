'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { TrendingUp } from 'lucide-react'

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
    color: 'bg-blue-50 border-blue-200',
  },
  {
    title: 'Active Suppliers',
    value: '42',
    subtitle: 'suppliers on contract',
    change: '+2',
    color: 'bg-emerald-50 border-emerald-200',
  },
  {
    title: 'Pending Returns',
    value: '18',
    subtitle: 'items awaiting inspection',
    change: '-3',
    color: 'bg-orange-50 border-orange-200',
  },
  {
    title: 'Quality Score',
    value: '91.4%',
    subtitle: 'weekly average',
    change: '+1.2%',
    color: 'bg-purple-50 border-purple-200',
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case 'Received':
      return 'bg-green-100 text-green-800'
    case 'In Transit':
      return 'bg-blue-100 text-blue-800'
    case 'Processing':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function DashboardContent({ activeNav }: { activeNav: string }) {
  return (
    <div className="p-6 space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <Card key={index} className={`${stat.color} border`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                <span className="text-xs font-semibold text-primary">{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Supplier Return Rate Chart */}
        <Card className="lg:col-span-2 bg-white border-border">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-foreground">
              Top Suppliers with Highest Return Rate
            </CardTitle>
            <CardDescription>Percentage of returned items by supplier</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={supplierReturnData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" fontSize={12} stroke="#6b7280" />
                <YAxis fontSize={12} stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#f1f5f9',
                  }}
                  formatter={(value) => `${value}%`}
                />
                <Legend />
                <Bar
                  dataKey="returnRate"
                  name="Return Rate (%)"
                  fill="#3b82f6"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quality Trend Chart */}
        <Card className="bg-white border-border">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-foreground">Weekly Quality Trend</CardTitle>
            <CardDescription>Quality score percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={qualityTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" fontSize={12} stroke="#6b7280" />
                <YAxis fontSize={12} stroke="#6b7280" domain={[80, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#f1f5f9',
                  }}
                  formatter={(value) => `${value}%`}
                />
                <Bar
                  dataKey="percentage"
                  name="Quality %"
                  fill="#8b5cf6"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Incoming Goods Table */}
      <Card className="bg-white border-border">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-foreground">Recent Incoming Goods</CardTitle>
          <CardDescription>Latest shipments received and processed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border hover:bg-transparent">
                  <TableHead className="text-foreground font-semibold">ID</TableHead>
                  <TableHead className="text-foreground font-semibold">Supplier</TableHead>
                  <TableHead className="text-foreground font-semibold">Items</TableHead>
                  <TableHead className="text-foreground font-semibold">Quantity</TableHead>
                  <TableHead className="text-foreground font-semibold">Date</TableHead>
                  <TableHead className="text-foreground font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incomingGoodsData.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-b border-border hover:bg-secondary/50 transition-colors"
                  >
                    <TableCell className="font-mono text-sm text-primary">{item.id}</TableCell>
                    <TableCell className="text-foreground">{item.supplier}</TableCell>
                    <TableCell className="text-foreground">{item.items}</TableCell>
                    <TableCell className="font-semibold text-foreground">{item.quantity}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{item.date}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(item.status)} border-0`}>
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
