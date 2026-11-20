import type { ScreeningDetailItem } from './types'

interface HasilSkorRingkasanProps {
  screening: ScreeningDetailItem
}

export function HasilSkorRingkasan({ screening }: HasilSkorRingkasanProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-bold uppercase tracking-wider text-[#0A4174]">
        2. Ringkasan Skor & Persentase Indikasi
      </h3>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-3 rounded-xl bg-[#f0f7fc] border border-[#BDD8E9]">
          <span className="text-[10px] text-[#49769F] block">
            Total Skor Perilaku
          </span>
          <span className="text-lg font-black text-[#001D39]">
            {screening.totalScore} / {screening.maxPossibleScore}
          </span>
        </div>
        <div className="p-3 rounded-xl bg-[#f0f7fc] border border-[#BDD8E9]">
          <span className="text-[10px] text-[#49769F] block">
            Persentase Hambatan
          </span>
          <span className="text-lg font-black text-[#0A4174]">
            {screening.percentageScore}%
          </span>
        </div>
        <div className="p-3 rounded-xl bg-[#f0f7fc] border border-[#BDD8E9]">
          <span className="text-[10px] text-[#49769F] block">
            Tingkat Risiko Ditetapkan
          </span>
          <span
            className={`text-lg font-black ${
              screening.riskLevel === 'Tinggi'
                ? 'text-rose-700'
                : screening.riskLevel === 'Sedang'
                  ? 'text-amber-700'
                  : 'text-emerald-700'
            }`}
          >
            {screening.riskLevel}
          </span>
        </div>
      </div>
    </div>
  )
}
