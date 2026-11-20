'use client'

import { useState } from 'react'
import type { ArticleItem, ArticleFormData } from '../_components/types'

export function useArticleForm() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    author: '',
    category: 'DISLEKSIA',
    sourceUrl: '',
    publishedDate: '',
    excerpt: '',
  })
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState<string | null>(null)

  const handleOpenAdd = () => {
    setEditingId(null)
    setFormData({
      title: '',
      author: '',
      category: 'DISLEKSIA',
      sourceUrl: '',
      publishedDate: new Date().getFullYear().toString(),
      excerpt: '',
    })
    setFormError(null)
    setFormSuccess(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (art: ArticleItem) => {
    setEditingId(art.id)
    setFormData({
      title: art.title || '',
      author: art.author || '',
      category: art.category || 'DISLEKSIA',
      sourceUrl: art.sourceUrl || '',
      publishedDate: art.publishedDate || '',
      excerpt: art.excerpt || '',
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
    editingId,
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
