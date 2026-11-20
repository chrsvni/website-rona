import Link from 'next/link'
import { ArrowRight, ExternalLink, Globe } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookmarkButton } from '../bookmark-button'
import type { PortalArticleItem } from './types'

interface MateriCardProps {
  article: PortalArticleItem
}

export function MateriCard({ article }: MateriCardProps) {
  const isBookmarked = article.bookmarks && article.bookmarks.length > 0
  const targetHref = article.sourceUrl || `/materi/${article.slug}`
  const isExternal = Boolean(article.sourceUrl)

  return (
    <div className="glass-card glass-card-hover rounded-3xl overflow-hidden flex flex-col justify-between border border-[#BDD8E9]/70 group transition-all">
      <div className="p-6 space-y-4">
        {/* Top Bar: Kategori & Status Referensi */}
        <div className="flex items-center justify-between gap-2">
          <Badge
            variant={
              article.category === 'DISLEKSIA'
                ? 'disleksia'
                : article.category === 'DISGRAFIA'
                  ? 'disgrafia'
                  : article.category === 'DISKALKULIA'
                    ? 'diskalkulia'
                    : 'outline'
            }
          >
            {article.category}
          </Badge>

          <div className="flex items-center gap-1.5">
            {isExternal && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#4E8EA2] bg-[#e8f3fa] px-2 py-0.5 rounded-full border border-[#BDD8E9]/50">
                <Globe className="h-3 w-3" />
                <span>Link Eksternal</span>
              </span>
            )}
            <BookmarkButton
              articleId={article.id}
              initialBookmarked={isBookmarked}
            />
          </div>
        </div>

        {/* Judul Artikel: Bisa langsung diklik ke sumber asli */}
        <h3 className="text-base font-bold text-[#001D39] leading-snug group-hover:text-[#0A4174] transition-colors">
          {isExternal ? (
            <a
              href={targetHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-start justify-between gap-2"
            >
              <span>{article.title}</span>
              <ExternalLink className="h-4 w-4 shrink-0 text-[#4E8EA2] mt-0.5 group-hover:text-[#0A4174]" />
            </a>
          ) : (
            <Link href={targetHref} className="hover:underline">
              {article.title}
            </Link>
          )}
        </h3>

        {/* Ringkasan Singkat */}
        <p className="text-xs text-[#49769F] line-clamp-3 leading-relaxed">
          {article.excerpt ||
            'Klik tautan di bawah untuk membaca artikel referensi lengkap dari sumber rujukan asli.'}
        </p>

        {/* Sumber & Tahun */}
        <div className="pt-2 border-t border-[#BDD8E9]/40 flex items-center justify-between text-[11px] text-[#4E8EA2]">
          <div className="font-semibold truncate max-w-[190px]">
            Sumber: <span className="text-[#001D39]">{article.author}</span>
          </div>
          {article.publishedDate && (
            <span className="text-[#49769F] shrink-0 font-medium">
              Tahun: {article.publishedDate}
            </span>
          )}
        </div>
      </div>

      {/* Footer Kartu dengan Tombol Jelas */}
      <div className="p-4 bg-[#f0f7fc]/70 border-t border-[#BDD8E9]/50 flex items-center justify-between">
        {isExternal ? (
          <a
            href={targetHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-[#0A4174] hover:text-[#001D39] inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Buka Sumber Asli</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : (
          <Link
            href={targetHref}
            className="text-xs font-bold text-[#0A4174] hover:underline inline-flex items-center gap-1"
          >
            <span>Baca Selengkapnya</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        )}

        <Link
          href={`/skrining?category=${article.category === 'UMUM' ? 'DISLEKSIA' : article.category}`}
        >
          <Button
            size="sm"
            variant="ghost"
            className="text-[11px] h-7 px-2 text-[#4E8EA2] hover:text-[#0A4174]"
          >
            Skrining Modul Ini
          </Button>
        </Link>
      </div>
    </div>
  )
}
