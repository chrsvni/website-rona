import { prisma } from '@/lib/prisma'
import { buildTeacherFilter } from '../_lib/teacher-filter'
import type { DashboardData, TeacherSessionData } from '../_components/types'

export async function getTeacherDashboardData(
  session: TeacherSessionData
): Promise<DashboardData> {
  const teacherFilter = buildTeacherFilter(session)

  const [
    totalStudents,
    totalScreenings,
    recentScreenings,
    articlesCount,
    highRiskScreenings,
  ] = await Promise.all([
    prisma.student.count({ where: teacherFilter }),
    prisma.screening.count({ where: { student: teacherFilter } }),
    prisma.screening.findMany({
      where: { student: teacherFilter },
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        student: true,
        teacher: { select: { name: true } },
      },
    }),
    prisma.educationArticle.count(),
    prisma.screening.count({
      where: {
        riskLevel: 'Tinggi',
        student: teacherFilter,
      },
    }),
  ])

  return {
    stats: {
      totalStudents,
      totalScreenings,
      highRiskScreenings,
      articlesCount,
    },
    recentScreenings,
  }
}
