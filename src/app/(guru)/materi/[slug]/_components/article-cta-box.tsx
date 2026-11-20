import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { ArticleDetailData } from './types'

interface ArticleCtaBoxProps {
  article: ArticleDetailData
}

export function ArticleCtaBox({ article }: ArticleCtaBoxProps) {
  const screeningCategory =
    article.category === 'UMUM' ? 'DISLEKSIA' : article.category

  return (
    <div className="mt-8 pt-6 border-t border-[#BDD8E9]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#f0f7fd] p-5 rounded-2xl border border-[#7BBDE8]/40">
      <div>
        <h4 className="text-sm font-bold text-[#001D39]">
          Amati Indikasi Ini pada Murid di Kelas Anda
        </h4>
        <p className="text-xs text-[#49769F]">
          Gunakan lembar observasi tugas terstandar Rona untuk mencatat
          perilaku belajar siswa.
        </p>
      </div>
      <Link href={`/skrining?category=${screeningCategory}`}>
        <Button
          size="sm"
          className="bg-[#0A4174] hover:bg-[#001D39] text-white rounded-full text-xs px-5"
        >
          Mulai Skrining Sekarang
        </Button>
      </Link>
    </div>
  )
}
