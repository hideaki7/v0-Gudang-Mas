'use client'

// template.tsx di-remount setiap navigasi (tidak seperti layout.tsx yang persists)
// Ini adalah cara resmi Next.js App Router untuk page transition animations
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-transition">
      {children}
    </div>
  )
}
