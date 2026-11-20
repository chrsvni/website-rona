export interface TeacherItem {
  id: string
  name: string
  email: string
  nip?: string | null
  schoolName?: string | null
  homeroomClass?: string | null
  role: string
  isVerified: boolean
  createdAt: string
  _count?: {
    students: number
    screenings: number
  }
}

export interface TeacherFormData {
  name: string
  email: string
  nip: string
  schoolName: string
  homeroomClass: string
  password: string
}

export const CLASS_OPTIONS = [
  'Kelas 1',
  'Kelas 2',
  'Kelas 3A',
  'Kelas 3B',
  'Kelas 4A',
  'Kelas 4B',
  'Kelas 5A',
  'Kelas 5B',
  'Kelas 6A',
  'Kelas 6B',
]
