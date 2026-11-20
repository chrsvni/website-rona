interface GuruStatsCardsProps {
  totalGuru: number
  totalSiswa: number
  totalSkrining: number
}

export function GuruStatsCards({
  totalGuru,
  totalSiswa,
  totalSkrining,
}: GuruStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="glass-card p-5 rounded-3xl border border-[#BDD8E9]/70">
        <span className="text-xs font-semibold text-[#49769F]">
          Total Guru Wali Kelas
        </span>
        <p className="text-2xl sm:text-3xl font-extrabold text-[#001D39] mt-1">
          {totalGuru}
        </p>
        <p className="text-[11px] text-emerald-600 mt-0.5">
          Memiliki akses ke Portal Guru
        </p>
      </div>
      <div className="glass-card p-5 rounded-3xl border border-[#BDD8E9]/70">
        <span className="text-xs font-semibold text-[#0A4174]">
          Total Siswa Dikelola
        </span>
        <p className="text-2xl sm:text-3xl font-extrabold text-[#0A4174] mt-1">
          {totalSiswa}
        </p>
        <p className="text-[11px] text-[#49769F] mt-0.5">
          Tersebar di kelas masing-masing
        </p>
      </div>
      <div className="glass-card p-5 rounded-3xl border border-[#BDD8E9]/70">
        <span className="text-xs font-semibold text-[#4E8EA2]">
          Total Skrining Terlaksana
        </span>
        <p className="text-2xl sm:text-3xl font-extrabold text-[#4E8EA2] mt-1">
          {totalSkrining}
        </p>
        <p className="text-[11px] text-[#49769F] mt-0.5">
          Hasil observasi terekam sistem
        </p>
      </div>
    </div>
  )
}
