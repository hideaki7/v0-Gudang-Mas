'use client'

import { useState, useMemo } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Search } from 'lucide-react'

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

  const filteredData = useMemo(() => {
    return inventoryData.filter(
      (item) =>
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Electronics':
        return 'bg-blue-500/30 text-blue-300'
      case 'Machinery':
        return 'bg-purple-500/30 text-purple-300'
      case 'FMCG':
        return 'bg-green-500/30 text-green-300'
      case 'Raw Materials':
        return 'bg-orange-500/30 text-orange-300'
      default:
        return 'bg-gray-500/30 text-gray-300'
    }
  }

  const getStockStatusColor = (status: string) => {
    return status === 'In Stock' ? 'bg-emerald-500/30 text-emerald-300' : 'bg-red-500/30 text-red-300'
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 lg:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">Inventori Produk</h1>
        <p className="text-xs md:text-sm lg:text-base text-muted-foreground">Pantau ketersediaan, status stok, dan detail kategori seluruh produk gudang dalam satu dasbor.</p>
      </div>

      {/* Search Bar */}
      <div className="bg-card backdrop-blur-xl border border-border rounded-2xl md:rounded-3xl shadow-lg p-3 md:p-6">
        <div className="flex items-center gap-2 md:gap-3 bg-secondary/50 backdrop-blur-md border border-border rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3">
          <Search className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            placeholder="Cari disini..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm md:text-base text-foreground placeholder-muted-foreground outline-none"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-card backdrop-blur-xl border border-border rounded-2xl md:rounded-3xl shadow-lg p-3 md:p-6 overflow-x-auto">
        <Table className="text-xs md:text-sm">
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="text-accent font-semibold text-xs md:text-sm">SKU</TableHead>
              <TableHead className="text-accent font-semibold text-xs md:text-sm hidden sm:table-cell">Nama Produk</TableHead>
              <TableHead className="text-accent font-semibold text-xs md:text-sm hidden md:table-cell">Kategori</TableHead>
              <TableHead className="text-accent font-semibold text-xs md:text-sm">Stok</TableHead>
              <TableHead className="text-accent font-semibold text-xs md:text-sm hidden md:table-cell">Unit</TableHead>
              <TableHead className="text-accent font-semibold text-xs md:text-sm">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRow key={item.sku} className="border-b border-border hover:bg-secondary/50 transition-all duration-200">
                  <TableCell className="font-mono text-xs md:text-sm text-primary font-semibold">{item.sku}</TableCell>
                  <TableCell className="text-foreground font-medium text-xs md:text-sm hidden sm:table-cell">{item.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge className={`${getCategoryColor(item.category)} border-0 rounded-lg text-xs`}>
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground font-bold text-sm md:text-base">{item.stock}</TableCell>
                  <TableCell className="text-muted-foreground text-xs md:text-sm hidden md:table-cell">{item.unit}</TableCell>
                  <TableCell>
                    <Badge className={`${getStockStatusColor(item.status)} border-0 rounded-lg text-xs`}>
                      {item.status === 'In Stock' ? '✓' : '!'} {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 md:py-8 text-xs md:text-sm text-muted-foreground">
                  Tidak ada produk yang cocok.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6">
        <div className="bg-card backdrop-blur-xl border border-border rounded-2xl md:rounded-3xl shadow-lg p-4 md:p-6">
          <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">Total Produk</p>
          <h3 className="text-xl md:text-3xl font-bold text-foreground">{inventoryData.length}</h3>
        </div>
        <div className="bg-card backdrop-blur-xl border border-border rounded-2xl md:rounded-3xl shadow-lg p-4 md:p-6">
          <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">Jumlah Stok Aman</p>
          <h3 className="text-xl md:text-3xl font-bold text-accent">{inventoryData.filter((i) => i.status === 'In Stock').length}</h3>
        </div>
        <div className="bg-card backdrop-blur-xl border border-border rounded-2xl md:rounded-3xl shadow-lg p-4 md:p-6">
          <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">Stok Sedikit</p>
          <h3 className="text-xl md:text-3xl font-bold text-destructive">{inventoryData.filter((i) => i.status === 'Low Stock').length}</h3>
        </div>
      </div>
    </div>
  )
}

export { InventoryPage }
