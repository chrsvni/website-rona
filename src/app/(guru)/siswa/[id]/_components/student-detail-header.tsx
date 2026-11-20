import { School, Phone } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { StudentDetailData } from './types'

interface StudentDetailHeaderProps {
  student: StudentDetailData
}

export function StudentDetailHeader({ student }: StudentDetailHeaderProps) {
  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/80 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-[#0A4174] to-[#4E8EA2] text-white flex items-center justify-center font-black text-3xl shadow-xl shadow-[#0A4174]/20">
            {student.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-[#001D39]">
                {student.name}
              </h1>
              <Badge variant="secondary">{student.className}</Badge>
            </div>
            <p className="text-xs text-[#49769F]">
              {student.gender} • Usia {student.age || 8} Tahun
            </p>
            <p className="text-xs text-[#49769F] flex items-center gap-1">
              <School className="h-3.5 w-3.5 text-[#4E8EA2]" />{' '}
              {student.schoolName}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#e8f3fa] border border-[#7BBDE8]/40 text-xs space-y-1 sm:max-w-xs w-full">
          <span className="font-bold text-[#0A4174] block">
            Kontak Wali Murid
          </span>
          <p className="font-semibold text-[#001D39]">
            {student.parentName || 'Belum terdata'}
          </p>
          <p className="text-[#49769F] flex items-center gap-1">
            <Phone className="h-3 w-3" />{' '}
            {student.contactNumber || 'Tidak ada nomor'}
          </p>
        </div>
      </div>

      {student.notes && (
        <div className="mt-6 pt-4 border-t border-[#BDD8E9]/50 text-xs text-[#001D39] bg-white/60 p-3.5 rounded-xl border">
          <strong className="text-[#0A4174]">Catatan Awal Guru: </strong>
          <span className="text-[#49769F]">{student.notes}</span>
        </div>
      )}
    </div>
  )
}
