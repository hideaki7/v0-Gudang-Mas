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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleNavChange = (value: string) => {
    setActiveNav(value)
    setIsCreatingReturn(false)
    setIsCreatingSupplier(false)
    setIsSidebarOpen(false)
  }

  return (
    <div className="flex h-screen bg-background w-full">
      <Sidebar className="bg-card backdrop-blur-xl border border-border rounded-2xl shadow-lg border-r hidden md:flex md:m-3 flex-col">
        <SidebarHeader className="border-b border-border p-4 md:p-6">
          <button
            onClick={() => handleNavChange('dashboard')}
            className="flex items-center gap-2 md:gap-3 w-full hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <Package2 className="w-5 h-5 md:w-7 md:h-7 text-white" />
            </div>
            <div className="flex flex-col text-left hidden md:flex">
              <h1 className="font-bold text-base md:text-lg text-foreground">GudangMas</h1>
              <p className="text-xs text-muted-foreground">Warehouse Manager</p>
            </div>
          </button>
        </SidebarHeader>

        <SidebarContent className="flex-1">
          <SidebarMenu className="space-y-2 md:space-y-3 px-2 md:px-3">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    onClick={() => handleNavChange(item.value)}
                    className={`w-full justify-start px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all duration-200 text-sm md:text-base ${activeNav === item.value ? 'bg-primary text-white shadow-lg' : 'text-foreground hover:bg-secondary'
                      }`}
                  >
                    <Icon className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 flex-shrink-0" />
                    <span className="hidden md:inline">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarContent>

        {/* Bagian bawah Sidebar: Settings & Logout */}
        <div className="border-t border-border p-3 md:p-4 space-y-2">
          <SidebarMenu className="space-y-0">
            <SidebarMenuItem>
              {/* HUBUNGKAN DISINI: Bungkus tombol lama dengan UserNav */}
              <UserNav>
                <SidebarMenuButton className="w-full justify-start px-3 md:px-4 py-2 text-sm md:text-base text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-all duration-200">
                  <Settings className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 flex-shrink-0" />
                  <span className="hidden md:inline">Settings</span>
                </SidebarMenuButton>
              </UserNav>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="w-full justify-start px-3 md:px-4 py-2 text-sm md:text-base text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-all duration-200">
                <LogOut className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 flex-shrink-0" />
                <span className="hidden md:inline">Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </Sidebar>

      <SidebarInset className="flex-1 flex flex-col bg-background overflow-auto w-full">
        <header className="sticky top-0 flex h-16 md:h-20 shrink-0 items-center justify-between px-4 md:px-8 z-50 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center gap-3 md:gap-0">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
            <h2 className="text-lg md:text-3xl font-bold text-white truncate">
              {activeNav === 'dashboard'
                ? 'Dashboard Utama'
                : isCreatingReturn && activeNav === 'returns'
                  ? 'Pengajuan Retur Baru'
                  : navItems.find((item) => item.value === activeNav)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <QuickActions lowStockCount={3} pendingReturnsCount={2} onNavigate={handleNavChange} />
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 md:hidden z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-16 left-0 w-64 h-[calc(100vh-64px)] bg-slate-900 border-r border-slate-700 transform transition-transform duration-200 md:hidden z-40 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4 space-y-2">
            <button
              onClick={() => handleNavChange('dashboard')}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors text-left text-white"
            >
              <Package2 className="w-5 h-5 flex-shrink-0" />
              <span>GudangMas</span>
            </button>
            <div className="h-px bg-slate-700 my-2" />
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.value}
                  onClick={() => handleNavChange(item.value)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeNav === item.value
                      ? 'bg-orange-500 text-white'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>

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
