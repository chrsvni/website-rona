'use client'

import { useArticleFilter } from './use-article-filter'
import { useArticleForm } from './use-article-form'
import { useArticleMutations } from './use-article-mutations'

export function useAdminMateri() {
  const mutationState = useArticleMutations()
  const filterState = useArticleFilter(mutationState.articles)
  const formState = useArticleForm()

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    formState.setFormError(null)
    formState.setFormSuccess(null)
    formState.setFormSubmitting(true)

    try {
      const result = await mutationState.saveArticle(
        formState.formData,
        formState.editingId
      )

      formState.setFormSuccess(
        result.isEdit
          ? 'Referensi berhasil diperbarui!'
          : 'Referensi materi baru berhasil ditambahkan!'
      )

      setTimeout(() => {
        formState.setIsModalOpen(false)
        formState.setFormSuccess(null)
      }, 1000)
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Terjadi kesalahan saat memproses materi.'
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

export type AdminMateriReturn = ReturnType<typeof useAdminMateri>
