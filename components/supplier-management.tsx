'use client'

import { useState } from 'react'
import { Search, Plus, Edit2, Trash2 } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

const suppliersData = [
  { id: 'SUP001', name: 'PT Maju Jaya', contact: 'Budi Santoso', category: 'Electronics', shipments: 24, returnRate: 2.5 },
  { id: 'SUP002', name: 'CV Industri Indonesia', contact: 'Siti Rahayu', category: 'FMCG', shipments: 18, returnRate: 3.2 },
  { id: 'SUP003', name: 'PT Karya Mitra', contact: 'Ahmad Wijaya', category: 'Machinery', shipments: 15, returnRate: 1.8 },
  { id: 'SUP004', name: 'Supplier Berkah', contact: 'Dewi Kusuma', category: 'Raw Materials', shipments: 32, returnRate: 2.1 },
  { id: 'SUP005', name: 'PT Global Trade', contact: 'Rudi Hermawan', category: 'Electronics', shipments: 28, returnRate: 4.5 },
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

export function SupplierManagement({ onAddSupplier }: { onAddSupplier: () => void }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [suppliers] = useState(suppliersData)

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 lg:space-y-8 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">Daftar Supplier</h1>
          <p className="text-xs md:text-sm lg:text-base text-muted-foreground">Kelola mitra supplier dan pantau performa pengiriman mereka.</p>
        </div>
        <button
          onClick={onAddSupplier}
          className="bg-primary hover:bg-primary/80 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl flex items-center justify-center sm:justify-start gap-2 transition-all duration-200 font-semibold md:font-medium text-sm md:text-base shadow-lg whitespace-nowrap"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
          <span className="hidden sm:inline">Tambah Supplier</span>
          <span className="sm:hidden">Tambah</span>
        </button>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl md:rounded-3xl shadow-lg p-3 md:p-6">
        <div className="flex items-center gap-2 md:gap-3 bg-slate-700 border border-slate-600 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3">
          <Search className="w-4 h-4 md:w-5 md:h-5 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Cari disini..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-sm md:text-base text-white placeholder-slate-400 outline-none"
          />
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl md:rounded-3xl shadow-lg p-3 md:p-6 overflow-x-auto">
        <Table className="text-xs md:text-sm">
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="text-accent font-semibold text-xs md:text-sm">Nama Supplier</TableHead>
              <TableHead className="text-accent font-semibold text-xs md:text-sm hidden sm:table-cell">Contact Person</TableHead>
              <TableHead className="text-accent font-semibold text-xs md:text-sm hidden md:table-cell">Kategori</TableHead>
              <TableHead className="text-accent font-semibold text-xs md:text-sm text-center">Pengiriman</TableHead>
              <TableHead className="text-accent font-semibold text-xs md:text-sm text-center hidden sm:table-cell">% Retur</TableHead>
              <TableHead className="text-accent font-semibold text-xs md:text-sm text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuppliers.map((supplier) => (
              <TableRow key={supplier.id} className="border-b border-border hover:bg-secondary/50">
                <TableCell className="text-foreground font-medium text-xs md:text-sm">{supplier.name}</TableCell>
                <TableCell className="text-foreground text-xs md:text-sm hidden sm:table-cell">{supplier.contact}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge className={`${getCategoryColor(supplier.category)} border-0 rounded-lg text-xs`}>
                    {supplier.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-center font-semibold text-foreground text-xs md:text-sm">{supplier.shipments}</TableCell>
                <TableCell className="text-center hidden sm:table-cell">
                  <Badge className={`${supplier.returnRate > 3 ? 'bg-red-500/30 text-red-300' : 'bg-green-500/30 text-green-300'} border-0 rounded-lg text-xs`}>
                    {supplier.returnRate}%
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1 md:gap-2">
                    <button className="p-1.5 md:p-2 hover:bg-secondary rounded-lg transition-all text-accent hover:text-primary">
                      <Edit2 className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                    <button className="p-1.5 md:p-2 hover:bg-secondary rounded-lg transition-all text-destructive hover:text-red-400">
                      <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
