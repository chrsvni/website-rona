'use client'

import { useState } from 'react'
import { saveScreening, type ScreeningPayload } from '../_services/screening-api'

export function useSaveScreening() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [savedScreeningId, setSavedScreeningId] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)

  async function submitScreening(
    payload: ScreeningPayload
  ): Promise<string | null> {
    setIsSubmitting(true)
    setSaveError(null)
    try {
      const data = await saveScreening(payload)
      setSavedScreeningId(data.id)
      return data.id
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Terjadi kesalahan jaringan.'
      setSaveError(msg)
      alert(msg)
      return null
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    isSubmitting,
    savedScreeningId,
    saveError,
    submitScreening,
  }
}
