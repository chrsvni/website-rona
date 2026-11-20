export interface StudentApiPayload {
  name: string
  gender: string
  age: number | null
  className: string
  parentName: string | null
  contactNumber: string | null
  notes: string | null
}

export async function createStudent(payload: StudentApiPayload) {
  const res = await fetch('/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const json = await res.json()
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Gagal mendaftarkan siswa baru.')
  }
  return json.data
}

export async function updateStudent(id: string, payload: StudentApiPayload) {
  const res = await fetch(`/api/students/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const json = await res.json()
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Gagal memperbarui data siswa.')
  }
  return json.data
}

export async function deleteStudent(id: string) {
  const res = await fetch(`/api/students/${id}`, {
    method: 'DELETE',
  })
  const json = await res.json()
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Gagal menghapus data siswa.')
  }
  return json.data
}
