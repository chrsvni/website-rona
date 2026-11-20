import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface GuruFilterBarProps {
  existingClasses: string[]
  classFilter: string
  onClassFilterChange: (cls: string) => void
  search: string
  onSearchChange: (query: string) => void
}

export function GuruFilterBar({
  existingClasses,
  classFilter,
  onClassFilterChange,
  search,
  onSearchChange,
}: GuruFilterBarProps) {
  return (
    <div className="glass-card p-4 sm:p-5 rounded-3xl border border-[#BDD8E9]/70 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Filter Kelas */}
      <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
        <button
          onClick={() => onClassFilterChange('SEMUA')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            classFilter === 'SEMUA'
              ? 'bg-[#0A4174] text-white shadow-sm'
              : 'bg-white/80 text-[#001D39] hover:bg-[#e8f3fa] border border-[#BDD8E9]/60'
          }`}
        >
          Semua Kelas
        </button>
        {existingClasses.map((cls) => (
          <button
            key={cls}
            onClick={() => onClassFilterChange(cls)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              classFilter === cls
                ? 'bg-[#0A4174] text-white shadow-sm'
                : 'bg-white/80 text-[#001D39] hover:bg-[#e8f3fa] border border-[#BDD8E9]/60'
            }`}
          >
            {cls}
          </button>
        ))}
      </div>

      {/* Input Search */}
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#49769F]" />
        <Input
          type="text"
          placeholder="Cari nama, email, NIP, sekolah..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-10 rounded-xl bg-white/90 border-[#BDD8E9] text-xs"
        />
      </div>
    </div>
  )
}
