import { Info } from 'lucide-react'
import { CATEGORY_OPTIONS, type ScreeningCategory } from './types'

interface ScreeningCategoryTabsProps {
  category: ScreeningCategory
  currentStep: number
  onCategoryChange: (category: ScreeningCategory) => void
}

export function ScreeningCategoryTabs({
  category,
  currentStep,
  onCategoryChange,
}: ScreeningCategoryTabsProps) {
  const isLocked = currentStep > 2

  return (
    <div className="glass-panel p-4 rounded-3xl space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {CATEGORY_OPTIONS.map((m) => {
            const active = category === m.value
            return (
              <button
                key={m.value}
                type="button"
                disabled={isLocked}
                onClick={() => onCategoryChange(m.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  active
                    ? 'bg-[#0A4174] text-white shadow-sm'
                    : 'bg-white/80 text-[#001D39] hover:bg-[#e8f3fa] border border-[#BDD8E9]/60'
                } ${isLocked ? 'cursor-not-allowed opacity-75' : ''}`}
              >
                {m.label}
              </button>
            )
          })}
        </div>

        <div className="text-xs text-[#49769F] flex items-center gap-1.5">
          <Info className="h-3.5 w-3.5 text-[#0A4174]" />
          <span>
            {isLocked
              ? 'Modul terkunci selama pengisian lembar observasi.'
              : 'Pilih modul kesulitan belajar sebelum melanjutkan observasi.'}
          </span>
        </div>
      </div>
    </div>
  )
}
