import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { DailyNoteForm } from '../daily-note-form'
import type { StudentDailyNoteItem } from './types'

interface StudentDailyNotesProps {
  studentId: string
  dailyNotes: StudentDailyNoteItem[]
}

export function StudentDailyNotes({
  studentId,
  dailyNotes,
}: StudentDailyNotesProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-[#001D39]">
          Catatan Harian Guru
        </h2>
        <p className="text-xs text-[#49769F]">
          Pencatatan harian perkembangan belajar murid di kelas.
        </p>
      </div>

      {/* Form Tambah Catatan Cepat */}
      <DailyNoteForm studentId={studentId} />

      {/* List Catatan Harian */}
      <div className="space-y-3">
        {dailyNotes.length === 0 ? (
          <p className="text-xs text-[#49769F] text-center py-6">
            Belum ada catatan harian yang diinput.
          </p>
        ) : (
          dailyNotes.map((note) => (
            <div
              key={note.id}
              className="p-4 rounded-2xl bg-white/80 border border-[#BDD8E9]/60 shadow-sm space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-[10px]">
                  {note.tag || 'Harian'}
                </Badge>
                <span className="text-[10px] text-[#49769F]">
                  {formatDate(note.date)}
                </span>
              </div>
              <p className="text-xs text-[#001D39] leading-relaxed">
                {note.note}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
