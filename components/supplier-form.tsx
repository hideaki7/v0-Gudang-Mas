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
    <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 lg:space-y-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">Tambah Supplier Baru</h1>
          <p className="text-xs md:text-sm lg:text-base text-muted-foreground">Daftarkan mitra supplier baru ke dalam sistem manajemen gudang.</p>
        </div>
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
          Kembali
        </button>
      </div>

      {/* Pesan Sukses */}
      {submitSuccess && (
        <div className="bg-emerald-500/30 border border-emerald-500/50 rounded-lg md:rounded-xl p-3 md:p-4 text-emerald-300 flex items-center gap-2 md:gap-3 text-xs md:text-sm">
          <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-emerald-500/50 flex items-center justify-center text-xs flex-shrink-0">✓</div>
          <span>Data supplier berhasil disimpan!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        {/* Kolom Kiri: Informasi Utama */}
        <div className="space-y-4 md:space-y-6">
          <div className="bg-card backdrop-blur-xl border border-border rounded-2xl md:rounded-3xl shadow-lg p-4 md:p-8">
            <h2 className="text-base md:text-xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
              <Users className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
              Informasi Dasar
            </h2>

            <div className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5 md:mb-2">Nama Perusahaan *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: PT Maju Jaya Elektronik"
                  className="w-full bg-secondary/50 border border-border rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-foreground outline-none focus:border-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5 md:mb-2">Kategori Bisnis *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-secondary/50 border border-border rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-foreground outline-none focus:border-primary transition-all"
                >
                  <option value="">Pilih kategori...</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5 md:mb-2">Nama Penanggung Jawab *</label>
                <input
                  type="text"
                  required
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  placeholder="Nama lengkap kontak person"
                  className="w-full bg-secondary/50 border border-border rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-foreground outline-none focus:border-primary transition-all"
                />
              </div>
            </div>
          </div>

          <div className="bg-card backdrop-blur-xl border border-border rounded-2xl md:rounded-3xl shadow-lg p-4 md:p-8">
            <h2 className="text-base md:text-xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
              <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
              Alamat & Lokasi
            </h2>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Alamat lengkap kantor atau gudang supplier..."
              rows={3}
              className="w-full bg-secondary/50 border border-border rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-foreground outline-none focus:border-primary transition-all resize-none"
            />
          </div>
        </div>

        {/* Kolom Kanan: Kontak & Media Sosial */}
        <div className="space-y-4 md:space-y-6">
          <div className="bg-card backdrop-blur-xl border border-border rounded-2xl md:rounded-3xl shadow-lg p-4 md:p-8">
            <h2 className="text-base md:text-xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
              <Phone className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
              Informasi Kontak
            </h2>

            <div className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5 md:mb-2">Nomor Telepon / WhatsApp</label>
                <div className="relative">
                  <Phone className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground flex-shrink-0" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0812..."
                    className="w-full bg-secondary/50 border border-border rounded-lg md:rounded-xl pl-9 md:pl-12 pr-3 md:pr-4 py-2 md:py-3 text-xs md:text-sm text-foreground outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5 md:mb-2">Email Bisnis</label>
                <div className="relative">
                  <Mail className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground flex-shrink-0" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="supplier@email.com"
                    className="w-full bg-secondary/50 border border-border rounded-lg md:rounded-xl pl-9 md:pl-12 pr-3 md:pr-4 py-2 md:py-3 text-xs md:text-sm text-foreground outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5 md:mb-2">Website Perusahaan</label>
                <div className="relative">
                  <Globe className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground flex-shrink-0" />
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-secondary/50 border border-border rounded-lg md:rounded-xl pl-9 md:pl-12 pr-3 md:pr-4 py-2 md:py-3 text-xs md:text-sm text-foreground outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex flex-col gap-2 md:gap-3">
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="w-full bg-primary hover:bg-primary/80 disabled:opacity-50 text-white py-2.5 md:py-4 rounded-lg md:rounded-2xl font-semibold md:font-bold shadow-lg transition-all flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base"
            >
              <Save className="w-4 h-4 md:w-6 md:h-6 flex-shrink-0" />
              {isSubmitting ? 'Menyimpan...' : 'Simpan Data Supplier'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-full bg-secondary/50 hover:bg-secondary text-foreground py-2.5 md:py-4 rounded-lg md:rounded-2xl font-semibold text-sm md:text-base transition-all"
            >
              Batalkan
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
