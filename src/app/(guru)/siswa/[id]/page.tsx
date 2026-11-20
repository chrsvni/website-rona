import { notFound } from 'next/navigation'
import { getStudentDetail } from './_services/student-detail-service'
import {
  StudentDetailNav,
  StudentDetailHeader,
  StudentScreeningHistory,
  StudentDailyNotes,
} from './_components'

export default async function StudentDetailPage(props: {
  params: Promise<{ id: string }>
}) {
  const { id } = await props.params

  const student = await getStudentDetail(id)

  if (!student) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <StudentDetailNav />
      <StudentDetailHeader student={student} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <StudentScreeningHistory
            studentName={student.name}
            teacherName={student.teacher.name}
            screenings={student.screenings}
          />
        </div>
        <div>
          <StudentDailyNotes
            studentId={student.id}
            dailyNotes={student.dailyNotes}
          />
        </div>
      </div>
    </div>
  )
}
