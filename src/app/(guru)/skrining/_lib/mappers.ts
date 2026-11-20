import type { IndicatorAnswers, ScreeningCategory } from '../_components/types'
import type { ScreeningPayload } from '../_services/screening-api'

export function mapAnswersToBehaviorList(
  answers: IndicatorAnswers
): Array<{ indicatorId: string; score: number; note: string }> {
  return Object.entries(answers).map(([indicatorId, val]) => ({
    indicatorId,
    score: val.score,
    note: val.note,
  }))
}

export interface ScreeningFormInput {
  studentId: string
  category: ScreeningCategory
  taskName: string
  taskProofNotes: string
  taskProofUrl?: string | null
  answers: IndicatorAnswers
  dailyIndication: string
  dailyGeneralNote: string
}

export function createScreeningPayload(
  input: ScreeningFormInput
): ScreeningPayload {
  return {
    studentId: input.studentId,
    category: input.category,
    taskName: input.taskName,
    taskProofNotes: input.taskProofNotes,
    taskProofUrl: input.taskProofUrl || null,
    behaviorAnswers: mapAnswersToBehaviorList(input.answers),
    dailyIndication: input.dailyIndication,
    dailyGeneralNote: input.dailyGeneralNote,
  }
}
