'use client'

import { useState } from 'react'
import { Search, Plus, Edit2, Trash2 } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

const suppliersData = [
  {
    id: 'SUP001',
    name: 'PT Maju Jaya',
    contact: 'Budi Santoso',
    category: 'Electronics',
    shipments: 24,
    returnRate: 2.5,
  },
  {
    id: 'SUP002',
    name: 'CV Industri Indonesia',
    contact: 'Siti Rahayu',
    category: 'FMCG',
    shipments: 18,
    returnRate: 3.2,
  },
  {
    id: 'SUP003',
    name: 'PT Karya Mitra',
    contact: 'Ahmad Wijaya',
    category: 'Machinery',
    shipments: 15,
    returnRate: 1.8,
  },
  {
    id: 'SUP004',
    name: 'Supplier Berkah',
    contact: 'Dewi Kusuma',
    category: 'Raw Materials',
    shipments: 32,
    returnRate: 2.1,
  },
  {
    id: 'SUP005',
    name: 'PT Global Trade',
    contact: 'Rudi Hermawan',
    category: 'Electronics',
    shipments: 28,
    returnRate: 4.5,
  },
]

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Electronics: 'bg-blue-500/30 text-blue-300',
    FMCG: 'bg-emerald-500/30 text-emerald-300',
    Machinery: 'bg-orange-500/30 text-orange-300',
    'Raw Materials': 'bg-purple-500/30 text-purple-300',
  }
  return colors[category] || 'bg-gray-500/30 text-gray-300'
}

export function SupplierManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [suppliers] = useState(suppliersData)

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Daftar Supplier</h1>
          <p className="text-muted-foreground">
            Kelola kategori produk dan evaluasi performa pengiriman dari seluruh mitra supplier Anda.
          </p>
        </div>
        <button className="bg-primary hover:bg-primary/80 text-primary-foreground px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 font-medium shadow-lg">
          <Plus className="w-5 h-5" />
          Tambah Supplier
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6">
        <div className="flex items-center gap-3 bg-secondary/50 backdrop-blur-md border border-border rounded-xl px-4 py-3">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari disini..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="text-accent font-semibold">Nama Supplier</TableHead>
                <TableHead className="text-accent font-semibold">Contact Person</TableHead>
                <TableHead className="text-accent font-semibold">Kategori</TableHead>
                <TableHead className="text-accent font-semibold text-center">Total Pengiriman</TableHead>
                <TableHead className="text-accent font-semibold text-center">% Retur</TableHead>
                <TableHead className="text-accent font-semibold text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map((supplier) => (
                <TableRow
                  key={supplier.id}
                  className="border-b border-border hover:bg-secondary/50 transition-all duration-200 hover:backdrop-blur-xl"
                >
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground">{supplier.name}</span>
                      <span className="text-xs text-muted-foreground">{supplier.id}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">{supplier.contact}</TableCell>
                  <TableCell>
                    <Badge className={`${getCategoryColor(supplier.category)} border-0 rounded-lg`}>
                      {supplier.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-semibold text-foreground">{supplier.shipments}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`font-semibold ${supplier.returnRate > 3.5 ? 'text-destructive' : 'text-accent'}`}
                    >
                      {supplier.returnRate}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-3">
                      <button className="p-2 hover:bg-secondary/70 rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-destructive/20 rounded-lg transition-colors text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6">
          <p className="text-muted-foreground text-sm mb-2">Total Supplier</p>
          <h3 className="text-3xl font-bold text-foreground">{suppliers.length}</h3>
        </div>
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6">
          <p className="text-muted-foreground text-sm mb-2">Total Pengiriman</p>
          <h3 className="text-3xl font-bold text-foreground">{suppliers.reduce((sum, s) => sum + s.shipments, 0)}</h3>
        </div>
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6">
          <p className="text-muted-foreground text-sm mb-2">Rata-rata Retur</p>
          <h3 className="text-3xl font-bold text-accent">
            {(suppliers.reduce((sum, s) => sum + s.returnRate, 0) / suppliers.length).toFixed(2)}%
          </h3>
        </div>
      </div>
    </div>
  )
}
