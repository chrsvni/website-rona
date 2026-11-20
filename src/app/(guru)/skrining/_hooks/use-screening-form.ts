'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  TASK_GUIDES,
  SCREENING_INDICATORS,
  calculateScreeningBySystem,
  type SystemDiagnosisResult,
} from '@/lib/screening-data'
import {
  type ScreeningCategory,
  type IndicatorAnswers,
  getInitialAnswers,
} from '../_components/types'
import { mapAnswersToBehaviorList } from '../_lib/mappers'

export function useScreeningForm() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const initialCategory: ScreeningCategory =
    categoryParam === 'DISGRAFIA' || categoryParam === 'DISKALKULIA'
      ? categoryParam
      : 'DISLEKSIA'

  const [category, setCategory] = useState<ScreeningCategory>(initialCategory)
  const [taskProofNotes, setTaskProofNotes] = useState('')
  const [taskProofUrl, setTaskProofUrl] = useState('')
  const [answers, setAnswers] = useState<IndicatorAnswers>(() =>
    getInitialAnswers(initialCategory)
  )
  const [dailyIndication, setDailyIndication] = useState('')
  const [dailyGeneralNote, setDailyGeneralNote] = useState('')
  const [diagnosisResult, setDiagnosisResult] =
    useState<SystemDiagnosisResult | null>(null)

  function handleCategoryChange(newCategory: ScreeningCategory) {
    setCategory(newCategory)
    setAnswers(getInitialAnswers(newCategory))
  }

  const activeTaskGuide = TASK_GUIDES[category]
  const relevantIndicators = SCREENING_INDICATORS.filter(
    (ind) => ind.category === category
  )

  function computeDiagnosis(studentName: string) {
    const formatted = mapAnswersToBehaviorList(answers)
    const result = calculateScreeningBySystem(category, formatted, studentName)
    setDiagnosisResult(result)
    return result
  }

  return {
    category,
    handleCategoryChange,
    taskProofNotes,
    setTaskProofNotes,
    taskProofUrl,
    setTaskProofUrl,
    answers,
    setAnswers,
    dailyIndication,
    setDailyIndication,
    dailyGeneralNote,
    setDailyGeneralNote,
    diagnosisResult,
    activeTaskGuide,
    relevantIndicators,
    computeDiagnosis,
  }
}
