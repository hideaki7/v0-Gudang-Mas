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
import { UserNav } from '@/components/user-nav'
import { QuickActions } from '@/components/quick-actions'
import { Package2, Users, Truck, RotateCcw, BarChart3, Menu, Settings, LogOut } from 'lucide-react'
import { SupplierForm } from './supplier-form'
import { SidebarTrigger } from '@/components/ui/sidebar'

const navItems = [
  { icon: Package2, label: 'Stok Barang', value: 'inventory' },
  { icon: Users, label: 'Supplier', value: 'suppliers' },
  { icon: Truck, label: 'Barang Masuk', value: 'incoming' },
  { icon: RotateCcw, label: 'Retur', value: 'returns' },
  { icon: BarChart3, label: 'Laporan', value: 'reports' },
]

export function Dashboard() {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [isCreatingSupplier, setIsCreatingSupplier] = useState(false)
  const [isCreatingReturn, setIsCreatingReturn] = useState(false)

  const handleNavChange = (value: string) => {
    setActiveNav(value)
    setIsCreatingReturn(false)
    setIsCreatingSupplier(false)
  }

  return (
    <div className="flex h-screen bg-background w-full">
      <Sidebar collapsible="offcanvas" className="bg-card/75 backdrop-blur-xl border border-border rounded-2xl shadow-lg border-r m-3 transition-transform duration-300 ease-in-out">
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
                    className={`w-full justify-start px-4 py-3 rounded-xl transition-all duration-200 ${activeNav === item.value ? 'bg-primary text-white shadow-lg' : 'text-foreground hover:bg-secondary'
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

        {/* Bagian bawah Sidebar: Settings & Logout */}
        <div className="border-t border-border p-4 space-y-2">
          <SidebarMenu className="space-y-0">
            <SidebarMenuItem>
              {/* HUBUNGKAN DISINI: Bungkus tombol lama dengan UserNav */}
              <UserNav>
                <SidebarMenuButton className="w-full justify-start px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-all duration-200">
                  <Settings className="w-5 h-5 mr-3" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </UserNav>
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

      <SidebarInset className="flex-1 flex flex-col bg-background min-w-0 overflow-hidden w-full">
        <header className="sticky top-0 flex h-20 shrink-0 items-center justify-between px-4 md:px-8 z-40">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />
            <h2 className="text-xl md:text-3xl font-bold text-foreground">
              {activeNav === 'dashboard'
                ? 'Dashboard Utama'
                : isCreatingReturn && activeNav === 'returns'
                  ? 'Pengajuan Retur Baru'
                  : navItems.find((item) => item.value === activeNav)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <QuickActions lowStockCount={3} pendingReturnsCount={2} onNavigate={handleNavChange} />
          </div>
        </header>

        <main className="flex-1 min-w-0 overflow-x-hidden overflow-y-auto w-full">
          <div className="w-full min-w-0">
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
                <ReturnRequestForm onCancel={() => setIsCreatingReturn(false)} />
              ) : (
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
