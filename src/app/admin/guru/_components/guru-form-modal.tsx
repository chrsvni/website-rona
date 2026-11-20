import {
  X,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Eye,
  EyeOff,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CLASS_OPTIONS, type TeacherFormData } from './types'

interface GuruFormModalProps {
  isOpen: boolean
  editingId: string | null
  formData: TeacherFormData
  setFormData: React.Dispatch<React.SetStateAction<TeacherFormData>>
  showPassword: boolean
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
  formSubmitting: boolean
  formError: string | null
  formSuccess: string | null
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
  onGeneratePassword: () => void
}

export function GuruFormModal({
  isOpen,
  editingId,
  formData,
  setFormData,
  showPassword,
  setShowPassword,
  formSubmitting,
  formError,
  formSuccess,
  onClose,
  onSubmit,
  onGeneratePassword,
}: GuruFormModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#BDD8E9] space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#BDD8E9]/50 pb-4">
          <div>
            <h3 className="text-lg font-bold text-[#001D39]">
              {editingId
                ? 'Edit Profil Guru & Reset Sandi'
                : 'Terbitkan Akun Guru Baru'}
            </h3>
            <p className="text-xs text-[#49769F]">
              Atur penugasan wali kelas dan NIP 18 digit resmi bagi pendidik.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-[#49769F]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {formError && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {formSuccess && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>{formSuccess}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="guru-name"
              className="text-xs font-semibold text-[#001D39]"
            >
              Nama Lengkap & Gelar Guru <span className="text-red-500">*</span>
            </Label>
            <Input
              id="guru-name"
              type="text"
              placeholder="Contoh: Ibu Cika Kirana, S.Pd."
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="h-10 rounded-xl text-xs bg-slate-50 border-[#BDD8E9]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="guru-email"
                className="text-xs font-semibold text-[#001D39]"
              >
                Email Guru (Untuk Login) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="guru-email"
                type="email"
                placeholder="Contoh: guru@sekolah.sch.id"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="h-10 rounded-xl text-xs bg-slate-50 border-[#BDD8E9]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="guru-nip"
                  className="text-xs font-semibold text-[#001D39]"
                >
                  NIP Guru (Standar 18 Digit)
                </Label>
                <span
                  className={`text-[10px] font-mono font-bold ${
                    formData.nip.replace(/\D/g, '').length === 18
                      ? 'text-emerald-600'
                      : formData.nip.replace(/\D/g, '').length > 0
                        ? 'text-rose-600'
                        : 'text-[#49769F]'
                  }`}
                >
                  {formData.nip.replace(/\D/g, '').length}/18 digit
                </span>
              </div>
              <Input
                id="guru-nip"
                type="text"
                maxLength={18}
                placeholder="Contoh: 199208152019032008"
                value={formData.nip}
                onChange={(e) => {
                  const numbersOnly = e.target.value.replace(/\D/g, '')
                  setFormData({ ...formData, nip: numbersOnly })
                }}
                className="h-10 rounded-xl text-xs font-mono bg-slate-50 border-[#BDD8E9]"
              />
              <p className="text-[10px] text-[#49769F]">
                Standar NIP ASN/PNS: 8 digit tgl lahir + 6 digit TMT + 1 jk + 3
                nomor urut.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="guru-class"
                className="text-xs font-semibold text-[#001D39]"
              >
                Penugasan Wali Kelas <span className="text-red-500">*</span>
              </Label>
              <select
                id="guru-class"
                value={formData.homeroomClass}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    homeroomClass: e.target.value,
                  })
                }
                className="w-full h-10 px-3 rounded-xl text-xs bg-slate-50 border border-[#BDD8E9] text-[#001D39] focus:outline-none focus:ring-2 focus:ring-[#0A4174] font-semibold"
              >
                {CLASS_OPTIONS.map((cls) => (
                  <option key={cls} value={cls}>
                    Wali {cls}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-[#4E8EA2]">
                Guru hanya akan memegang dan mengobservasi siswa kelas ini.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="guru-school"
                className="text-xs font-semibold text-[#001D39]"
              >
                Unit Sekolah / Tempat Mengajar
              </Label>
              <Input
                id="guru-school"
                type="text"
                placeholder="Contoh: SD Negeri Cempaka Putih 01"
                value={formData.schoolName}
                onChange={(e) =>
                  setFormData({ ...formData, schoolName: e.target.value })
                }
                className="h-10 rounded-xl text-xs bg-slate-50 border-[#BDD8E9]"
              />
            </div>
          </div>

          {/* Password Section */}
          <div className="space-y-1.5 p-4 rounded-2xl bg-[#e8f3fa]/50 border border-[#BDD8E9]">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="guru-password"
                className="text-xs font-semibold text-[#001D39]"
              >
                {editingId
                  ? 'Ganti Kata Sandi (Kosongkan bila tidak diubah)'
                  : 'Kata Sandi Awal Guru *'}
              </Label>
              <button
                type="button"
                onClick={onGeneratePassword}
                className="text-[11px] font-semibold text-[#0A4174] hover:underline flex items-center gap-1"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Acak Sandi</span>
              </button>
            </div>
            <div className="relative">
              <Input
                id="guru-password"
                type={showPassword ? 'text' : 'password'}
                placeholder={
                  editingId
                    ? 'Masukkan sandi baru jika ingin reset...'
                    : 'Minimal 6 karakter'
                }
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required={!editingId}
                className="pr-10 h-10 rounded-xl text-xs bg-white border-[#BDD8E9]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#49769F] hover:text-[#001D39]"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="text-[11px] text-[#4E8EA2]">
              Berikan email dan kata sandi ini kepada guru yang bersangkutan
              untuk login di portal masuk.
            </p>
          </div>

          <div className="pt-4 border-t border-[#BDD8E9]/50 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-10 rounded-xl text-xs font-semibold border-slate-300"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={formSubmitting}
              className="h-10 rounded-xl text-xs font-semibold bg-[#0A4174] hover:bg-[#001D39] text-white px-5 shadow-md flex items-center gap-2"
            >
              {formSubmitting ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>
                  {editingId ? 'Perbarui Akun Guru' : 'Terbitkan Akun'}
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
