'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ShieldCheck,
  LogOut,
  BookOpen,
  LayoutDashboard,
  GraduationCap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AdminNavbar() {
  const pathname = usePathname()

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch (e) {
      console.error('Admin logout error:', e)
    } finally {
      window.location.replace('/login')
    }
  }

  const isMateriPage = pathname === '/admin/materi'
  const isGuruPage = pathname === '/admin/guru'

  return (
    <header className="sticky top-0 z-50 w-full bg-[#001D39] text-white border-b border-[#4E8EA2]/40 shadow-lg shadow-black/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Admin */}
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#0A4174] to-[#4E8EA2] flex items-center justify-center text-white shadow-md shadow-black/30 border border-[#7BBDE8]/30 group-hover:scale-105 transition-transform">
            <ShieldCheck className="h-5 w-5 text-[#7BBDE8]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white">
                RONA ADMIN
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#7BBDE8]/20 text-[#7BBDE8] border border-[#7BBDE8]/30 uppercase">
                Console
              </span>
            </div>
            <p className="text-[11px] text-[#BDD8E9]/70 hidden sm:block">
              Pusat Manajemen Akun Guru, Materi & Audit Skrining
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-[#BDD8E9]">
          <Link
            href="/admin"
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              pathname === '/admin'
                ? 'bg-white/15 text-white'
                : 'hover:text-white hover:bg-white/10'
            }`}
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/admin/guru"
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              isGuruPage
                ? 'bg-[#7BBDE8] text-[#001D39] font-bold'
                : 'hover:text-white hover:bg-white/10'
            }`}
          >
            <GraduationCap className="h-3.5 w-3.5" />
            <span>Kelola Guru (CRUD)</span>
          </Link>

          <Link
            href="/admin/materi"
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              isMateriPage
                ? 'bg-[#7BBDE8] text-[#001D39] font-bold'
                : 'hover:text-white hover:bg-white/10'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Kelola Materi (CRUD)</span>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-xs font-bold text-white leading-tight">
              Administrator Pusat
            </p>
            <p className="text-[10px] text-[#7BBDE8] font-mono">
              admin@rona.edu
            </p>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={handleLogout}
            className="h-9 px-3 rounded-xl border-red-400/50 bg-red-950/40 text-red-300 hover:bg-red-900/60 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Keluar Admin</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
