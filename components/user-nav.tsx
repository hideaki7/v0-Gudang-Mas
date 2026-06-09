'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Check, Moon, Sun } from 'lucide-react'
import { useSidebar } from '@/components/ui/sidebar'
import { createClient } from '@/lib/supabase/client'

// Menerima children agar bisa membungkus tombol sidebar yang sudah ada
export function UserNav({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()
  const { isMobile } = useSidebar()
  const [userName, setUserName] = useState('Memuat...')
  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      const role = user?.user_metadata?.role
      if (role === 'supplier') {
        setUserName('Najib Fathir')
        setUserRole('Supplier')
      } else {
        // Default admin
        setUserName('Samuel Hideaki')
        setUserRole('Admin Gudang')
      }
    }
    loadUser()
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>

      {/* Muncul ke samping kanan sidebar di desktop, dan pop up di mobile */}
      <DropdownMenuContent
        side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={isMobile ? 8 : 0}
        className="w-56 md:w-64 bg-card backdrop-blur-xl border border-border rounded-xl p-2 shadow-2xl ml-0 md:ml-2"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-accent font-bold px-3 py-2">Profil Saya</DropdownMenuLabel>
          <div className="px-3 pb-3">
            <div className="font-semibold text-foreground text-base">{userName}</div>
            <div className="text-xs text-muted-foreground italic">{userRole}</div>
          </div>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-border/50" />

        {/* Pengaturan Tema */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-foreground font-semibold px-3">Tema Tampilan</DropdownMenuLabel>

          {/* Dark Mode */}
          <DropdownMenuItem
            onSelect={() => setTheme('dark')}
            className="cursor-pointer rounded-lg mx-1 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4" />
              <span>Dark Mode</span>
            </div>
            {theme === 'dark' && <Check className="w-4 h-4 text-accent" />}
          </DropdownMenuItem>

          {/* Light Mode */}
          <DropdownMenuItem
            onSelect={() => setTheme('light')}
            className="cursor-pointer rounded-lg mx-1 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4" />
              <span>Light Mode</span>
            </div>
            {theme === 'light' && <Check className="w-4 h-4 text-accent" />}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}