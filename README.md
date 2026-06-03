# GudangMas - Inventory Management System

GudangMas adalah sistem manajemen inventaris terpadu yang dirancang khusus untuk perusahaan distribusi barang. Sistem ini tidak hanya melacak stok gudang secara *real-time*, tetapi juga dilengkapi dengan modul andalan untuk mengelola hubungan dengan pemasok (*suppliers*) dan memproses retur barang (*returns*) secara terstruktur.

## Fitur Utama

- **Manajemen Pemasok (Suppliers)**  
  Mendata dan mengelola informasi pemasok secara lengkap, termasuk detail kontak, kategori barang yang disuplai, hingga riwayat pengiriman barang.
  
- **Penerimaan Barang (Incoming Goods)**  
  Mencatat barang yang tiba di gudang secara akurat beserta detail spesifik per produk.

- **Manajemen Retur (Returns)**  
  Memproses pengajuan retur secara terstruktur apabila ditemukan barang cacat, kekurangan jumlah, atau tidak sesuai pesanan. Sistem akan mencatat alasan retur, jumlah barang, dan status persetujuan dari *supplier*.

- **Analisis & Evaluasi (Analytics)**  
  Data retur yang terstruktur memungkinkan identifikasi *supplier* dengan tingkat retur tertinggi, jenis produk yang paling sering bermasalah, dan tren kualitas barang dari waktu ke waktu. Insight ini berguna sebagai dasar keputusan negosiasi kontrak dengan pemasok.

- **Dashboard Interaktif**  
  Menyajikan visualisasi data yang komprehensif terkait stok gudang, aktivitas barang masuk, dan rasio retur dalam satu tampilan pusat.

## Tools yang Digunakan

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Komponen UI:** Shadcn UI / Radix UI, Lucide Icons, Recharts
- **Database & Backend:** Supabase (PostgreSQL)
