import Link from 'next/link'
import { Sparkles, FileText } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import type { StudentScreeningItem } from './types'

interface StudentScreeningCardProps {
  screening: StudentScreeningItem
  teacherName: string
}

export function StudentScreeningCard({
  screening,
  teacherName,
}: StudentScreeningCardProps) {
  return (
    <div className="glass-card p-6 rounded-3xl space-y-4 border border-[#BDD8E9]/70">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#BDD8E9]/40 pb-3">
        <div className="flex items-center gap-2">
          <Badge
            variant={
              screening.category === 'DISLEKSIA'
                ? 'disleksia'
                : screening.category === 'DISGRAFIA'
                  ? 'disgrafia'
                  : 'diskalkulia'
            }
          >
            {screening.category}
          </Badge>
          <h3 className="text-sm font-bold text-[#001D39]">
            {screening.taskName || 'Observasi Tugas'}
          </h3>
        </div>
        <Badge
          variant={
            screening.riskLevel === 'Tinggi'
              ? 'destructive'
              : screening.riskLevel === 'Sedang'
                ? 'warning'
                : 'success'
          }
        >
          Tingkat Indikasi: {screening.riskLevel}
        </Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-2.5 rounded-xl bg-[#f0f7fc] border border-[#BDD8E9]/40">
          <span className="text-[#49769F] block text-[10px]">
            Skor Sistem:
          </span>
          <span className="font-bold text-[#001D39]">
            {screening.percentageScore}% ({screening.totalScore}/
            {screening.maxPossibleScore})
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-[#f0f7fc] border border-[#BDD8E9]/40">
          <span className="text-[#49769F] block text-[10px]">
            Tanggal Observasi:
          </span>
          <span className="font-bold text-[#001D39]">
            {formatDate(screening.completedAt)}
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-[#f0f7fc] border border-[#BDD8E9]/40 col-span-2 sm:col-span-1">
          <span className="text-[#49769F] block text-[10px]">
            Guru Pengamat:
          </span>
          <span className="font-bold text-[#001D39] truncate block">
            {teacherName}
          </span>
        </div>
      </div>

      {screening.systemRecommendation && (
        <div className="bg-[#e8f3fa]/80 p-3.5 rounded-2xl border border-[#7BBDE8]/40 space-y-1 text-xs">
          <span className="font-bold text-[#0A4174] flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> Rekomendasi Sistem:
          </span>
          <p className="text-[#001D39] leading-relaxed text-[11px] line-clamp-3">
            {screening.systemRecommendation}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <span className="text-[11px] text-[#49769F]">
          Bukti Tugas:{' '}
          {screening.taskProofNotes ? 'Tercatat' : 'Tanpa catatan'}
        </span>
        <Link href={`/skrining/hasil/${screening.id}`}>
          <Button
            size="sm"
            className="bg-[#0A4174] hover:bg-[#001D39] text-white rounded-full text-xs h-8 px-4 flex items-center gap-1.5"
          >
            <FileText className="h-3.5 w-3.5" />
            Cetak Kartu Hasil
          </Button>
        </Link>
      </div>
    </div>
  )
}
