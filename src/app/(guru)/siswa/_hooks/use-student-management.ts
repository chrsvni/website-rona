'use client'

import { useRouter } from 'next/navigation'
import type { StudentManagementProps } from '../_components/types'
import { useStudentFilter } from './use-student-filter'
import { useStudentForm } from './use-student-form'
import { useStudentMutations } from './use-student-mutations'

export function useStudentManagement({
  initialStudents,
  teacherSession,
}: StudentManagementProps) {
  const router = useRouter()
  const assignedClass = teacherSession?.homeroomClass || 'Kelas 3A'

  const mutationState = useStudentMutations(initialStudents)
  const filterState = useStudentFilter(mutationState.students)
  const formState = useStudentForm(assignedClass)

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    formState.setFormError(null)
    formState.setFormSuccess(null)
    formState.setFormSubmitting(true)

    try {
      const result = await mutationState.saveStudent(
        formState.formData,
        formState.editingStudent,
        teacherSession?.homeroomClass
      )

      formState.setFormSuccess(
        result.isEdit
          ? `Data siswa '${result.data.name}' berhasil diperbarui!`
          : `Siswa baru '${result.data.name}' berhasil didaftarkan ke ${result.data.className}!`
      )

      setTimeout(() => {
        formState.setIsModalOpen(false)
        formState.setFormSuccess(null)
        router.refresh()
      }, 1000)
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Terjadi kesalahan saat memproses data.'
      formState.setFormError(message)
    } finally {
      formState.setFormSubmitting(false)
    }
  }

  return {
    assignedClass,
    teacherSession,
    filterState,
    formState,
    mutationState,
    handleSubmitForm,
  }
}

export type StudentManagementReturn = ReturnType<typeof useStudentManagement>
