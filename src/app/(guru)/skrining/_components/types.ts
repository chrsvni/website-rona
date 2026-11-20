import { SCREENING_INDICATORS } from '@/lib/screening-data'

export type ScreeningCategory = 'DISLEKSIA' | 'DISGRAFIA' | 'DISKALKULIA'

export interface StudentData {
  id: string
  name: string
  className: string
  gender: string
  age?: number | null
  parentName?: string | null
  notes?: string | null
}

export type IndicatorAnswers = Record<string, { score: number; note: string }>

export function getInitialAnswers(cat: ScreeningCategory): IndicatorAnswers {
  const relevant = SCREENING_INDICATORS.filter((ind) => ind.category === cat)
  const initial: IndicatorAnswers = {}
  relevant.forEach((ind) => {
    initial[ind.id] = { score: 2, note: '' }
  })
  return initial
}

export const STEPS_HEADER = [
  { num: 1, title: 'Profil Siswa' },
  { num: 2, title: 'Panduan & Bukti Tugas' },
  { num: 3, title: 'Observasi Perilaku' },
  { num: 4, title: 'Indikasi Harian' },
  { num: 5, title: 'Rekomendasi Sistem' },
]

export const CATEGORY_OPTIONS: { label: string; value: ScreeningCategory }[] = [
  { label: 'Disleksia (Membaca)', value: 'DISLEKSIA' },
  { label: 'Disgrafia (Menulis)', value: 'DISGRAFIA' },
  { label: 'Diskalkulia (Berhitung)', value: 'DISKALKULIA' },
]
