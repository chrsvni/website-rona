import { Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'

export interface StudentScreeningSummary {
  id: string
  category: string
  riskLevel: string
}

export interface StudentTeacherInfo {
  name: string
  homeroomClass?: string | null
}

export interface StudentDatabaseItem {
  id: string
  name: string
  notes?: string | null
  className: string
  gender: string
  age?: number | null
  parentName?: string | null
  contactNumber?: string | null
  createdAt: Date | string
  teacher?: StudentTeacherInfo | null
  screenings?: StudentScreeningSummary[]
}

interface StudentDatabaseTableProps {
  students: StudentDatabaseItem[]
}

export function StudentDatabaseTable({ students }: StudentDatabaseTableProps) {
  return (
    <div
      id="siswa"
      className="glass-card p-6 sm:p-8 rounded-3xl border border-[#BDD8E9]/70 space-y-4 scroll-mt-24"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A4174] uppercase tracking-wider mb-1">
            <Users className="h-3.5 w-3.5" />
            <span>Database Peserta Didik</span>
          </div>
          <h3 className="text-base font-bold text-[#001D39]">
            Daftar Seluruh Siswa Terdaftar
          </h3>
          <p className="text-xs text-[#49769F]">
            Data seluruh peserta didik dari semua rombongan belajar yang
            terhubung ke wali kelas masing-masing.
          </p>
        </div>
        <Badge
          variant="outline"
          className="text-xs px-3 py-1 font-semibold text-[#0A4174] border-[#BDD8E9] self-start sm:self-auto"
        >
          Total: {students.length} Siswa Terdata
        </Badge>
      </div>

      {students.length === 0 ? (
        <div className="text-center py-10 text-xs text-[#49769F]">
          Belum ada data siswa yang terdaftar di sistem.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#001D39]">
            <thead>
              <tr className="border-b border-[#BDD8E9]/50 text-[#49769F] uppercase tracking-wider text-[11px]">
                <th className="pb-3 font-bold w-12 text-center">No</th>
                <th className="pb-3 font-bold">Nama Siswa</th>
                <th className="pb-3 font-bold">Kelas</th>
                <th className="pb-3 font-bold">Gender & Usia</th>
                <th className="pb-3 font-bold">Wali Kelas (Guru)</th>
                <th className="pb-3 font-bold">Orang Tua / Kontak</th>
                <th className="pb-3 font-bold">Status Observasi</th>
                <th className="pb-3 font-bold text-right">Terdaftar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BDD8E9]/30">
              {students.map((st, idx) => {
                const screeningsList = st.screenings ?? []
                const hasScreening = screeningsList.length > 0
                const latestScreening = hasScreening ? screeningsList[0] : null

                return (
                  <tr
                    key={st.id}
                    className="hover:bg-[#e8f3fa]/40 transition-colors"
                  >
                    <td className="py-3 text-center text-[#49769F] font-semibold">
                      {idx + 1}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-[#0A4174] text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {st.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-[#001D39] text-sm leading-tight">
                            {st.name}
                          </p>
                          {st.notes && (
                            <p className="text-[10px] text-[#49769F] line-clamp-1 max-w-[200px]">
                              {st.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <Badge
                        variant="secondary"
                        className="font-semibold text-[11px]"
                      >
                        {st.className}
                      </Badge>
                    </td>
                    <td className="py-3 text-[#49769F]">
                      <span className="font-medium text-[#001D39]">
                        {st.gender}
                      </span>
                      {st.age && (
                        <span className="text-[11px]"> ({st.age} Th)</span>
                      )}
                    </td>
                    <td className="py-3">
                      <p className="font-semibold text-[#001D39]">
                        {st.teacher?.name || '-'}
                      </p>
                      {st.teacher?.homeroomClass && (
                        <p className="text-[10px] text-[#49769F]">
                          Wali {st.teacher.homeroomClass}
                        </p>
                      )}
                    </td>
                    <td className="py-3 text-[#49769F]">
                      <p className="text-[#001D39] font-medium">
                        {st.parentName || '-'}
                      </p>
                      {st.contactNumber && (
                        <p className="text-[10px] text-[#4E8EA2] font-mono">
                          {st.contactNumber}
                        </p>
                      )}
                    </td>
                    <td className="py-3">
                      {hasScreening && latestScreening ? (
                        <Badge
                          variant={
                            latestScreening.riskLevel === 'Tinggi'
                              ? 'destructive'
                              : latestScreening.riskLevel === 'Sedang'
                                ? 'warning'
                                : 'success'
                          }
                          className="text-[10px]"
                        >
                          Diskrining ({screeningsList.length}x) •{' '}
                          {latestScreening.category} (
                          {latestScreening.riskLevel})
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-[10px] text-[#49769F] border-[#BDD8E9]"
                        >
                          Belum Diskrining
                        </Badge>
                      )}
                    </td>
                    <td className="py-3 text-right text-[#49769F] text-[11px]">
                      {formatDate(st.createdAt)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
