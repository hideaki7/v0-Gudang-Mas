'use client'

import { useEffect, useState } from 'react'
import { Search, Plus, Edit2, Trash2 } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { getCategoryBadgeColor } from '@/lib/utils/colors'
import {
  getSuppliers,
  deleteSupplier,updateSupplier
} from '@/lib/services/suppliers'

export function SupplierManagement({ onAddSupplier }: { onAddSupplier: () => void }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [suppliersData, setSuppliersData] = useState<any[]>([])

  useEffect(() => {
    loadSuppliers()
  }, [])

  async function loadSuppliers() {
    try {
      const data = await getSuppliers()
      setSuppliersData(data || [])
    } catch (error) {
      console.error(error)
    }
  }

  async function handleDeleteSupplier(supplier: any) {
    if (supplier.incoming_goods?.length > 0) {
      alert(`Tidak dapat menghapus supplier "${supplier.supplier_name}" karena memiliki riwayat pengiriman.`);
      return;
    }

    if (supplier.returns?.length > 0) {
      alert(`Tidak dapat menghapus supplier "${supplier.supplier_name}" karena memiliki riwayat retur.`);
      return;
    }

    const confirmDelete = confirm(
      `Yakin ingin menghapus supplier ${supplier.supplier_name}?`
    )

    if (!confirmDelete) return

    try {
      await deleteSupplier(supplier.supplier_id)
      await loadSuppliers()
      alert('Supplier berhasil dihapus')
    } catch (error: any) {
      console.error(error)
      alert(`Gagal menghapus supplier: ${error.message || 'Data ini mungkin masih terhubung dengan produk atau transaksi lain.'}`)
    }
  }

  async function handleEditSupplier(supplier: any) {
  const newName = prompt(
    'Nama supplier:',
    supplier.supplier_name
  )

  if (!newName) return

  try {
    await updateSupplier(
      supplier.supplier_id,
      {
        supplier_name: newName
      }
    )

    await loadSuppliers()

    alert('Supplier berhasil diupdate')
  } catch (error) {
    console.error(error)
    alert('Gagal update supplier')
  }
}

  const filteredSuppliers = suppliersData.filter(
    (supplier) =>
      supplier.supplier_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.categories?.category_name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 w-full">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Daftar Supplier
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Kelola mitra supplier dan pantau performa pengiriman mereka.
          </p>
        </div>

        <button
          onClick={onAddSupplier}
          className="bg-primary hover:bg-primary/80 text-white px-4 sm:px-6 py-3 h-10 sm:h-auto rounded-xl flex items-center gap-2 transition-all duration-200 font-medium shadow-lg w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" />
          Tambah Supplier
        </button>
      </div>

      <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-4 sm:p-6">
        <div
          className="group flex items-center gap-2 sm:gap-3 bg-secondary/50 backdrop-blur-md border border-border rounded-xl px-3 sm:px-4 py-2 sm:py-3 transition-all duration-300 hover:border-white/50 focus-within:border-white/70"
          style={{ boxShadow: 'none' }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow =
              '0 0 0 3px rgba(255,255,255,0.12), 0 0 18px 2px rgba(255,255,255,0.08)')
          }
          onMouseLeave={(e) => {
            if (!e.currentTarget.matches(':focus-within'))
              e.currentTarget.style.boxShadow = 'none'
          }}
          onFocusCapture={(e) =>
            (e.currentTarget.style.boxShadow =
              '0 0 0 3px rgba(255,255,255,0.18), 0 0 22px 4px rgba(255,255,255,0.12)')
          }
          onBlurCapture={(e) => {
            if (!e.currentTarget.matches(':focus-within'))
              e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <Search className="w-5 h-5 text-muted-foreground group-hover:text-white group-focus-within:text-white transition-colors duration-300" />

          <input
            type="text"
            placeholder="Cari disini..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-foreground outline-none"
          />
        </div>
      </div>

      <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-4 sm:p-6">
        <div className="overflow-x-auto">
          <Table className="min-w-[640px]">
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="text-accent font-semibold">
                  Nama Supplier
                </TableHead>

                <TableHead className="text-accent font-semibold">
                  Contact Person
                </TableHead>

                <TableHead className="text-accent font-semibold">
                  Kategori
                </TableHead>

                <TableHead className="text-accent font-semibold text-center">
                  Total Pengiriman
                </TableHead>

                <TableHead className="text-accent font-semibold text-center">
                  % Retur
                </TableHead>

                <TableHead className="text-accent font-semibold text-center">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredSuppliers.map((supplier) => (
                <TableRow
                  key={supplier.supplier_id}
                  className="border-b border-border hover:bg-secondary/50"
                >
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground">
                        {supplier.supplier_name}
                      </span>

                      <span className="text-xs text-muted-foreground">
                        SUP{supplier.supplier_id}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-foreground">
                    {supplier.contact_name}
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={`${getCategoryBadgeColor(
                        supplier.categories?.category_name || 'Default'
                      )} border-0 rounded-lg`}
                    >
                      {supplier.categories?.category_name}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-center font-semibold text-foreground">
                    {supplier.incoming_goods?.length || 0}
                  </TableCell>

                  <TableCell className="text-center font-semibold">
                    {supplier.incoming_goods?.length > 0
                      ? `${((supplier.returns?.length || 0) / supplier.incoming_goods.length * 100).toFixed(1)}%`
                      : '0%'}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center gap-3">
                      <button
                          onClick={() => handleEditSupplier(supplier)}
                          className="p-2 hover:bg-secondary rounded-lg transition-colors"
                        >
                        <Edit2 className="w-4 h-4 text-muted-foreground" />
                      </button>

                      <button
                          onClick={() =>
                            handleDeleteSupplier(supplier)
                          }
                          className="p-2 hover:bg-destructive/20 rounded-lg transition-colors"
                        >
                        <Trash2 className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
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