'use client'

import { useState, useRef, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2 } from 'lucide-react'
import { getIncomingGoods, createIncomingGoods } from '@/lib/services/incoming'
import { getSuppliers } from '@/lib/services/suppliers'
import { getProducts } from '@/lib/services/products'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface ProductRow {
  id: string
  name: string
  quantity: number
}

// Cukup gunakan satu export di sini
export function IncomingGoodsPage() {
  const [selectedShipment, setSelectedShipment] = useState<string | null>('SHP-001')
  const [formData, setFormData] = useState({
    supplier: '',
    date: new Date().toISOString().split('T')[0],
  })
  const [productRows, setProductRows] = useState<ProductRow[]>([
    { id: '1', name: '', quantity: 0 },
  ])
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [suppliers, setSuppliers] = useState<any[]>([])
  const [incomingGoods, setIncomingGoods] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    loadSuppliers()
    loadIncomingGoods()
    loadProducts()

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  async function loadSuppliers() {
    try {
      const data = await getSuppliers()

      setSuppliers(data || [])

      if (data?.length > 0) {
        const firstSupplierId = data[0].supplier_id.toString()
        setFormData(prev => ({
          ...prev,
          supplier: firstSupplierId,
        }))
        // Filter produk untuk supplier pertama
        const allProducts = await getProducts()
        if (allProducts) {
          setProducts(allProducts)
          const supplierProducts = allProducts.filter(
            (p: any) => p.supplier_id === data[0].supplier_id
          )
          setFilteredProducts(supplierProducts)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function loadIncomingGoods() {
    try {
      const data = await getIncomingGoods()

      setIncomingGoods(data || [])

      if (data?.length > 0) {
        setSelectedShipment(
          `SHP-${String(data[0].incoming_id).padStart(3, '0')}`
        )
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function loadProducts() {
    try {
      const data = await getProducts()
      setProducts(data || [])
    } catch (error) {
      console.error(error)
    }
  }

  const handleAddProductRow = () => {
    setProductRows([...productRows, { id: crypto.randomUUID(), name: '', quantity: 0 }])
  }

  const handleRemoveProductRow = (id: string) => {
    if (productRows.length > 1) {
      setProductRows(productRows.filter((row) => row.id !== id))
    }
  }

  const handleProductChange = (id: string, field: keyof Omit<ProductRow, 'id'>, value: string | number) => {
    setProductRows(productRows.map((row) => (row.id === id ? { ...row, [field]: value } : row)))
  }

  // Handler untuk perubahan supplier — filter produk yang sesuai
  const handleSupplierChange = (supplierId: string) => {
    setFormData(prev => ({ ...prev, supplier: supplierId }))

    // Filter produk berdasarkan supplier_id
    const supplierProducts = products.filter(
      (p) => p.supplier_id === Number(supplierId)
    )
    setFilteredProducts(supplierProducts)

    // Reset semua baris produk yang sudah dipilih
    setProductRows([{ id: crypto.randomUUID(), name: '', quantity: 0 }])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    const hasEmptyFields = productRows.some(
      (row) => !row.name || row.quantity <= 0
    )

    if (!formData.supplier || !formData.date || hasEmptyFields) {
      setErrorMessage(
        'Harap lengkapi semua data barang dan pastikan kuantitas lebih dari 0.'
      )
      return
    }

    // Cek produk duplikat
    const selectedNames = productRows.map(r => r.name).filter(Boolean)
    const hasDuplicates = selectedNames.length !== new Set(selectedNames).size
    if (hasDuplicates) {
      setErrorMessage('Terdapat produk yang dipilih lebih dari satu kali. Gabungkan kuantitasnya dalam satu baris.')
      return
    }

    try {
      const products = await getProducts()

      const details = productRows
        .map((row) => {
          const product = products.find(
            (p: any) =>
              p.product_name.toLowerCase() === row.name.toLowerCase()
          )

          if (!product) return null

          return {
            product_id: product.product_id,
            quantity: row.quantity,
            unit_price: product.unit_price ?? 0,
          }
        })
        .filter(Boolean) as any[]

      if (details.length === 0) {
        setErrorMessage('Produk tidak ditemukan di database.')
        return
      }

      await createIncomingGoods(
        {
          supplier_id: Number(formData.supplier),
          received_date: formData.date,
          received_by: 'Admin Gudang',
        },
        details
      )

      await loadIncomingGoods()

      setSuccessMessage('Data barang masuk berhasil ditambahkan!')

      loadSuppliers()

      setProductRows([
        {
          id: crypto.randomUUID(),
          name: '',
          quantity: 0,
        },
      ])
    } catch (error) {
      console.error(error)
      setErrorMessage('Gagal menyimpan data ke database.')
    }
  }

  const selectedShipmentData = incomingGoods.find(
    (s) =>
      `SHP-${String(s.incoming_id).padStart(3, '0')}` ===
      selectedShipment
  )

  return (
    <div className="p-8 space-y-8 w-full">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Manajemen Barang Masuk</h1>
        <p className="text-muted-foreground">Catat dan lacak setiap kiriman masuk untuk memastikan jumlah serta kualitas barang sesuai pesanan.</p>
      </div>

      {/* Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sisi Kiri: Riwayat Pengiriman */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Riwayat Pengiriman</h2>
          <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg overflow-hidden">
            <div className="overflow-y-auto max-h-[500px]">
              {incomingGoods.map((shipment) => (
                <div
                  key={`shipment-${shipment.incoming_id}`}
                  onClick={() =>
                    setSelectedShipment(
                      `SHP-${String(shipment.incoming_id).padStart(3, '0')}`
                    )
                  }
                  className={`p-5 border-b border-border cursor-pointer transition-all duration-200 hover:bg-secondary/50 ${selectedShipment ===
                    `SHP-${String(shipment.incoming_id).padStart(3, '0')}` ? 'bg-secondary border-l-4 border-l-primary' : ''
                    }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-foreground text-sm font-mono">SHP-{String(shipment.incoming_id).padStart(3, '0')}</p>
                      <p className="text-muted-foreground text-xs">{shipment.suppliers?.supplier_name}</p>
                    </div>
                    <Badge
                      className={`border-0 rounded-lg text-[10px] px-2 py-0.5 ${shipment.status === 'Diterima'
                        ? 'bg-emerald-500/30 text-emerald-300'
                        : shipment.status === 'Dalam Perjalanan'
                          ? 'bg-blue-500/30 text-blue-300'
                          : 'bg-orange-500/30 text-orange-300'
                        }`}
                    >
                      {shipment.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{shipment.incoming_good_details?.length ?? 0} item • {
                      shipment.incoming_good_details?.reduce(
                        (sum: number, d: any) => sum + d.quantity,
                        0
                      ) ?? 0
                    } total unit</span>
                    <span>{shipment.received_date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail Pengiriman Terpilih */}
          {selectedShipmentData && (
            <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-6 space-y-4">
              <h3 className="font-bold text-foreground border-b border-border pb-2 flex items-center gap-2">
                <div className="w-1.5 h-4 bg-primary rounded-full"></div>
                Detail Pengiriman:SHP-{String(selectedShipmentData.incoming_id).padStart(3, '0')}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <span className="text-muted-foreground block text-xs">Supplier</span>
                  <span className="text-foreground font-medium">{selectedShipmentData.suppliers?.supplier_name}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground block text-xs">Tanggal Masuk</span>
                  <span className="text-foreground font-medium">{selectedShipmentData.received_date}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground block text-xs">Jumlah Item</span>
                  <span className="text-foreground font-bold">{selectedShipmentData.incoming_good_details?.length ?? 0} Produk</span>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground block text-xs">Total Kuantitas</span>
                  <span className="text-foreground font-bold">{
                    selectedShipmentData.incoming_good_details?.reduce(
                      (sum: number, d: any) => sum + d.quantity,
                      0
                    ) ?? 0
                  } Unit</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sisi Kanan: Form Input */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-accent">Input Barang Baru</h2>
          <form onSubmit={handleSubmit} className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-8 space-y-6">
            {errorMessage && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-red-400 text-sm font-medium">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-xl p-4 text-emerald-300 text-sm font-medium">
                {successMessage}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-foreground mb-2">Supplier</label>
                <Select value={formData.supplier} onValueChange={handleSupplierChange}>
                  <SelectTrigger className="w-full h-[50px] bg-[#2a2a3e] hover:bg-[#2a2a3e] data-[state=open]:bg-[#2a2a3e] border border-border rounded-xl px-4 py-3 text-foreground focus:ring-0 focus:outline-none focus:border-primary focus-visible:ring-0 focus-visible:border-primary transition-all text-sm shadow-none">
                    <SelectValue placeholder="Pilih Supplier" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2a3e] border border-border rounded-xl shadow-2xl max-h-60 overflow-y-auto custom-scrollbar z-50">
                    {suppliers.map((supplier) => (
                      <SelectItem
                        key={supplier.supplier_id}
                        value={supplier.supplier_id.toString()}
                        className="cursor-pointer"
                      >
                        {supplier.supplier_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-foreground mb-2">Tanggal Masuk</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-[#2a2a3e] border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-foreground">Daftar Produk</label>
              <div className="space-y-3 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
                {productRows.map((row) => (
                  <div key={row.id} className="flex gap-2 items-center">
                    <Select value={row.name} onValueChange={(value) => handleProductChange(row.id, 'name', value)}>
                      <SelectTrigger className="flex-1 h-[42px] bg-secondary/90 hover:bg-secondary/90 data-[state=open]:bg-secondary/90 border border-border rounded-xl px-4 text-sm text-foreground focus:ring-0 focus:outline-none focus:border-primary focus-visible:ring-0 focus-visible:border-primary transition-all shadow-none">
                        <SelectValue placeholder="Pilih Produk" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2a2a3e] border border-border rounded-xl shadow-2xl max-h-60 overflow-y-auto custom-scrollbar z-50">
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map((product) => (
                            <SelectItem
                              key={product.product_id}
                              value={product.product_name}
                              className="cursor-pointer"
                            >
                              {product.sku} - {product.product_name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="empty" disabled className="text-muted-foreground">
                            Tidak ada produk untuk supplier ini
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <input
                      type="number"
                      placeholder="Jml"
                      value={row.quantity || ''}
                      onChange={(e) => handleProductChange(row.id, 'quantity', parseInt(e.target.value) || 0)}
                      className="w-24 bg-[#2a2a3e] border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                    {productRows.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveProductRow(row.id)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-xl transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddProductRow}
                className="w-full py-3 px-4 border border-dashed border-border rounded-xl text-muted-foreground hover:text-accent hover:bg-secondary/30 transition-all flex items-center justify-center gap-2 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Tambah Baris Barang
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
            >
              Simpan Ke Inventori
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}