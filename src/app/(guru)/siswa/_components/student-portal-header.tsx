import { Users, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface StudentPortalHeaderProps {
  homeroomClass?: string | null
  onOpenAdd: () => void
}

export function StudentPortalHeader({
  homeroomClass,
  onOpenAdd,
}: StudentPortalHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A4174] uppercase tracking-wider mb-1">
          <Users className="h-3.5 w-3.5" />
          <span>Manajemen Peserta Didik</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#001D39]">
          Data Siswa & Riwayat Skrining
        </h1>
        <p className="text-xs sm:text-sm text-[#49769F]">
          Pantau profil, perkembangan observasi harian, dan riwayat skrining
          kesulitan belajar siswa{' '}
          <strong className="text-[#001D39] font-bold">
            {homeroomClass || 'kelas binaan Anda'}
          </strong>
          .
        </p>
      </div>

      <Button
        onClick={onOpenAdd}
        size="sm"
        className="bg-[#0A4174] hover:bg-[#001D39] text-white rounded-full px-5 text-xs font-bold shadow-md flex items-center gap-1.5 h-10"
      >
        <Plus className="h-4 w-4" />
        <span>Tambah Siswa Baru</span>
      </Button>
    </div>
  )
}
