'use client'

import { useState, useEffect } from 'react'
import type { TeacherItem, TeacherFormData } from '../_components/types'
import {
  fetchTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from '../_services/teacher-api'
import { validateTeacherForm } from '../_lib/validation'
import { formatTeacherPayload } from '../_lib/mappers'

export function useTeacherMutations() {
  const [teachers, setTeachers] = useState<TeacherItem[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<TeacherItem | null>(null)
  const [deleteSubmitting, setDeleteSubmitting] = useState(false)

  const reloadTeachers = async () => {
    try {
      const data = await fetchTeachers()
      setTeachers(data)
    } catch (err) {
      console.error('Gagal memuat akun guru:', err)
    }
  }

  useEffect(() => {
    let ignore = false
    async function load() {
      try {
        const data = await fetchTeachers()
        if (!ignore) {
          setTeachers(data)
        }
      } catch (err) {
        console.error('Gagal memuat akun guru:', err)
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    load()
    return () => {
      ignore = true
    }
  }, [])

  const saveTeacher = async (
    formData: TeacherFormData,
    editingId: string | null
  ) => {
    const val = validateTeacherForm(formData, Boolean(editingId))
    if (!val.isValid) {
      throw new Error(val.message)
    }

    const payload = formatTeacherPayload(formData)

    if (editingId) {
      const data = await updateTeacher(editingId, payload)
      await reloadTeachers()
      return { data, isEdit: true }
    } else {
      const data = await createTeacher(payload)
      await reloadTeachers()
      return { data, isEdit: false }
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleteSubmitting(true)
    try {
      await deleteTeacher(deleteTarget.id)
      setTeachers((prev) => prev.filter((t) => t.id !== deleteTarget.id))
      setDeleteTarget(null)
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Terjadi gangguan koneksi saat menghapus.'
      alert(msg)
    } finally {
      setDeleteSubmitting(false)
    }
  }

  return {
    teachers,
    setTeachers,
    loading,
    deleteTarget,
    setDeleteTarget,
    deleteSubmitting,
    saveTeacher,
    confirmDelete,
    reloadTeachers,
  }
}
