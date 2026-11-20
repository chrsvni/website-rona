import { Users, ClipboardCheck, AlertTriangle, BookOpen } from 'lucide-react'
import type { DashboardStats } from './types'

interface GuruStatsSectionProps {
  stats: DashboardStats
}

export function GuruStatsSection({ stats }: GuruStatsSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-white/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#49769F]">
              Total Siswa Terdata
            </span>
            <div className="h-8 w-8 rounded-lg bg-[#e8f3fa] text-[#0A4174] flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#001D39]">
            {stats.totalStudents}
          </p>
          <p className="text-[11px] text-[#4E8EA2] mt-0.5">
            Siswa binaan terdaftar
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#49769F]">
              Skrining Selesai
            </span>
            <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ClipboardCheck className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#001D39]">
            {stats.totalScreenings}
          </p>
          <p className="text-[11px] text-emerald-700 mt-0.5">
            Hasil observasi terekam
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#49769F]">
              Perlu Intervensi Tinggi
            </span>
            <div className="h-8 w-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-rose-700">
            {stats.highRiskScreenings}
          </p>
          <p className="text-[11px] text-rose-600 mt-0.5">
            Siswa butuh akomodasi intensif
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#49769F]">
              Modul & Artikel
            </span>
            <div className="h-8 w-8 rounded-lg bg-blue-50 text-[#0A4174] flex items-center justify-center">
              <BookOpen className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#001D39]">
            {stats.articlesCount}
          </p>
          <p className="text-[11px] text-[#49769F] mt-0.5">
            Materi & panduan metode
          </p>
        </div>
      </div>
    </section>
  )
}
