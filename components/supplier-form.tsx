'use client'

import { useState } from 'react'
import { Users, Mail, Phone, MapPin, Globe, Save, ArrowLeft } from 'lucide-react'

interface SupplierFormData {
  name: string
  contactPerson: string
  email: string
  phone: string
  category: string
  address: string
  website: string
}

const categories = [
  'Elektronik',
  'Mesin & Perangkat Keras',
  'Bahan Baku',
  'FMCG',
  'Logistik',
  'Lainnya',
]

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulasi pengiriman data ke server
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setTimeout(() => {
        setSubmitSuccess(false)
        onCancel() // Kembali ke daftar supplier setelah sukses
      }, 2000)
    }, 1000)
  }

  const isFormValid = formData.name && formData.contactPerson && formData.category

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

      {/* Pesan Sukses */}
      {submitSuccess && (
        <div className="bg-emerald-500/30 border border-emerald-500/50 rounded-xl p-4 text-emerald-300 flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-emerald-500/50 flex items-center justify-center text-sm">✓</div>
          <span>Data supplier berhasil disimpan!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Kategori Bisnis *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary transition-all"
                >
                  <option value="">Pilih kategori...</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nama Penanggung Jawab *</label>
                <input
                  type="text"
                  required
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  placeholder="Nama lengkap kontak person"
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary transition-all"
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
              className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary transition-all resize-none"
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
                    className="w-full bg-secondary/50 border border-border rounded-xl pl-12 pr-4 py-3 text-foreground outline-none focus:border-primary transition-all"
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
                    className="w-full bg-secondary/50 border border-border rounded-xl pl-12 pr-4 py-3 text-foreground outline-none focus:border-primary transition-all"
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
                    className="w-full bg-secondary/50 border border-border rounded-xl pl-12 pr-4 py-3 text-foreground outline-none focus:border-primary transition-all"
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
              {isSubmitting ? 'Menyimpan...' : 'Simpan Data Supplier'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-full bg-secondary/50 hover:bg-secondary text-foreground py-4 rounded-2xl font-semibold transition-all"
            >
              Batalkan
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}