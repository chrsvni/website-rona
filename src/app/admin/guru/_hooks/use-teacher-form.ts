'use client'

import { useState } from 'react'
import type { TeacherItem, TeacherFormData } from '../_components/types'

export function useTeacherForm() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<TeacherFormData>({
    name: '',
    email: '',
    nip: '',
    schoolName: 'SD Negeri Cempaka Putih 01',
    homeroomClass: 'Kelas 3A',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState<string | null>(null)

  const handleOpenAdd = () => {
    setEditingId(null)
    setFormData({
      name: '',
      email: '',
      nip: '',
      schoolName: 'SD Negeri Cempaka Putih 01',
      homeroomClass: 'Kelas 3A',
      password: 'password123',
    })
    setShowPassword(false)
    setFormError(null)
    setFormSuccess(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (teacher: TeacherItem) => {
    setEditingId(teacher.id)
    setFormData({
      name: teacher.name || '',
      email: teacher.email || '',
      nip: teacher.nip || '',
      schoolName: teacher.schoolName || '',
      homeroomClass: teacher.homeroomClass || 'Kelas 3A',
      password: '',
    })
    setShowPassword(false)
    setFormError(null)
    setFormSuccess(null)
    setIsModalOpen(true)
  }

  const handleGeneratePassword = () => {
    const randomPass = 'guru' + Math.floor(1000 + Math.random() * 9000)
    setFormData((prev) => ({ ...prev, password: randomPass }))
    setShowPassword(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setFormError(null)
    setFormSuccess(null)
  }

  return {
    isModalOpen,
    setIsModalOpen,
    editingId,
    formData,
    setFormData,
    showPassword,
    setShowPassword,
    formSubmitting,
    setFormSubmitting,
    formError,
    setFormError,
    formSuccess,
    setFormSuccess,
    handleOpenAdd,
    handleOpenEdit,
    handleGeneratePassword,
    handleCloseModal,
  }
}
