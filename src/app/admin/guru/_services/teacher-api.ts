import type { TeacherItem, TeacherFormData } from '../_components/types'

export interface TeacherApiPayload extends Omit<TeacherFormData, 'nip'> {
  nip: string | null
}

export async function fetchTeachers(): Promise<TeacherItem[]> {
  const res = await fetch('/api/teachers')
  const json = await res.json()
  if (json.success && Array.isArray(json.data)) {
    return json.data
  }
  return []
}

export async function createTeacher(payload: TeacherApiPayload) {
  const res = await fetch('/api/teachers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json()
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Gagal membuat akun guru baru.')
  }
  return data.data
}

export async function updateTeacher(
  id: string,
  payload: TeacherApiPayload
) {
  const res = await fetch(`/api/teachers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json()
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Gagal memperbarui data akun guru.')
  }
  return data.data
}

export async function deleteTeacher(id: string) {
  const res = await fetch(`/api/teachers/${id}`, {
    method: 'DELETE',
  })
  const data = await res.json()
  if (!data.success) {
    throw new Error(data.error || 'Gagal menghapus akun guru.')
  }
  return data.data
}
