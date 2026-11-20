import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Info } from 'lucide-react'

interface Step4DailyIndicationProps {
  dailyIndication: string
  setDailyIndication: (val: string) => void
  dailyGeneralNote: string
  setDailyGeneralNote: (val: string) => void
}

export function Step4DailyIndication({
  dailyIndication,
  setDailyIndication,
  dailyGeneralNote,
  setDailyGeneralNote,
}: Step4DailyIndicationProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-[#BDD8E9]/40 pb-4">
        <h3 className="text-lg font-bold text-[#001D39]">
          Langkah 4: Indikasi Harian & Catatan Kelas
        </h3>
        <p className="text-xs text-[#49769F]">
          Masukkan catatan tambahan terkait indikasi harian dan pengamatan
          emosional siswa di luar waktu tugas terstruktur.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-[#001D39]">
            Indikasi Harian (Pola Belajar Rutin)
          </Label>
          <Textarea
            placeholder="Misalnya: 'Siswa tampak enggan membuka buku saat jam pelajaran tertentu, sering meminta izin keluar saat giliran membaca dimulai, atau sering mengeluhkan pensil yang tidak nyaman...'"
            rows={3}
            value={dailyIndication}
            onChange={(e) => setDailyIndication(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-[#001D39]">
            Kelebihan & Minat Belajar Siswa (Catatan Positif)
          </Label>
          <Textarea
            placeholder="Misalnya: 'Sangat unggul dalam penalaran visual, menggambar, diskusi lisan, dan memiliki empati sosial tinggi terhadap sesama teman...'"
            rows={3}
            value={dailyGeneralNote}
            onChange={(e) => setDailyGeneralNote(e.target.value)}
          />
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <Info className="h-4 w-4 shrink-0 text-amber-700 mt-0.5" />
          <span>
            <strong>Informasi Sistem Rona:</strong> Pada tahap berikutnya,
            algoritma diagnostik Rona akan menghitung secara otomatis
            tingkat indikasi dan menghasilkan{' '}
            <strong>
              rekomendasi terstandar yang diatur oleh sistem
            </strong>
            .
          </span>
        </div>
      </div>
    </div>
  )
}
