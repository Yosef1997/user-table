'use client'
import AppSidebar from '@/components/AppSidebar'
import Header from '@/components/Header'
import { SidebarProvider } from '@/components/ui/sidebar'
import { useEffect, useState } from 'react'

const SIDEBAR_KEY = 'sidebar-open'

const DashboardTemplate: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const savedState = localStorage.getItem(SIDEBAR_KEY)
    if (savedState !== null) {
      setOpen(savedState === 'true')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(SIDEBAR_KEY, String(open))
  }, [open])

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <AppSidebar />
      <div className='relative flex flex-col flex-1 min-h-screen'>
        <Header />
        <main>{children}</main>
      </div>
    </SidebarProvider>
  )
}
export default DashboardTemplate
