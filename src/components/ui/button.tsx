import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-[#0A4174] to-[#4E8EA2] text-white shadow-md shadow-[#0A4174]/20 hover:opacity-95 hover:shadow-lg hover:shadow-[#0A4174]/30',
        destructive: 'bg-red-600 text-white shadow-sm hover:bg-red-700',
        outline:
          'border-2 border-[#6EA2B3]/40 bg-white/60 text-[#001D39] hover:bg-[#e8f3fa] hover:border-[#4E8EA2]',
        secondary: 'bg-[#e8f3fa] text-[#0A4174] hover:bg-[#d6eaf5]',
        ghost: 'text-[#001D39] hover:bg-black/5 hover:text-[#0A4174]',
        link: 'text-[#0A4174] underline-offset-4 hover:underline',
        pill: 'bg-[#4E8EA2] text-white hover:bg-[#0A4174] shadow-sm',
        careplus:
          'bg-[#0A4174] text-white rounded-xl shadow-md hover:bg-[#001D39]',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 rounded-full px-4 text-xs',
        lg: 'h-12 rounded-full px-8 text-base',
        icon: 'h-10 w-10 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
