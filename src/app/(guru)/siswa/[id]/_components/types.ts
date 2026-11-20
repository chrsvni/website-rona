export interface StudentScreeningItem {
  id: string
  category: string
  taskName?: string | null
  riskLevel: string
  percentageScore: number
  totalScore: number
  maxPossibleScore: number
  completedAt?: Date | string | null
  systemRecommendation?: string | null
  taskProofNotes?: string | null
}

export interface StudentDailyNoteItem {
  id: string
  tag?: string | null
  note: string
  date: Date | string
}

export interface StudentDetailData {
  id: string
  name: string
  gender: string
  age?: number | null
  className: string
  schoolName: string
  parentName?: string | null
  contactNumber?: string | null
  notes?: string | null
  teacher: {
    id: string
    name: string
    nip?: string | null
    schoolName?: string | null
  }
  screenings: StudentScreeningItem[]
  dailyNotes: StudentDailyNoteItem[]
}
