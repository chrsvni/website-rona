import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function MateriPortalHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A4174] uppercase tracking-wider mb-1">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Pusat Literasi & Rujukan Pedagogis</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#001D39]">
          Fakta & Edukasi Kesulitan Belajar
        </h1>
        <p className="text-xs sm:text-sm text-[#49769F]">
          Koleksi rujukan terkurasi dari jurnal ilmiah terpercaya, artikel
          kesehatan anak, dan pedoman resmi Kemdikbudristek.
        </p>
      </div>

      <Link href="/skrining">
        <Button
          size="sm"
          className="bg-[#0A4174] hover:bg-[#001D39] text-white rounded-full px-5 text-xs font-bold shadow-md"
        >
          Mulai Skrining Observasi
        </Button>
      </Link>
    </div>
  )
}
