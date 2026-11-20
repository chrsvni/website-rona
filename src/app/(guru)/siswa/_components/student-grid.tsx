import { Users } from 'lucide-react'
import { StudentCard } from './student-card'
import type { StudentItem } from './types'

interface StudentGridProps {
  students: StudentItem[]
  totalStudentsCount: number
  assignedClass: string
  onEdit: (student: StudentItem) => void
  onDelete: (student: StudentItem) => void
}

export function StudentGrid({
  students,
  totalStudentsCount,
  assignedClass,
  onEdit,
  onDelete,
}: StudentGridProps) {
  if (students.length === 0) {
    return (
      <div className="py-20 text-center space-y-3 glass-card rounded-3xl">
        <Users className="h-10 w-10 text-[#BDD8E9] mx-auto" />
        <h3 className="text-base font-bold text-[#001D39]">
          Tidak Ada Siswa Ditemukan
        </h3>
        <p className="text-xs text-[#49769F] max-w-sm mx-auto">
          {totalStudentsCount === 0
            ? `Belum ada data siswa di kelas ${assignedClass}. Klik tombol "Tambah Siswa Baru" di atas untuk mendaftarkan murid perwalian Anda.`
            : 'Belum ada siswa yang sesuai dengan kata kunci pencarian atau filter yang dipilih.'}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {students.map((st) => (
        <StudentCard
          key={st.id}
          student={st}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
