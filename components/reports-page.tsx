'use client'

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Download } from 'lucide-react'

const supplierPerformanceData = [
  { name: 'PT Maju Jaya', returns: 12, onTime: 95, quality: 88 },
  { name: 'CV Industri Indonesia', returns: 8, onTime: 98, quality: 92 },
  { name: 'Bersama Utama', returns: 15, onTime: 92, quality: 85 },
  { name: 'Global Supplies Ltd', returns: 5, onTime: 99, quality: 95 },
  { name: 'Tech Components Asia', returns: 18, onTime: 88, quality: 82 },
]

const monthlyReturnTrendData = [
  { month: 'Jan', returns: 34, approved: 28, rejected: 6 },
  { month: 'Feb', returns: 28, approved: 24, rejected: 4 },
  { month: 'Mar', returns: 42, approved: 35, rejected: 7 },
  { month: 'Apr', returns: 38, approved: 31, rejected: 7 },
  { month: 'May', returns: 45, approved: 38, rejected: 7 },
  { month: 'Jun', returns: 52, approved: 43, rejected: 9 },
]

const topReturnSuppliers = [
  { supplier: 'Tech Components Asia', returns: 18, returnRate: '8.2%', reason: 'Damaged Goods' },
  { supplier: 'Bersama Utama', returns: 15, returnRate: '7.1%', reason: 'Wrong Specification' },
  { supplier: 'PT Maju Jaya', returns: 12, returnRate: '5.5%', reason: 'Quality Issues' },
  { supplier: 'CV Industri Indonesia', returns: 8, returnRate: '3.8%', reason: 'Shortage' },
  { supplier: 'Global Supplies Ltd', returns: 5, returnRate: '2.2%', reason: 'Documentation Errors' },
]

export function ReportsPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Analytics & Reports</h1>
          <p className="text-muted-foreground">Warehouse performance insights and metrics</p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-primary-foreground px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Supplier Performance Chart */}
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-foreground mb-2">Supplier Performance</h2>
          <p className="text-sm text-muted-foreground mb-6">Return counts by supplier</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={supplierPerformanceData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis
                dataKey="name"
                fontSize={12}
                stroke="#9ca3af"
                angle={-45}
                textAnchor="end"
                height={100}
              />
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
              <Bar dataKey="returns" name="Returns" fill="#14b8a6" radius={[12, 12, 0, 0]} />
              <Bar dataKey="onTime" name="On-Time %" fill="#0ea5e9" radius={[12, 12, 0, 0]} />
              <Bar dataKey="quality" name="Quality %" fill="#f59e0b" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Return Trend Chart */}
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-foreground mb-2">Monthly Return Trend</h2>
          <p className="text-sm text-muted-foreground mb-6">Returns over the last 6 months</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyReturnTrendData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="month" fontSize={12} stroke="#9ca3af" />
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
                dataKey="returns"
                name="Total Returns"
                stroke="#ff8c42"
                strokeWidth={3}
                dot={{ fill: '#ff8c42', r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="approved"
                name="Approved"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981', r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="rejected"
                name="Rejected"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: '#ef4444', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Returns (This Month)</p>
          <h3 className="text-3xl font-bold text-orange-400">52</h3>
          <p className="text-xs text-orange-300 mt-2">+15% from last month</p>
        </div>
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Approval Rate</p>
          <h3 className="text-3xl font-bold text-emerald-400">82.7%</h3>
          <p className="text-xs text-emerald-300 mt-2">43 of 52 returns approved</p>
        </div>
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Avg Resolution Time</p>
          <h3 className="text-3xl font-bold text-blue-400">3.2 days</h3>
          <p className="text-xs text-blue-300 mt-2">Processing time</p>
        </div>
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Active Suppliers</p>
          <h3 className="text-3xl font-bold text-accent">5</h3>
          <p className="text-xs text-accent mt-2">With returns this month</p>
        </div>
      </div>

      {/* Suppliers with Most Returns Table */}
      <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6">
        <h2 className="text-lg font-bold text-foreground mb-6">Suppliers with Most Returns</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="text-accent font-semibold">Supplier</TableHead>
                <TableHead className="text-accent font-semibold">Return Count</TableHead>
                <TableHead className="text-accent font-semibold">Return Rate</TableHead>
                <TableHead className="text-accent font-semibold">Primary Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topReturnSuppliers.map((item, idx) => (
                <TableRow key={idx} className="border-b border-border hover:bg-secondary/50 transition-all duration-200">
                  <TableCell className="text-foreground font-medium">{item.supplier}</TableCell>
                  <TableCell className="text-foreground font-bold text-lg">{item.returns}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-destructive to-orange-500"
                          style={{ width: `${Math.min(parseFloat(item.returnRate) * 12.5, 100)}%` }}
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
