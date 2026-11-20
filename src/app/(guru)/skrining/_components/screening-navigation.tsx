import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ScreeningNavigationProps {
  currentStep: number
  isSubmitting: boolean
  savedScreeningId: string | null
  onPrev: () => void
  onNext: () => void
  onReturnToStudents: () => void
}

export function ScreeningNavigation({
  currentStep,
  isSubmitting,
  savedScreeningId,
  onPrev,
  onNext,
  onReturnToStudents,
}: ScreeningNavigationProps) {
  return (
    <div className="pt-6 mt-6 border-t border-[#BDD8E9]/40 flex items-center justify-between">
      <Button
        variant="ghost"
        size="sm"
        disabled={currentStep === 1 || isSubmitting}
        onClick={onPrev}
        className="flex items-center gap-1.5 text-xs text-[#001D39]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Kembali
      </Button>

      {currentStep < 5 && (
        <Button
          size="sm"
          onClick={onNext}
          className="bg-gradient-to-r from-[#0A4174] to-[#4E8EA2] text-white rounded-full px-5 text-xs font-bold shadow-md flex items-center gap-1.5"
        >
          <span>
            {currentStep === 4 ? 'Kalkulasi Rekomendasi Sistem' : 'Lanjutkan'}
          </span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      )}

      {currentStep === 5 && savedScreeningId && (
        <Button
          size="sm"
          variant="outline"
          onClick={onReturnToStudents}
          className="rounded-full text-xs"
        >
          Kembali ke Data Siswa
        </Button>
      )}
    </div>
  )
}
