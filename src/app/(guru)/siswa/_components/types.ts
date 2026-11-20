export interface StudentItem {
  id: string
  name: string
  gender: string
  age?: number | null
  className: string
  schoolName: string
  parentName?: string | null
  contactNumber?: string | null
  notes?: string | null
  createdAt: string | Date
  screenings: Array<{
    id: string
    category: string
    riskLevel: string
    percentageScore?: number
    completedAt?: string | Date | null
  }>
  _count: {
    screenings: number
    dailyNotes: number
  }
}

export interface TeacherSessionInfo {
  id: string
  name: string
  role: string
  schoolName?: string | null
  nip?: string | null
  homeroomClass?: string | null
}

export interface StudentFormData {
  name: string
  gender: string
  age: string
  className: string
  parentName: string
  contactNumber: string
  notes: string
}

export interface StudentManagementProps {
  initialStudents: StudentItem[]
  teacherSession: TeacherSessionInfo | null
}
