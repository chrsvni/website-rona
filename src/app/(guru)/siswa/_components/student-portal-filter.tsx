import { Search } from 'lucide-react'

interface StudentPortalFilterProps {
  screeningFilter: string
  onScreeningFilterChange: (filter: string) => void
  search: string
  onSearchChange: (query: string) => void
}

const STATUS_TABS = [
  { label: 'Semua Siswa', value: 'ALL' },
  { label: 'Sudah Diskrining', value: 'DONE' },
  { label: 'Belum Diskrining', value: 'NOT_DONE' },
]

export function StudentPortalFilter({
  screeningFilter,
  onScreeningFilterChange,
  search,
  onSearchChange,
}: StudentPortalFilterProps) {
  return (
    <div className="glass-panel p-4 rounded-3xl space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {STATUS_TABS.map((tab) => {
            const active = screeningFilter === tab.value
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => onScreeningFilterChange(tab.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  active
                    ? 'bg-[#0A4174] text-white shadow-sm'
                    : 'bg-white/80 text-[#001D39] hover:bg-[#e8f3fa] border border-[#BDD8E9]/60'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Search Bar */}
        <div className="w-full sm:w-72">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#49769F]" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari nama siswa..."
              className="w-full pl-9 pr-3 h-9 rounded-xl border border-[#BDD8E9] bg-white text-xs text-[#001D39] focus:outline-none focus:border-[#0A4174]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
