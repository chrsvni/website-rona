import type { UserModel } from '@/generated/prisma/models'
import type { ScreeningAuditItem } from '../_components/screening-audit-table'
import type { CategoryDistributionResult } from './types'

export function filterTeachers(users: UserModel[]): UserModel[] {
  return users.filter((u) => u.role === 'GURU')
}

export function calculateCategoryDistribution(
  screenings: ScreeningAuditItem[]
): CategoryDistributionResult {
  const dysCount = screenings.filter((s) => s.category === 'DISLEKSIA').length
  const dgCount = screenings.filter((s) => s.category === 'DISGRAFIA').length
  const dcCount = screenings.filter((s) => s.category === 'DISKALKULIA').length

  return {
    dysCount,
    dgCount,
    dcCount,
  }
}
