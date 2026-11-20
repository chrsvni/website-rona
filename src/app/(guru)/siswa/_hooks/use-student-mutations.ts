'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { StudentItem, StudentFormData } from '../_components/types'
import {
  createStudent,
  updateStudent,
  deleteStudent,
} from '../_services/student-api'
import { formatStudentPayload } from '../_lib/mappers'
import { validateStudentForm } from '../_lib/validation'

export function useStudentMutations(initialStudents: StudentItem[]) {
  const router = useRouter()
  const [students, setStudents] = useState<StudentItem[]>(initialStudents)

  // State Modal Hapus
  const [deleteTarget, setDeleteTarget] = useState<StudentItem | null>(null)
  const [deleteSubmitting, setDeleteSubmitting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const saveStudent = async (
    formData: StudentFormData,
    editingStudent: StudentItem | null,
    homeroomClass?: string | null
  ) => {
    const val = validateStudentForm(formData)
    if (!val.isValid) {
      throw new Error(val.message)
    }

    const payload = formatStudentPayload(formData, homeroomClass)

    if (editingStudent) {
      const data = await updateStudent(editingStudent.id, payload)
      setStudents((prev) =>
        prev.map((s) => (s.id === editingStudent.id ? { ...s, ...data } : s))
      )
      return { data, isEdit: true }
    } else {
      const data = await createStudent(payload)
      const newStudentRecord: StudentItem = {
        ...data,
        screenings: [],
        _count: { screenings: 0, dailyNotes: 0 },
      }
      setStudents((prev) => [newStudentRecord, ...prev])
      return { data, isEdit: false }
    }
  }

  const deleteStudentConfirm = async () => {
    if (!deleteTarget) return
    setDeleteSubmitting(true)
    setDeleteError(null)

    try {
      await deleteStudent(deleteTarget.id)
      setStudents((prev) => prev.filter((s) => s.id !== deleteTarget.id))
      setDeleteTarget(null)
      router.refresh()
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Terjadi kesalahan saat menghapus siswa.'
      setDeleteError(message)
    } finally {
      setDeleteSubmitting(false)
    }
  }

  return {
    students,
    setStudents,
    deleteTarget,
    setDeleteTarget,
    deleteSubmitting,
    deleteError,
    saveStudent,
    deleteStudentConfirm,
  }
}
