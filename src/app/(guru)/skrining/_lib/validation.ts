export interface ValidationResult {
  isValid: boolean
  message?: string
}

export function validateStep1(selectedStudentId: string): ValidationResult {
  if (!selectedStudentId || !selectedStudentId.trim()) {
    return {
      isValid: false,
      message: 'Pilih siswa terlebih dahulu untuk memulai observasi.',
    }
  }
  return { isValid: true }
}

export function validateStep2(taskProofNotes: string): ValidationResult {
  if (!taskProofNotes || !taskProofNotes.trim()) {
    return {
      isValid: false,
      message: 'Mohon isi deskripsi ringkas bukti pengerjaan tugas observasi siswa.',
    }
  }
  return { isValid: true }
}
