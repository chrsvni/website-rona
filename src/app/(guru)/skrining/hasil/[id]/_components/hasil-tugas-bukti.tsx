import type { ScreeningDetailItem } from './types'

interface HasilTugasBuktiProps {
  screening: ScreeningDetailItem
}

export function HasilTugasBukti({ screening }: HasilTugasBuktiProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-bold uppercase tracking-wider text-[#0A4174]">
        1. Tugas Observasi & Catatan Bukti Pengerjaan
      </h3>
      <div className="p-4 rounded-xl border border-[#BDD8E9]/70 bg-white space-y-2 text-xs">
        <p className="font-bold text-[#001D39]">
          Tugas: {screening.taskName || '-'}
        </p>
        <p className="text-[#001D39] leading-relaxed">
          <strong className="text-[#49769F]">
            Bukti Tugas yang Dikerjakan:
          </strong>{' '}
          {screening.taskProofNotes || '-'}
        </p>
        {screening.taskProofUrl && (
          <p className="text-[11px] text-[#0A4174]">
            Tautan Lampiran:{' '}
            <span className="underline">{screening.taskProofUrl}</span>
          </p>
        )}
      </div>
    </div>
  )
}
