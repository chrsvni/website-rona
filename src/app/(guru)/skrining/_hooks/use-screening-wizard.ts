'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStudents } from './use-students'
import { useScreeningForm } from './use-screening-form'
import { useSaveScreening } from './use-save-screening'
import { validateStep1, validateStep2 } from '../_lib/validation'
import { createScreeningPayload } from '../_lib/mappers'

export function useScreeningWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)

  const studentsState = useStudents()
  const formState = useScreeningForm()
  const saveState = useSaveScreening()

  function handleNext() {
    if (currentStep === 1) {
      const val = validateStep1(studentsState.selectedStudentId)
      if (!val.isValid) {
        alert(val.message)
        return
      }
      setCurrentStep(2)
    } else if (currentStep === 2) {
      const val = validateStep2(formState.taskProofNotes)
      if (!val.isValid) {
        alert(val.message)
        return
      }
      setCurrentStep(3)
    } else if (currentStep === 3) {
      setCurrentStep(4)
    } else if (currentStep === 4) {
      formState.computeDiagnosis(studentsState.selectedStudent?.name || 'Siswa')
      setCurrentStep(5)
    }
  }

  function handlePrev() {
    setCurrentStep((prev) => Math.max(1, prev - 1))
  }

  async function handleSave() {
    if (!studentsState.selectedStudentId || !formState.diagnosisResult) return

    const payload = createScreeningPayload({
      studentId: studentsState.selectedStudentId,
      category: formState.category,
      taskName: formState.activeTaskGuide.name,
      taskProofNotes: formState.taskProofNotes,
      taskProofUrl: formState.taskProofUrl,
      answers: formState.answers,
      dailyIndication: formState.dailyIndication,
      dailyGeneralNote: formState.dailyGeneralNote,
    })

    await saveState.submitScreening(payload)
  }

  function handlePrint() {
    if (saveState.savedScreeningId) {
      router.push(`/skrining/hasil/${saveState.savedScreeningId}`)
    }
  }

  function handleReturnToStudents() {
    router.push('/siswa')
  }

  return {
    currentStep,
    setCurrentStep,
    handleNext,
    handlePrev,
    handleSave,
    handlePrint,
    handleReturnToStudents,
    studentsState,
    formState,
    saveState,
  }
}

export type ScreeningWizardReturn = ReturnType<typeof useScreeningWizard>
