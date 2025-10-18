import { cn } from '@/utils/cn'

interface DataPoint {
  label: string
  value: number
}

interface SimpleChartProps {
  data: DataPoint[]
  type?: 'bar' | 'line'
  height?: number
  className?: string
}

export function SimpleChart({
  data,
  type = 'bar',
  height = 200,
  className,
}: SimpleChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value))

  if (type === 'bar') {
    return (
      <div className={cn('flex items-end justify-between gap-2', className)} style={{ height }}>
        {data.map((point, index) => {
          const barHeight = (point.value / maxValue) * 100
          return (
            <div key={index} className="flex flex-1 flex-col items-center gap-2">
              <div className="relative w-full flex-1">
                <div
                  className="absolute bottom-0 w-full rounded-t-md bg-primary transition-all duration-300 hover:opacity-80"
                  style={{ height: `${barHeight}%` }}
                  title={`${point.label}: ${point.value}`}
                />
              </div>
              <div className="text-xs text-muted-foreground">{point.label}</div>
            </div>
          )
        })}
      </div>
    )
  }

  // Simple line chart
  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - (point.value / maxValue) * 100
    return `${x},${y}`
  })

  return (
    <div className={cn('relative', className)} style={{ height }}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <polyline
          points={points.join(' ')}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <polyline
          points={`0,100 ${points.join(' ')} 100,100`}
          fill="hsl(var(--primary))"
          fillOpacity="0.1"
        />
      </svg>
      <div className="mt-2 flex justify-between">
        {data.map((point, index) => (
          <div key={index} className="text-xs text-muted-foreground">
            {point.label}
          </div>
        ))}
      </div>
    </div>
  )
}

