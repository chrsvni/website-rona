import { formatDate } from '@/lib/utils'
import type { ScreeningDetailItem } from './types'

interface HasilPengesahanProps {
  screening: ScreeningDetailItem
}

export function HasilPengesahan({ screening }: HasilPengesahanProps) {
  return (
    <>
      {/* LEMBAR PENGESAHAN / TANDA TANGAN */}
      <div className="pt-8 border-t border-[#BDD8E9]/80 grid grid-cols-2 gap-8 text-center text-xs">
        <div className="space-y-14">
          <p className="text-[#49769F]">
            Mengetahui,
            <br />
            Kepala Sekolah
          </p>
          <div>
            <p className="font-bold text-[#001D39] underline">
              Drs. H. Mulyadi, M.Pd.
            </p>
            <p className="text-[10px] text-[#49769F]">
              NIP. 196803151994031004
            </p>
          </div>
        </div>

        <div className="space-y-14">
          <p className="text-[#49769F]">
            Jakarta, {formatDate(screening.completedAt)}
            <br />
            Guru Pengamat Kelas
          </p>
          <div>
            <p className="font-bold text-[#001D39] underline">
              {screening.teacher.name}
            </p>
            <p className="text-[10px] text-[#49769F]">
              NIP. {screening.teacher.nip || '-'}
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER DISCLAIMER */}
      <div className="pt-4 border-t border-[#BDD8E9]/40 text-[10px] text-[#49769F] text-center">
        * Catatan: Kartu ini adalah instrumen skrining deteksi dini observasi
        pedagogis guru di sekolah dasar dan bukan pengganti diagnosis medis
        resmi.
      </div>
    </>
  )
}
