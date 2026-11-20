import Link from 'next/link'
import { Search } from 'lucide-react'
import { CATEGORY_TABS } from './types'

interface MateriPortalFilterProps {
  currentCategory: string
  currentSearch: string
}

export function MateriPortalFilter({
  currentCategory,
  currentSearch,
}: MateriPortalFilterProps) {
  return (
    <div className="glass-panel p-4 rounded-3xl space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {CATEGORY_TABS.map((c) => {
            const active = currentCategory === c.value
            return (
              <Link
                key={c.value}
                href={`/materi?cat=${c.value}${currentSearch ? `&search=${encodeURIComponent(currentSearch)}` : ''}`}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  active
                    ? 'bg-[#0A4174] text-white shadow-sm'
                    : 'bg-white/80 text-[#001D39] hover:bg-[#e8f3fa] border border-[#BDD8E9]/60'
                }`}
              >
                {c.label}
              </Link>
            )
          })}
        </div>

        {/* Search Bar */}
        <form method="GET" className="w-full sm:w-72">
          <input type="hidden" name="cat" value={currentCategory} />
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#49769F]" />
            <input
              type="text"
              name="search"
              defaultValue={currentSearch}
              placeholder="Cari materi, jurnal, sumber..."
              className="w-full pl-9 pr-3 h-9 rounded-xl border border-[#BDD8E9] bg-white text-xs text-[#001D39] focus:outline-none focus:border-[#0A4174]"
            />
          </div>
        </form>
      </div>
    </div>
  )
}
