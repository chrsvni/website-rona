interface CategoryDistributionProps {
  dysCount: number
  dgCount: number
  dcCount: number
  totalScreenings: number
}

export function CategoryDistribution({
  dysCount,
  dgCount,
  dcCount,
  totalScreenings,
}: CategoryDistributionProps) {
  const dysPercentage = totalScreenings > 0 ? (dysCount / totalScreenings) * 100 : 0
  const dgPercentage = totalScreenings > 0 ? (dgCount / totalScreenings) * 100 : 0
  const dcPercentage = totalScreenings > 0 ? (dcCount / totalScreenings) * 100 : 0

  return (
    <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[#BDD8E9]/70 space-y-4">
      <h3 className="text-base font-bold text-[#001D39]">
        Distribusi Hasil Skrining Berdasarkan Kategori
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200">
          <span className="text-xs font-bold text-[#0A4174]">
            Disleksia (Membaca)
          </span>
          <p className="text-2xl font-black text-[#0A4174] mt-1">
            {dysCount} Observasi
          </p>
          <div className="w-full bg-blue-200 h-2 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#0A4174] h-full transition-all duration-500"
              style={{
                width: `${dysPercentage}%`,
              }}
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-teal-50/80 border border-teal-200">
          <span className="text-xs font-bold text-[#4E8EA2]">
            Disgrafia (Menulis)
          </span>
          <p className="text-2xl font-black text-[#4E8EA2] mt-1">
            {dgCount} Observasi
          </p>
          <div className="w-full bg-teal-200 h-2 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#4E8EA2] h-full transition-all duration-500"
              style={{
                width: `${dgPercentage}%`,
              }}
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200">
          <span className="text-xs font-bold text-[#49769F]">
            Diskalkulia (Hitung)
          </span>
          <p className="text-2xl font-black text-[#49769F] mt-1">
            {dcCount} Observasi
          </p>
          <div className="w-full bg-indigo-200 h-2 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#49769F] h-full transition-all duration-500"
              style={{
                width: `${dcPercentage}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
