import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth'
import { getTeacherDashboardData } from './_services/dashboard-service'
import {
  GuruHeroSection,
  GuruStatsSection,
  GuruModulesSection,
  GuruRecentScreenings,
} from './_components'

export default async function TeacherHomePage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/login')
  }

  if (session.role === 'ADMIN') {
    redirect('/admin')
  }

  const { stats, recentScreenings } = await getTeacherDashboardData(session)

  return (
    <div className="space-y-12 pb-16">
      <GuruHeroSection session={session} />
      <GuruStatsSection stats={stats} />
      <GuruModulesSection />
      <GuruRecentScreenings recentScreenings={recentScreenings} />
    </div>
  )
}
