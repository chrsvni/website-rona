import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'

export interface ScreeningStudentInfo {
  name: string
  className: string
}

export interface ScreeningTeacherInfo {
  name: string
}

export interface ScreeningAuditItem {
  id: string
  category: string
  riskLevel: string
  percentageScore: number
  createdAt: Date | string
  student: ScreeningStudentInfo
  teacher: ScreeningTeacherInfo
}

interface ScreeningAuditTableProps {
  screenings: ScreeningAuditItem[]
}

export function ScreeningAuditTable({ screenings }: ScreeningAuditTableProps) {
  return (
    <div
      id="skrining"
      className="glass-card p-6 sm:p-8 rounded-3xl border border-[#BDD8E9]/70 space-y-4 scroll-mt-24"
    >
      <div>
        <h3 className="text-base font-bold text-[#001D39]">
          Audit Data & Riwayat Skrining Terkini
        </h3>
        <p className="text-xs text-[#49769F]">
          Pemantauan langsung seluruh rekam skrining yang dilakukan oleh guru
          di sekolah.
        </p>
      </div>

      {screenings.length === 0 ? (
        <div className="text-center py-10 text-xs text-[#49769F]">
          Belum ada riwayat audit skrining yang tercatat di sistem.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#001D39]">
            <thead>
              <tr className="border-b border-[#BDD8E9]/50 text-[#49769F] uppercase tracking-wider text-[11px]">
                <th className="pb-3 font-bold">Nama Siswa</th>
                <th className="pb-3 font-bold">Kelas</th>
                <th className="pb-3 font-bold">Guru Pengampu</th>
                <th className="pb-3 font-bold">Kategori</th>
                <th className="pb-3 font-bold">Skor & Indikasi</th>
                <th className="pb-3 font-bold">Tanggal</th>
                <th className="pb-3 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BDD8E9]/30">
              {screenings.map((sc) => (
                <tr key={sc.id} className="hover:bg-[#e8f3fa]/40 transition-colors">
                  <td className="py-3 font-bold text-[#001D39]">
                    {sc.student.name}
                  </td>
                  <td className="py-3 text-[#49769F]">
                    {sc.student.className}
                  </td>
                  <td className="py-3">{sc.teacher.name}</td>
                  <td className="py-3">
                    <Badge variant="outline">{sc.category}</Badge>
                  </td>
                  <td className="py-3">
                    <Badge
                      variant={
                        sc.riskLevel === 'Tinggi'
                          ? 'destructive'
                          : sc.riskLevel === 'Sedang'
                            ? 'warning'
                            : 'success'
                      }
                    >
                      {sc.percentageScore}% • {sc.riskLevel}
                    </Badge>
                  </td>
                  <td className="py-3 text-[#49769F]">
                    {formatDate(sc.createdAt)}
                  </td>
                  <td className="py-3 text-right">
                    <Link href={`/skrining/hasil/${sc.id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full text-xs h-8"
                      >
                        Lihat Kartu
                      </Button>
                    </Link>
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
