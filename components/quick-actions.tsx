'use client'

import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu, AlertCircle, RefreshCw, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface QuickActionsProps {
  lowStockCount?: number
  pendingReturnsCount?: number
  lastActivityTime?: string
  onNavigate: (page: string) => void
}

export function QuickActions({
  lowStockCount = 3,
  pendingReturnsCount = 2,
  lastActivityTime = 'Baru saja menambahkan Supplier: PT Maju Jaya',
  onNavigate,
}: QuickActionsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleAction = (page: string) => {
    onNavigate(page)
    setIsOpen(false)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-lg hover:bg-secondary transition-all duration-200"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5 text-accent" />
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="w-80 bg-card backdrop-blur-xl border-l border-border p-0 flex flex-col">
          <div className="p-5 border-b border-border/50">
            <SheetTitle className="text-foreground text-lg text-left">Side Bar</SheetTitle>
            <SheetDescription className="text-xs text-muted-foreground leading-tight text-left">
              Notifikasi dan aktivitas terbaru dari gudang Anda
            </SheetDescription>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="bg-secondary/40 backdrop-blur rounded-2xl p-4 border border-border/50">
              <div className="flex gap-3 text-left">
                <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-foreground">Notifikasi Stok</h3>
                  <p className="text-xs text-muted-foreground mt-1">Ada {lowStockCount} produk stok rendah.</p>
                  <Badge className="mt-2 bg-orange-500/20 text-orange-400 border-0 text-[10px] px-2 py-0.5">{lowStockCount} Barang</Badge>
                </div>
              </div>
            </div>
            <div className="bg-secondary/40 backdrop-blur rounded-2xl p-4 border border-border/50">
              <div className="flex gap-3 text-left">
                <RefreshCw className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-foreground">Update Retur</h3>
                  <p className="text-xs text-muted-foreground mt-1">{pendingReturnsCount} pengajuan menunggu.</p>
                  <Badge className="mt-2 bg-blue-500/20 text-blue-300 border-0 text-[10px] px-2 py-0.5">{pendingReturnsCount} Menunggu</Badge>
                </div>
              </div>
            </div>
            <div className="bg-secondary/40 backdrop-blur rounded-2xl p-4 border border-border/50">
              <div className="flex gap-3 text-left">
                <Clock className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-foreground">Aktivitas Terakhir</h3>
                  <p className="text-xs text-muted-foreground mt-1 truncate">{lastActivityTime}</p>
                  <div className="text-[10px] text-muted-foreground/60 mt-1 italic">Beberapa saat yang lalu</div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-border/50 space-y-2 bg-card/80 backdrop-blur-md">
            <Button onClick={() => handleAction('inventory')} className="w-full h-10 bg-primary hover:bg-primary/80 text-white rounded-xl text-sm font-bold transition-all">
              Lihat Stok Rendah
            </Button>
            <Button onClick={() => handleAction('returns')} variant="outline" className="w-full h-10 border-border hover:bg-secondary rounded-xl text-sm font-semibold">
              Lihat Retur Menunggu
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}