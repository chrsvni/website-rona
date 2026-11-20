import { prisma } from '@/lib/prisma'

export async function getStudentDetail(id: string) {
  return prisma.student.findUnique({
    where: { id },
    include: {
      screenings: {
        orderBy: { createdAt: 'desc' },
      },
      dailyNotes: {
        orderBy: { date: 'desc' },
      },
      teacher: true,
    },
  })
}
