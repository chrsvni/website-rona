'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles, Shield, HeartHandshake, Info } from 'lucide-react'

export function Footer() {
  const pathname = usePathname()

  const isHidden =
    pathname === '/login' ||
    pathname === '/loginGuru' ||
    pathname === '/loginAdmin' ||
    pathname.startsWith('/admin')

  if (isHidden) {
    return null
  }

  return (
    <footer className="mt-20 border-t border-[#BDD8E9]/50 bg-white/60 backdrop-blur-md no-print">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#0A4174] to-[#4E8EA2] flex items-center justify-center text-white shadow-sm">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-[#001D39]">
                RONA DIAGNOSTIK
              </span>
            </div>
            <p className="text-sm text-[#49769F] max-w-md leading-relaxed">
              Alat bantu skrining deteksi dini kesulitan belajar spesifik
              (Disleksia, Disgrafia, Diskalkulia) berbasis panduan observasi
              tugas bagi guru sekolah dasar.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-[#0A4174] font-medium bg-[#e8f3fa] p-2.5 rounded-xl border border-[#7BBDE8]/30 max-w-md">
              <Info className="h-4 w-4 shrink-0 text-[#4E8EA2]" />
              <span>
                <strong>Catatan Klinis:</strong> Rona berfungsi sebagai
                instrumen deteksi dini dan panduan observasi pedagogis guru,
                bukan pengganti diagnosis medis resmi dari psikolog klinis.
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#001D39] mb-3">
              Modul Deteksi
            </h4>
            <ul className="space-y-2 text-sm text-[#49769F]">
              <li>
                <Link
                  href="/materi?cat=DISLEKSIA"
                  className="hover:text-[#0A4174] transition-colors"
                >
                  Deteksi Disleksia
                </Link>
              </li>
              <li>
                <Link
                  href="/materi?cat=DISGRAFIA"
                  className="hover:text-[#0A4174] transition-colors"
                >
                  Deteksi Disgrafia
                </Link>
              </li>
              <li>
                <Link
                  href="/materi?cat=DISKALKULIA"
                  className="hover:text-[#0A4174] transition-colors"
                >
                  Deteksi Diskalkulia
                </Link>
              </li>
              <li>
                <Link
                  href="/materi?cat=PANDUAN_METODE"
                  className="hover:text-[#0A4174] transition-colors"
                >
                  Panduan Metode Kelas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#001D39] mb-3">
              Portal Akses
            </h4>
            <ul className="space-y-2 text-sm text-[#49769F]">
              <li>
                <Link
                  href="/login"
                  className="hover:text-[#0A4174] transition-colors font-medium"
                >
                  Masuk ke Sistem RONA
                </Link>
              </li>
              <li>
                <Link
                  href="/materi"
                  className="hover:text-[#0A4174] transition-colors"
                >
                  Perpustakaan Materi Edukasi
                </Link>
              </li>
              <li>
                <Link
                  href="/skrining"
                  className="hover:text-[#0A4174] transition-colors"
                >
                  Instrumen Skrining Murid
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#BDD8E9]/40 flex flex-col sm:flex-row items-center justify-between text-xs text-[#49769F]">
          <p>© 2026 Rona System. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <span className="flex items-center gap-1">
              <Shield className="h-3.5 w-3.5 text-[#4E8EA2]" /> Privasi Data
              Siswa Terlindungi
            </span>
            <span className="flex items-center gap-1">
              <HeartHandshake className="h-3.5 w-3.5 text-[#4E8EA2]" />{' '}
              Pendidikan Inklusif
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
