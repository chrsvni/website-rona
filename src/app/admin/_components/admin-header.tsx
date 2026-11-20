import Link from 'next/link'
import { ShieldCheck, GraduationCap, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AdminHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A4174] uppercase tracking-wider mb-1">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Panel Manajemen Administrator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#001D39]">
          Dashboard Administrator Rona
        </h1>
        <p className="text-xs sm:text-sm text-[#49769F]">
          Kelola akun guru terdaftar, kurasi materi referensi internet, dan
          pantau rekam audit skrining siswa.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <Link href="/admin/guru">
          <Button className="bg-[#0A4174] hover:bg-[#001D39] text-white rounded-2xl text-xs sm:text-sm font-semibold h-11 px-4 shadow-md flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            <span>Kelola Guru</span>
          </Button>
        </Link>
        <Link href="/admin/materi">
          <Button className="bg-gradient-to-r from-[#0A4174] to-[#4E8EA2] hover:opacity-95 text-white rounded-2xl text-xs sm:text-sm font-semibold h-11 px-4 shadow-md flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Kelola Materi</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
