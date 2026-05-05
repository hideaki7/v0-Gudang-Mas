# Laporan Review Kode & Optimasi

## [Poin 2 - EDGE CASE] — components/return-request-form.tsx

**Masalah:**
Field `quantityToReturn` bertipe string di state (`useState<FormData>`) tapi di-render sebagai `<input type="number">`. Tidak ada validasi bahwa angka yang diinput valid dan positif. User bisa input -99, 0, atau abc (lewat paste).

**Dampak:**
Data invalid masuk ke sistem. Jika ini dikirim ke backend, bisa menyebabkan error database atau kalkulasi stok yang salah.

**Solusi:**
```tsx
// Ganti type di interface:
interface FormData {
  quantityToReturn: number | '' // bukan string
  // ...
}

// Di input:
<input
  type="number"
  min="1"
  max={99999}
  value={formData.quantityToReturn}
  onChange={(e) => {
    const val = parseInt(e.target.value)
    if (!isNaN(val) && val > 0) {
      setFormData(prev => ({ ...prev, quantityToReturn: val }))
    }
  }}
/>
```

---

## [Poin 2 - EDGE CASE] — components/return-request-form.tsx (Upload Foto)

**Masalah:**
Upload foto tidak ada validasi ukuran file dan tipe file secara programmatik. `accept="image/*"` hanya hint browser, bisa di-bypass. Tidak ada batasan ukuran file.

**Dampak:**
User bisa upload file 500MB atau file berbahaya yang disamarkan sebagai gambar. Ini celah keamanan sekaligus UX issue.

**Solusi:**
```tsx
const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return
  
  const MAX_SIZE = 5 * 1024 * 1024 // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
  
  if (!ALLOWED_TYPES.includes(file.type)) {
    setUploadError('Format file tidak didukung. Gunakan JPG, PNG, atau WebP.')
    return
  }
  
  if (file.size > MAX_SIZE) {
    setUploadError('Ukuran file maksimal 5MB.')
    return
  }
  // lanjut proses...
}
```

---

## [Poin 3 - CLEAN CODE] — components/supplier-management.tsx

**Masalah:**
Tombol Edit dan Delete di tabel supplier tidak memiliki handler apapun — hanya render `<button>` kosong. Ini adalah dead code yang menipu.

```tsx
// Dead code — tidak ada onClick, tidak ada handler
<button className="p-2 hover:bg-secondary rounded-lg transition-colors">
  <Edit2 className="w-4 h-4 text-muted-foreground" />
</button>
<button className="p-2 hover:bg-destructive/20 rounded-lg transition-colors">
  <Trash2 className="w-4 h-4 text-muted-foreground" />
</button>
```

**Dampak:**
User mengklik tombol dan tidak terjadi apapun. Sangat merusak kepercayaan pengguna. Di production ini tidak boleh lolos review.

**Solusi:**
Implementasikan handler atau gunakan disabled + tooltip "Coming soon" jika fitur memang belum siap:
```tsx
<button
  onClick={() => handleEditSupplier(supplier.id)}
  className="p-2 hover:bg-secondary rounded-lg transition-colors"
  aria-label="Edit supplier"
>
  <Edit2 className="w-4 h-4 text-muted-foreground" />
</button>
```

---

## [Poin 3 - CLEAN CODE] — components/supplier-management.tsx (State Usage)

**Masalah:**
`const [suppliers] = useState(suppliersData)` — state yang tidak pernah diupdate. Ini bukan state, ini konstanta. Menggunakan `useState` untuk data yang tidak berubah adalah penggunaan hook yang salah dan menyesatkan pembaca kode.

**Dampak:**
Waste — setiap re-render komponen, React tetap mengecek apakah state ini berubah. Lebih kecil masalahnya adalah misleading bagi developer lain.

**Solusi:**
```tsx
// Hapus useState, langsung pakai konstanta module-level yang sudah ada
// const [suppliers] = useState(suppliersData) // HAPUS

// Dan langsung pakai:
const filteredSuppliers = suppliersData.filter(...)
```

---

## [Poin 3 - CLEAN CODE] — Multiple Files

**Masalah:**
Inkonsistensi bahasa di kode. Data dummy di `inventory-page.tsx` dan `supplier-management.tsx` menggunakan Bahasa Inggris ('In Stock', 'Low Stock', 'Electronics'), sementara di `return-history.tsx` menggunakan Bahasa Indonesia ('Disetujui', 'Ditolak'). `getCategoryColor` di `inventory-page.tsx` adalah fungsi terpisah, sementara di `supplier-management.tsx` juga ada fungsi yang sama tapi sebagai module-level function — duplikasi.

**Dampak:**
Inkonsistensi yang akan menyulitkan refactoring dan lokalisasi. Jika nanti ada i18n, ini akan jadi mimpi buruk.

**Solusi:**
Buat satu file `lib/constants.ts` dan `lib/utils/colors.ts`:
```tsx
// lib/constants.ts
export const STOCK_STATUS = {
  IN_STOCK: 'In Stock',
  LOW_STOCK: 'Low Stock',
} as const

// lib/utils/colors.ts
export const getCategoryBadgeColor = (category: string): string => {
  const colorMap: Record<string, string> = {
    Electronics: 'bg-blue-500/30 text-blue-300',
    Machinery: 'bg-purple-500/30 text-purple-300',
    FMCG: 'bg-green-500/30 text-green-300',
    'Raw Materials': 'bg-orange-500/30 text-orange-300',
  }
  return colorMap[category] ?? 'bg-gray-500/30 text-gray-300'
}
```

---

## [Poin 3 - CLEAN CODE] — app/layout.tsx

**Masalah:**
Font didefinisikan tapi variabelnya di-prefix underscore (`_geist`, `_geistMono`) — ini konvensi untuk "variabel yang sengaja tidak dipakai". Font tidak pernah di-apply ke className di `<body>`. Artinya font Google yang di-load tidak pernah benar-benar digunakan.

```tsx
// Font di-load tapi tidak pernah dipakai:
const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
// <body className="font-sans antialiased"> — font-sans adalah system font, bukan Geist
```

**Dampak:**
Bandwidth user terbuang untuk men-download font yang tidak pernah dirender. Next.js font optimization juga tidak berjalan optimal.

**Solusi:**
```tsx
const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

// Di body:
<body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
```

---

## [Poin 4 - PERFORMA] — components/master-dashboard.tsx

**Masalah:**
Semua data chart (`trendData`, `stockData`, `topSuppliersData`, `recentActivityData`, `metricsData`) dan array `COLORS` didefinisikan di dalam scope module sebagai konstanta global. Tapi `MasterDashboard` adalah komponen yang tidak punya state, tidak ada data fetching, tidak ada props — ini seharusnya bisa jadi Server Component yang dirender sekali di server.

**Dampak:**
Seluruh library Recharts (yang cukup besar) masuk ke client bundle padahal data chart sebenarnya statis. Bundle size membengkak tanpa alasan.

**Solusi:**
Pisahkan chart ke komponen terpisah yang lazy-loaded:
```tsx
// components/dashboard-charts.tsx — tetap 'use client' karena recharts butuh DOM
'use client'
import dynamic from 'next/dynamic'

// Di master-dashboard.tsx — jadikan Server Component
// Lazy load bagian yang butuh browser API
const DashboardCharts = dynamic(() => import('./dashboard-charts'), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse bg-secondary rounded-3xl" />
})
```

---

## [Poin 4 - PERFORMA] — components/inventory-page.tsx

**Masalah:**
`useMemo` dipakai untuk filter data, tapi dependency-nya hanya `[searchQuery]`. Ini correct tapi mubazir karena `inventoryData` adalah konstanta modul — tidak pernah berubah. `useMemo` di sini tidak memberikan keuntungan nyata karena filter array 10 item sangat murah.

**Dampak:**
Overhead kognitif — developer baru akan berpikir ada sesuatu yang mahal di sini dan malah bingung.

**Solusi:**
Untuk dataset kecil seperti ini, cukup compute langsung:
```tsx
// Hapus useMemo, langsung filter:
const filteredData = inventoryData.filter(
  (item) =>
    item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
)
```

---

## [Poin 4 - PERFORMA] — components/incoming-goods-page.tsx

**Masalah:**
`handleAddProductRow` menggunakan `Date.now().toString()` sebagai ID untuk row baru. Ini berpotensi menghasilkan ID duplikat jika dua baris ditambahkan sangat cepat, dan juga membuat React reconciliation tidak reliable.

**Dampak:**
Potential duplicate key warning di React, dan jika data ini dikirim ke backend, ID collision bisa terjadi.

**Solusi:**
Gunakan `crypto.randomUUID()` yang tersedia di browser modern:
```tsx
const handleAddProductRow = () => {
  setProductRows(prev => [
    ...prev,
    { id: crypto.randomUUID(), name: '', quantity: 0 }
  ])
}
```

---

## [Poin 5 - KEAMANAN] — components/return-request-form.tsx

**Masalah:**
Preview foto menggunakan `<img src={photoPreview}>` di mana `photoPreview` adalah hasil `FileReader.readAsDataURL()`. Tidak ada sanitasi tipe MIME. Jika seseorang meng-upload SVG yang berisi script, `<img>` bisa mengeksekusi script tersebut di beberapa browser.

**Dampak:**
Potential XSS melalui SVG upload.

**Solusi:**
```tsx
// Blokir SVG secara eksplisit di validasi, dan gunakan object URL lebih aman:
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'] 

// Gunakan createObjectURL alih-alih FileReader untuk preview:
const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file || !ALLOWED_TYPES.includes(file.type)) return
    
  if (photoPreview) URL.revokeObjectURL(photoPreview)
  setPhotoPreview(URL.createObjectURL(file))
}

// Cleanup saat unmount:
useEffect(() => {
  return () => { if (photoPreview) URL.revokeObjectURL(photoPreview) }
}, [photoPreview])
```

---

## [Poin 5 - KEAMANAN] — components/user-nav.tsx

**Masalah:**
Fitur ganti bahasa (`setLanguage`) hanya mengubah state lokal dan tidak terhubung ke apapun. Profil user adalah data hardcoded.

**Dampak:**
Fitur bahasa yang menipu. Data user yang hardcoded adalah security smell.

**Solusi:**
```tsx
import { useSession } from 'next-auth/react'

export function UserNav({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
    
  return (
    <div className="font-semibold">{session?.user?.name ?? 'User'}</div>
  )
}
```

---

## [Poin 6 - KOMPLEKSITAS] — components/dashboard.tsx

**Masalah:**
Logika navigasi dan state form ada di Dashboard sebagai prop drilling. Header title dihitung dengan kondisional bersarang yang susah dibaca.

**Dampak:**
Spaghetti code seiring proyek berkembang.

**Solusi:**
```tsx
const getPageTitle = (activeNav: string, isCreatingReturn: boolean): string => {
  if (activeNav === 'dashboard') return 'Dashboard Utama'
  if (activeNav === 'returns' && isCreatingReturn) return 'Pengajuan Retur Baru'
  if (activeNav === 'suppliers' && isCreatingSupplier) return 'Tambah Supplier Baru'
  return navItems.find(item => item.value === activeNav)?.label ?? ''
}
```

---

## [Poin 6 - KOMPLEKSITAS] — components/incoming-goods-page.tsx

**Masalah:**
`handleProductChange` menggunakan `field: string`, kehilangan type safety.

**Solusi:**
```tsx
const handleProductChange = (id: string, field: keyof Omit<ProductRow, 'id'>, value: string | number) => {
  setProductRows(prev => prev.map(row => row.id === id ? { ...row, [field]: value } : row))
}
```

---

## Summary Prioritas

**Harus Fix Sebelum Production:**
1. Hapus `ignoreBuildErrors: true` dari `next.config.mjs`
2. Tombol Edit/Delete supplier yang mati — fungsikan atau disable
3. Validasi file upload (tipe + ukuran)
4. Memory leak dari `setTimeout` di form submit
5. Fix font Geist yang tidak pernah diapply

**Sebaiknya Fix:**
1. Pindahkan navigasi ke URL-based routing (App Router routes)
2. Buat shared utility untuk `getCategoryBadgeColor`
3. Implementasikan real error states di semua form
4. Hapus state bahasa yang fake di `UserNav`
5. Ganti `Date.now()` dengan `crypto.randomUUID()`