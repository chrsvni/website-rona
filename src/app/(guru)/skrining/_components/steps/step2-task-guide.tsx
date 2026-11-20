import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { BookOpen, CheckCircle2, Clock } from 'lucide-react'
import type { ScreeningCategory } from '../types'
import type { TaskGuide } from '@/lib/screening-data'

interface Step2TaskGuideProps {
  category: ScreeningCategory
  activeTaskGuide: TaskGuide
  taskProofNotes: string
  setTaskProofNotes: (val: string) => void
  taskProofUrl: string
  setTaskProofUrl: (val: string) => void
}

export function Step2TaskGuide({
  category,
  activeTaskGuide,
  taskProofNotes,
  setTaskProofNotes,
  taskProofUrl,
  setTaskProofUrl,
}: Step2TaskGuideProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-[#BDD8E9]/40 pb-4">
        <div className="flex items-center gap-2">
          <Badge
            variant={
              category === 'DISLEKSIA'
                ? 'disleksia'
                : category === 'DISGRAFIA'
                  ? 'disgrafia'
                  : 'diskalkulia'
            }
          >
            Modul: {category}
          </Badge>
          <span className="text-xs text-[#49769F] flex items-center gap-1">
            <Clock className="h-3 w-3" /> Durasi: {activeTaskGuide.duration}
          </span>
        </div>
        <h3 className="text-lg font-bold text-[#001D39] mt-2">
          {activeTaskGuide.name}
        </h3>
        <p className="text-xs text-[#49769F]">{activeTaskGuide.objective}</p>
      </div>

      {/* Detail Instruksi Guru & Langkah Siswa */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Petunjuk Guru */}
        <div className="p-4 rounded-2xl bg-[#e8f3fa]/70 border border-[#7BBDE8]/50 space-y-2">
          <h4 className="text-xs font-bold text-[#0A4174] uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" /> Panduan Pelaksanaan untuk Guru
          </h4>
          <ul className="text-xs text-[#001D39] space-y-1.5">
            {activeTaskGuide.instructionsForTeacher.map((ins, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-[#0A4174] font-bold">•</span>
                <span>{ins}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Langkah Tugas Siswa */}
        <div className="p-4 rounded-2xl bg-[#f0f9fa]/70 border border-[#6EA2B3]/50 space-y-2">
          <h4 className="text-xs font-bold text-[#4E8EA2] uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" /> Langkah Aktivitas Siswa
          </h4>
          <ul className="text-xs text-[#001D39] space-y-1.5">
            {activeTaskGuide.taskStepsForStudent.map((stp, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-[#4E8EA2] font-bold">✓</span>
                <span>{stp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Input Bukti Tugas yang Dikerjakan Siswa */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-bold text-[#001D39]">
            Catatan Bukti Tugas yang Sudah Dikerjakan Siswa *
          </Label>
          <span className="text-[11px] text-[#49769F]">
            Wajib diisi sesuai fakta pengerjaan
          </span>
        </div>
        <Textarea
          placeholder="Tuliskan bukti pengerjaan tugas oleh murid, misalnya: 'Siswa telah menyelesaikan pembacaan teks 2 paragraf dalam waktu 15 menit. Terjadi 7 kali pembalikan huruf b-d dan jari terus menunjuk setiap baris...' atau lampirkan ringkasan lembar kerja..."
          rows={4}
          value={taskProofNotes}
          onChange={(e) => setTaskProofNotes(e.target.value)}
        />
        <div>
          <Label className="text-xs font-semibold text-[#49769F]">
            Tautan Lampiran / Foto Lembar Tugas (Opsional)
          </Label>
          <Input
            placeholder="https://drive.google.com/... atau URL foto lembar tugas"
            value={taskProofUrl}
            onChange={(e) => setTaskProofUrl(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
