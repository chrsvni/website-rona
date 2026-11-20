import type React from 'react'
import {
  Edit3,
  Plus,
  X,
  AlertCircle,
  CheckCircle2,
  User,
  Lock,
  GraduationCap,
  Phone,
  RefreshCw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { StudentItem, StudentFormData } from './types'

interface StudentFormModalProps {
  isOpen: boolean
  editingStudent: StudentItem | null
  formData: StudentFormData
  setFormData: React.Dispatch<React.SetStateAction<StudentFormData>>
  formSubmitting: boolean
  formError: string | null
  formSuccess: string | null
  homeroomClass?: string | null
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
}

export function StudentFormModal({
  isOpen,
  editingStudent,
  formData,
  setFormData,
  formSubmitting,
  formError,
  formSuccess,
  homeroomClass,
  onClose,
  onSubmit,
}: StudentFormModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-xl rounded-3xl p-6 sm:p-8 bg-white/95 shadow-2xl border border-white/80 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#BDD8E9]/40">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#0A4174] to-[#4E8EA2] text-white flex items-center justify-center shadow-md">
              {editingStudent ? (
                <Edit3 className="h-5 w-5" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[#001D39]">
                {editingStudent ? 'Edit Data Siswa' : 'Tambah Siswa Baru'}
              </h2>
              <p className="text-xs text-[#49769F]">
                {editingStudent
                  ? 'Perbarui informasi profil peserta didik perwalian Anda.'
                  : 'Daftarkan siswa baru di bawah perwalian kelas Anda.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {formError && (
          <div className="mt-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{formError}</span>
          </div>
        )}

        {formSuccess && (
          <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{formSuccess}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          {/* Nama Lengkap */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-[#001D39]">
              Nama Lengkap Siswa <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#49769F]" />
              <Input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Contoh: Muhammad Rayhan Pratama"
                className="pl-10 text-xs h-11 rounded-xl"
              />
            </div>
          </div>

          {/* Grid: Jenis Kelamin & Usia */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-[#001D39]">
                Jenis Kelamin <span className="text-red-500">*</span>
              </Label>
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                className="w-full h-11 px-3 rounded-xl border border-[#BDD8E9] bg-white text-xs text-[#001D39] font-medium focus:outline-none focus:border-[#0A4174]"
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-[#001D39]">
                Usia (Tahun)
              </Label>
              <Input
                type="number"
                min={6}
                max={18}
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                placeholder="Contoh: 8"
                className="text-xs h-11 rounded-xl"
              />
            </div>
          </div>

          {/* Field Kelas (Otomatis Terisi & Terkunci Sesuai Kelas Wali Guru) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-[#001D39]">
                Kelas / Rombel <span className="text-red-500">*</span>
              </Label>
              <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1 border border-emerald-200">
                <Lock className="h-3 w-3" /> Terkunci Otomatis
              </span>
            </div>
            <div className="relative">
              <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#49769F]" />
              <Input
                readOnly
                disabled
                value={formData.className}
                className="pl-10 text-xs h-11 rounded-xl bg-slate-100 font-bold text-[#001D39] border-slate-300 cursor-not-allowed"
              />
            </div>
            <p className="text-[11px] text-[#49769F]">
              Kelas otomatis disesuaikan dengan kelas perwalian Anda (
              <strong>{homeroomClass || 'Kelas 3A'}</strong>
              ) agar setiap guru hanya mengelola peserta didik di kelasnya
              masing-masing.
            </p>
          </div>

          {/* Grid: Nama Wali & Kontak */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-[#001D39]">
                Nama Orang Tua / Wali
              </Label>
              <Input
                value={formData.parentName}
                onChange={(e) =>
                  setFormData({ ...formData, parentName: e.target.value })
                }
                placeholder="Contoh: Bpk. Bambang Sutrisno"
                className="text-xs h-11 rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-[#001D39]">
                No. WhatsApp / Telepon Wali
              </Label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#49769F]" />
                <Input
                  value={formData.contactNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactNumber: e.target.value,
                    })
                  }
                  placeholder="Contoh: 081234567890"
                  className="pl-10 text-xs h-11 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Catatan Observasi Awal */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-[#001D39]">
              Catatan Awal / Karakteristik Siswa (Opsional)
            </Label>
            <Textarea
              rows={2}
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Catatan kebiasaan belajar, kesulitan fonemik yang terlihat, atau minat khusus anak di kelas..."
              className="text-xs rounded-xl"
            />
          </div>

          {/* Tombol Aksi Form */}
          <div className="pt-3 border-t border-[#BDD8E9]/40 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-xs h-10 px-4 rounded-xl"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={formSubmitting}
              className="bg-gradient-to-r from-[#0A4174] to-[#4E8EA2] text-white text-xs font-bold h-10 px-6 rounded-xl shadow-md flex items-center gap-2"
            >
              {formSubmitting ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  {editingStudent ? 'Simpan Perubahan' : 'Daftarkan Siswa'}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
