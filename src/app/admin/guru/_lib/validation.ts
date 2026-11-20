import type { TeacherFormData } from '../_components/types'

export interface ValidationResult {
  isValid: boolean
  message?: string
}

export function validateTeacherForm(
  formData: TeacherFormData,
  isEdit: boolean
): ValidationResult {
  if (!formData.name.trim() || !formData.email.trim()) {
    return {
      isValid: false,
      message: 'Nama guru dan email wajib diisi.',
    }
  }

  if (!formData.homeroomClass.trim()) {
    return {
      isValid: false,
      message: 'Penugasan wali kelas wajib diisi (contoh: Kelas 3A).',
    }
  }

  // Validasi NIP Ketat (Wajib 18 digit angka bila diisi)
  const cleanNip = formData.nip.trim().replace(/[\s-]/g, '')
  if (cleanNip) {
    if (!/^\d+$/.test(cleanNip)) {
      return {
        isValid: false,
        message: 'NIP hanya boleh terdiri dari angka (0-9).',
      }
    }
    if (cleanNip.length !== 18) {
      return {
        isValid: false,
        message: `NIP harus terdiri dari tepat 18 digit angka sesuai standar NIP nasional resmi. Saat ini: ${cleanNip.length} digit.`,
      }
    }
  }

  if (!isEdit && !formData.password.trim()) {
    return {
      isValid: false,
      message: 'Kata sandi akun awal wajib diisi.',
    }
  }

  return { isValid: true }
}
