export interface RecentScreeningItem {
  id: string
  category: string
  percentageScore: number
  totalScore: number
  maxPossibleScore: number
  riskLevel: string
  completedAt?: Date | string | null
  createdAt: Date | string
  student: {
    name: string
    className: string
  }
  teacher: {
    name: string
  }
}

export interface DashboardStats {
  totalStudents: number
  totalScreenings: number
  highRiskScreenings: number
  articlesCount: number
}

export interface TeacherSessionData {
  id: string
  name: string
  role: string
  schoolName?: string | null
  homeroomClass?: string | null
}

export interface DashboardData {
  stats: DashboardStats
  recentScreenings: RecentScreeningItem[]
}
