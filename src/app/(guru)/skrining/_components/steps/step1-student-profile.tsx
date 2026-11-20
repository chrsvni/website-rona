import Link from 'next/link'
import { User, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { StudentData } from '../types'

interface Step1StudentProfileProps {
  students: StudentData[]
  selectedStudentId: string
  onSelectStudent: (id: string) => void
}

export function Step1StudentProfile({
  students,
  selectedStudentId,
  onSelectStudent,
}: Step1StudentProfileProps) {
  const selectedStudent = students.find((s) => s.id === selectedStudentId)

  return (
    <div className="space-y-6">
      <div className="border-b border-[#BDD8E9]/40 pb-4">
        <h3 className="text-lg font-bold text-[#001D39]">
          Langkah 1: Identitas & Profil Siswa
        </h3>
        <p className="text-xs text-[#49769F]">
          Pilih peserta didik kelas Anda yang akan diobservasi tugas belajarnya.
        </p>
      </div>

      {/* List Pilihan Siswa */}
      {students.length === 0 ? (
        <div className="py-12 text-center space-y-3 glass-card rounded-2xl border border-dashed border-[#BDD8E9]">
          <User className="h-10 w-10 text-[#BDD8E9] mx-auto" />
          <h4 className="text-sm font-bold text-[#001D39]">
            Belum Ada Data Siswa
          </h4>
          <p className="text-xs text-[#49769F] max-w-sm mx-auto">
            Belum ada murid yang terdaftar di kelas perwalian Anda. Silakan
            daftarkan murid terlebih dahulu melalui menu Data Siswa.
          </p>
          <Link href="/siswa">
            <Button
              size="sm"
              className="bg-[#0A4174] hover:bg-[#001D39] text-white rounded-full px-4 text-xs font-semibold mt-2"
            >
              Buka Manajemen Siswa
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map((st) => {
            const isSelected = st.id === selectedStudentId
            return (
              <div
                key={st.id}
                onClick={() => onSelectStudent(st.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#0A4174] bg-[#e8f3fa] shadow-md ring-2 ring-[#7BBDE8]/40'
                    : 'border-[#BDD8E9]/60 bg-white/70 hover:bg-white hover:border-[#4E8EA2]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-full bg-[#0A4174] text-white flex items-center justify-center font-bold text-xs">
                      {st.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#001D39]">
                        {st.name}
                      </h4>
                      <p className="text-[11px] text-[#49769F]">
                        {st.className}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="h-5 w-5 rounded-full bg-[#0A4174] text-white flex items-center justify-center">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#BDD8E9]/40 text-[11px] text-[#49769F]">
                  <p>Wali: {st.parentName || 'Belum terdata'}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Detail Siswa Terpilih */}
      {selectedStudent && (
        <div className="bg-[#f0f7fc] p-4 rounded-2xl border border-[#BDD8E9]/60 text-xs text-[#001D39] space-y-1">
          <span className="font-bold text-[#0A4174] flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" /> Siswa Terpilih untuk Observasi:
          </span>
          <p>
            <strong>{selectedStudent.name}</strong> ({selectedStudent.gender},{' '}
            {selectedStudent.age || 8} tahun) - {selectedStudent.className}
          </p>
          <p className="text-[#49769F]">
            Catatan Awal: {selectedStudent.notes || 'Belum ada catatan khusus.'}
          </p>
        </div>
      )}
    </div>
  )
}
