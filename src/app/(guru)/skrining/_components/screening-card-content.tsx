import {
  Step1StudentProfile,
  Step2TaskGuide,
  Step3BehaviorObservation,
  Step4DailyIndication,
  Step5SystemRecommendation,
} from './steps'
import { ScreeningNavigation } from './screening-navigation'
import type { ScreeningWizardReturn } from '../_hooks/use-screening-wizard'

interface ScreeningCardContentProps {
  wizard: ScreeningWizardReturn
}

export function ScreeningCardContent({ wizard }: ScreeningCardContentProps) {
  const { currentStep, studentsState, formState, saveState } = wizard

  return (
    <div className="glass-card p-6 sm:p-8 rounded-3xl shadow-xl min-h-[450px] flex flex-col justify-between">
      {currentStep === 1 && (
        <Step1StudentProfile
          students={studentsState.students}
          selectedStudentId={studentsState.selectedStudentId}
          onSelectStudent={studentsState.setSelectedStudentId}
        />
      )}

      {currentStep === 2 && (
        <Step2TaskGuide
          category={formState.category}
          activeTaskGuide={formState.activeTaskGuide}
          taskProofNotes={formState.taskProofNotes}
          setTaskProofNotes={formState.setTaskProofNotes}
          taskProofUrl={formState.taskProofUrl}
          setTaskProofUrl={formState.setTaskProofUrl}
        />
      )}

      {currentStep === 3 && (
        <Step3BehaviorObservation
          relevantIndicators={formState.relevantIndicators}
          answers={formState.answers}
          setAnswers={formState.setAnswers}
        />
      )}

      {currentStep === 4 && (
        <Step4DailyIndication
          dailyIndication={formState.dailyIndication}
          setDailyIndication={formState.setDailyIndication}
          dailyGeneralNote={formState.dailyGeneralNote}
          setDailyGeneralNote={formState.setDailyGeneralNote}
        />
      )}

      {currentStep === 5 && formState.diagnosisResult && (
        <Step5SystemRecommendation
          diagnosisResult={formState.diagnosisResult}
          savedScreeningId={saveState.savedScreeningId}
          isSubmitting={saveState.isSubmitting}
          onSave={wizard.handleSave}
          onPrint={wizard.handlePrint}
        />
      )}

      <ScreeningNavigation
        currentStep={currentStep}
        isSubmitting={saveState.isSubmitting}
        savedScreeningId={saveState.savedScreeningId}
        onPrev={wizard.handlePrev}
        onNext={wizard.handleNext}
        onReturnToStudents={wizard.handleReturnToStudents}
      />
    </div>
  )
}
