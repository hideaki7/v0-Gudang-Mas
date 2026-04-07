'use client'

import { useState } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { SupplierManagement } from '@/components/supplier-management'
import { ReturnRequestForm } from '@/components/return-request-form'
import { ReturnHistory } from '@/components/return-history'
import { InventoryPage } from '@/components/inventory-page'
import { IncomingGoodsPage } from '@/components/incoming-goods-page'
import { ReportsPage } from '@/components/reports-page'
import { MasterDashboard } from '@/components/master-dashboard'
import { Package2, Users, Truck, RotateCcw, BarChart3, Menu, Settings, LogOut } from 'lucide-react'
import { SupplierForm } from './supplier-form'

const navItems = [
  { icon: Package2, label: 'Stok Barang', value: 'inventory' },
  { icon: Users, label: 'Supplier', value: 'suppliers' },
  { icon: Truck, label: 'Barang Masuk', value: 'incoming' },
  { icon: RotateCcw, label: 'Retur', value: 'returns' },
  { icon: BarChart3, label: 'Laporan', value: 'reports' },
]

export function Dashboard() {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [isCreatingSupplier, setIsCreatingSupplier] = useState(false);
  const [isCreatingReturn, setIsCreatingReturn] = useState(false)

  // Fungsi untuk reset state saat pindah menu utama
  const handleNavChange = (value: string) => {
    setActiveNav(value)
    setIsCreatingReturn(false) // Reset form retur jika pindah menu
  }

  return (
    <div className="flex h-screen bg-background w-full">
      <Sidebar className="bg-card backdrop-blur-xl border border-border rounded-2xl shadow-lg border-r m-3">
        <SidebarHeader className="border-b border-border p-6">
          <button
            onClick={() => handleNavChange('dashboard')}
            className="flex items-center gap-3 w-full hover:opacity-80 transition-opacity"
          >
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <Package2 className="w-7 h-7 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <h1 className="font-bold text-lg text-foreground">GudangMas</h1>
              <p className="text-xs text-muted-foreground">Warehouse Manager</p>
            </div>
          </button>
        </SidebarHeader>
        <SidebarContent className="flex-1">
          <SidebarMenu className="space-y-3 px-3">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    onClick={() => handleNavChange(item.value)}
                    className={`w-full justify-start px-4 py-3 rounded-xl transition-all duration-200 ${activeNav === item.value
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-foreground hover:bg-secondary'
                      }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarContent>
        <div className="border-t border-border p-4 space-y-2">
          <SidebarMenu className="space-y-0">
            <SidebarMenuItem>
              <SidebarMenuButton className="w-full justify-start px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-all duration-200">
                <Settings className="w-5 h-5 mr-3" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="w-full justify-start px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-all duration-200">
                <LogOut className="w-5 h-5 mr-3" />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </Sidebar>

      {/* Tambahkan w-full untuk memastikan container mengambil ruang maksimal */}
      <SidebarInset className="flex-1 flex flex-col bg-background overflow-auto w-full">
        <header className="sticky top-0 flex h-20 shrink-0 items-center justify-between px-8 z-40">
          <h2 className="text-3xl font-bold text-foreground">
            {activeNav === 'dashboard'
              ? 'Dashboard Utama'
              : isCreatingReturn && activeNav === 'returns'
                ? 'Pengajuan Retur Baru'
                : navItems.find((item) => item.value === activeNav)?.label}
          </h2>
          <div className="flex items-center gap-4">
            <button className="p-2.5 hover:bg-secondary rounded-xl transition-all duration-200">
              <Menu className="w-6 h-6 text-accent" />
            </button>
          </div>
        </header>

        {/* Tambahkan w-full di sini untuk mengatasi ruang kosong di kanan */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto w-full">
          <div className="w-full">
            {activeNav === 'dashboard' && <MasterDashboard />}
            {activeNav === 'inventory' && <InventoryPage />}
            {activeNav === 'suppliers' && (
              isCreatingSupplier ? (
                <SupplierForm onCancel={() => setIsCreatingSupplier(false)} />
              ) : (
                <SupplierManagement onAddSupplier={() => setIsCreatingSupplier(true)} />
              )
            )}
            {activeNav === 'returns' && (
              isCreatingReturn ? (
                // Kirim fungsi close agar form bisa ditutup
                <ReturnRequestForm onCancel={() => setIsCreatingReturn(false)} />
              ) : (
                // Kirim fungsi open agar list riwayat bisa membuka form
                <ReturnHistory onAddReturn={() => setIsCreatingReturn(true)} />
              )
            )}

            {activeNav === 'incoming' && <IncomingGoodsPage />}
            {activeNav === 'reports' && <ReportsPage />}
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}