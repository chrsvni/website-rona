import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { CATEGORY_FILTER_OPTIONS } from './types'

interface MateriFilterBarProps {
  categoryFilter: string
  onCategoryFilterChange: (cat: string) => void
  search: string
  onSearchChange: (query: string) => void
}

export function MateriFilterBar({
  categoryFilter,
  onCategoryFilterChange,
  search,
  onSearchChange,
}: MateriFilterBarProps) {
  return (
    <div className="glass-card p-4 sm:p-5 rounded-3xl border border-[#BDD8E9]/70 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Pills Kategori */}
      <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
        {CATEGORY_FILTER_OPTIONS.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onCategoryFilterChange(cat.value)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              categoryFilter === cat.value
                ? 'bg-[#0A4174] text-white shadow-sm'
                : 'bg-white/80 text-[#001D39] hover:bg-[#e8f3fa] border border-[#BDD8E9]/60'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Input Search */}
      <div className="relative w-full md:w-80">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#49769F]" />
        <Input
          type="text"
          placeholder="Cari judul, penulis, lembaga..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-10 rounded-xl bg-white/90 border-[#BDD8E9] text-xs"
        />
      </div>
    </div>
  )
}
