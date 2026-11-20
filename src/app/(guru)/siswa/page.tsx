import { prisma } from '@/lib/prisma'
import { getServerSession } from '@/lib/auth'
import type { StudentWhereInput } from '@/generated/prisma/models'
import { StudentManagement, type StudentItem } from './student-management'

export default async function StudentsListPage(props: {
  searchParams: Promise<{ search?: string; className?: string }>
}) {
  const searchParams = await props.searchParams
  const search = searchParams.search?.trim() || ''
  const className = searchParams.className?.trim() || ''

  const session = await getServerSession()

  const whereClause: StudentWhereInput = {}

  if (session && session.role === 'GURU') {
    if (session.homeroomClass) {
      whereClause.className = session.homeroomClass
    } else {
      whereClause.teacherId = session.id
    }
  }

  if (
    className &&
    (!session || session.role !== 'GURU' || !session.homeroomClass)
  ) {
    whereClause.className = className
  }

  if (search) {
    whereClause.name = { contains: search }
  }

  const rawStudents = await prisma.student.findMany({
    where: whereClause,
    include: {
      screenings: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
      _count: {
        select: {
          screenings: true,
          dailyNotes: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  const students: StudentItem[] = rawStudents.map((st) => ({
    id: st.id,
    name: st.name,
    gender: st.gender,
    age: st.age,
    className: st.className,
    schoolName: st.schoolName,
    parentName: st.parentName,
    contactNumber: st.contactNumber,
    notes: st.notes,
    createdAt: st.createdAt.toISOString(),
    screenings: st.screenings.map((sc) => ({
      id: sc.id,
      category: sc.category,
      riskLevel: sc.riskLevel,
      percentageScore: sc.percentageScore,
      completedAt: sc.completedAt ? sc.completedAt.toISOString() : null,
    })),
    _count: st._count,
  }))

  const teacherSession = session
    ? {
        id: session.id,
        name: session.name,
        role: session.role,
        schoolName: session.schoolName,
        nip: session.nip,
        homeroomClass: session.homeroomClass,
      }
    : null

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <StudentManagement
        initialStudents={students}
        teacherSession={teacherSession}
      />
    </div>
  )
}
