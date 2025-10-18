'use client'

import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { useSidebarStore } from '@/store/sidebarStore'
import { ROUTES } from '@/constants/routes.const'
import { cn } from '@/utils/cn'

export function AppLayout() {
  const { isCollapsed, width } = useSidebarStore()
  const location = useLocation()
  const isChatPage = location.pathname === ROUTES.CHAT

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div
        style={{ marginLeft: isCollapsed ? '64px' : `${width}px` }}
        className={cn(
          'flex flex-1 flex-col transition-all duration-300 min-w-0'
        )}
      >
        <Header />
        <main className={cn(
          'flex-1 overflow-hidden',
          !isChatPage && 'overflow-y-auto p-6'
        )}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

