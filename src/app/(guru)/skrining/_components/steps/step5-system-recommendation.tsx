import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Printer, Sparkles } from 'lucide-react'
import type { SystemDiagnosisResult } from '@/lib/screening-data'

interface Step5SystemRecommendationProps {
  diagnosisResult: SystemDiagnosisResult
  savedScreeningId: string | null
  isSubmitting: boolean
  onSave: () => void
  onPrint: () => void
}

export function Step5SystemRecommendation({
  diagnosisResult,
  savedScreeningId,
  isSubmitting,
  onSave,
  onPrint,
}: Step5SystemRecommendationProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-[#BDD8E9]/40 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold text-[#4E8EA2] uppercase tracking-wider">
            Hasil Diagnostik Otomatis Rona
          </span>
          <h3 className="text-xl font-extrabold text-[#001D39]">
            {diagnosisResult.summaryTitle}
          </h3>
        </div>
        <Badge
          className="text-sm px-4 py-1 self-start sm:self-auto"
          variant={
            diagnosisResult.riskLevel === 'Tinggi'
              ? 'destructive'
              : diagnosisResult.riskLevel === 'Sedang'
                ? 'warning'
                : 'success'
          }
        >
          Tingkat Indikasi: {diagnosisResult.riskLevel}
        </Badge>
      </div>

      {/* Skor dan Meter Indikasi */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white/70 border border-[#BDD8E9]/60">
          <span className="text-xs text-[#49769F]">Total Skor Perilaku</span>
          <p className="text-2xl font-black text-[#001D39] mt-1">
            {diagnosisResult.totalScore} / {diagnosisResult.maxScore}
          </p>
          <p className="text-[11px] text-[#4E8EA2]">
            Berdasarkan 8 indikator tugas
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/70 border border-[#BDD8E9]/60">
          <span className="text-xs text-[#49769F]">Persentase Indikasi</span>
          <p className="text-2xl font-black text-[#0A4174] mt-1">
            {diagnosisResult.percentageScore}%
          </p>
          <p className="text-[11px] text-[#49769F]">
            Ambang batas kesulitan belajar
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/70 border border-[#BDD8E9]/60">
          <span className="text-xs text-[#49769F]">Status Rekomendasi</span>
          <p className="text-sm font-bold text-emerald-700 mt-2 flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4" /> Ditetapkan Oleh Sistem
          </p>
          <p className="text-[10px] text-[#49769F]">Algoritma Pedagogis Rona</p>
        </div>
      </div>

      {/* Rekomendasi Sistem (Diatur oleh sistem bukan guru) */}
      <div className="p-5 rounded-2xl bg-[#e8f3fa] border border-[#7BBDE8]/60 space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-[#0A4174]">
          <Sparkles className="h-4 w-4" />
          <h4>Rekomendasi Resmi Sistem Rona</h4>
        </div>
        <p className="text-xs text-[#001D39] leading-relaxed whitespace-pre-line">
          {diagnosisResult.systemRecommendation}
        </p>
      </div>

      {/* Rencana Tindak Lanjut Terstruktur */}
      <div className="p-5 rounded-2xl bg-white border border-[#BDD8E9] space-y-3">
        <h4 className="text-sm font-bold text-[#001D39] flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          Rencana Tindak Lanjut untuk Guru & Orang Tua
        </h4>
        <div className="text-xs text-[#001D39] space-y-2 whitespace-pre-line leading-relaxed">
          {diagnosisResult.actionPlan}
        </div>
      </div>

      {/* Tombol Simpan & Akses Kartu Hasil */}
      <div className="pt-4 border-t border-[#BDD8E9]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-[#49769F]">
          {savedScreeningId
            ? '✓ Data skrining berhasil disimpan ke profil siswa.'
            : 'Simpan hasil skrining agar masuk ke profil siswa dan dapat diunduh/dicetak.'}
        </p>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {!savedScreeningId ? (
            <Button
              onClick={onSave}
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-[#0A4174] hover:bg-[#001D39] text-white"
            >
              {isSubmitting ? 'Menyimpan...' : 'Simpan Hasil Skrining'}
            </Button>
          ) : (
            <Button
              onClick={onPrint}
              className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white flex items-center gap-2"
            >
              <Printer className="h-4 w-4" />
              Cetak / Unduh Kartu Hasil PDF
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
