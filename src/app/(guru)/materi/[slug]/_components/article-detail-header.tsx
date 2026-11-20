import Image from 'next/image'
import { Clock, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import type { ArticleDetailData } from './types'

interface ArticleDetailHeaderProps {
  article: ArticleDetailData
}

export function ArticleDetailHeader({ article }: ArticleDetailHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge
            variant={
              article.category === 'DISLEKSIA'
                ? 'disleksia'
                : article.category === 'DISGRAFIA'
                  ? 'disgrafia'
                  : article.category === 'DISKALKULIA'
                    ? 'diskalkulia'
                    : 'secondary'
            }
          >
            {article.category}
          </Badge>
          <span className="text-xs text-[#49769F] flex items-center gap-1">
            <Clock className="h-3 w-3" /> Waktu Baca: {article.readingTime || '5 Menit'}
          </span>
          <span className="text-xs text-[#49769F]">•</span>
          <span className="text-xs text-[#49769F]">
            {formatDate(article.createdAt)}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#001D39] leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center gap-2 pt-1 text-xs text-[#4E8EA2] font-semibold">
          <User className="h-3.5 w-3.5" />
          <span>Oleh: {article.author}</span>
        </div>
      </div>

      {article.coverImage && (
        <div className="rounded-2xl overflow-hidden shadow-md max-h-[380px] w-full">
          <Image
            src={article.coverImage}
            alt={article.title}
            width={1200}
            height={400}
            unoptimized
            className="w-full h-full object-cover max-h-[380px]"
          />
        </div>
      )}
    </div>
  )
}
