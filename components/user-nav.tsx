'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Settings, LogOut, Globe, Moon, Sun } from 'lucide-react'

export function UserNav() {
  const { theme, setTheme } = useTheme()
  const [language, setLanguage] = useState('id')

  return (
    <DropdownMenu>
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-lg hover:bg-secondary transition-all duration-200"
        asChild
      >
        <div className="cursor-pointer">
          <Settings className="h-5 w-5 text-accent" />
        </div>
      </Button>

      <DropdownMenuContent align="end" className="w-56 bg-card backdrop-blur-xl border border-border rounded-lg">
        {/* Profil Grup */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-accent font-semibold">Profil Saya</DropdownMenuLabel>
          <div className="px-2 py-2 text-sm">
            <div className="font-medium text-foreground">Samuel Hideaki</div>
            <div className="text-xs text-muted-foreground">Admin Gudang</div>
          </div>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-border" />

        {/* Bahasa */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-accent font-semibold flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Bahasa
          </DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={language === 'id'}
            onCheckedChange={() => setLanguage('id')}
            className="cursor-pointer"
          >
            Bahasa Indonesia
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={language === 'en'}
            onCheckedChange={() => setLanguage('en')}
            className="cursor-pointer"
          >
            English
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-border" />

        {/* Tema */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-accent font-semibold">Tema</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={theme === 'dark'}
            onCheckedChange={() => setTheme('dark')}
            className="cursor-pointer"
          >
            <Moon className="w-4 h-4 mr-2" />
            Dark Mode (Default)
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={theme === 'light'}
            onCheckedChange={() => setTheme('light')}
            className="cursor-pointer"
          >
            <Sun className="w-4 h-4 mr-2" />
            Light Mode
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-border" />

        {/* Logout */}
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-destructive cursor-pointer focus:text-destructive focus:bg-destructive/10">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
