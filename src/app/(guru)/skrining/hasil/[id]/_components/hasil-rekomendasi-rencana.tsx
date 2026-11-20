import { Sparkles } from 'lucide-react'
import type { ScreeningDetailItem } from './types'

interface HasilRekomendasiRencanaProps {
  screening: ScreeningDetailItem
}

export function HasilRekomendasiRencana({
  screening,
}: HasilRekomendasiRencanaProps) {
  return (
    <>
      {/* REKOMENDASI SISTEM RESMI */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-[#0A4174]" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0A4174]">
            3. Rekomendasi Resmi Sistem Rona (Algoritma Terstandar)
          </h3>
        </div>
        <div className="p-4 rounded-xl border border-[#7BBDE8] bg-[#f0f7fd] text-xs text-[#001D39] leading-relaxed">
          <p className="whitespace-pre-line">
            {screening.systemRecommendation || '-'}
          </p>
        </div>
      </div>

      {/* RENCANA TINDAK LANJUT */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#0A4174]">
          4. Rencana Aksi Adaptasi & Akomodasi Belajar
        </h3>
        <div className="p-4 rounded-xl border border-[#BDD8E9] bg-white text-xs text-[#001D39] space-y-1.5 whitespace-pre-line leading-relaxed">
          {screening.actionPlan || '-'}
        </div>
      </div>

      {/* CATATAN HARIAN & EMOSIONAL */}
      {screening.dailyIndication && (
        <div className="space-y-1 text-xs text-[#49769F]">
          <span className="font-bold text-[#001D39]">
            Catatan Indikasi Harian:
          </span>
          <p>{screening.dailyIndication}</p>
        </div>
      )}
    </>
  )
}
