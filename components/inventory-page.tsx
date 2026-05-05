'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Search } from 'lucide-react'
import { getCategoryBadgeColor } from '@/lib/utils/colors'

const inventoryData = [
  { sku: 'SKU-001', name: 'Industrial Motor 5HP', category: 'Machinery', stock: 145, unit: 'pieces', status: 'In Stock' },
  { sku: 'SKU-002', name: 'Circuit Breaker 30A', category: 'Electronics', stock: 8, unit: 'pieces', status: 'Low Stock' },
  { sku: 'SKU-003', name: 'Stainless Steel Pipe 2"', category: 'Raw Materials', stock: 523, unit: 'meters', status: 'In Stock' },
  { sku: 'SKU-004', name: 'Hydraulic Fluid 10L', category: 'FMCG', stock: 3, unit: 'drums', status: 'Low Stock' },
  { sku: 'SKU-005', name: 'Bearing Ball SKF', category: 'Electronics', stock: 456, unit: 'pieces', status: 'In Stock' },
  { sku: 'SKU-006', name: 'Copper Wire 2.5mm', category: 'Raw Materials', stock: 2, unit: 'rolls', status: 'Low Stock' },
  { sku: 'SKU-007', name: 'Pneumatic Cylinder', category: 'Machinery', stock: 67, unit: 'pieces', status: 'In Stock' },
  { sku: 'SKU-008', name: 'Industrial Lubricant', category: 'FMCG', stock: 12, unit: 'containers', status: 'In Stock' },
  { sku: 'SKU-009', name: 'Power Transformer 50KVA', category: 'Electronics', stock: 1, unit: 'pieces', status: 'Low Stock' },
  { sku: 'SKU-010', name: 'Aluminum Extrusion Profile', category: 'Raw Materials', stock: 234, unit: 'meters', status: 'In Stock' },
]

export function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredData = inventoryData.filter(
    (item) =>
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStockStatusColor = (status: string) => {
    return status === 'In Stock' ? 'bg-emerald-500/30 text-emerald-300' : 'bg-red-500/30 text-red-300'
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Inventori Produk</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Pantau ketersediaan, status stok, dan detail kategori seluruh produk gudang dalam satu dasbor.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3 bg-secondary/50 backdrop-blur-md border border-border rounded-xl px-3 sm:px-4 py-2 sm:py-3">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari disini..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-foreground placeholder-muted-foreground outline-none"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-4 sm:p-6">
        <div className="overflow-x-auto">
          <Table className="min-w-[640px]">
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="text-accent font-semibold">SKU</TableHead>
              <TableHead className="text-accent font-semibold">Nama Produk</TableHead>
              <TableHead className="text-accent font-semibold">Kategori</TableHead>
              <TableHead className="text-accent font-semibold">Jumlah Stok</TableHead>
              <TableHead className="text-accent font-semibold">Unit</TableHead>
              <TableHead className="text-accent font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRow key={item.sku} className="border-b border-border hover:bg-secondary/50 transition-all duration-200">
                  <TableCell className="font-mono text-sm text-primary font-semibold">{item.sku}</TableCell>
                  <TableCell className="text-foreground font-medium">{item.name}</TableCell>
                  <TableCell>
                    <Badge className={`${getCategoryBadgeColor(item.category)} border-0 rounded-lg`}>
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground font-bold text-lg">{item.stock}</TableCell>
                  <TableCell className="text-muted-foreground">{item.unit}</TableCell>
                  <TableCell>
                    <Badge className={`${getStockStatusColor(item.status)} border-0 rounded-lg`}>
                      {item.status === 'In Stock' ? '✓' : '!'} {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Tidak ada produk yang cocok.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Produk</p>
          <h3 className="text-3xl font-bold text-foreground">{inventoryData.length}</h3>
        </div>
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Jumlah Stok Aman</p>
          <h3 className="text-3xl font-bold text-accent">{inventoryData.filter((i) => i.status === 'In Stock').length}</h3>
        </div>
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Stok Sedikit</p>
          <h3 className="text-3xl font-bold text-destructive">{inventoryData.filter((i) => i.status === 'Low Stock').length}</h3>
        </div>
      </div>
    </div>
  )
}

