import type { ArticleItem, ArticleFormData } from '../_components/types'

export async function fetchArticles(): Promise<ArticleItem[]> {
  const res = await fetch('/api/articles')
  const json = await res.json()
  if (json.success && Array.isArray(json.data)) {
    return json.data
  }
  return []
}

export async function createArticle(payload: ArticleFormData) {
  const res = await fetch('/api/articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const json = await res.json()
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Gagal menyimpan referensi artikel baru.')
  }
  return json.data
}

export async function updateArticle(id: string, payload: ArticleFormData) {
  const res = await fetch(`/api/articles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const json = await res.json()
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Gagal memperbarui referensi artikel.')
  }
  return json.data
}

export async function deleteArticle(id: string) {
  const res = await fetch(`/api/articles/${id}`, {
    method: 'DELETE',
  })
  const json = await res.json()
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Gagal menghapus artikel.')
  }
  return json.data
}
