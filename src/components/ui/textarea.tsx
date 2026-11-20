import * as React from 'react'
import { cn } from '@/lib/utils'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[90px] w-full rounded-xl border border-[#BDD8E9] bg-white/80 px-4 py-3 text-sm text-[#001D39] shadow-sm placeholder:text-[#49769F]/60 focus-visible:outline-none focus-visible:border-[#0A4174] focus-visible:ring-2 focus-visible:ring-[#7BBDE8]/40 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
