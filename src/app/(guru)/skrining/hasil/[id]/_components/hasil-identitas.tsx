import { formatDate } from '@/lib/utils'
import type { ScreeningDetailItem } from './types'

interface HasilIdentitasProps {
  screening: ScreeningDetailItem
}

export function HasilIdentitas({ screening }: HasilIdentitasProps) {
  return (
    <>
      {/* JUDUL SERTIFIKAT */}
      <div className="text-center space-y-1">
        <h1 className="text-xl sm:text-2xl font-extrabold uppercase tracking-wide text-[#001D39]">
          KARTU HASIL OBSERVASI & SKRINING INDIKASI BELAJAR
        </h1>
        <p className="text-xs text-[#49769F]">
          Dokumen resmi rekam observasi pedagogis guru untuk deteksi dini
          kebutuhan khusus.
        </p>
      </div>

      {/* IDENTITAS SISWA & GURU */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#f4f8fb] border border-[#BDD8E9]/60 text-xs">
        <div className="space-y-1.5">
          <h4 className="font-bold text-[#0A4174] uppercase text-[11px]">
            Identitas Siswa
          </h4>
          <div className="grid grid-cols-3 gap-1">
            <span className="text-[#49769F]">Nama Siswa:</span>
            <span className="col-span-2 font-bold text-[#001D39]">
              {screening.student.name}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            <span className="text-[#49769F]">Kelas:</span>
            <span className="col-span-2 font-medium">
              {screening.student.className}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            <span className="text-[#49769F]">Usia/Gender:</span>
            <span className="col-span-2 font-medium">
              {screening.student.age || '-'} Tahun • {screening.student.gender}
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <h4 className="font-bold text-[#0A4174] uppercase text-[11px]">
            Informasi Observasi
          </h4>
          <div className="grid grid-cols-3 gap-1">
            <span className="text-[#49769F]">Guru Pengamat:</span>
            <span className="col-span-2 font-bold text-[#001D39]">
              {screening.teacher.name}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            <span className="text-[#49769F]">NIP Guru:</span>
            <span className="col-span-2 font-medium">
              {screening.teacher.nip || '-'}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            <span className="text-[#49769F]">Modul Skrining:</span>
            <span className="col-span-2 font-bold text-[#0A4174]">
              {screening.category}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            <span className="text-[#49769F]">Tanggal Selesai:</span>
            <span className="col-span-2 font-medium">
              {formatDate(screening.completedAt)}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
