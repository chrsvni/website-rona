'use client'

import { useState } from 'react'
import {
  Sparkles,
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  BookOpen,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function UnifiedLoginPage() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier,
          password,
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(
          data.error ||
            'Gagal masuk. Periksa kembali email atau kata sandi Anda.'
        )
        setLoading(false)
        return
      }

      // Pengalihan otomatis sesuai role pengguna di database
      if (data.user?.role === 'ADMIN') {
        window.location.replace('/admin')
      } else {
        window.location.replace('/')
      }
    } catch {
      setError('Terjadi gangguan koneksi. Silakan coba lagi.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden bg-gradient-to-br from-[#f4f8fb] via-[#ebf4fa] to-[#f2f7fc]">
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-[#7BBDE8]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 rounded-full bg-[#4E8EA2]/15 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-[#7BBDE8]/40 shadow-sm mb-1">
            <Sparkles className="h-4 w-4 text-[#0A4174]" />
            <span className="text-xs font-bold text-[#0A4174] tracking-wide">
              RONA DIAGNOSTIK
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#001D39] tracking-tight">
            Portal Masuk RONA
          </h1>
          <p className="text-xs sm:text-sm text-[#49769F] max-w-sm mx-auto">
            Masuk untuk mengakses instrumen deteksi dini kesulitan belajar siswa
            dan ruang kerja digital.
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/80 shadow-xl shadow-[#0A4174]/8 space-y-6">
          {error && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="identifier"
                className="text-xs font-semibold text-[#001D39]"
              >
                Email atau NIP
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#49769F]" />
                <Input
                  id="identifier"
                  type="text"
                  placeholder="Masukkan email atau NIP Anda"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  className="pl-10 h-11 rounded-xl bg-white/70 border-[#BDD8E9]/80 focus:border-[#0A4174] text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-xs font-semibold text-[#001D39]"
              >
                Kata Sandi
              </Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#49769F]" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-10 h-11 rounded-xl bg-white/70 border-[#BDD8E9]/80 focus:border-[#0A4174] text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#49769F] hover:text-[#001D39]"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-gradient-to-r from-[#0A4174] to-[#4E8EA2] hover:opacity-95 text-white font-semibold text-sm shadow-md shadow-[#0A4174]/20 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Masuk ke Sistem</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Footer Notes: Netral & Edukatif */}
        <div className="flex items-center justify-center gap-6 text-[11px] text-[#49769F]">
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5 text-[#4E8EA2]" /> Deteksi 3
            Spektrum Belajar
          </span>
        </div>
      </div>
    </div>
  )
}
