export interface ScreeningDetailItem {
  id: string
  category: string
  riskLevel: string
  totalScore: number
  maxPossibleScore: number
  percentageScore: number
  taskName?: string | null
  taskProofNotes?: string | null
  taskProofUrl?: string | null
  systemRecommendation?: string | null
  actionPlan?: string | null
  dailyIndication?: string | null
  completedAt?: Date | string | null
  studentId: string
  student: {
    name: string
    className: string
    age?: number | null
    gender: string
    schoolName: string
  }
  teacher: {
    name: string
    nip?: string | null
  }
}
