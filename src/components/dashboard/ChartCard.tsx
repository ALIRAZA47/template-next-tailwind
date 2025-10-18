import { Card } from '@/components/ui/Card'
import { cn } from '@/utils/cn'

interface ChartCardProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  actions?: React.ReactNode
}

export function ChartCard({
  title,
  description,
  children,
  className,
  actions,
}: ChartCardProps) {
  return (
    <Card className={cn('p-6', className)}>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div>{actions}</div>}
      </div>
      <div>{children}</div>
    </Card>
  )
}

