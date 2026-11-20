export interface ArticleItem {
  id: string
  title: string
  slug: string
  category: string
  type: string
  excerpt: string
  content: string
  author: string
  sourceUrl?: string | null
  publishedDate?: string | null
  published: boolean
  createdAt: string
}

export interface ArticleFormData {
  title: string
  author: string
  category: string
  sourceUrl: string
  publishedDate: string
  excerpt: string
}

export const CATEGORY_FILTER_OPTIONS = [
  { label: 'Semua', value: 'SEMUA' },
  { label: 'Disleksia', value: 'DISLEKSIA' },
  { label: 'Disgrafia', value: 'DISGRAFIA' },
  { label: 'Diskalkulia', value: 'DISKALKULIA' },
  { label: 'Umum / Panduan', value: 'UMUM' },
]

export const ARTICLE_CATEGORY_OPTIONS = [
  { label: 'Disleksia (Membaca & Fonemik)', value: 'DISLEKSIA' },
  { label: 'Disgrafia (Menulis & Motorik)', value: 'DISGRAFIA' },
  { label: 'Diskalkulia (Logika Angka)', value: 'DISKALKULIA' },
  { label: 'Umum (Panduan Inklusif)', value: 'UMUM' },
]
