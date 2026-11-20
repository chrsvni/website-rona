import { X, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ARTICLE_CATEGORY_OPTIONS, type ArticleFormData } from './types'

interface MateriFormModalProps {
  isOpen: boolean
  editingId: string | null
  formData: ArticleFormData
  setFormData: React.Dispatch<React.SetStateAction<ArticleFormData>>
  formSubmitting: boolean
  formError: string | null
  formSuccess: string | null
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
}

export function MateriFormModal({
  isOpen,
  editingId,
  formData,
  setFormData,
  formSubmitting,
  formError,
  formSuccess,
  onClose,
  onSubmit,
}: MateriFormModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#BDD8E9] space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#BDD8E9]/50 pb-4">
          <div>
            <h3 className="text-lg font-bold text-[#001D39]">
              {editingId
                ? 'Edit Referensi Materi'
                : 'Tambah Referensi Materi Baru'}
            </h3>
            <p className="text-xs text-[#49769F]">
              Masukkan informasi artikel / jurnal ilmiah rujukan dari internet.
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
              htmlFor="title"
              className="text-xs font-semibold text-[#001D39]"
            >
              Judul Artikel / Referensi <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Contoh: Mengenal Disleksia pada Anak Usia Sekolah Dasar"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="h-10 rounded-xl text-xs bg-slate-50 border-[#BDD8E9]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="author"
                className="text-xs font-semibold text-[#001D39]"
              >
                Sumber / Lembaga / Penulis{' '}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="author"
                type="text"
                placeholder="Contoh: Kemdikbudristek / IDAI"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                required
                className="h-10 rounded-xl text-xs bg-slate-50 border-[#BDD8E9]"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="category"
                className="text-xs font-semibold text-[#001D39]"
              >
                Kategori Hambatan <span className="text-red-500">*</span>
              </Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full h-10 px-3 rounded-xl text-xs bg-slate-50 border border-[#BDD8E9] text-[#001D39] focus:outline-none focus:ring-2 focus:ring-[#0A4174]"
              >
                {ARTICLE_CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <Label
                htmlFor="sourceUrl"
                className="text-xs font-semibold text-[#001D39]"
              >
                Tautan / URL Asli dari Internet{' '}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="sourceUrl"
                type="url"
                placeholder="https://ditpsd.kemdikbud.go.id/artikel/..."
                value={formData.sourceUrl}
                onChange={(e) =>
                  setFormData({ ...formData, sourceUrl: e.target.value })
                }
                required
                className="h-10 rounded-xl text-xs bg-slate-50 border-[#BDD8E9]"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="publishedDate"
                className="text-xs font-semibold text-[#001D39]"
              >
                Tahun / Tanggal Rilis
              </Label>
              <Input
                id="publishedDate"
                type="text"
                placeholder="2024 atau Mei 2024"
                value={formData.publishedDate}
                onChange={(e) =>
                  setFormData({ ...formData, publishedDate: e.target.value })
                }
                className="h-10 rounded-xl text-xs bg-slate-50 border-[#BDD8E9]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="excerpt"
              className="text-xs font-semibold text-[#001D39]"
            >
              Ringkasan Singkat Isi Materi (1–2 Kalimat)
            </Label>
            <Textarea
              id="excerpt"
              rows={3}
              placeholder="Deskripsikan gambaran pokok bahasan artikel agar guru tahu poin pentingnya sebelum membuka tautan."
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              className="rounded-xl text-xs bg-slate-50 border-[#BDD8E9] resize-none"
            />
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
                  {editingId ? 'Perbarui Materi' : 'Simpan Referensi'}
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
