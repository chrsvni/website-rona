import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { TeacherItem } from './types'

interface GuruDeleteModalProps {
  deleteTarget: TeacherItem | null
  deleteSubmitting: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function GuruDeleteModal({
  deleteTarget,
  deleteSubmitting,
  onCancel,
  onConfirm,
}: GuruDeleteModalProps) {
  if (!deleteTarget) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-red-100 space-y-4">
        <div className="h-12 w-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
          <Trash2 className="h-6 w-6" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-base font-bold text-[#001D39]">
            Hapus Akun Guru?
          </h3>
          <p className="text-xs text-[#49769F]">
            Apakah Anda yakin ingin menghapus akun guru{' '}
            <strong>&quot;{deleteTarget.name}&quot;</strong> (Wali{' '}
            {deleteTarget.homeroomClass || '-'})? Seluruh data binaan dan rekam
            observasi yang terkait akan ikut terhapus.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onCancel}
            className="h-10 rounded-xl text-xs font-semibold"
          >
            Batal
          </Button>
          <Button
            disabled={deleteSubmitting}
            onClick={onConfirm}
            className="h-10 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white"
          >
            {deleteSubmitting ? 'Menghapus...' : 'Ya, Hapus'}
          </Button>
        </div>
      </div>
    </div>
  )
}
