import { ExternalLink } from 'lucide-react'
import type { ArticleDetailData } from './types'

interface ArticleSourceBoxProps {
  article: ArticleDetailData
}

export function ArticleSourceBox({ article }: ArticleSourceBoxProps) {
  if (!article.sourceUrl) return null

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0A4174] to-[#4E8EA2] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
      <div>
        <p className="text-xs font-semibold text-[#BDD8E9]">
          Referensi Ilmiah / Pedoman Eksternal
        </p>
        <p className="text-sm font-bold">
          Rujukan bersumber langsung dari: {article.author}{' '}
          {article.publishedDate ? `(${article.publishedDate})` : ''}
        </p>
      </div>
      <a
        href={article.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 bg-white text-[#0A4174] hover:bg-[#7BBDE8] hover:text-[#001D39] px-4 py-2 rounded-xl text-xs font-bold transition-colors shrink-0"
      >
        <span>Buka Dokumen / Situs Asli</span>
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  )
}
