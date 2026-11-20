import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { StudentScreeningCard } from './student-screening-card'
import type { StudentScreeningItem } from './types'

interface StudentScreeningHistoryProps {
  studentName: string
  teacherName: string
  screenings: StudentScreeningItem[]
}

export function StudentScreeningHistory({
  studentName,
  teacherName,
  screenings,
}: StudentScreeningHistoryProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#001D39]">
            Riwayat Skrining Kesulitan Belajar
          </h2>
          <p className="text-xs text-[#49769F]">
            Daftar observasi tugas yang pernah diselesaikan untuk {studentName}.
          </p>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#e8f3fa] text-[#0A4174]">
          {screenings.length} Kali Skrining
        </span>
      </div>

      {screenings.length === 0 ? (
        <div className="glass-card p-8 rounded-3xl text-center space-y-3">
          <p className="text-sm text-[#49769F]">
            Siswa ini belum pernah menjalani skrining observasi.
          </p>
          <Link href="/skrining">
            <Button size="sm" className="rounded-full text-xs">
              Mulai Skrining Pertama
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {screenings.map((sc) => (
            <StudentScreeningCard
              key={sc.id}
              screening={sc}
              teacherName={teacherName}
            />
          ))}
        </div>
      )}
    </div>
  )
}
