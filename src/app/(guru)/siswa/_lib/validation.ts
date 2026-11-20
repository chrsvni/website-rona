import type { StudentFormData } from '../_components/types'

export interface ValidationResult {
  isValid: boolean
  message?: string
}

export function validateStudentForm(formData: StudentFormData): ValidationResult {
  const trimmedName = formData.name.trim()
  if (!trimmedName || trimmedName.length < 2) {
    return {
      isValid: false,
      message: 'Nama lengkap siswa wajib diisi (minimal 2 karakter).',
    }
  }
  return { isValid: true }
}
