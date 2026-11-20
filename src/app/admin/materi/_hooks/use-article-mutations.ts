'use client'

import { useState, useEffect } from 'react'
import type { ArticleItem, ArticleFormData } from '../_components/types'
import {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../_services/article-api'
import { validateArticleForm } from '../_lib/validation'

export function useArticleMutations() {
  const [articles, setArticles] = useState<ArticleItem[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<ArticleItem | null>(null)
  const [deleteSubmitting, setDeleteSubmitting] = useState(false)

  const reloadArticles = async () => {
    try {
      const data = await fetchArticles()
      setArticles(data)
    } catch (err) {
      console.error('Gagal memuat artikel:', err)
    }
  }

  useEffect(() => {
    let ignore = false
    async function load() {
      try {
        const data = await fetchArticles()
        if (!ignore) {
          setArticles(data)
        }
      } catch (err) {
        console.error('Gagal memuat artikel:', err)
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    load()
    return () => {
      ignore = true
    }
  }, [])

  const saveArticle = async (
    formData: ArticleFormData,
    editingId: string | null
  ) => {
    const val = validateArticleForm(formData)
    if (!val.isValid) {
      throw new Error(val.message)
    }

    if (editingId) {
      const data = await updateArticle(editingId, formData)
      await reloadArticles()
      return { data, isEdit: true }
    } else {
      const data = await createArticle(formData)
      await reloadArticles()
      return { data, isEdit: false }
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleteSubmitting(true)
    try {
      await deleteArticle(deleteTarget.id)
      setArticles((prev) => prev.filter((a) => a.id !== deleteTarget.id))
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
    articles,
    setArticles,
    loading,
    deleteTarget,
    setDeleteTarget,
    deleteSubmitting,
    saveArticle,
    confirmDelete,
    reloadArticles,
  }
}
