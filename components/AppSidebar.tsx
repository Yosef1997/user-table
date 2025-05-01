'use client'
import { Home, LogOut, Newspaper } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const menus = [
  {
    title: 'Dashboard',
    url: '/',
    icon: Home,
  },
  {
    title: 'Post',
    url: '/post',
    icon: Newspaper,
  },
]

const AppSidebar = () => {
  const router = useRouter()

  const logout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
      })

      if (res.ok) {
        router.push('/login')
      } else {
        const data = await res.json()
        toast(data.message || 'Login failed')
      }
    } catch (error) {
      console.error(error)
      toast('Something wrong with login')
    }
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menus.map((menu) => (
                <SidebarMenuItem key={menu.title}>
                  <SidebarMenuButton asChild>
                    <a href={menu.url}>
                      <menu.icon />
                      <span>{menu.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={logout}>
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
export default AppSidebar
