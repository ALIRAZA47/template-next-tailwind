'use client'

import { X, Bell, Check, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { Badge } from '@/components/dashboard/Badge'

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: 'info' | 'success' | 'warning' | 'error'
}

interface NotificationsPanelProps {
  isOpen: boolean
  onClose: () => void
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New message',
    message: 'Alice Johnson sent you a message',
    time: '5 min ago',
    read: false,
    type: 'info',
  },
  {
    id: '2',
    title: 'Task completed',
    message: 'Your report has been generated successfully',
    time: '1 hour ago',
    read: false,
    type: 'success',
  },
  {
    id: '3',
    title: 'System update',
    message: 'New version available for download',
    time: '2 hours ago',
    read: true,
    type: 'warning',
  },
  {
    id: '4',
    title: 'Meeting reminder',
    message: 'Team standup in 30 minutes',
    time: '3 hours ago',
    read: true,
    type: 'info',
  },
]

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 animate-in fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l shadow-2xl z-50 animate-in slide-in-from-right duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Notifications</h2>
              <Badge variant="error" size="sm">
                {mockNotifications.filter((n) => !n.read).length}
              </Badge>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 px-4 py-2 border-b">
            <Button variant="ghost" size="sm" className="text-xs">
              <Check className="h-3 w-3 mr-1" />
              Mark all read
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              <Trash2 className="h-3 w-3 mr-1" />
              Clear all
            </Button>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {mockNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <Bell className="h-12 w-12 mb-4 text-muted-foreground opacity-50" />
                <p className="text-sm text-muted-foreground">No notifications</p>
              </div>
            ) : (
              <div className="divide-y">
                {mockNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                      !notification.read && 'bg-muted/30'
                    }`}
                  >
                    <div className="flex gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          notification.type === 'success'
                            ? 'bg-green-500'
                            : notification.type === 'warning'
                            ? 'bg-yellow-500'
                            : notification.type === 'error'
                            ? 'bg-red-500'
                            : 'bg-blue-500'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-medium text-sm">{notification.title}</p>
                          {!notification.read && (
                            <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

