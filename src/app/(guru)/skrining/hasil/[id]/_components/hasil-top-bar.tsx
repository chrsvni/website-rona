import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PrintButton } from '../print-button'

interface HasilTopBarProps {
  studentId: string
}

export function HasilTopBar({ studentId }: HasilTopBarProps) {
  return (
    <div className="no-print flex items-center justify-between">
      <Link href="/skrining">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1.5 text-xs"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Kembali ke Skrining
        </Button>
      </Link>
      <div className="flex items-center gap-2">
        <Link href={`/siswa/${studentId}`}>
          <Button
            variant="outline"
            size="sm"
            className="text-xs rounded-full"
          >
            Lihat Profil Siswa
          </Button>
        </Link>
        <PrintButton />
      </div>
    </div>
  )
}
