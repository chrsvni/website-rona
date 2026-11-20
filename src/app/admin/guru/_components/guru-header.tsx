import Link from 'next/link'
import { ArrowLeft, GraduationCap, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface GuruHeaderProps {
  onOpenAdd: () => void
}

export function GuruHeader({ onOpenAdd }: GuruHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#BDD8E9]/60 pb-6">
      <div className="space-y-1.5">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4E8EA2] hover:text-[#0A4174] transition-colors mb-1"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Dashboard Utama</span>
        </Link>
        <div className="flex items-center gap-2.5">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#0A4174] to-[#4E8EA2] flex items-center justify-center text-white shadow-md shadow-[#0A4174]/20">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#001D39] tracking-tight">
              Kelola Akun Guru & Wali Kelas
            </h1>
            <p className="text-xs sm:text-sm text-[#49769F]">
              Terbitkan akun guru resmi dengan standar 18 digit NIP dan
              penugasan wali kelas agar guru fokus pada siswa binaannya
              sendiri.
            </p>
          </div>
        </div>
      </div>

      <Button
        onClick={onOpenAdd}
        className="bg-gradient-to-r from-[#0A4174] to-[#4E8EA2] hover:opacity-95 text-white font-semibold text-xs sm:text-sm h-11 px-5 rounded-2xl shadow-md flex items-center gap-2 shrink-0 self-start md:self-center"
      >
        <Plus className="h-4 w-4" />
        <span>Buat Akun Guru Baru</span>
      </Button>
    </div>
  )
}
