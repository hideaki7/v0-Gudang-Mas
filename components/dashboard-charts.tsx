'use client'

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

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

const COLORS = ['#14b8a6', '#f472b6', '#ef4444']

export default function DashboardCharts() {
  return (
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
  )
}
