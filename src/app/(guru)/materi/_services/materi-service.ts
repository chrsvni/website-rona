import { prisma } from '@/lib/prisma'
import { buildArticleWhereClause } from '../_lib/article-filter'

export async function getPortalArticles(
  categoryFilter: string,
  search: string
) {
  const where = buildArticleWhereClause(categoryFilter, search)

  return prisma.educationArticle.findMany({
    where,
    include: {
      bookmarks: true,
    },
    orderBy: { createdAt: 'desc' },
  })
}
