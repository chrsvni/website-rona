import type React from 'react'
import { Input } from '@/components/ui/input'
import type { ScreeningIndicator } from '@/lib/screening-data'
import type { IndicatorAnswers } from '../types'

interface Step3BehaviorObservationProps {
  relevantIndicators: ScreeningIndicator[]
  answers: IndicatorAnswers
  setAnswers: React.Dispatch<React.SetStateAction<IndicatorAnswers>>
}

export function Step3BehaviorObservation({
  relevantIndicators,
  answers,
  setAnswers,
}: Step3BehaviorObservationProps) {
  const handleScoreChange = (indicatorId: string, scoreVal: number) => {
    setAnswers((prev) => ({
      ...prev,
      [indicatorId]: {
        ...prev[indicatorId],
        score: scoreVal,
      },
    }))
  }

  const handleNoteChange = (indicatorId: string, noteVal: string) => {
    setAnswers((prev) => ({
      ...prev,
      [indicatorId]: {
        ...prev[indicatorId],
        note: noteVal,
      },
    }))
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-[#BDD8E9]/40 pb-4">
        <h3 className="text-lg font-bold text-[#001D39]">
          Langkah 3: Lembar Observasi Perilaku Siswa
        </h3>
        <p className="text-xs text-[#49769F]">
          Amati secara objektif saat tugas berlangsung. Berikan nilai skala 1
          hingga 4 untuk setiap indikator perilaku berikut.
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-3 text-[11px] font-medium text-[#0A4174]">
          <span className="px-2 py-0.5 rounded bg-white border border-[#BDD8E9]">
            1 = Tidak Pernah / Sangat Jarang
          </span>
          <span className="px-2 py-0.5 rounded bg-white border border-[#BDD8E9]">
            2 = Kadang-Kadang
          </span>
          <span className="px-2 py-0.5 rounded bg-white border border-[#BDD8E9]">
            3 = Sering Tampak
          </span>
          <span className="px-2 py-0.5 rounded bg-white border border-[#BDD8E9]">
            4 = Selalu / Sangat Konsisten
          </span>
        </div>
      </div>

      {/* Daftar Indikator Observasi */}
      <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2">
        {relevantIndicators.map((ind) => {
          const currentScore = answers[ind.id]?.score || 2
          return (
            <div
              key={ind.id}
              className="p-4 rounded-2xl bg-white/70 border border-[#BDD8E9]/60 hover:border-[#4E8EA2] transition-colors space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#e8f3fa] text-[#0A4174]">
                      {ind.code}
                    </span>
                    <h4 className="text-sm font-bold text-[#001D39]">
                      {ind.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#49769F]">{ind.description}</p>
                </div>

                {/* Skala Tombol 1 - 4 */}
                <div className="flex items-center gap-1.5 self-end sm:self-center">
                  {[1, 2, 3, 4].map((scoreVal) => (
                    <button
                      key={scoreVal}
                      type="button"
                      onClick={() => handleScoreChange(ind.id, scoreVal)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                        currentScore === scoreVal
                          ? 'bg-[#0A4174] text-white shadow-md scale-105'
                          : 'bg-white text-[#49769F] border border-[#BDD8E9] hover:bg-[#e8f3fa]'
                      }`}
                    >
                      {scoreVal}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#BDD8E9]/30">
                <Input
                  placeholder="Catatan perilaku spesifik saat tugas (opsional)..."
                  className="h-8 text-xs bg-white/50"
                  value={answers[ind.id]?.note || ''}
                  onChange={(e) => handleNoteChange(ind.id, e.target.value)}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
