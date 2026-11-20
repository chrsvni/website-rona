import {
  GraduationCap,
  School,
  Mail,
  Hash,
  Building2,
  CheckCircle2,
  Edit3,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { TeacherItem } from './types'

interface GuruTableProps {
  loading: boolean
  teachers: TeacherItem[]
  hasFilterOrSearch: boolean
  onEdit: (teacher: TeacherItem) => void
  onDelete: (teacher: TeacherItem) => void
}

export function GuruTable({
  loading,
  teachers,
  hasFilterOrSearch,
  onEdit,
  onDelete,
}: GuruTableProps) {
  return (
    <div className="glass-card rounded-3xl border border-[#BDD8E9]/70 overflow-hidden shadow-sm">
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="h-7 w-7 border-3 border-[#0A4174] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#49769F]">Memuat data akun guru...</p>
        </div>
      ) : teachers.length === 0 ? (
        <div className="py-16 text-center space-y-3">
          <GraduationCap className="h-10 w-10 text-[#BDD8E9] mx-auto" />
          <h3 className="text-base font-bold text-[#001D39]">
            Tidak Ada Akun Guru Ditemukan
          </h3>
          <p className="text-xs text-[#49769F] max-w-sm mx-auto">
            {hasFilterOrSearch
              ? 'Tidak ada akun guru yang sesuai dengan kata kunci atau filter kelas Anda.'
              : "Belum ada akun guru yang dibuat. Silakan klik tombol 'Buat Akun Guru Baru'."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#001D39]">
            <thead>
              <tr className="border-b border-[#BDD8E9]/60 bg-[#e8f3fa]/50 text-[#49769F] uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 font-bold">Profil Guru</th>
                <th className="py-3.5 px-4 font-bold">Penugasan Wali Kelas</th>
                <th className="py-3.5 px-4 font-bold">
                  Email & NIP (18 Digit)
                </th>
                <th className="py-3.5 px-4 font-bold">Unit Sekolah</th>
                <th className="py-3.5 px-4 font-bold">Siswa & Skrining</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BDD8E9]/30">
              {teachers.map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-[#e8f3fa]/40 transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#0A4174] to-[#4E8EA2] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                        {t.name ? t.name.charAt(0).toUpperCase() : 'G'}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-[#001D39]">
                          {t.name}
                        </p>
                        <span className="text-[10px] text-[#4E8EA2] font-semibold">
                          Pendidik SD
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {t.homeroomClass ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0A4174] text-white font-bold text-[11px] shadow-sm">
                        <School className="h-3 w-3" />
                        <span>Wali {t.homeroomClass}</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">
                        Belum diatur
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-medium text-[#001D39] flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-[#49769F]" />
                      <span>{t.email}</span>
                    </p>
                    {t.nip ? (
                      <p className="text-[11px] font-mono text-[#0A4174] font-semibold mt-0.5 flex items-center gap-1">
                        <Hash className="h-3 w-3" />
                        <span>{t.nip}</span>
                        <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-100 text-emerald-800 font-sans font-bold">
                          18 digit
                        </span>
                      </p>
                    ) : (
                      <p className="text-[10px] text-slate-400 italic mt-0.5">
                        NIP belum diisi
                      </p>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 text-[#001D39] font-medium">
                      <Building2 className="h-3.5 w-3.5 text-[#4E8EA2]" />
                      <span>{t.schoolName || '-'}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="space-y-0.5">
                      <p className="font-semibold text-[#001D39]">
                        {t._count?.students || 0} Siswa
                      </p>
                      <p className="text-[11px] text-[#49769F]">
                        {t._count?.screenings || 0} Skrining
                      </p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Aktif</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(t)}
                      className="h-8 px-2.5 rounded-xl border-[#BDD8E9] text-[#0A4174] hover:bg-[#e8f3fa] text-xs font-semibold inline-flex items-center gap-1"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      <span>Edit / Reset</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDelete(t)}
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
