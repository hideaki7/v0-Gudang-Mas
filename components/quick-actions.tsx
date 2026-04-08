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
}

export function QuickActions({
  lowStockCount = 3,
  pendingReturnsCount = 2,
  lastActivityTime = 'Baru saja menambahkan Supplier: PT Maju Jaya',
}: QuickActionsProps) {
  const [isOpen, setIsOpen] = useState(false)

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
        <SheetContent side="right" className="w-96 bg-card backdrop-blur-xl border border-border">
          <SheetHeader>
            <SheetTitle className="text-foreground">Aksi Cepat</SheetTitle>
            <SheetDescription className="text-muted-foreground">
              Notifikasi dan aktivitas terbaru dari gudang Anda
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4 mt-6">
            {/* Notifikasi Stok Rendah */}
            <div className="bg-secondary/50 backdrop-blur rounded-lg p-4 border border-border hover:border-accent/50 transition-all duration-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Notifikasi Stok</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ada {lowStockCount} produk dengan status stok rendah yang memerlukan perhatian.
                  </p>
                  <Badge className="mt-2 bg-orange-500/30 text-orange-300 border-0">
                    {lowStockCount} Barang
                  </Badge>
                </div>
              </div>
            </div>

            {/* Update Retur */}
            <div className="bg-secondary/50 backdrop-blur rounded-lg p-4 border border-border hover:border-accent/50 transition-all duration-200">
              <div className="flex items-start gap-3">
                <RefreshCw className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Update Retur</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Anda memiliki {pendingReturnsCount} pengajuan retur yang masih menunggu persetujuan.
                  </p>
                  <Badge className="mt-2 bg-blue-500/30 text-blue-300 border-0">
                    {pendingReturnsCount} Menunggu
                  </Badge>
                </div>
              </div>
            </div>

            {/* Aktivitas Terakhir */}
            <div className="bg-secondary/50 backdrop-blur rounded-lg p-4 border border-border hover:border-accent/50 transition-all duration-200">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Aktivitas Terakhir</h3>
                  <p className="text-sm text-muted-foreground mt-1">{lastActivityTime}</p>
                  <div className="text-xs text-muted-foreground mt-2">Beberapa saat yang lalu</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="space-y-2 mt-8">
            <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground rounded-lg font-medium">
              Lihat Stok Rendah
            </Button>
            <Button variant="outline" className="w-full border-border hover:bg-secondary rounded-lg">
              Lihat Retur Menunggu
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
