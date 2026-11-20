import { BookOpen } from 'lucide-react'
import { MateriCard } from './materi-card'
import type { PortalArticleItem } from './types'

interface MateriGridProps {
  articles: PortalArticleItem[]
}

export function MateriGrid({ articles }: MateriGridProps) {
  if (articles.length === 0) {
    return (
      <div className="py-20 text-center space-y-3 glass-card rounded-3xl">
        <BookOpen className="h-10 w-10 text-[#BDD8E9] mx-auto" />
        <h3 className="text-base font-bold text-[#001D39]">
          Tidak Ada Referensi Ditemukan
        </h3>
        <p className="text-xs text-[#49769F] max-w-sm mx-auto">
          Belum ada materi edukasi yang sesuai dengan kata kunci atau filter
          kategori yang dipilih.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((art) => (
        <MateriCard key={art.id} article={art} />
      ))}
    </div>
  )
}
