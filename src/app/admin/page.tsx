import { fetchAdminDashboardData } from './_services/admin-dashboard-service'
import {
  filterTeachers,
  calculateCategoryDistribution,
} from './_lib/dashboard-metrics'
import {
  AdminHeader,
  AdminStatsCards,
  CategoryDistribution,
  StudentDatabaseTable,
  ScreeningAuditTable,
} from './_components'

export default async function AdminDashboardPage() {
  const data = await fetchAdminDashboardData()
  const teachers = filterTeachers(data.users)
  const distribution = calculateCategoryDistribution(data.screenings)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <AdminHeader />

      <AdminStatsCards
        teachersCount={teachers.length}
        studentsCount={data.studentsCount}
        screeningsCount={data.screeningsCount}
        articlesCount={data.articles.length}
      />

      <CategoryDistribution
        dysCount={distribution.dysCount}
        dgCount={distribution.dgCount}
        dcCount={distribution.dcCount}
        totalScreenings={data.screeningsCount}
      />

      <StudentDatabaseTable students={data.students} />

      <ScreeningAuditTable screenings={data.screenings} />
    </div>
  )
}
