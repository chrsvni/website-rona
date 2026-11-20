export function buildTeacherFilter(session: {
  id: string
  homeroomClass?: string | null
}) {
  if (session.homeroomClass) {
    return {
      OR: [
        { teacherId: session.id },
        { className: session.homeroomClass },
      ],
    }
  }
  return { teacherId: session.id }
}
