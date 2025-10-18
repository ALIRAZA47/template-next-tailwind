'use client'

import { useState } from 'react'
import { Bell, Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { NotificationsPanel } from '@/components/common/NotificationsPanel'

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex items-center gap-4">
        <div className="hidden md:block">
          <h2 className="text-lg font-semibold">Welcome back!</h2>
          <p className="text-sm text-muted-foreground">Have a great day ahead</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Search Button */}
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-accent transition-colors"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-accent transition-colors"
          aria-label="Notifications"
          onClick={() => setShowNotifications(true)}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </Button>
      </div>

      {/* Notifications Panel */}
      <NotificationsPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </header>
  )
}

