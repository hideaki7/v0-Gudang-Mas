'use client'

import { useState, useEffect, useRef } from 'react'
import { Upload, X } from 'lucide-react'

interface FormData {
  shipmentId: string
  supplierName: string
  productName: string
  quantityToReturn: number | ''
  returnReason: string
  photoFile: File | null
}

// Terjemahan alasan retur agar lebih user-friendly
const returnReasons = [
  'Barang Rusak',
  'Spesifikasi Salah',
  'Kurang Jumlah',
  'Cacat Produksi',
  'Kedaluwarsa',
  'Barang Salah',
]

const shipmentIds = [
  { id: 'SHP001', supplier: 'PT Maju Jaya' },
  { id: 'SHP002', supplier: 'CV Industri Indonesia' },
  { id: 'SHP003', supplier: 'PT Karya Mitra' },
  { id: 'SHP004', supplier: 'Supplier Berkah' },
  { id: 'SHP005', supplier: 'PT Global Trade' },
]

// Menambahkan onCancel agar tombol Batal berfungsi kembali ke riwayat
export function ReturnRequestForm({ onCancel }: { onCancel: () => void }) {
  const [formData, setFormData] = useState<FormData>({
    shipmentId: '',
    supplierName: '',
    productName: '',
    quantityToReturn: '',
    returnReason: '',
    photoFile: null,
  })
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const submitTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const successTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (submitTimeoutRef.current) clearTimeout(submitTimeoutRef.current)
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current)
      if (photoPreview) URL.revokeObjectURL(photoPreview)
    }
  }, [photoPreview])

  const handleShipmentChange = (shipmentId: string) => {
    const selected = shipmentIds.find((s) => s.id === shipmentId)
    setFormData((prev) => ({
      ...prev,
      shipmentId,
      supplierName: selected?.supplier || '',
    }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const MAX_SIZE = 5 * 1024 * 1024 // 5MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

    if (!ALLOWED_TYPES.includes(file.type)) {
      alert('Format file tidak didukung. Gunakan JPG, PNG, atau WebP.')
      return
    }

    if (file.size > MAX_SIZE) {
      alert('Ukuran file maksimal 5MB.')
      return
    }

    setFormData((prev) => ({ ...prev, photoFile: file }))
    if (photoPreview) URL.revokeObjectURL(photoPreview)
    setPhotoPreview(URL.createObjectURL(file))
  }

  const handleRemovePhoto = () => {
    setFormData((prev) => ({ ...prev, photoFile: null }))
    setPhotoPreview(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulasi pengiriman data
    submitTimeoutRef.current = setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      successTimeoutRef.current = setTimeout(() => {
        setSubmitSuccess(false)
        onCancel()
      }, 2000)
    }, 1000)
  }

  const isFormValid =
    formData.shipmentId &&
    formData.productName &&
    formData.quantityToReturn &&
    formData.returnReason &&
    formData.photoFile

  return (
    // Menghapus max-w-4xl agar tampilan full width
    <div className="p-8 space-y-8 w-full">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Pengajuan Retur Produk</h1>
        <p className="text-muted-foreground">Kirim permintaan untuk mengembalikan produk yang cacat atau salah.</p>
      </div>

      {/* Pesan Sukses */}
      {submitSuccess && (
        <div className="bg-emerald-500/30 border border-emerald-500/50 rounded-xl p-4 text-emerald-300 flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-emerald-500/50 flex items-center justify-center text-sm">✓</div>
          <span>Permintaan retur berhasil dikirim! Menunggu persetujuan admin.</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Pilih Pengiriman */}
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              1
            </span>
            Pilih Pengiriman Barang Masuk
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">ID Pengiriman *</label>
              <select
                value={formData.shipmentId}
                onChange={(e) => handleShipmentChange(e.target.value)}
                required
                className="w-full bg-secondary/50 backdrop-blur-md border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground outline-none focus:border-accent transition-colors"
              >
                <option value="">Pilih ID pengiriman...</option>
                {shipmentIds.map((shipment) => (
                  <option key={shipment.id} value={shipment.id}>
                    {shipment.id} - {shipment.supplier}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nama Supplier</label>
              <input
                type="text"
                value={formData.supplierName}
                readOnly
                className="w-full bg-secondary/50 backdrop-blur-md border border-border rounded-xl px-4 py-3 text-muted-foreground outline-none"
              />
              <p className="text-xs text-muted-foreground mt-1">Terisi otomatis berdasarkan ID pengiriman</p>
            </div>
          </div>
        </div>

        {/* Step 2: Informasi Produk */}
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              2
            </span>
            Informasi Produk
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nama Produk *</label>
              <input
                type="text"
                value={formData.productName}
                onChange={(e) => setFormData((prev) => ({ ...prev, productName: e.target.value }))}
                placeholder="Masukkan nama produk..."
                required
                className="w-full bg-secondary/50 backdrop-blur-md border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Jumlah Retur *</label>
              <input
                type="number"
                value={formData.quantityToReturn}
                onChange={(e) => {
                  const val = parseInt(e.target.value)
                  if (e.target.value === '' || (!isNaN(val) && val > 0 && val <= 99999)) {
                    setFormData((prev) => ({ ...prev, quantityToReturn: e.target.value === '' ? '' : val }))
                  }
                }}
                placeholder="Masukkan jumlah..."
                min="1"
                max="99999"
                required
                className="w-full bg-secondary/50 backdrop-blur-md border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Step 3: Alasan Retur */}
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              3
            </span>
            Alasan Retur
          </h2>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Pilih Alasan *</label>
            <select
              value={formData.returnReason}
              onChange={(e) => setFormData((prev) => ({ ...prev, returnReason: e.target.value }))}
              required
              className="w-full bg-secondary/50 backdrop-blur-md border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground outline-none focus:border-accent transition-colors"
            >
              <option value="">Pilih alasan retur...</option>
              {returnReasons.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Step 4: Unggah Foto */}
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              4
            </span>
            Unggah Foto Kerusakan
          </h2>

          <div>
            {!photoPreview ? (
              <label className="flex items-center justify-center w-full border-2 border-dashed border-border rounded-xl p-8 cursor-pointer hover:border-accent/50 transition-colors bg-secondary/20 backdrop-blur-md">
                <div className="flex flex-col items-center gap-3">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <div className="text-center">
                    <p className="font-medium text-foreground">Tarik dan lepaskan foto di sini</p>
                    <p className="text-sm text-muted-foreground">atau klik untuk memilih file</p>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  required
                  className="hidden"
                />
              </label>
            ) : (
              <div className="space-y-4">
                <div className="relative w-full max-w-sm mx-auto">
                  <img
                    src={photoPreview}
                    alt="Foto bukti"
                    className="w-full h-64 object-cover rounded-xl border border-border"
                  />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute top-2 right-2 bg-destructive/80 hover:bg-destructive p-2 rounded-lg text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <label className="flex items-center justify-center w-full border-2 border-dashed border-border rounded-xl p-6 cursor-pointer hover:border-accent/50 transition-colors bg-secondary/20 backdrop-blur-md">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-6 h-6 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Unggah foto lain</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex items-center gap-4 justify-end pt-4">
          <button
            type="button"
            onClick={onCancel} // Sekarang tombol Batal berfungsi menutup form
            className="px-6 py-3 bg-secondary/50 hover:bg-secondary text-foreground rounded-xl transition-all duration-200 font-medium"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="px-6 py-3 bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground rounded-xl transition-all duration-200 font-medium shadow-lg"
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Pengajuan'}
          </button>
        </div>
      </form>
    </div>
  )
}