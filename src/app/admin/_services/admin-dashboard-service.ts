import { prisma } from '@/lib/prisma'
import type { AdminDashboardData } from '../_lib/types'

export async function fetchAdminDashboardData(): Promise<AdminDashboardData> {
  const [
    users,
    articles,
    studentsCount,
    screeningsCount,
    screenings,
    students,
  ] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    }),
    prisma.educationArticle.findMany({
      orderBy: { createdAt: 'desc' },
    }),
    prisma.student.count(),
    prisma.screening.count(),
    prisma.screening.findMany({
      include: {
        student: true,
        teacher: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.student.findMany({
      include: {
        teacher: {
          select: {
            name: true,
            homeroomClass: true,
          },
        },
        screenings: {
          select: {
            id: true,
            category: true,
            riskLevel: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: [{ className: 'asc' }, { name: 'asc' }],
    }),
  ])

  return {
    users,
    articles,
    studentsCount,
    screeningsCount,
    screenings,
    students,
  }
}
