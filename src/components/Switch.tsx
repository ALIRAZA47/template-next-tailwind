import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/cn'

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onCheckedChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onCheckedChange?.(e.target.checked)
    }

    return (
      <label className="inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          ref={ref}
          checked={checked}
          onChange={handleChange}
          {...props}
        />
        <div
          className={cn(
            'relative h-5 w-9 rounded-full bg-gray-300 transition-colors peer-checked:bg-blue-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 dark:bg-gray-700',
            className
          )}
        >
          <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-md transition-transform peer-checked:translate-x-4" />
        </div>
      </label>
    )
  }
)

Switch.displayName = 'Switch'

