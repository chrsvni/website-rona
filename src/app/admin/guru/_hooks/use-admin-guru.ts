'use client'

import { useTeacherFilter } from './use-teacher-filter'
import { useTeacherForm } from './use-teacher-form'
import { useTeacherMutations } from './use-teacher-mutations'

export function useAdminGuru() {
  const mutationState = useTeacherMutations()
  const filterState = useTeacherFilter(mutationState.teachers)
  const formState = useTeacherForm()

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    formState.setFormError(null)
    formState.setFormSuccess(null)
    formState.setFormSubmitting(true)

    try {
      const result = await mutationState.saveTeacher(
        formState.formData,
        formState.editingId
      )

      formState.setFormSuccess(
        result.isEdit
          ? 'Akun guru berhasil diperbarui!'
          : 'Akun guru berhasil dibuat! Guru dapat langsung login menggunakan email/NIP & kata sandi tersebut.'
      )

      setTimeout(() => {
        formState.setIsModalOpen(false)
        formState.setFormSuccess(null)
      }, 1000)
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Terjadi gangguan saat memproses data guru.'
      formState.setFormError(msg)
    } finally {
      formState.setFormSubmitting(false)
    }
  }

  return {
    filterState,
    formState,
    mutationState,
    handleSubmitForm,
  }
}

export type AdminGuruReturn = ReturnType<typeof useAdminGuru>
