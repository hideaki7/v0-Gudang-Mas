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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DashboardContent } from '@/components/dashboard-content'
import { Package2, Users, Truck, RotateCcw, BarChart3, Menu, Settings, LogOut } from 'lucide-react'

const navItems = [
  { icon: Package2, label: 'Inventory', value: 'inventory' },
  { icon: Users, label: 'Suppliers', value: 'suppliers' },
  { icon: Truck, label: 'Incoming Goods', value: 'incoming' },
  { icon: RotateCcw, label: 'Returns', value: 'returns' },
  { icon: BarChart3, label: 'Reports', value: 'reports' },
]

export function Dashboard() {
  const [activeNav, setActiveNav] = useState('inventory')

  return (
    <div className="flex h-screen bg-background">
      <Sidebar className="bg-white border-r border-border">
        <SidebarHeader className="border-b border-border p-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Package2 className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold text-lg text-foreground">GudangMas</h1>
              <p className="text-xs text-muted-foreground">Warehouse Manager</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="flex-1">
          <SidebarMenu className="space-y-2 px-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    onClick={() => setActiveNav(item.value)}
                    className={`w-full justify-start px-4 py-2 rounded-lg transition-colors ${
                      activeNav === item.value
                        ? 'bg-primary text-white'
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
              <SidebarMenuButton className="w-full justify-start px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors">
                <Settings className="w-5 h-5 mr-3" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="w-full justify-start px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors">
                <LogOut className="w-5 h-5 mr-3" />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </Sidebar>

      <SidebarInset className="flex-1 flex flex-col bg-background overflow-auto">
        <header className="sticky top-0 flex h-16 shrink-0 items-center justify-between border-b border-border bg-white px-6 z-40">
          <h2 className="text-2xl font-bold text-foreground">
            {navItems.find((item) => item.value === activeNav)?.label}
          </h2>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <Menu className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <DashboardContent activeNav={activeNav} />
        </main>
      </SidebarInset>
    </div>
  )
}
