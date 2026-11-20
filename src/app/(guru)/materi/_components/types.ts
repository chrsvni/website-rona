export interface PortalArticleItem {
  id: string
  title: string
  slug: string
  category: string
  author: string
  sourceUrl?: string | null
  publishedDate?: string | null
  excerpt?: string | null
  bookmarks: { id: string }[]
}

export const CATEGORY_TABS = [
  { label: 'Semua Materi', value: 'SEMUA' },
  { label: 'Disleksia', value: 'DISLEKSIA' },
  { label: 'Disgrafia', value: 'DISGRAFIA' },
  { label: 'Diskalkulia', value: 'DISKALKULIA' },
  { label: 'Panduan & Umum', value: 'UMUM' },
]
