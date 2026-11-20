import Link from 'next/link'
import { Edit3, Trash2, Phone, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { StudentItem } from './types'

interface StudentCardProps {
  student: StudentItem
  onEdit: (student: StudentItem) => void
  onDelete: (student: StudentItem) => void
}

export function StudentCard({
  student: st,
  onEdit,
  onDelete,
}: StudentCardProps) {
  const latestScreening = st.screenings && st.screenings[0]

  return (
    <div className="glass-card glass-card-hover p-6 rounded-3xl flex flex-col justify-between border border-[#BDD8E9]/70 relative group">
      <div className="space-y-4">
        {/* Header Card: Avatar + Nama + Action Menu (Edit / Delete) */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#0A4174] to-[#4E8EA2] text-white flex items-center justify-center font-black text-lg shadow-md shadow-[#0A4174]/20">
              {st.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-base font-bold text-[#001D39] leading-tight">
                {st.name}
              </h3>
              <div className="text-xs text-[#49769F] flex items-center gap-1.5 mt-0.5">
                <Badge
                  variant="secondary"
                  className="text-[10px] py-0 px-2 font-semibold"
                >
                  {st.className}
                </Badge>
                <span>• {st.gender}</span>
                {st.age && <span>• {st.age} Th</span>}
              </div>
            </div>
          </div>

          {/* Tombol Aksi Cepat Edit & Hapus */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(st)}
              title="Edit data siswa"
              className="p-1.5 rounded-lg text-[#49769F] hover:text-[#0A4174] hover:bg-blue-50 transition-colors"
            >
              <Edit3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(st)}
              title="Hapus data siswa"
              className="p-1.5 rounded-lg text-[#49769F] hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Status Observasi & Catatan Harian */}
        <div className="p-3 rounded-xl bg-[#f0f7fc] border border-[#BDD8E9]/50 text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[#49769F]">Status Observasi:</span>
            {latestScreening ? (
              <Badge
                variant={
                  latestScreening.riskLevel === 'Tinggi'
                    ? 'destructive'
                    : latestScreening.riskLevel === 'Sedang'
                      ? 'warning'
                      : 'success'
                }
              >
                {latestScreening.category} ({latestScreening.riskLevel})
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="text-slate-500 border-slate-300"
              >
                Belum Di-skrining
              </Badge>
            )}
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-[#BDD8E9]/30">
            <span className="text-[#49769F]">Catatan Harian:</span>
            <span className="font-semibold text-[#001D39]">
              {st._count?.dailyNotes ?? 0} Catatan
            </span>
          </div>
        </div>

        {/* Kontak Wali & Catatan Guru */}
        {st.parentName && (
          <div className="text-xs text-[#49769F] flex items-center justify-between">
            <span>
              Wali:{' '}
              <strong className="text-[#001D39] font-medium">
                {st.parentName}
              </strong>
            </span>
            {st.contactNumber && (
              <span className="flex items-center gap-1 font-mono text-[11px]">
                <Phone className="h-3 w-3 text-[#4E8EA2]" /> {st.contactNumber}
              </span>
            )}
          </div>
        )}

        {st.notes && (
          <p className="text-xs text-[#49769F] line-clamp-2 italic bg-white/70 p-2.5 rounded-xl border border-slate-100">
            &quot;{st.notes}&quot;
          </p>
        )}
      </div>

      {/* Footer Card: Link Detail Profil & Tombol Skrining */}
      <div className="pt-4 mt-4 border-t border-[#BDD8E9]/40 flex items-center justify-between gap-2">
        <Link
          href={`/siswa/${st.id}`}
          className="text-xs font-bold text-[#0A4174] hover:underline flex items-center gap-1"
        >
          Detail Profil & Catatan <ArrowRight className="h-3 w-3" />
        </Link>

        <Link
          href={`/skrining?category=${latestScreening?.category || 'DISLEKSIA'}&studentId=${st.id}`}
        >
          <Button
            size="sm"
            variant="secondary"
            className="rounded-full text-xs h-8 px-3.5 bg-[#e8f3fa] hover:bg-[#0A4174] hover:text-white text-[#0A4174] font-semibold transition-colors"
          >
            Skrining
          </Button>
        </Link>
      </div>
    </div>
  )
}
