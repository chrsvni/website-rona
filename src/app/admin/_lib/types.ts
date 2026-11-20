import type { UserModel, EducationArticleModel } from '@/generated/prisma/models'
import type { StudentDatabaseItem } from '../_components/student-database-table'
import type { ScreeningAuditItem } from '../_components/screening-audit-table'

export interface AdminDashboardData {
  users: UserModel[]
  articles: EducationArticleModel[]
  studentsCount: number
  screeningsCount: number
  screenings: ScreeningAuditItem[]
  students: StudentDatabaseItem[]
}

export interface CategoryDistributionResult {
  dysCount: number
  dgCount: number
  dcCount: number
}
