/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Sparkles,
  BookOpen,
  ClipboardCheck,
  Users,
  PlusCircle,
  Menu,
  X,
  GraduationCap,
  LogOut,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { UserSession } from '@/lib/auth'

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<UserSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [loggingOut, setLoggingOut] = useState(false)

  const isHidden =
    pathname === '/login' ||
    pathname === '/loginGuru' ||
    pathname === '/loginAdmin' ||
    pathname.startsWith('/admin')

  useEffect(() => {
    if (!isHidden) {
      let isMounted = true
      fetch('/api/auth/me')
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (isMounted) {
            if (data?.user) {
              setUser(data.user)
            } else {
              setUser(null)
            }
          }
        })
        .catch(() => {
          if (isMounted) setUser(null)
        })
        .finally(() => {
          if (isMounted) setLoading(false)
        })

      return () => {
        isMounted = false
      }
    } else {
      setLoading(false)
    }
  }, [pathname, isHidden])

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch (e) {
      console.error('Logout error:', e)
    }
    window.location.replace('/login')
  }
  if (isHidden || loading || loggingOut || !user) {
    return null
  }

  const isGuru = user.role === 'GURU'
  const isAdmin = user.role === 'ADMIN'

  const navItems = isGuru
    ? [
        { label: 'Dashboard', href: '/' },
        { label: 'Fakta & Edukasi', href: '/materi', icon: BookOpen },
        { label: 'Skrining Murid', href: '/skrining', icon: ClipboardCheck },
        { label: 'Data Siswa & Riwayat', href: '/siswa', icon: Users },
      ]
    : isAdmin
      ? [
          { label: 'Panel Admin', href: '/admin', icon: ShieldCheck },
          { label: 'Fakta & Edukasi', href: '/materi', icon: BookOpen },
        ]
      : []

  return (
    <header className="sticky top-0 z-50 w-full no-print">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-3">
        <div className="glass-panel rounded-2xl px-5 py-3 flex items-center justify-between border border-white/60 shadow-lg shadow-[#0A4174]/5">
          {/* Logo Brand Rona */}
          <Link
            href={isAdmin ? '/admin' : '/'}
            className="flex items-center gap-3 group"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#0A4174] to-[#4E8EA2] flex items-center justify-center text-white shadow-md shadow-[#0A4174]/25 group-hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-[#001D39]">
                  RONA
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#7BBDE8]/30 text-[#0A4174] tracking-wide">
                  {isGuru ? 'GURU' : 'ADMIN'}
                </span>
              </div>
              <p className="text-[11px] text-[#49769F] hidden sm:block font-medium">
                {isGuru
                  ? 'Ruang Kerja Guru & Skrining'
                  : 'Konsol Pengelola Sistem'}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : item.href.startsWith('/#')
                    ? false
                    : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#0A4174] text-white shadow-sm'
                      : 'text-[#001D39] hover:text-[#0A4174] hover:bg-[#e8f3fa]/80'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Right Action: Khusus Guru / Admin Logged In */}
          <div className="hidden sm:flex items-center gap-3">
            {isGuru ? (
              <>
                <Link href="/skrining">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-[#0A4174] to-[#4E8EA2] text-white rounded-full px-4 text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:opacity-95"
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span>Skrining Baru</span>
                  </Button>
                </Link>

                <div className="h-6 w-px bg-[#BDD8E9]/60" />

                {/* Profile Guru */}
                <div className="flex items-center gap-2 pl-1">
                  <div className="h-8 w-8 rounded-full bg-[#e8f3fa] border border-[#7BBDE8] flex items-center justify-center text-[#0A4174]">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <div className="text-left hidden lg:block max-w-[170px]">
                    <p className="text-xs font-bold text-[#001D39] leading-tight truncate">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-[#4E8EA2] font-semibold truncate">
                      {user.homeroomClass
                        ? `Wali ${user.homeroomClass}`
                        : user.schoolName || 'SD Negeri Binaan'}
                    </p>
                  </div>
                </div>

                {/* Tombol Logout Guru */}
                <button
                  onClick={handleLogout}
                  title="Keluar dari Akun Guru"
                  className="p-2 rounded-full text-[#49769F] hover:text-red-600 hover:bg-red-50 transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <Link href="/admin">
                  <Button
                    size="sm"
                    className="bg-[#001D39] text-white hover:bg-[#0A4174] rounded-full px-4 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 text-[#7BBDE8]" />
                    <span>Buka Panel Admin</span>
                  </Button>
                </Link>

                <div className="h-6 w-px bg-[#BDD8E9]/60" />

                <div className="text-left hidden lg:block">
                  <p className="text-xs font-bold text-[#001D39] leading-tight">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-[#49769F]">Administrator</p>
                </div>

                <button
                  onClick={handleLogout}
                  title="Keluar dari Akun Admin"
                  className="p-2 rounded-full text-[#49769F] hover:text-red-600 hover:bg-red-50 transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link href="/skrining">
              <Button size="sm" className="rounded-full text-xs px-3 h-8">
                Skrining
              </Button>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#001D39] hover:bg-[#e8f3fa]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 glass-panel rounded-2xl p-4 shadow-xl border border-white/80 flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : item.href.startsWith('/#')
                    ? false
                    : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2.5 ${
                    isActive
                      ? 'bg-[#0A4174] text-white'
                      : 'text-[#001D39] hover:bg-[#e8f3fa]'
                  }`}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.label}
                </Link>
              )
            })}

            {/* Bagian Bawah Mobile Menu */}
            <div className="pt-3 border-t border-[#BDD8E9]/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-[#e8f3fa] border border-[#7BBDE8] flex items-center justify-center text-[#0A4174]">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#001D39]">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-[#4E8EA2] font-semibold">
                      {user.homeroomClass
                        ? `Wali ${user.homeroomClass}`
                        : user.schoolName || 'SD Negeri Binaan'}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleLogout}
                  className="h-8 text-xs text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-1.5"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Keluar</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
