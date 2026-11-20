import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function StudentDetailNav() {
  return (
    <div className="flex items-center justify-between">
      <Link href="/siswa">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1.5 text-xs text-[#001D39]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Kembali ke Daftar Siswa
        </Button>
      </Link>
      <Link href="/skrining">
        <Button
          size="sm"
          className="rounded-full text-xs bg-[#0A4174] hover:bg-[#001D39] text-white"
        >
          Skrining Baru untuk Siswa Ini
        </Button>
      </Link>
    </div>
  )
}
