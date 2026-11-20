import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnchorLink } from '@/components/ui/anchor-link'

interface AdminStatsCardsProps {
  teachersCount: number
  studentsCount: number
  screeningsCount: number
  articlesCount: number
}

export function AdminStatsCards({
  teachersCount,
  studentsCount,
  screeningsCount,
  articlesCount,
}: AdminStatsCardsProps) {
  return (
    <div
      id="statistik"
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 scroll-mt-24"
    >
      <Link href="/admin/guru" className="block group">
        <div className="glass-card p-5 rounded-3xl border border-[#BDD8E9]/70 group-hover:border-[#0A4174] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#49769F]">
              Total Akun Guru
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-[#4E8EA2] group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#001D39] mt-1">
            {teachersCount}
          </p>
          <p className="text-[11px] text-[#0A4174] font-medium mt-0.5">
            Buka Halaman Guru →
          </p>
        </div>
      </Link>

      <AnchorLink targetId="siswa" className="block group cursor-pointer">
        <div className="glass-card p-5 rounded-3xl border border-[#BDD8E9]/70 group-hover:border-[#0A4174] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#49769F]">
              Siswa Terdata
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-[#4E8EA2] group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#001D39] mt-1">
            {studentsCount}
          </p>
          <p className="text-[11px] text-[#0A4174] font-medium mt-0.5">
            Lihat Daftar Siswa ↓
          </p>
        </div>
      </AnchorLink>

      <AnchorLink targetId="skrining" className="block group cursor-pointer">
        <div className="glass-card p-5 rounded-3xl border border-[#BDD8E9]/70 group-hover:border-[#0A4174] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#49769F]">
              Skrining Berjalan
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-[#4E8EA2] group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#0A4174] mt-1">
            {screeningsCount}
          </p>
          <p className="text-[11px] text-[#0A4174] font-medium mt-0.5">
            Lihat Audit Skrining ↓
          </p>
        </div>
      </AnchorLink>

      <Link href="/admin/materi" className="block group">
        <div className="glass-card p-5 rounded-3xl border border-[#BDD8E9]/70 group-hover:border-[#0A4174] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#49769F]">
              Konten Referensi
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-[#4E8EA2] group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#001D39] mt-1">
            {articlesCount}
          </p>
          <p className="text-[11px] text-[#0A4174] font-medium mt-0.5">
            Buka Halaman Materi →
          </p>
        </div>
      </Link>
    </div>
  )
}
