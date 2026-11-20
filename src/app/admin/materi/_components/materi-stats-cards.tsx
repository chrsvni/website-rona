interface MateriStatsCardsProps {
  totalCount: number
  disleksiaCount: number
  disgrafiaCount: number
  diskalkuliaCount: number
}

export function MateriStatsCards({
  totalCount,
  disleksiaCount,
  disgrafiaCount,
  diskalkuliaCount,
}: MateriStatsCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="glass-card p-5 rounded-3xl border border-[#BDD8E9]/70">
        <span className="text-xs font-semibold text-[#49769F]">
          Total Referensi
        </span>
        <p className="text-2xl sm:text-3xl font-extrabold text-[#001D39] mt-1">
          {totalCount}
        </p>
        <p className="text-[11px] text-[#4E8EA2] mt-0.5">Tautan aktif di sistem</p>
      </div>
      <div className="glass-card p-5 rounded-3xl border border-[#BDD8E9]/70">
        <span className="text-xs font-semibold text-[#0A4174]">
          Kategori Disleksia
        </span>
        <p className="text-2xl sm:text-3xl font-extrabold text-[#0A4174] mt-1">
          {disleksiaCount}
        </p>
        <p className="text-[11px] text-[#49769F] mt-0.5">Membaca & Fonemik</p>
      </div>
      <div className="glass-card p-5 rounded-3xl border border-[#BDD8E9]/70">
        <span className="text-xs font-semibold text-[#4E8EA2]">
          Kategori Disgrafia
        </span>
        <p className="text-2xl sm:text-3xl font-extrabold text-[#4E8EA2] mt-1">
          {disgrafiaCount}
        </p>
        <p className="text-[11px] text-[#49769F] mt-0.5">
          Menulis & Motorik Halus
        </p>
      </div>
      <div className="glass-card p-5 rounded-3xl border border-[#BDD8E9]/70">
        <span className="text-xs font-semibold text-[#49769F]">
          Kategori Diskalkulia
        </span>
        <p className="text-2xl sm:text-3xl font-extrabold text-[#49769F] mt-1">
          {diskalkuliaCount}
        </p>
        <p className="text-[11px] text-[#49769F] mt-0.5">
          Logika Angka & Kuantitas
        </p>
      </div>
    </div>
  )
}
