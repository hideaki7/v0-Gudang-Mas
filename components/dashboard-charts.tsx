'use client'

import {
  AreaChart, Area,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts'

// Data untuk Incoming vs Returns Trend
const trendData = [
  { bulan: 'Jan', barangMasuk: 450, retur: 24 },
  { bulan: 'Feb', barangMasuk: 380, retur: 22 },
  { bulan: 'Mar', barangMasuk: 520, retur: 29 },
  { bulan: 'Apr', barangMasuk: 480, retur: 21 },
  { bulan: 'Mei', barangMasuk: 610, retur: 25 },
  { bulan: 'Jun', barangMasuk: 550, retur: 28 },
]

// Data untuk Stock Distribution
const stockData = [
  { name: 'Tersedia', value: 65, color: '#34d399' },
  { name: 'Rendah', value: 20, color: '#f97316' },
  { name: 'Habis', value: 15, color: '#f87171' },
]

// Custom Tooltip — Area Chart
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TrendTooltip = ({ active, payload, label }: any) => {
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

// Custom Tooltip — Pie Chart
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'rgba(15,15,25,0.92)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '10px 14px', backdropFilter: 'blur(12px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: payload[0].payload.color, display: 'inline-block' }} />
          <span style={{ color: '#9ca3af' }}>{payload[0].name}:</span>
          <span style={{ fontWeight: 700, color: '#f3f4f6' }}>{payload[0].value}%</span>
        </div>
      </div>
    )
  }
  return null
}

// Custom Label untuk Pie — hanya tampilkan di dalam slice yang cukup besar
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, value }: any) => {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  if (value < 10) return null
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700}>
      {value}%
    </text>
  )
}

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Trend Chart — Area Chart Modern */}
      <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6 lg:col-span-2">
        <h3 className="text-lg font-bold text-foreground mb-1">Tren Barang Masuk &amp; Retur</h3>
        <p className="text-sm text-muted-foreground mb-5">Pergerakan penerimaan dan pengembalian 6 bulan terakhir</p>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={trendData} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
            <defs>
              <linearGradient id="gBM" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.22} />
                <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gRT" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.22} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis
              dataKey="bulan"
              tick={{ fontSize: 11, fill: '#6b7280' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#6b7280' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<TrendTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.08)', strokeWidth: 1 }} />
            <Legend
              iconType="circle"
              iconSize={7}
              wrapperStyle={{ fontSize: '11px', paddingTop: '10px', color: '#9ca3af' }}
            />
            <Area
              type="monotone"
              dataKey="barangMasuk"
              name="Barang Masuk"
              stroke="#34d399"
              strokeWidth={2.5}
              fill="url(#gBM)"
              dot={{ r: 4, fill: '#34d399', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, fill: '#34d399', stroke: '#fff', strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="retur"
              name="Retur"
              stroke="#f97316"
              strokeWidth={2}
              fill="url(#gRT)"
              dot={{ r: 3.5, fill: '#f97316', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 5, fill: '#f97316', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stock Distribution — Pie Chart Modern */}
      <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-foreground mb-1">Distribusi Stok</h3>
        <p className="text-sm text-muted-foreground mb-4">Persentase status stok produk</p>

        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={stockData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              dataKey="value"
              labelLine={false}
              label={PieLabel}
              strokeWidth={2}
              stroke="transparent"
            >
              {stockData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<PieTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Legend manual yang rapi */}
        <div className="mt-4 space-y-2">
          {stockData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
              <span className="text-xs font-bold" style={{ color: item.color }}>{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
