'use client'

import { useRouter } from 'next/navigation'
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
import { Check, LogOut, Moon, Sun } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

// Menerima children agar bisa membungkus tombol sidebar yang sudah ada
export function UserNav({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    // signOut akan clear semua cookie/token, termasuk token yang expired
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>

      {/* Muncul ke samping kanan sidebar agar tidak menutupi menu */}
      <DropdownMenuContent
        side="right"
        align="end"
        className="w-64 bg-card backdrop-blur-xl border border-border rounded-xl p-2 shadow-2xl ml-2"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-accent font-bold px-3 py-2">Profil Saya</DropdownMenuLabel>
          <div className="px-3 pb-3">
            <div className="font-semibold text-foreground text-base">Samuel Hideaki</div>
            <div className="text-xs text-muted-foreground italic">Admin Gudang - ITS Warehouse</div>
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

        <DropdownMenuSeparator className="bg-border/50" />

        {/* Logout */}
        <DropdownMenuItem
          onSelect={handleSignOut}
          className="cursor-pointer rounded-lg mx-1 text-destructive focus:text-destructive focus:bg-destructive/10"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Keluar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}