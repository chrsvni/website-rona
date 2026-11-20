import type { StudentData } from '../_components/types'

export interface ScreeningPayload {
  studentId: string
  category: string
  taskName: string
  taskProofNotes: string
  taskProofUrl: string | null
  behaviorAnswers: Array<{
    indicatorId: string
    score: number
    note: string
  }>
  dailyIndication: string
  dailyGeneralNote: string
}

export async function getTeacherProfile(): Promise<string> {
  const res = await fetch('/api/auth/me')
  const json = await res.json()
  return json?.user?.homeroomClass || ''
}

export async function getStudents(): Promise<StudentData[]> {
  const res = await fetch('/api/students')
  const json = await res.json()
  if (json.success && Array.isArray(json.data)) {
    return json.data
  }
  return []
}

export async function saveScreening(
  payload: ScreeningPayload
): Promise<{ id: string }> {
  const res = await fetch('/api/screenings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const json = await res.json()
  if (!json.success) {
    throw new Error(json.error || 'Gagal menyimpan hasil skrining.')
  }
  return json.data
}
