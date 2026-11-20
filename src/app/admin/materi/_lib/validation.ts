import type { ArticleFormData } from '../_components/types'

export interface ValidationResult {
  isValid: boolean
  message?: string
}

export function validateArticleForm(formData: ArticleFormData): ValidationResult {
  if (
    formData.sourceUrl &&
    !formData.sourceUrl.startsWith('http://') &&
    !formData.sourceUrl.startsWith('https://')
  ) {
    return {
      isValid: false,
      message: 'Tautan sumber harus diawali dengan http:// atau https://',
    }
  }
  return { isValid: true }
}
