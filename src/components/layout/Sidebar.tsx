'use client'

import { Link, useLocation } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  
  ChevronLeft,
  ChevronRight,
  GripVertical,
  Layers,
  MessageSquare,
  Moon,
  Sun,
  LogOut,
  User
} from 'lucide-react'
import { useSidebarStore } from '@/store/sidebarStore'
import { useTheme } from '@/hooks/useTheme'
import { ThemeMode } from '@/types'
import { ROUTES } from '@/constants/routes.const'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Badge } from '@/components/dashboard/Badge'

interface NavItem {
  label: string
  path: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    label: 'Users',
    path: ROUTES.USERS,
    icon: <Users className="h-5 w-5" />,
  },
  {
    label: 'Analytics',
    path: ROUTES.ANALYTICS,
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    label: 'Chat',
    path: ROUTES.CHAT,
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    label: 'Components',
    path: ROUTES.COMPONENTS,
    icon: <Layers className="h-5 w-5" />,
  },
]

export function Sidebar() {
  const location = useLocation()
  const { isCollapsed, width, toggleCollapse, setWidth } = useSidebarStore()
  const { theme, setTheme } = useTheme()
  const [isResizing, setIsResizing] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  const toggleTheme = () => {
    const newTheme = theme === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK
    setTheme(newTheme)
  }

  const handleLogout = () => {
    console.log('Logging out...')
    // Add logout logic here
    setShowUserMenu(false)
  }

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserMenu])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return
      
      const newWidth = e.clientX
      if (newWidth >= 200 && newWidth <= 400) {
        setWidth(newWidth)
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    if (isResizing) {
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, setWidth])

  const handleMouseDown = () => {
    setIsResizing(true)
  }

  return (
    <aside
      ref={sidebarRef}
      style={{ width: isCollapsed ? '64px' : `${width}px` }}
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r bg-card transition-all duration-300',
        isResizing && 'transition-none'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4">
          {!isCollapsed && (
            <h1 className="text-xl font-bold">React App</h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapse}
            className="ml-auto"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <Separator />

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                  isCollapsed && 'justify-center'
                )}
              >
                {item.icon}
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-2 border-t">
          {/* User Profile */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={cn(
                'w-full flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent transition-colors',
                isCollapsed && 'justify-center px-2'
              )}
            >
              <Avatar className="h-8 w-8 ring-2 ring-primary/10">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">John Doe</p>
                  <Badge variant="success" size="sm">
                    Online
                  </Badge>
                </div>
              )}
            </button>

            {/* User Menu */}
            {showUserMenu && (
              <div
                className={cn(
                  'absolute bottom-full mb-2 w-48 bg-background border rounded-lg shadow-lg p-1 animate-in slide-in-from-bottom-2 z-50',
                  isCollapsed ? 'left-full ml-2' : 'left-0'
                )}
              >
                <Link
                  to={ROUTES.PROFILE}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded transition-colors"
                  onClick={() => setShowUserMenu(false)}
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
                <button
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded transition-colors"
                  onClick={() => {
                    toggleTheme()
                    setShowUserMenu(false)
                  }}
                >
                  {theme === ThemeMode.DARK ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                  Switch Theme
                </button>
                <Separator className="my-1" />
                <button
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-destructive hover:text-destructive-foreground rounded transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resize Handle */}
      {!isCollapsed && (
        <div
          className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary/50 active:bg-primary transition-colors group"
          onMouseDown={handleMouseDown}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </aside>
  )
}

