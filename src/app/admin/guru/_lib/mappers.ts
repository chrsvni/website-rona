import type { TeacherFormData } from '../_components/types'
import type { TeacherApiPayload } from '../_services/teacher-api'

export function cleanNipString(nip: string): string {
  return nip.trim().replace(/[\s-]/g, '')
}

export function formatTeacherPayload(
  formData: TeacherFormData
): TeacherApiPayload {
  const cleanNip = cleanNipString(formData.nip)
  return {
    ...formData,
    name: formData.name.trim(),
    email: formData.email.trim(),
    schoolName: formData.schoolName.trim(),
    homeroomClass: formData.homeroomClass.trim(),
    nip: cleanNip || null,
  }
}
