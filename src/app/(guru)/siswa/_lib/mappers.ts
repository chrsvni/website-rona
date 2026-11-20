import type { StudentFormData } from '../_components/types'
import type { StudentApiPayload } from '../_services/student-api'

export function formatStudentPayload(
  formData: StudentFormData,
  homeroomClass?: string | null
): StudentApiPayload {
  return {
    name: formData.name.trim(),
    gender: formData.gender,
    age: formData.age ? parseInt(formData.age, 10) : null,
    className: homeroomClass || formData.className,
    parentName: formData.parentName.trim() || null,
    contactNumber: formData.contactNumber.trim() || null,
    notes: formData.notes.trim() || null,
  }
}
