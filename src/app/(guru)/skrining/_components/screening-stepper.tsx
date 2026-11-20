import { Check } from 'lucide-react'
import { STEPS_HEADER } from './types'

interface ScreeningStepperProps {
  currentStep: number
}

export function ScreeningStepper({ currentStep }: ScreeningStepperProps) {
  const progressPercent = ((currentStep - 1) / 4) * 100

  return (
    <div className="glass-panel p-4 sm:p-6 rounded-3xl">
      <div className="relative flex items-center justify-between">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#BDD8E9]/50 w-full z-0" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-[#0A4174] to-[#4E8EA2] z-0 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />

        {STEPS_HEADER.map((s) => {
          const isDone = currentStep > s.num
          const isCurrent = currentStep === s.num
          return (
            <div
              key={s.num}
              className="relative z-10 flex flex-col items-center"
            >
              <div
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all shadow-md ${
                  isDone
                    ? 'bg-emerald-600 text-white'
                    : isCurrent
                      ? 'bg-[#0A4174] text-white ring-4 ring-[#7BBDE8]/40'
                      : 'bg-white text-[#49769F] border border-[#BDD8E9]'
                }`}
              >
                {isDone ? <Check className="h-4 w-4" /> : s.num}
              </div>
              <span
                className={`text-[10px] sm:text-xs mt-2 font-semibold text-center hidden md:block ${
                  isCurrent ? 'text-[#0A4174] font-bold' : 'text-[#49769F]'
                }`}
              >
                {s.title}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
