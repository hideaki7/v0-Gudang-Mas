'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Search } from 'lucide-react'
import { getCategoryBadgeColor } from '@/lib/utils/colors'
import { getProducts } from '@/lib/services/products'

export function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [inventoryData, setInventoryData] = useState<any[]>([])

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    try {
      const data = await getProducts()

      const formatted = data.map((item: any) => {
        const stock = Array.isArray(item.stock)
          ? item.stock[0]
          : item.stock

        return {
          sku: item.sku,
          name: item.product_name,
          category: item.categories?.category_name || '-',
          stock: stock?.quantity || 0,
          unit: item.unit || '-',
          status:
            (stock?.quantity || 0) <= (stock?.min_quantity || 0)
              ? 'Low Stock'
              : 'In Stock'
        }
      })

      setInventoryData(formatted)
    } catch (error) {
      console.error('Error load products:', error)
    }
  }

  const filteredData = inventoryData.filter(
    (item) =>
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStockStatusColor = (status: string) => {
    return status === 'In Stock'
      ? 'bg-emerald-500/30 text-emerald-300'
      : 'bg-red-500/30 text-red-300'
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Inventori Produk
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Pantau ketersediaan, status stok, dan detail kategori seluruh produk gudang dalam satu dasbor.
          </p>
        </div>
      </div>

      <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-4 sm:p-6">
        <div
          className="group flex items-center gap-2 sm:gap-3 bg-secondary/50 backdrop-blur-md border border-border rounded-xl px-3 sm:px-4 py-2 sm:py-3 transition-all duration-300 hover:border-white/50 focus-within:border-white/70"
          style={{ boxShadow: 'none' }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.12), 0 0 18px 2px rgba(255,255,255,0.08)')}
          onMouseLeave={e => {
            if (!e.currentTarget.matches(':focus-within'))
              e.currentTarget.style.boxShadow = 'none'
          }}
          onFocusCapture={e => (e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.18), 0 0 22px 4px rgba(255,255,255,0.12)')}
          onBlurCapture={e => {
            if (!e.currentTarget.matches(':focus-within'))
              e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <Search className="w-5 h-5 text-muted-foreground group-hover:text-white group-focus-within:text-white transition-colors duration-300" />
          <input
            type="text"
            placeholder="Cari disini..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-foreground placeholder-muted-foreground outline-none"
          />
        </div>
      </div>

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
                  <TableRow
                    key={item.sku}
                    className="border-b border-border hover:bg-secondary/50 transition-all duration-200"
                  >
                    <TableCell className="font-mono text-sm text-primary font-semibold">
                      {item.sku}
                    </TableCell>

                    <TableCell className="text-foreground font-medium">
                      {item.name}
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={`${getCategoryBadgeColor(item.category)} border-0 rounded-lg`}
                      >
                        {item.category}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-foreground font-bold text-lg">
                      {item.stock}
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {item.unit}
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={`${getStockStatusColor(item.status)} border-0 rounded-lg`}
                      >
                        {item.status === 'In Stock' ? '✓' : '!'} {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    Tidak ada produk yang cocok.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Produk</p>
          <h3 className="text-3xl font-bold text-foreground">
            {inventoryData.length}
          </h3>
        </div>

        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">
            Jumlah Stok Aman
          </p>
          <h3 className="text-3xl font-bold text-accent">
            {inventoryData.filter((i) => i.status === 'In Stock').length}
          </h3>
        </div>

        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">
            Stok Sedikit
          </p>
          <h3 className="text-3xl font-bold text-destructive">
            {inventoryData.filter((i) => i.status === 'Low Stock').length}
          </h3>
        </div>
      </div>
    </div>
  )
}