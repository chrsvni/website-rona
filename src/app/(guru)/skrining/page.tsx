'use client'

import { Suspense } from 'react'
import {
  ScreeningHeader,
  ScreeningCategoryTabs,
  ScreeningStepper,
  ScreeningCardContent,
} from './_components'
import { useScreeningWizard } from './_hooks'

function ScreeningWizardContent() {
  const wizard = useScreeningWizard()

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <ScreeningHeader teacherHomeroom={wizard.studentsState.teacherHomeroom} />
      <ScreeningCategoryTabs
        category={wizard.formState.category}
        currentStep={wizard.currentStep}
        onCategoryChange={wizard.formState.handleCategoryChange}
      />
      <ScreeningStepper currentStep={wizard.currentStep} />
      <ScreeningCardContent wizard={wizard} />
    </div>
  )
}

export default function ScreeningWizardPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-16 text-center text-sm text-[#49769F]">
          Memuat lembar observasi Rona...
        </div>
      }
    >
      <ScreeningWizardContent />
    </Suspense>
  )
}
