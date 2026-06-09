'use client'

import { useState } from 'react'
import { createSupplier } from '@/lib/services/suppliers'
import { createProduct } from '@/lib/services/products'
import { Users, Mail, Phone, MapPin, Globe, Save, ArrowLeft, Plus, Trash2, Package } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface SupplierFormData {
  name: string
  contactPerson: string
  email: string
  phone: string
  category: string
  address: string
  website: string
}

interface ProductRowData {
  id: string
  name: string
  unit: string
  price: number
}

const categories = [
  'Elektronik',
  'Mesin & Perangkat Keras',
  'Bahan Baku',
  'FMCG',
  'Logistik',
  'Lainnya',
]

const categoryMap: Record<string, number> = {
  'Elektronik': 1,
  'FMCG': 2,
  'Mesin & Perangkat Keras': 3,
  'Bahan Baku': 4,
  'Logistik': 5,
  'Lainnya': 6,
}

export function SupplierForm({ onCancel }: { onCancel: () => void }) {
  const [formData, setFormData] = useState<SupplierFormData>({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    category: '',
    address: '',
    website: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // State untuk langkah 2: input produk
  const [step, setStep] = useState<'info' | 'products'>('info')
  const [savedSupplierId, setSavedSupplierId] = useState<number | null>(null)
  const [productRows, setProductRows] = useState<ProductRowData[]>([
    { id: crypto.randomUUID(), name: '', unit: '', price: 0 },
  ])
  const [productError, setProductError] = useState('')

  // Langkah 1: Simpan identitas supplier
  const handleSubmitInfo = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const data = await createSupplier({
        supplier_name: formData.name,
        contact_name: formData.contactPerson,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        category_id: categoryMap[formData.category],
      })

      setSavedSupplierId(data.supplier_id)
      setStep('products') // Lanjut ke langkah daftar produk
    } catch (error) {
      console.error(error)
      alert('Gagal menyimpan supplier')
    }

    setIsSubmitting(false)
  }

  // Langkah 2: Simpan semua produk dengan SKU otomatis
  const handleSubmitProducts = async () => {
    setProductError('')

    // Validasi minimal 1 produk
    const validRows = productRows.filter(r => r.name.trim())
    if (validRows.length === 0) {
      setProductError('Tambahkan minimal 1 produk untuk supplier ini.')
      return
    }

    // Validasi semua field terisi
    const hasIncomplete = validRows.some(r => !r.unit.trim() || r.price <= 0)
    if (hasIncomplete) {
      setProductError('Pastikan semua produk memiliki nama, unit, dan harga yang valid.')
      return
    }

    setIsSubmitting(true)

    try {
      const supabase = createClient()

      // Ambil jumlah produk yang sudah ada untuk generate SKU lanjutan
      const { count } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })

      for (let i = 0; i < validRows.length; i++) {
        const row = validRows[i]
        await createProduct({
          product_name: row.name,
          sku: `SKU-${String((count ?? 0) + i + 1).padStart(3, '0')}`,
          supplier_id: savedSupplierId!,
          unit: row.unit,
          unit_price: row.price,
        })
      }

      setSubmitSuccess(true)

      setTimeout(() => {
        setSubmitSuccess(false)
        onCancel()
      }, 2000)
    } catch (error) {
      console.error(error)
      alert('Gagal menyimpan produk')
    }

    setIsSubmitting(false)
  }

  const handleAddProductRow = () => {
    setProductRows([
      ...productRows,
      { id: crypto.randomUUID(), name: '', unit: '', price: 0 },
    ])
  }

  const handleRemoveProductRow = (id: string) => {
    if (productRows.length > 1) {
      setProductRows(productRows.filter((row) => row.id !== id))
    }
  }

  const handleProductRowChange = (
    id: string,
    field: keyof Omit<ProductRowData, 'id'>,
    value: string | number
  ) => {
    setProductRows(
      productRows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    )
  }

  const isFormValid = formData.name && formData.contactPerson && formData.category

  // ===== STEP 2: Form Daftar Produk =====
  if (step === 'products') {
    return (
      <div className="p-8 space-y-8 w-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Daftarkan Produk Supplier</h1>
            <p className="text-muted-foreground">
              Tambahkan produk yang disuplai oleh <span className="font-semibold text-primary">{formData.name}</span>.
            </p>
          </div>
          <button
            onClick={onCancel}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </button>
        </div>

        {/* Pesan Sukses */}
        {submitSuccess && (
          <div className="bg-emerald-500/30 border border-emerald-500/50 rounded-xl p-4 text-emerald-300 flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-emerald-500/50 flex items-center justify-center text-sm">✓</div>
            <span>Supplier dan produk berhasil disimpan!</span>
          </div>
        )}

        {productError && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-red-400 text-sm font-medium">
            {productError}
          </div>
        )}

        {/* Form Produk */}
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Package className="w-6 h-6 text-primary" />
            Daftar Produk
          </h2>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            {productRows.map((row) => (
              <div key={row.id} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Nama Produk"
                  value={row.name}
                  onChange={(e) =>
                    handleProductRowChange(row.id, 'name', e.target.value)
                  }
                  className="flex-1 bg-[#2a2a3e] border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
                <input
                  type="text"
                  placeholder="Unit"
                  value={row.unit}
                  onChange={(e) =>
                    handleProductRowChange(row.id, 'unit', e.target.value)
                  }
                  className="w-28 bg-[#2a2a3e] border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
                <input
                  type="number"
                  placeholder="Harga"
                  value={row.price || ''}
                  onChange={(e) =>
                    handleProductRowChange(
                      row.id,
                      'price',
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-32 bg-[#2a2a3e] border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
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
            className="w-full mt-4 py-3 px-4 border border-dashed border-border rounded-xl text-muted-foreground hover:text-accent hover:bg-secondary/30 transition-all flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Tambah Baris Produk
          </button>

          <p className="text-xs text-muted-foreground mt-3">
            SKU akan digenerate otomatis oleh sistem. Anda cukup mengisi nama produk, unit, dan harga satuan.
          </p>
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleSubmitProducts}
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/80 disabled:opacity-50 text-white py-4 rounded-2xl font-bold shadow-lg transition-all flex items-center justify-center gap-3 text-lg"
          >
            <Save className="w-6 h-6" />
            {isSubmitting ? 'Menyimpan...' : 'Simpan Produk & Selesai'}
          </button>
        </div>
      </div>
    )
  }

  // ===== STEP 1: Form Identitas Supplier =====
  return (
    <div className="p-8 space-y-8 w-full"> {/* Memastikan lebar penuh */}
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Tambah Supplier Baru</h1>
          <p className="text-muted-foreground">Daftarkan mitra supplier baru ke dalam sistem manajemen gudang.</p>
        </div>
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali
        </button>
      </div>

      <form onSubmit={handleSubmitInfo} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Kolom Kiri: Informasi Utama */}
        <div className="space-y-6">
          <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-primary" />
              Informasi Dasar
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nama Perusahaan *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: PT Maju Jaya Elektronik"
                  className="w-full bg-[#2a2a3e] border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Kategori Bisnis *</label>
                <Select required value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger className="w-full h-[50px] bg-[#2a2a3e] hover:bg-[#2a2a3e] data-[state=open]:bg-[#2a2a3e] border border-border rounded-xl px-4 py-3 text-foreground focus:ring-0 focus:outline-none focus:border-primary focus-visible:ring-0 focus-visible:border-primary transition-all shadow-none">
                    <SelectValue placeholder="Pilih kategori..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2a3e] border border-border rounded-xl shadow-2xl max-h-60 overflow-y-auto custom-scrollbar z-50">
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="cursor-pointer">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nama Penanggung Jawab *</label>
                <input
                  type="text"
                  required
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  placeholder="Nama lengkap kontak person"
                  className="w-full bg-[#2a2a3e] border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary transition-all"
                />
              </div>
            </div>
          </div>

          <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-primary" />
              Alamat & Lokasi
            </h2>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Alamat lengkap kantor atau gudang supplier..."
              rows={4}
              className="w-full bg-[#2a2a3e] border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary transition-all resize-none"
            />
          </div>
        </div>

        {/* Kolom Kanan: Kontak & Media Sosial */}
        <div className="space-y-6">
          <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Phone className="w-6 h-6 text-primary" />
              Informasi Kontak
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nomor Telepon / WhatsApp</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0812..."
                    className="w-full bg-[#2a2a3e] border border-border rounded-xl pl-12 pr-4 py-3 text-foreground outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Bisnis</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="supplier@email.com"
                    className="w-full bg-[#2a2a3e] border border-border rounded-xl pl-12 pr-4 py-3 text-foreground outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Website Perusahaan</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-[#2a2a3e] border border-border rounded-xl pl-12 pr-4 py-3 text-foreground outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="w-full bg-primary hover:bg-primary/80 disabled:opacity-50 text-white py-4 rounded-2xl font-bold shadow-lg transition-all flex items-center justify-center gap-3 text-lg"
            >
              <Save className="w-6 h-6" />
              {isSubmitting ? 'Menyimpan...' : 'Simpan & Lanjut Daftar Produk'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-full bg-[#2a2a3e] hover:bg-secondary text-foreground py-4 rounded-2xl font-semibold transition-all"
            >
              Batalkan
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}