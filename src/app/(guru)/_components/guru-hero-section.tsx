import Link from 'next/link'
import {
  Sparkles,
  Users,
  Brain,
  Compass,
  CheckCircle2,
  PlusCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { TeacherSessionData } from './types'

interface GuruHeroSectionProps {
  session: TeacherSessionData
}

export function GuruHeroSection({ session }: GuruHeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-6 sm:pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#0A4174]/15 border border-white/70 bg-gradient-to-br from-[#0A4174] via-[#001D39] to-[#0A4174] text-white p-8 sm:p-12 lg:p-16">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#7BBDE8]/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-[#4E8EA2]/25 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#7BBDE8] text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ruang Kerja Guru • Rona Diagnostik</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Selamat Datang Kembali, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7BBDE8] via-[#BDD8E9] to-white">
                {session.name}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#BDD8E9]/90 leading-relaxed font-normal">
              Unit Pengampu:{' '}
              <strong className="text-white">
                {session.schoolName || 'SD Negeri Binaan'}
              </strong>
              {session.homeroomClass && (
                <>
                  {' '}
                  • Penugasan:{' '}
                  <strong className="text-[#7BBDE8]">
                    Wali {session.homeroomClass}
                  </strong>
                </>
              )}
              . Gunakan instrumen observasi tugas untuk deteksi dini
              Disleksia, Disgrafia, dan Diskalkulia khusus pada siswa binaan
              kelas Anda.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link href="/skrining">
                <Button
                  size="lg"
                  className="bg-[#7BBDE8] text-[#001D39] hover:bg-white rounded-full font-bold shadow-lg shadow-[#001D39]/30 text-sm h-12 px-7 transition-transform active:scale-95"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Mulai Skrining Siswa Baru
                </Button>
              </Link>
              <Link href="/siswa">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 rounded-full font-semibold text-sm h-12 px-6"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Data Siswa & Riwayat
                </Button>
              </Link>
            </div>
          </div>

          {/* Selector Bar */}
          <div className="mt-10 pt-6 border-t border-white/15">
            <div className="glass-panel !bg-white/90 text-[#001D39] p-4 sm:p-5 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 w-full">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#49769F] block mb-1">
                  Modul Kesulitan Belajar
                </label>
                <div className="text-sm font-semibold text-[#001D39] flex items-center gap-2">
                  <Brain className="h-4 w-4 text-[#0A4174]" />
                  <span>Disleksia, Disgrafia, Diskalkulia</span>
                </div>
              </div>

              <div className="hidden md:block w-px h-10 bg-[#BDD8E9]" />

              <div className="flex-1 w-full">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#49769F] block mb-1">
                  Metode Skrining
                </label>
                <div className="text-sm font-semibold text-[#001D39] flex items-center gap-2">
                  <Compass className="h-4 w-4 text-[#4E8EA2]" />
                  <span>Observasi Tugas & 8 Indikator</span>
                </div>
              </div>

              <div className="hidden md:block w-px h-10 bg-[#BDD8E9]" />

              <div className="flex-1 w-full">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#49769F] block mb-1">
                  Sistem Rekomendasi
                </label>
                <div className="text-sm font-semibold text-[#001D39] flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Otomatis & Terstandar Sistem</span>
                </div>
              </div>

              <Link href="/skrining" className="w-full md:w-auto">
                <Button className="w-full md:w-auto bg-[#0A4174] hover:bg-[#001D39] text-white rounded-xl h-11 px-6 font-semibold shadow-md">
                  Buka Observasi
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
