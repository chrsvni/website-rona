export interface ArticleDetailData {
  id: string
  title: string
  slug: string
  category: string
  type: string
  readingTime?: string | null
  coverImage?: string | null
  author: string
  publishedDate?: string | null
  sourceUrl?: string | null
  excerpt: string
  content: string
  createdAt: Date | string
  bookmarks: Array<{ id: string }>
}
