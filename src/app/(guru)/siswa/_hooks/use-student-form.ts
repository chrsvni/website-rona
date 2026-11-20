'use client'

import { useState } from 'react'
import type { StudentItem, StudentFormData } from '../_components/types'

export function useStudentForm(assignedClass: string) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<StudentItem | null>(null)

  const [formData, setFormData] = useState<StudentFormData>({
    name: '',
    gender: 'Laki-laki',
    age: '8',
    className: assignedClass,
    parentName: '',
    contactNumber: '',
    notes: '',
  })

  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState<string | null>(null)

  const handleOpenAdd = () => {
    setEditingStudent(null)
    setFormData({
      name: '',
      gender: 'Laki-laki',
      age: '8',
      className: assignedClass,
      parentName: '',
      contactNumber: '',
      notes: '',
    })
    setFormError(null)
    setFormSuccess(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (
    st: StudentItem,
    homeroomClass?: string | null
  ) => {
    setEditingStudent(st)
    setFormData({
      name: st.name,
      gender: st.gender,
      age: st.age ? st.age.toString() : '8',
      className: homeroomClass || st.className,
      parentName: st.parentName || '',
      contactNumber: st.contactNumber || '',
      notes: st.notes || '',
    })
    setFormError(null)
    setFormSuccess(null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setFormError(null)
    setFormSuccess(null)
  }

  return {
    isModalOpen,
    setIsModalOpen,
    editingStudent,
    formData,
    setFormData,
    formSubmitting,
    setFormSubmitting,
    formError,
    setFormError,
    formSuccess,
    setFormSuccess,
    handleOpenAdd,
    handleOpenEdit,
    handleCloseModal,
  }
}
