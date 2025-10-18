import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { cn } from '@/utils/cn'

export interface Activity {
  id: string
  user: {
    name: string
    avatar?: string
    initials?: string
  }
  action: string
  target?: string
  timestamp: string | Date
  type?: 'info' | 'success' | 'warning' | 'error'
}

interface ActivityFeedProps {
  activities: Activity[]
  title?: string
  className?: string
}

export function ActivityFeed({
  activities,
  title = 'Recent Activity',
  className,
}: ActivityFeedProps) {
  const getTypeColor = (type?: Activity['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-500'
      case 'warning':
        return 'bg-yellow-500'
      case 'error':
        return 'bg-red-500'
      default:
        return 'bg-blue-500'
    }
  }

  const formatTimestamp = (timestamp: string | Date) => {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    
    return date.toLocaleDateString()
  }

  return (
    <Card className={cn('p-6', className)}>
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent activity</p>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  {activity.user.avatar ? (
                    <img
                      src={activity.user.avatar}
                      alt={activity.user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground text-sm">
                      {activity.user.initials || activity.user.name.charAt(0)}
                    </div>
                  )}
                </Avatar>
                <div
                  className={cn(
                    'absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background',
                    getTypeColor(activity.type)
                  )}
                />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user.name}</span>{' '}
                  {activity.action}
                  {activity.target && (
                    <span className="font-medium"> {activity.target}</span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatTimestamp(activity.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}

