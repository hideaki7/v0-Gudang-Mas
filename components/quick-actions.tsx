'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
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
  onNavigate: (page: string) => void
}

export function QuickActions({
  onNavigate,
}: QuickActionsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [lowStockCount, setLowStockCount] = useState(0)
  const [pendingReturnsCount, setPendingReturnsCount] = useState(0)
  const [lastActivityText, setLastActivityText] = useState('Memuat aktivitas...')

  useEffect(() => {
    async function fetchQuickStats() {
      if (!isOpen) return
      
      const supabase = createClient()
      
      // 1. Low stock count
      const { data: stockData } = await supabase.from('stock').select('quantity, min_quantity')
      if (stockData) {
        const lowStock = stockData.filter(s => s.quantity <= (s.min_quantity || 10)).length
        setLowStockCount(lowStock)
      }

      // 2. Pending returns count
      const { count: returnsCount } = await supabase
        .from('returns')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Pending')
      
      if (returnsCount !== null) {
        setPendingReturnsCount(returnsCount)
      }

      // 3. Last activity
      const { data: incoming } = await supabase
        .from('incoming_goods')
        .select('received_date')
        .order('received_date', { ascending: false })
        .limit(1)

      const { data: returns } = await supabase
        .from('returns')
        .select('return_date')
        .order('return_date', { ascending: false })
        .limit(1)

      let latestDate = null
      let activityText = 'Belum ada aktivitas'

      if (incoming && incoming.length > 0) {
        latestDate = new Date(incoming[0].received_date)
        activityText = 'Baru saja menerima pengiriman barang'
      }

      if (returns && returns.length > 0) {
        const returnDate = new Date(returns[0].return_date)
        if (!latestDate || returnDate > latestDate) {
          latestDate = returnDate
          activityText = 'Baru saja ada pengajuan retur barang'
        }
      }

      setLastActivityText(activityText)
    }

    fetchQuickStats()
  }, [isOpen])


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
        <SheetContent side="right" className="w-[78vw] sm:w-80 max-w-[300px] sm:max-w-none bg-card/85 sm:bg-card backdrop-blur-2xl sm:backdrop-blur-xl border-l border-border/60 sm:border-border shadow-2xl p-0 flex flex-col">
          <div className="p-5 border-b border-border/50">
            <SheetTitle className="text-foreground text-lg text-left">Side Bar</SheetTitle>
            <SheetDescription className="text-xs text-muted-foreground leading-tight text-left">
              Notifikasi dan aktivitas terbaru dari gudang Anda
            </SheetDescription>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="bg-secondary/40 backdrop-blur rounded-2xl p-4 border border-border/50">
              <div className="flex gap-3 text-left">
                <AlertCircle className="w-5 h-5 text-orange-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-foreground">Notifikasi Stok</h3>
                  <p className="text-xs text-muted-foreground mt-1">Ada {lowStockCount} produk stok rendah.</p>
                  <Badge className="mt-2 bg-orange-500/20 text-orange-400 border-0 text-[10px] px-2 py-0.5">{lowStockCount} Barang</Badge>
                </div>
              </div>
            </div>
            <div className="bg-secondary/40 backdrop-blur rounded-2xl p-4 border border-border/50">
              <div className="flex gap-3 text-left">
                <RefreshCw className="w-5 h-5 text-blue-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-foreground">Update Retur</h3>
                  <p className="text-xs text-muted-foreground mt-1">{pendingReturnsCount} pengajuan menunggu.</p>
                  <Badge className="mt-2 bg-blue-500/20 text-blue-300 border-0 text-[10px] px-2 py-0.5">{pendingReturnsCount} Menunggu</Badge>
                </div>
              </div>
            </div>
            <div className="bg-secondary/40 backdrop-blur rounded-2xl p-4 border border-border/50">
              <div className="flex gap-3 text-left">
                <Clock className="w-5 h-5 text-teal-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-foreground">Aktivitas Terakhir</h3>
                  <p className="text-xs text-muted-foreground mt-1 truncate">{lastActivityText}</p>
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
