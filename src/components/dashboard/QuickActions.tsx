import { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

export interface QuickAction {
  id: string
  label: string
  icon: LucideIcon
  onClick: () => void
  variant?: 'default' | 'outline' | 'secondary' | 'ghost'
  disabled?: boolean
}

interface QuickActionsProps {
  actions: QuickAction[]
  title?: string
  className?: string
}

export function QuickActions({
  actions,
  title = 'Quick Actions',
  className,
}: QuickActionsProps) {
  return (
    <Card className={cn('p-6', className)}>
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Button
              key={action.id}
              variant={action.variant || 'outline'}
              onClick={action.onClick}
              disabled={action.disabled}
              className="h-auto flex-col gap-2 py-4"
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{action.label}</span>
            </Button>
          )
        })}
      </div>
    </Card>
  )
}

