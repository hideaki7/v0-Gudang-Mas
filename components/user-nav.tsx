'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe, Moon, Sun } from 'lucide-react'

// Menerima children agar bisa membungkus tombol sidebar yang sudah ada
export function UserNav({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()
  const [language, setLanguage] = useState('id')

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

        {/* Pengaturan Bahasa */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-foreground font-semibold flex items-center gap-2 px-3">
            <Globe className="w-4 h-4 text-accent" />
            Bahasa
          </DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={language === 'id'}
            onCheckedChange={() => setLanguage('id')}
            className="cursor-pointer rounded-lg mx-1"
          >
            Bahasa Indonesia
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={language === 'en'}
            onCheckedChange={() => setLanguage('en')}
            className="cursor-pointer rounded-lg mx-1"
          >
            English
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-border/50" />

        {/* Pengaturan Tema */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-foreground font-semibold px-3">Tema Tampilan</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={theme === 'dark'}
            onCheckedChange={() => setTheme('dark')}
            className="cursor-pointer rounded-lg mx-1"
          >
            <Moon className="w-4 h-4 mr-2" />
            Dark Mode (Default)
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={theme === 'light'}
            onCheckedChange={() => setTheme('light')}
            className="cursor-pointer rounded-lg mx-1"
          >
            <Sun className="w-4 h-4 mr-2" />
            Light Mode
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}