import Link from 'next/link'
import { Sparkles, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ScreeningHeaderProps {
  teacherHomeroom?: string
}

export function ScreeningHeader({ teacherHomeroom }: ScreeningHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A4174] uppercase tracking-wider mb-1">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Alat Bantu Diagnostik Guru</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#001D39]">
          Skrining Deteksi Dini Siswa
        </h1>
        <p className="text-xs sm:text-sm text-[#49769F]">
          Panduan sistematis observasi tugas untuk mengidentifikasi kebutuhan
          belajar khusus siswa{' '}
          {teacherHomeroom ? (
            <strong className="text-[#001D39] font-bold">
              {teacherHomeroom}
            </strong>
          ) : (
            'kelas binaan Anda'
          )}
          .
        </p>
      </div>

      <Link href="/siswa">
        <Button
          size="sm"
          className="bg-[#0A4174] hover:bg-[#001D39] text-white rounded-full px-5 text-xs font-bold shadow-md flex items-center gap-1.5 h-10"
        >
          <Users className="h-4 w-4" />
          <span>Kelola Data Siswa</span>
        </Button>
      </Link>
    </div>
  )
}
