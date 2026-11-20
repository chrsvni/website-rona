import { Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { ScreeningDetailItem } from './types'

interface HasilKopSuratProps {
  screening: ScreeningDetailItem
}

export function HasilKopSurat({ screening }: HasilKopSuratProps) {
  return (
    <div className="border-b-2 border-[#0A4174] pb-6 flex items-start justify-between">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-[#0A4174] text-white flex items-center justify-center font-black text-2xl shadow-md">
          <Sparkles className="h-9 w-9 text-[#7BBDE8]" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#001D39] tracking-tight">
            RONA DIAGNOSTIK
          </h2>
          <p className="text-xs font-bold uppercase tracking-wider text-[#4E8EA2]">
            Sistem Deteksi Dini & Observasi Kesulitan Belajar Siswa
          </p>
          <p className="text-[11px] text-[#49769F]">
            {screening.student.schoolName} • Unit Bimbingan Belajar Inklusif
          </p>
        </div>
      </div>
      <div className="text-right">
        <span className="text-[10px] uppercase font-bold text-[#49769F] block">
          No. Registrasi Skrining
        </span>
        <span className="text-xs font-mono font-bold text-[#0A4174]">
          {screening.id.toUpperCase()}
        </span>
        <div className="mt-1">
          <Badge
            variant={
              screening.riskLevel === 'Tinggi'
                ? 'destructive'
                : screening.riskLevel === 'Sedang'
                  ? 'warning'
                  : 'success'
            }
          >
            Risiko: {screening.riskLevel}
          </Badge>
        </div>
      </div>
    </div>
  )
}
