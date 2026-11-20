import { Trash2, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { StudentItem } from './types'

interface StudentDeleteModalProps {
  deleteTarget: StudentItem | null
  deleteSubmitting: boolean
  deleteError: string | null
  onCancel: () => void
  onConfirm: () => void
}

export function StudentDeleteModal({
  deleteTarget,
  deleteSubmitting,
  deleteError,
  onCancel,
  onConfirm,
}: StudentDeleteModalProps) {
  if (!deleteTarget) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-md rounded-3xl p-6 bg-white/95 shadow-2xl border border-white/80 space-y-4">
        <div className="flex items-center gap-3 text-red-600">
          <div className="h-12 w-12 rounded-2xl bg-red-100 flex items-center justify-center shrink-0">
            <Trash2 className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-[#001D39]">
              Konfirmasi Hapus Siswa
            </h3>
            <p className="text-xs text-[#49769F]">
              Tindakan ini tidak dapat dibatalkan
            </p>
          </div>
        </div>

        {deleteError && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
            {deleteError}
          </div>
        )}

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
          <p className="text-[#001D39]">
            Apakah Anda yakin ingin menghapus siswa{' '}
            <strong className="text-red-600 font-bold">
              {deleteTarget.name}
            </strong>{' '}
            ({deleteTarget.className})?
          </p>
          <p className="text-[11px] text-red-500 font-medium pt-1 border-t border-slate-200">
            ⚠️ Seluruh riwayat hasil skrining dan catatan harian siswa ini
            juga akan ikut terhapus secara permanen.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={deleteSubmitting}
            className="text-xs h-10 px-4 rounded-xl"
          >
            Batal
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={deleteSubmitting}
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold h-10 px-5 rounded-xl shadow-md flex items-center gap-2"
          >
            {deleteSubmitting ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Menghapus...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Ya, Hapus Siswa
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
