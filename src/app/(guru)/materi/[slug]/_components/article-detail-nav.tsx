import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BookmarkButton } from '../../bookmark-button'
import type { ArticleDetailData } from './types'

interface ArticleDetailNavProps {
  article: ArticleDetailData
}

export function ArticleDetailNav({ article }: ArticleDetailNavProps) {
  const isBookmarked = article.bookmarks.length > 0
  const screeningCategory =
    article.category === 'UMUM' ? 'DISLEKSIA' : article.category

  return (
    <div className="flex items-center justify-between">
      <Link href="/materi">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1.5 text-xs text-[#001D39]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Kembali ke Semua Materi
        </Button>
      </Link>
      <div className="flex items-center gap-2">
        <BookmarkButton
          articleId={article.id}
          initialBookmarked={isBookmarked}
        />
        <Link href={`/skrining?category=${screeningCategory}`}>
          <Button
            size="sm"
            className="rounded-full text-xs bg-[#0A4174] hover:bg-[#001D39] text-white"
          >
            Observasi Modul Ini
          </Button>
        </Link>
      </div>
    </div>
  )
}
