import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-[#0A4174] text-white hover:bg-[#001D39]',
        secondary: 'bg-[#e8f3fa] text-[#0A4174] border border-[#BDD8E9]',
        destructive: 'bg-rose-100 text-rose-800 border border-rose-200',
        outline: 'text-[#001D39] border border-[#BDD8E9]',
        success: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
        warning: 'bg-amber-100 text-amber-800 border border-amber-200',
        disleksia: 'bg-blue-100 text-[#0A4174] border border-[#7BBDE8]',
        disgrafia: 'bg-teal-100 text-[#4E8EA2] border border-[#6EA2B3]',
        diskalkulia: 'bg-indigo-100 text-[#49769F] border border-[#49769F]/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
