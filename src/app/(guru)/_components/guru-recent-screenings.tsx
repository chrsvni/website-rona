'use client'

import Link from 'next/link'
import { FileText } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { useRecentScreenings } from '../_hooks/use-recent-screenings'
import type { RecentScreeningItem } from './types'

interface GuruRecentScreeningsProps {
  recentScreenings: RecentScreeningItem[]
}

const CATEGORY_TABS = [
  { label: 'Semua', value: 'SEMUA' },
  { label: 'Disleksia', value: 'DISLEKSIA' },
  { label: 'Disgrafia', value: 'DISGRAFIA' },
  { label: 'Diskalkulia', value: 'DISKALKULIA' },
]

export function GuruRecentScreenings({
  recentScreenings,
}: GuruRecentScreeningsProps) {
  const { categoryFilter, setCategoryFilter, filteredScreenings } =
    useRecentScreenings(recentScreenings)

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-[#001D39]">
              Riwayat Observasi & Skrining Terkini
            </h3>
            <p className="text-xs text-[#49769F]">
              Hasil pengamatan siswa beserta tingkat risiko dan rekomendasi
              yang ditetapkan sistem.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/siswa">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs"
              >
                Lihat Semua Data Siswa
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Kategori Singkat */}
        {recentScreenings.length > 0 && (
          <div className="flex items-center gap-1.5 border-b border-[#BDD8E9]/40 pb-3">
            <span className="text-[11px] text-[#49769F] font-semibold mr-1">
              Filter Modul:
            </span>
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setCategoryFilter(tab.value)}
                className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                  categoryFilter === tab.value
                    ? 'bg-[#0A4174] text-white shadow-sm'
                    : 'bg-[#e8f3fa]/80 text-[#001D39] hover:bg-[#BDD8E9]/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {filteredScreenings.length === 0 ? (
          <div className="text-center py-10 text-sm text-[#49769F]">
            {recentScreenings.length === 0
              ? 'Belum ada data skrining yang terekam. Silakan mulai skrining pertama Anda.'
              : 'Tidak ada data skrining untuk kategori yang dipilih.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#001D39]">
              <thead>
                <tr className="border-b border-[#BDD8E9]/50 text-[#49769F] uppercase tracking-wider text-[11px]">
                  <th className="pb-3 font-bold">Nama Siswa</th>
                  <th className="pb-3 font-bold">Kelas</th>
                  <th className="pb-3 font-bold">Modul Observasi</th>
                  <th className="pb-3 font-bold">Skor Sistem</th>
                  <th className="pb-3 font-bold">Tingkat Risiko</th>
                  <th className="pb-3 font-bold">Tanggal</th>
                  <th className="pb-3 font-bold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#BDD8E9]/30">
                {filteredScreenings.map((sc) => (
                  <tr
                    key={sc.id}
                    className="hover:bg-[#e8f3fa]/40 transition-colors"
                  >
                    <td className="py-3.5 font-bold text-sm text-[#001D39]">
                      {sc.student.name}
                    </td>
                    <td className="py-3.5 text-[#49769F]">
                      {sc.student.className}
                    </td>
                    <td className="py-3.5">
                      <Badge
                        variant={
                          sc.category === 'DISLEKSIA'
                            ? 'disleksia'
                            : sc.category === 'DISGRAFIA'
                              ? 'disgrafia'
                              : 'diskalkulia'
                        }
                      >
                        {sc.category}
                      </Badge>
                    </td>
                    <td className="py-3.5 font-semibold">
                      {sc.percentageScore}% ({sc.totalScore}/
                      {sc.maxPossibleScore})
                    </td>
                    <td className="py-3.5">
                      <Badge
                        variant={
                          sc.riskLevel === 'Tinggi'
                            ? 'destructive'
                            : sc.riskLevel === 'Sedang'
                              ? 'warning'
                              : 'success'
                        }
                      >
                        {sc.riskLevel}
                      </Badge>
                    </td>
                    <td className="py-3.5 text-[#49769F]">
                      {formatDate(sc.completedAt || sc.createdAt)}
                    </td>
                    <td className="py-3.5 text-right">
                      <Link href={`/skrining/hasil/${sc.id}`}>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="rounded-full text-xs h-8 px-3"
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          Kartu Hasil
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
