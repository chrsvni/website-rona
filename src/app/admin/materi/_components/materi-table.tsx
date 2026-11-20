import { BookOpen, Globe, ExternalLink, Edit3, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { ArticleItem } from './types'

interface MateriTableProps {
  loading: boolean
  articles: ArticleItem[]
  hasFilterOrSearch: boolean
  onEdit: (art: ArticleItem) => void
  onDelete: (art: ArticleItem) => void
}

export function MateriTable({
  loading,
  articles,
  hasFilterOrSearch,
  onEdit,
  onDelete,
}: MateriTableProps) {
  return (
    <div className="glass-card rounded-3xl border border-[#BDD8E9]/70 overflow-hidden shadow-sm">
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="h-7 w-7 border-3 border-[#0A4174] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#49769F]">
            Memuat data referensi materi...
          </p>
        </div>
      ) : articles.length === 0 ? (
        <div className="py-16 text-center space-y-3">
          <BookOpen className="h-10 w-10 text-[#BDD8E9] mx-auto" />
          <h3 className="text-base font-bold text-[#001D39]">
            Tidak Ada Materi Ditemukan
          </h3>
          <p className="text-xs text-[#49769F] max-w-sm mx-auto">
            {hasFilterOrSearch
              ? 'Tidak ada materi yang sesuai dengan filter atau kata kunci pencarian.'
              : "Belum ada referensi materi yang ditambahkan. Silakan klik tombol 'Tambah Referensi Baru'."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#001D39]">
            <thead>
              <tr className="border-b border-[#BDD8E9]/60 bg-[#e8f3fa]/50 text-[#49769F] uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 font-bold">Judul & Ringkasan</th>
                <th className="py-3.5 px-4 font-bold">Kategori</th>
                <th className="py-3.5 px-4 font-bold">Sumber / Penulis</th>
                <th className="py-3.5 px-4 font-bold">Tahun</th>
                <th className="py-3.5 px-4 font-bold">Tautan Sumber</th>
                <th className="py-3.5 px-4 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BDD8E9]/30">
              {articles.map((art) => (
                <tr
                  key={art.id}
                  className="hover:bg-[#e8f3fa]/40 transition-colors"
                >
                  <td className="py-3.5 px-4 max-w-md">
                    <p className="font-bold text-sm text-[#001D39] line-clamp-1">
                      {art.title}
                    </p>
                    <p className="text-[11px] text-[#49769F] line-clamp-1 mt-0.5">
                      {art.excerpt || '-'}
                    </p>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge
                      variant={
                        art.category === 'DISLEKSIA'
                          ? 'disleksia'
                          : art.category === 'DISGRAFIA'
                            ? 'disgrafia'
                            : art.category === 'DISKALKULIA'
                              ? 'diskalkulia'
                              : 'outline'
                      }
                    >
                      {art.category}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#001D39] whitespace-nowrap">
                    {art.author}
                  </td>
                  <td className="py-3.5 px-4 text-[#49769F] whitespace-nowrap">
                    {art.publishedDate || '-'}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {art.sourceUrl ? (
                      <a
                        href={art.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#e8f3fa] text-[#0A4174] hover:bg-[#7BBDE8]/30 font-semibold text-[11px] transition-colors"
                      >
                        <Globe className="h-3.5 w-3.5 text-[#4E8EA2]" />
                        <span>Uji Link</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">
                        Tanpa tautan
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(art)}
                      className="h-8 px-2.5 rounded-xl border-[#BDD8E9] text-[#0A4174] hover:bg-[#e8f3fa] text-xs font-semibold inline-flex items-center gap-1"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDelete(art)}
                      className="h-8 px-2.5 rounded-xl border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold inline-flex items-center gap-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Hapus</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
