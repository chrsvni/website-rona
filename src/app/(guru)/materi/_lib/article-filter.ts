import type { EducationArticleWhereInput } from '@/generated/prisma/models'

export function buildArticleWhereClause(
  categoryFilter: string,
  search: string
): EducationArticleWhereInput {
  const whereClause: EducationArticleWhereInput = { published: true }

  if (categoryFilter !== 'SEMUA') {
    whereClause.category = categoryFilter
  }

  if (search) {
    whereClause.OR = [
      { title: { contains: search } },
      { excerpt: { contains: search } },
      { author: { contains: search } },
    ]
  }

  return whereClause
}
