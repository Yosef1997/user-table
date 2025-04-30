'use client'

import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { SidebarTrigger } from './ui/sidebar'

const Header = () => {
  const { setTheme, theme } = useTheme()

  return (
    <header className=' flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
      <SidebarTrigger variant={'outline'} size='icon' />
      <Button
        variant='outline'
        size='icon'
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
        <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
        <span className='sr-only'>Toggle theme</span>
      </Button>
    </header>
  )
}

export default Header
